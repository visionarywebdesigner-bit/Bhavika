"use client";

import { useEffect, useMemo, useState } from 'react';
import { HeartIcon } from './HeartIcon';
import { cn } from '@/lib/utils';

interface FloatingHeartsProps {
  onTransitionEnd: () => void;
}

interface Heart {
  id: number;
  style: React.CSSProperties;
  nickname: string;
}

export function FloatingHearts({ onTransitionEnd }: FloatingHeartsProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const nicknames = useMemo(() => ["Sweetu", "Cutu", "Jaan", "Bhavika", "Bhavi", "Bhavu", "Bhavya"], []);
  const [hearts, setHearts] = useState<Heart[]>([]);

  const numCols = 12;
  const numRows = 16;

  useEffect(() => {
    const heartArray: Heart[] = [];
    const totalHearts = numCols * numRows;
    for (let i = 0; i < totalHearts; i++) {
      const row = Math.floor(i / numCols);
      // Stagger animation from bottom to top, with a slight horizontal wave
      const animationDelay = `${(numRows - row - 1) * 80 + (i % numCols) * 20}ms`;
      const nickname = nicknames[i % nicknames.length];
      heartArray.push({
        id: i,
        nickname,
        style: {
          animationDelay,
        },
      });
    }
    setHearts(heartArray);
  }, [nicknames]);

  useEffect(() => {
    // Wait for the fill animation to complete before starting the fade out
    const fillTime = (numRows * 80) + 800; // Roughly numRows * stagger_delay + animation-duration
    const holdTime = 1500; // How long to show the packed hearts

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      // Wait for fly-out animation to be mostly done before changing stage
      setTimeout(onTransitionEnd, 2000); 
    }, fillTime + holdTime);

    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-background to-primary"
    >
        <div className={`absolute inset-0 bg-gradient-to-b from-accent to-primary transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0'}`}></div>
        
        <div className={`absolute inset-0 grid grid-cols-12 auto-rows-auto overflow-hidden`}>
            {hearts.map((heart) => (
                <div 
                    key={heart.id} 
                    className={cn(
                        "relative flex items-center justify-center opacity-0 aspect-square", // Start with opacity 0, maintain aspect ratio
                        isFadingOut ? 'animate-fly-out' : 'animate-pack-in-from-bottom'
                    )}
                    style={heart.style}
                >
                    <div className="relative w-full h-full flex items-center justify-center p-1">
                        <HeartIcon className="w-full h-full text-primary/70" />
                        <span 
                            className="absolute text-white/90 font-headline text-center drop-shadow-md select-none text-[clamp(6px,1.5vw,14px)]"
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
