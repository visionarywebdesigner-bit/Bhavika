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
type HeartRow = Heart[];

export function FloatingHearts({ onTransitionEnd }: FloatingHeartsProps) {
  const [isFadingOut, setIsFadingOut] = useState(false);
  const nicknames = useMemo(() => ["Sweetu", "Cutu", "Jaan", "Bhavika", "Bhavi", "Bhavu", "Bhavya"], []);
  const [heartRows, setHeartRows] = useState<HeartRow[]>([]);

  const numRows = 12;
  const numCols = 10;

  useEffect(() => {
    const rows: HeartRow[] = [];
    let heartId = 0;
    for (let i = 0; i < numRows; i++) {
      const row: HeartRow = [];
      // Alternate between numCols and numCols-1 for a honeycomb effect
      const colsThisRow = i % 2 === 0 ? numCols : numCols + 1;
      for (let j = 0; j < colsThisRow; j++) {
        // Stagger animation from bottom to top, with a slight horizontal wave
        const animationDelay = `${(numRows - i - 1) * 100 + j * 30}ms`;
        const nickname = nicknames[heartId % nicknames.length];
        row.push({
          id: heartId,
          nickname,
          style: {
            animationDelay,
          },
        });
        heartId++;
      }
      rows.push(row);
    }
    setHeartRows(rows);
  }, [nicknames]);

  useEffect(() => {
    const fillTime = (numRows * 100) + 1000;
    const holdTime = 1500;

    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(onTransitionEnd, 2000);
    }, fillTime + holdTime);

    return () => clearTimeout(timer);
  }, [onTransitionEnd]);

  return (
    <div
      className="absolute inset-0 bg-gradient-to-b from-background to-primary"
    >
      <div className={`absolute inset-0 bg-gradient-to-b from-accent to-primary transition-opacity duration-1000 ${isFadingOut ? 'opacity-100' : 'opacity-0'}`}></div>
      
      <div className="absolute inset-0 flex flex-col justify-around overflow-hidden">
        {heartRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className="flex justify-center"
            // Apply a horizontal offset to every other row to create the staggered effect
            style={{
              marginLeft: rowIndex % 2 !== 0 ? `calc(-100vw / ${numCols * 2})` : '0',
            }}
          >
            {row.map((heart) => (
              <div
                key={heart.id}
                className={cn(
                  "relative flex items-center justify-center opacity-0",
                  isFadingOut ? 'animate-fly-out' : 'animate-pack-in-from-bottom'
                )}
                style={{
                  ...heart.style,
                  width: `calc(100vw / ${numCols})`, // Set width to fit numCols across the screen
                  flexShrink: 0,
                }}
              >
                <div className="relative w-full h-full aspect-square flex items-center justify-center p-1">
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
        ))}
      </div>
    </div>
  );
}
