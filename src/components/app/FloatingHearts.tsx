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

  useEffect(() => {
    const newHearts: Heart[] = [];
    const rows = 10;
    const cols = 7;
    
    const vh_extra = 30;
    const vw_extra = 30;
    
    const v_increment = (100 + vh_extra) / rows;
    const h_increment = (100 + vw_extra) / cols;

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const i = r * cols + c;
        const nickname = nicknames[i % nicknames.length];
        
        const top = r * v_increment - vh_extra/2;
        const left = (c + (r % 2) * 0.5) * h_increment - vw_extra/2;

        const finalTop = top + (Math.random() - 0.5) * 5;
        const finalLeft = left + (Math.random() - 0.5) * 5;

        const scale = 1.3 + Math.random() * 0.4;
        const rotation = (Math.random() - 0.5) * 30;
        const delay = Math.random() * 1000;

        newHearts.push({
          id: i,
          nickname,
          style: {
            top: `${finalTop}vh`,
            left: `${finalLeft}vw`,
            transform: 'scale(0)',
            transitionProperty: 'transform',
            transitionTimingFunction: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
            transitionDelay: `${delay}ms`,
            transitionDuration: `1000ms`,
          },
          finalStyle: {
              transform: `scale(${scale}) rotate(${rotation}deg)`,
          }
        });
      }
    }
    
    setHearts(newHearts);
    
    const t = setTimeout(() => setIsAnimatingIn(true), 100);
    return () => clearTimeout(t);
  }, [nicknames]);

  useEffect(() => {
    const fillTime = 2000;
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
          <div className="relative w-40 h-40 flex items-center justify-center">
            <HeartIcon className="w-full h-full text-primary/90" />
            <span className="absolute text-white/90 font-headline text-center drop-shadow-md select-none text-[clamp(10px,2vw,18px)]">
              {heart.nickname}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
