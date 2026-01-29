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
  finalStyle: React.CSSProperties;
  nickname: string;
}

export function FloatingHearts({ onTransitionEnd }: FloatingHeartsProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const nicknames = useMemo(() => ["Sweetu", "Cutu", "Jaan", "Bhavika", "Bhavi", "Bhavu", "Bhavya"], []);
  const [hearts, setHearts] = useState<Heart[]>([]);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);

  const numHearts = 80;

  useEffect(() => {
    const newHearts: Heart[] = [];
    const positions = new Set<string>();

    for (let i = 0; i < numHearts; i++) {
      const nickname = nicknames[i % nicknames.length];
      
      const fromSide = Math.random();
      let transform;
      if (fromSide < 0.33) {
        transform = 'translateY(110vh)';
      } else if (fromSide < 0.66) {
        transform = 'translateX(-110vw)';
      } else {
        transform = 'translateX(110vw)';
      }

      let finalLeft, finalTop;
      let key;
      let attempts = 0;
      do {
        finalLeft = 5 + Math.random() * 80;
        finalTop = 5 + Math.random() * 80;
        key = `${Math.floor(finalLeft / 8)}_${Math.floor(finalTop / 8)}`;
        attempts++;
      } while (positions.has(key) && attempts < 20);
      positions.add(key);

      newHearts.push({
        id: i,
        nickname,
        style: {
          top: `${finalTop}vh`,
          left: `${finalLeft}vw`,
          transform,
          transitionProperty: 'transform',
          transitionTimingFunction: 'ease-out',
          transitionDelay: `${500 + Math.random() * 1500}ms`,
          transitionDuration: `${1500 + Math.random() * 1000}ms`,
        },
        finalStyle: {
            transform: 'translate(0, 0) scale(1)',
        }
      });
    }
    setHearts(newHearts);
    
    const t = setTimeout(() => setIsAnimatingIn(true), 100);
    return () => clearTimeout(t);
  }, [nicknames]);

  useEffect(() => {
    const fillTime = 3500;
    const holdTime = 2500;

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onTransitionEnd, 2000);
    }, fillTime + holdTime);

    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-background to-primary overflow-hidden"
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-accent to-primary transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0'}`}></div>
      
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className={cn(
            "absolute",
            isFadingOut ? 'animate-fly-out' : ''
          )}
          style={isAnimatingIn ? { ...heart.style, ...heart.finalStyle } : heart.style}
        >
          <div className="relative w-24 h-24 flex items-center justify-center">
            <HeartIcon className="w-full h-full text-primary/70" />
            <span className="absolute text-white/90 font-headline text-center drop-shadow-md select-none text-[clamp(8px,2vw,16px)]">
              {heart.nickname}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
