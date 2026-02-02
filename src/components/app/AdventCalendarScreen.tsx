"use client";

import { HeartIcon } from "./HeartIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Positions are percentages for top and left
const dates = [
    { day: 7, pos: { top: '25%', left: '35%' } },
    { day: 8, pos: { top: '25%', left: '65%' } },
    { day: 9, pos: { top: '45%', left: '20%' } },
    { day: 10, pos: { top: '50%', left: '50%' } },
    { day: 11, pos: { top: '45%', left: '80%' } },
    { day: 12, pos: { top: '70%', left: '35%' } },
    { day: 13, pos: { top: '70%', left: '65%' } },
    { day: 14, pos: { top: '90%', left: '50%' } },
];

export function AdventCalendarScreen() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-headline text-primary mb-12 drop-shadow-md text-center">
        A Week of Love
      </h1>
      <div className="relative w-[90vw] h-[90vw] max-w-[500px] max-h-[500px]">
        <HeartIcon className="absolute inset-0 w-full h-full text-primary/20" />
        {dates.map(({ day, pos }) => (
          <Button
            key={day}
            className="absolute -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full text-xl font-bold font-headline shadow-lg"
            style={{ top: pos.top, left: pos.left }}
          >
            {day}
          </Button>
        ))}
      </div>
    </div>
  );
}
