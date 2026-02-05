"use client";

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Handshake, HeartHandshake } from 'lucide-react';
import { cn } from '@/lib/utils';
import * as Tone from 'tone';
import { RoseIcon } from './RoseIcon';
import { KissIcon } from './KissIcon';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { RingIcon } from './RingIcon';
import { ChocolateIcon } from './ChocolateIcon';
import { TeddyBearIcon } from './TeddyBearIcon';
import { HugIcon } from './HugIcon';

const days = [
  { day: 7, title: "Rose Day", icon: RoseIcon, color: 'text-pink-400' },
  { day: 8, title: "Propose Day", icon: RingIcon, color: 'text-red-400' },
  { day: 9, title: "Chocolate Day", icon: ChocolateIcon, color: 'text-rose-400' },
  { day: 10, title: "Teddy Day", icon: TeddyBearIcon, color: 'text-pink-400' },
  { day: 11, title: "Promise Day", icon: Handshake, color: 'text-red-400' },
  { day: 12, title: "Hug Day", icon: HugIcon, color: 'text-rose-400' },
  { day: 13, title: "Kiss Day", icon: KissIcon, color: 'text-pink-400' },
  { day: 14, title: "Valentine's Day", icon: HeartHandshake, color: 'text-red-400' },
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

const cornerImage1 = PlaceHolderImages.find(p => p.id === 'advent-corner-1');
const cornerImage2 = PlaceHolderImages.find(p => p.id === 'advent-corner-2');
const cornerImage3 = PlaceHolderImages.find(p => p.id === 'advent-corner-3');
const cornerImage4 = PlaceHolderImages.find(p => p.id === 'advent-corner-4');

export function AdventCalendarScreen({ initializeAudio }: AdventCalendarScreenProps) {
  
  const handleDayClick = async () => {
    if (await initializeAudio()) {
       const synth = new Tone.PluckSynth().toDestination();
       synth.triggerAttack("C4", Tone.now());
       synth.volume.value = -6;
    }
  }

  const getDayOrdinal = (day: number) => {
    const s = ["th", "st", "nd", "rd"];
    const v = day % 100;
    return day + (s[(v - 20) % 10] || s[v] || s[0]);
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/20 to-accent/90 animate-fade-in overflow-hidden">
        {cornerImage1 && (
            <div className="absolute top-4 left-4 w-24 h-24 sm:w-32 sm:h-32 transform -rotate-12 opacity-70">
                <Image src={cornerImage1.imageUrl} alt={cornerImage1.description} fill className="object-cover rounded-2xl shadow-lg" sizes="128px" />
            </div>
        )}
        {cornerImage2 && (
            <div className="absolute top-4 right-4 w-24 h-24 sm:w-32 sm:h-32 transform rotate-12 opacity-70">
                <Image src={cornerImage2.imageUrl} alt={cornerImage2.description} fill className="object-cover rounded-2xl shadow-lg" sizes="128px" />
            </div>
        )}
        {cornerImage3 && (
            <div className="absolute bottom-4 left-4 w-24 h-24 sm:w-32 sm:h-32 transform rotate-12 opacity-70">
                <Image src={cornerImage3.imageUrl} alt={cornerImage3.description} fill className="object-cover rounded-2xl shadow-lg" sizes="128px" />
            </div>
        )}
        {cornerImage4 && (
            <div className="absolute bottom-4 right-4 w-24 h-24 sm:w-32 sm:h-32 transform -rotate-12 opacity-70">
                <Image src={cornerImage4.imageUrl} alt={cornerImage4.description} fill className="object-cover rounded-2xl shadow-lg" sizes="128px" />
            </div>
        )}

      <div className="text-center space-y-8 relative z-10">
        <Banner>Happy Valentines Week</Banner>

        <div className="grid grid-cols-4 gap-4">
          {days.map(({ day, title, icon: Icon, color }) => (
            <Link href={`/day/${day}`} key={day}>
                <Card 
                    onClick={handleDayClick}
                    className="relative aspect-[3/4] w-28 sm:w-32 flex flex-col items-center justify-center bg-card/90 backdrop-blur-sm border-primary/40 hover:border-primary hover:bg-card transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer shadow-lg hover:shadow-2xl rounded-xl overflow-hidden"
                >
                    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/20 to-transparent"></div>
                    <CardContent className="relative flex flex-col items-center justify-center text-center p-2 z-10">
                        <span className="font-headline text-5xl text-primary drop-shadow-md group-hover:scale-110 transition-transform">
                            {getDayOrdinal(day)}
                        </span>
                        <p className="font-body text-xl font-bold text-primary/80 -mt-2">Feb</p>
                        <p className="font-body text-xs sm:text-sm font-bold text-foreground/90 mt-1 group-hover:text-foreground">
                          {title}
                        </p>
                        <Icon className={cn("w-8 h-8 mt-2 transition-colors group-hover:scale-125", color)} />
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
