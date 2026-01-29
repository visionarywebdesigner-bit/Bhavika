"use client";

import { useEffect, useMemo, useState } from 'react';
import { HeartIcon } from './HeartIcon';

interface FloatingHeartsProps {
  name: string;
  onTransitionEnd: () => void;
}

interface Heart {
  id: number;
  style: React.CSSProperties;
}

export function FloatingHearts({ name, onTransitionEnd }: FloatingHeartsProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);

  const hearts = useMemo(() => {
    const heartArray: Heart[] = [];
    for (let i = 0; i < 35; i++) {
      const size = Math.random() * 80 + 40; // 40px to 120px
      const duration = Math.random() * 5 + 8; // 8s to 13s
      const delay = Math.random() * 5; // 0s to 5s
      const sway = Math.random() * 100 - 50; // -50px to 50px
      heartArray.push({
        id: i,
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
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onTransitionEnd, 1000); // Wait for background fade before changing stage
    }, 10000); // Total duration of animation scene

    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-background to-primary animate-fade-in"
    >
        <div className={`absolute inset-0 bg-gradient-to-b from-accent to-primary transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className="absolute inset-0 overflow-hidden blur-[2px]">
            {hearts.map((heart) => (
                <div key={heart.id} className="absolute bottom-[-150px]" style={heart.style}>
                <div className="relative w-full h-full">
                    <HeartIcon className="w-full h-full text-primary/70" />
                    <span className="absolute inset-0 flex items-center justify-center font-headline text-sm md:text-base text-primary-foreground/80 rotate-[-15deg]">
                    {name}
                    </span>
                </div>
                </div>
            ))}
        </div>
    </div>
  );
}
