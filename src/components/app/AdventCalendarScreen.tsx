"use client";

import { HeartIcon } from "./HeartIcon";
import { cn } from "@/lib/utils";
import * as Tone from 'tone';

// Positions are percentages for top and left
const dates = [
    { day: 7, pos: { top: '25%', left: '35%' } },
    { day: 8, pos: { top: '25%', left: '65%' } },
    { day: 9, pos: { top: '45%', left: '20%' } },
    { day: 10, pos: { top: '45%', left: '50%' } },
    { day: 11, pos: { top: '45%', left: '80%' } },
    { day: 12, pos: { top: '65%', left: '35%' } },
    { day: 13, pos: { top: '65%', left: '65%' } },
    { day: 14, pos: { top: '85%', left: '50%' } },
];

const Banner = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("relative inline-block bg-primary text-primary-foreground font-headline text-2xl md:text-3xl shadow-lg rounded-md py-1 px-6", className)}>
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-10 bg-primary/90 rounded-l-sm" style={{clipPath: 'polygon(100% 0, 0 50%, 100% 100%)'}} />
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-10 bg-primary/90 rounded-r-sm" style={{clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}} />
        <span className="relative z-10">{children}</span>
    </div>
);

interface AdventCalendarScreenProps {
  initializeAudio: () => Promise<boolean>;
}

export function AdventCalendarScreen({ initializeAudio }: AdventCalendarScreenProps) {
  const handleDayClick = async (day: number) => {
    if (await initializeAudio()) {
       const synth = new Tone.PluckSynth().toDestination();
       synth.triggerAttack("C4", Tone.now());
       synth.volume.value = -6;
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
        <div className="text-center">
            <div className="mb-8">
                <Banner>Happy Valentines</Banner>
            </div>

            <div className="relative w-[90vmin] h-[90vmin] max-w-xl max-h-xl mx-auto">
                <HeartIcon className="absolute inset-0 w-full h-full text-primary/20 drop-shadow-xl" />
                {dates.map(({ day, pos }) => (
                <button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-[22%] h-[22%] flex items-center justify-center text-primary-foreground font-bold font-headline text-3xl group transition-transform hover:scale-110"
                    style={{ top: pos.top, left: pos.left }}
                >
                    <HeartIcon className="absolute inset-0 w-full h-full text-primary/80 group-hover:text-primary transition-colors" />
                    <span className="relative drop-shadow-md">{day}</span>
                </button>
                ))}
            </div>
        </div>
    </div>
  );
}
