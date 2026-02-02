'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { HeartIcon } from '@/components/app/HeartIcon';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DayPage({ params }: { params: { day: string } }) {
  const router = useRouter();

  const messages: {[key: string]: string} = {
    '7': "My love for you grows stronger with every passing day. You are my today and all of my tomorrows.",
    '8': "You are the most precious gift I've ever received. Thank you for being you.",
    '9': "Sending you a letter sealed with a kiss and filled with all my love.",
    '10': "Like a star, you light up my darkest nights. I'm so lucky to have you.",
    '11': "You are the sweet melody to my heart's song. I could listen to it forever.",
    '12': "You hold the key to my heart, now and always. It's yours to keep.",
    '13': "You're more precious to me than all the diamonds in the world. My priceless love.",
    '14': "I feel like I've won the greatest prize of all: your love. Happy Valentine's Day, my darling!",
  };
  
  const message = messages[params.day] || "A special surprise just for you.";

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-accent p-8">
      <div className="animate-fade-in-up">
        <div className="absolute top-8 left-8">
          <Button variant="ghost" size="icon" onClick={() => router.back()} aria-label="Go back">
              <ArrowLeft className="h-6 w-6 text-primary" />
          </Button>
        </div>
        <Card className="w-full max-w-lg text-center shadow-2xl bg-card/80 backdrop-blur-sm rounded-2xl">
          <CardContent className="p-8 md:p-12">
            <HeartIcon className="w-20 h-20 text-primary mx-auto mb-6 animate-beat" />
            <h1 className="font-headline text-5xl md:text-6xl text-primary-foreground mb-4">
              Day {params.day}
            </h1>
            <p className="font-body text-xl md:text-2xl text-foreground/80 leading-relaxed">
              {message}
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
