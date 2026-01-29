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
    for (let i = 0; i < 200; i++) {
      const size = Math.random() * 80 + 40; // 40px to 120px
      const duration = Math.random() * 4 + 4; // 4s to 8s
      const delay = Math.random() * 2; // 0s to 2s
      const sway = Math.random() * 100 - 50; // -50px to 50px
      const nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
      heartArray.push({
        id: i,
        size,
        nickname,
        style: {
          width: `${size}px`,
          height: `${size}px`,
          left: `${Math.random() * 100}%`,
          animation: `float-up ${duration}s linear ${delay}s forwards, sway ${Math.random() * 4 + 3}s ease-in-out ${delay}s infinite`,
          '--sway-amount': `${sway}px`,
        } as React.CSSProperties,
      });
    }
    return heartArray;
  }, [nicknames]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onTransitionEnd, 1000); // Wait for background fade before changing stage
    }, 5000); // Total duration of animation scene

    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-background to-primary"
    >
        <div className={`absolute inset-0 bg-gradient-to-b from-accent to-primary transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="absolute inset-0 overflow-hidden">
            {hearts.map((heart) => (
                <div key={heart.id} className="absolute bottom-[-150px]" style={heart.style}>
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
