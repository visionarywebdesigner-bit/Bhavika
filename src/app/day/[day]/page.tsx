'use client';

import { valentinesData } from '@/lib/valentines-data';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function DayLetterPage({ params }: { params: { day: string } }) {
  const dayNumber = parseInt(params.day, 10);
  const dayContent = valentinesData.find(d => d.day === dayNumber);

  if (!dayContent) {
    notFound();
  }

  const isFirstDay = dayNumber === 7;
  const isLastDay = dayNumber === 14;

  return (
    <main className="min-h-screen bg-gradient-to-b from-primary/10 to-accent p-4 sm:p-8 flex flex-col animate-fade-in">
      <div className="flex-none w-full max-w-5xl mx-auto">
        <Link href="/advent">
          <Button variant="ghost">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Calendar
          </Button>
        </Link>
      </div>
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-5xl bg-card/80 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 grid md:grid-cols-2 gap-8 items-center">
          <div className="text-foreground/90 max-h-[60vh] overflow-y-auto pr-4">
            <h1 className="text-primary font-headline text-4xl md:text-5xl mb-6">{dayContent.title}</h1>
            <p className="whitespace-pre-line text-base md:text-lg leading-relaxed">{dayContent.letter}</p>
          </div>
          <div className="relative aspect-square md:aspect-[3/4] rounded-xl overflow-hidden shadow-lg">
            <Image
              src={dayContent.image.imageUrl}
              alt={dayContent.image.description}
              fill
              className="object-cover"
              data-ai-hint={dayContent.image.imageHint}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
      <div className="flex-none mt-8 flex justify-between w-full max-w-5xl mx-auto">
        {!isFirstDay ? (
          <Link href={`/day/${dayNumber - 1}`}>
            <Button variant="outline" size="lg">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Previous Day
            </Button>
          </Link>
        ) : <div />}
        {!isLastDay ? (
          <Link href={`/day/${dayNumber + 1}`}>
            <Button size="lg">
              Next Day
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        ) : <div />}
      </div>
    </main>
  );
}
