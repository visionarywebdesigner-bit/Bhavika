"use client";

import { useEffect, useMemo, useState } from 'react';
import { HeartIcon } from './HeartIcon';

interface FloatingHeartsProps {
  onTransitionEnd: () => void;
}

interface Heart {
  id: number;
  style: React.CSSProperties;
  nickname: string;
  size: number;
}

export function FloatingHearts({ onTransitionEnd }: FloatingHeartsProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  
  const nicknames = useMemo(() => ["Sweetu", "Cutu", "Jaan", "Bhavika", "Bhavi", "Bhavu", "Bhavya"], []);

  const hearts = useMemo(() => {
    const heartArray: Heart[] = [];
    for (let i = 0; i < 300; i++) {
      const size = Math.random() * 80 + 40; // 40px to 120px
      const flyAwayDuration = Math.random() * 2 + 1.5; // 1.5s to 3.5s
      const swayDuration = Math.random() * 4 + 3;
      const swayAmount = Math.random() * 100 - 50;
      const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
      heartArray.push({
        id: i,
        size,
        nickname,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animation: `fill-in 0.4s cubic-bezier(0.25, 1, 0.5, 1) forwards, sway ${swayDuration}s ease-in-out infinite, fly-out ${flyAwayDuration}s ease-in-out 1s forwards`,
          '--sway-amount': `${swayAmount}px`,
        } as React.CSSProperties,
      });
    }
    return heartArray;
  }, [nicknames]);

  useEffect(() => {
    // Start fading out after the hearts have been on screen for a bit.
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onTransitionEnd, 1000); // Wait for background fade before changing stage
    }, 3500); // Total duration of animation scene

    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-background to-primary"
    >
        <div className={`absolute inset-0 bg-gradient-to-b from-accent to-primary transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="absolute inset-0 overflow-hidden">
            {hearts.map((heart) => (
                <div key={heart.id} className="absolute -translate-x-1/2 -translate-y-1/2" style={heart.style}>
                <div className="relative w-full h-full flex items-center justify-center">
                    <HeartIcon className="w-full h-full text-primary/70" />
                    <span 
                        className="absolute text-white/90 font-headline text-center drop-shadow-md select-none"
                        style={{ fontSize: `${heart.size / 4.5}px` }}
                    >
                        {heart.nickname}
                    </span>
                </div>
                </div>
            ))}
        </div>
    </div>
  );
}
