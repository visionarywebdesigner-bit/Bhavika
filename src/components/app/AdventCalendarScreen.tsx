"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Gift, Mail, Star, Music, Key, Diamond, Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as Tone from 'tone';

const days = [
  { day: 7, icon: Heart, color: 'text-pink-400' },
  { day: 8, icon: Gift, color: 'text-red-400' },
  { day: 9, icon: Mail, color: 'text-rose-400' },
  { day: 10, icon: Star, color: 'text-pink-400' },
  { day: 11, icon: Music, color: 'text-red-400' },
  { day: 12, icon: Key, color: 'text-rose-400' },
  { day: 13, icon: Diamond, color: 'text-pink-400' },
  { day: 14, icon: Trophy, color: 'text-red-400' },
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
  
  const handleDayClick = async () => {
    if (await initializeAudio()) {
       const synth = new Tone.PluckSynth().toDestination();
       synth.triggerAttack("C4", Tone.now());
       synth.volume.value = -6;
    }
  }

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
      <div className="text-center space-y-8">
        <Banner>A Countdown to Our Day</Banner>

        <div className="grid grid-cols-4 gap-4">
          {days.map(({ day, icon: Icon, color }) => (
            <Link href={`/day/${day}`} key={day}>
                <Card 
                    onClick={handleDayClick}
                    className="relative aspect-[3/4] w-28 sm:w-32 flex flex-col items-center justify-center bg-card/60 backdrop-blur-sm border-primary/20 hover:border-primary hover:bg-card transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer shadow-lg hover:shadow-2xl rounded-xl overflow-hidden"
                >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/30 to-transparent"></div>
                    <CardContent className="relative flex flex-col items-center justify-center p-0 z-10">
                        <span className="font-headline text-5xl text-primary-foreground drop-shadow-md group-hover:scale-110 transition-transform">
                            {day}
                        </span>
                        <Icon className={cn("w-6 h-6 mt-1 transition-colors group-hover:scale-125", color)} />
                    </CardContent>
                </Card>
            </Link>
          ))}
        </div>
        
        <Banner>Forever & Always</Banner>
      </div>
    </div>
  );
}
