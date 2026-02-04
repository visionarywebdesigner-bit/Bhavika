'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartIcon } from '@/components/app/HeartIcon';
import { ArrowLeft, Heart, Gift, Star, Music, Key, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';
import { FlowerIcon } from '@/components/app/FlowerIcon';
import { KissIcon } from '@/components/app/KissIcon';

export default function DayPage({ params }: { params: { day: string } }) {
  const router = useRouter();

  const dayDetails: {[key: string]: { title: string, message: string, icon: React.ElementType, color: string }} = {
    '7': { title: "Rose Day", message: "Exchanging roses as a symbol of affection. 🌹", icon: FlowerIcon, color: 'text-pink-400' },
    '8': { title: "Propose Day", message: "A day to express feelings and make proposals. 💍", icon: Gift, color: 'text-red-400' },
    '9': { title: "Chocolate Day", message: "Sharing chocolates as tokens of love. 🍫", icon: Heart, color: 'text-rose-400' },
    '10': { title: "Teddy Day", message: "Gifting soft toys to partners. 🧸", icon: Star, color: 'text-pink-400' },
    '11': { title: "Promise Day", message: "Strengthening bonds through commitments. 🤞", icon: Music, color: 'text-red-400' },
    '12': { title: "Hug Day", message: "Offering comfort and affection. 🤗", icon: Key, color: 'text-rose-400' },
    '13': { title: "Kiss Day", message: "Expressing intimacy. 💋", icon: KissIcon, color: 'text-pink-400' },
    '14': { title: "Valentine's Day", message: "The main day of celebration. ❤️", icon: Trophy, color: 'text-red-400' },
  };
  
  const detail = dayDetails[params.day] || { title: "A Special Day", message: "A special surprise just for you.", icon: Heart, color: 'text-primary' };
  const Icon = detail.icon;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-accent p-8 overflow-hidden">
        {/* Background decorations */}
        <HeartIcon className="absolute -top-12 -left-12 w-32 h-32 text-primary/10 -rotate-45 opacity-50" />
        <Star className="absolute top-20 right-10 w-16 h-16 text-primary/10 rotate-12 opacity-50" />
        <Gift className="absolute bottom-10 left-10 w-20 h-20 text-primary/10 opacity-50" />
        <HeartIcon className="absolute -bottom-12 -right-12 w-40 h-40 text-primary/10 rotate-45 opacity-50" />


      <div className="animate-fade-in-up">
        <div className="absolute top-8 left-8 z-20">
          <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
              <ArrowLeft className="h-6 w-6 text-primary" />
          </Button>
        </div>
        <Card className="w-full max-w-xl text-center shadow-2xl bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/10 hover:shadow-primary/20 transition-shadow duration-300">
          <CardContent className="p-8 md:p-12">
            <div className="flex justify-center items-center gap-4 mb-6">
                <Icon className={cn("w-16 h-16", detail.color)} />
                <div className="text-center">
                    <h1 className="font-headline text-5xl md:text-6xl text-primary">
                        Day {params.day}
                    </h1>
                    <h2 className="font-body text-2xl md:text-3xl text-foreground/80 mt-2">{detail.title}</h2>
                </div>
                <Icon className={cn("w-16 h-16", detail.color)} />
            </div>

            <div className="min-h-[150px] flex items-center justify-center">
                <p className="font-body text-2xl md:text-3xl text-foreground/90 leading-relaxed">
                {detail.message}
                </p>
            </div>
            
            <HeartIcon className="w-20 h-20 text-primary mx-auto mt-8 animate-beat drop-shadow-lg" />

          </CardContent>
        </Card>
      </div>
    </main>
  );
}
