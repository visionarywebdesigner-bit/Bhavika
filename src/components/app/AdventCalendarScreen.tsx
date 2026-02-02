"use client";

import { HeartIcon } from "./HeartIcon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import * as Tone from 'tone';

// Positions are percentages for top and left
const dates = [
    { day: 7, pos: { top: '30%', left: '20%' } },
    { day: 8, pos: { top: '22%', left: '50%' } },
    { day: 9, pos: { top: '30%', left: '80%' } },
    { day: 10, pos: { top: '50%', left: '20%' } },
    { day: 11, pos: { top: '45%', left: '50%' } },
    { day: 12, pos: { top: '50%', left: '80%' } },
    { day: 13, pos: { top: '70%', left: '35%' } },
    { day: 14, pos: { top: '68%', left: '65%' } },
];

const Banner = ({ children, className }: { children: React.ReactNode, className?: string }) => (
    <div className={cn("relative inline-block bg-primary text-primary-foreground font-headline text-2xl md:text-3xl shadow-lg rounded-md py-1 px-6", className)}>
        <div className="absolute top-1/2 -left-2 -translate-y-1/2 w-4 h-10 bg-primary/90 rounded-l-sm" style={{clipPath: 'polygon(100% 0, 0 50%, 100% 100%)'}} />
        <div className="absolute top-1/2 -right-2 -translate-y-1/2 w-4 h-10 bg-primary/90 rounded-r-sm" style={{clipPath: 'polygon(0 0, 100% 50%, 0 100%)'}} />
        <span className="relative z-10">{children}</span>
    </div>
);

const CupidIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
        <path d="M14 6C14 4.89543 13.1046 4 12 4C10.8954 4 10 4.89543 10 6C10 7.10457 10.8954 8 12 8C13.1046 8 14 7.10457 14 6Z" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M12.5836 10.1931C13.3165 10.0651 14.0049 9.63733 14.5 9C15.5 8.5 16.5 9.5 17 10.5C17.5 11.5 16.5 13.5 15 13.5C14.1913 13.5 13.4687 13.1537 12.9224 12.6032" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M11.4164 10.1931C10.6835 10.0651 9.9951 9.63733 9.5 9C8.5 8.5 7.5 9.5 7 10.5C6.5 11.5 7.5 13.5 9 13.5C9.80869 13.5 10.5313 13.1537 11.0776 12.6032" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M12 12V20M12 20L10 18M12 20L14 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.41357 11.4343L2.99936 10.0201" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M19.5859 11.4343L21.0001 10.0201" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9.41406 4.41089L8 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
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
        <div className="relative w-full max-w-xl text-center">

            <div className="mb-4">
                <Banner>Valentine's Week</Banner>
                <CupidIcon className="w-8 h-8 mx-auto mt-2 text-primary/80" />
            </div>

            <div className="relative w-[90vmin] h-[90vmin] max-w-xl max-h-xl mx-auto">
                <HeartIcon className="absolute inset-0 w-full h-full text-primary/30 drop-shadow-xl" />
                {dates.map(({ day, pos }) => (
                <Button
                    key={day}
                    onClick={() => handleDayClick(day)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 w-[18%] h-[18%] rounded-lg text-3xl font-bold font-headline shadow-lg bg-secondary/80 hover:bg-secondary border-2 border-primary/40"
                    style={{ top: pos.top, left: pos.left }}
                >
                    {day}
                </Button>
                ))}
            </div>

            <div className="mt-4">
                <Banner>Be Mine</Banner>
            </div>
        </div>
    </div>
  );
}
