'use client';

import { valentinesData } from '@/lib/valentines-data';
import { notFound, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function DayLetterPage({ params }: { params: { day: string } }) {
  const dayNumber = parseInt(params.day, 10);
  const dayContent = valentinesData.find(d => d.day === dayNumber);
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Prevent direct access to future days
    const now = new Date();
    const today = now.getDate();
    const currentMonth = now.getMonth(); // February is 1
    
    let unlocked = false;

    // --- TESTING LOGIC ---
    if (dayNumber === 7) {
      unlocked = today >= 5 && currentMonth === 1;
    } else if (dayNumber === 8) {
      unlocked = today >= 5 && currentMonth === 1;
    } else if (dayNumber === 9) {
      unlocked = today >= 4 && currentMonth === 1;
    } else {
        if (currentMonth > 1) { // After February
          unlocked = true;
        } else if (currentMonth === 1) { // During February
          unlocked = today >= dayNumber;
        }
    }
    // --- END TESTING LOGIC ---

    if (!unlocked) {
      router.replace('/advent');
    } else {
      setIsReady(true);
    }
  }, [dayNumber, router]);

  useEffect(() => {
    // Prevent loading the script multiple times
    if (isReady && !document.querySelector('script[src="https://tenor.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://tenor.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, [isReady]);


  if (!dayContent) {
    notFound();
  }

  if (!isReady) {
    return (
      <main className="min-h-screen bg-gradient-to-b from-primary/10 to-accent flex items-center justify-center">
        <div className="text-foreground text-xl font-headline">Loading...</div>
      </main>
    );
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
            <h1 className="text-foreground font-headline text-4xl md:text-5xl mb-6">{dayContent.title}</h1>
            <p className="whitespace-pre-line text-base md:text-lg leading-relaxed">{dayContent.letter}</p>
          </div>
          <div className="flex justify-center items-center">
             <div
                className="tenor-gif-embed mx-auto my-4 rounded-md overflow-hidden"
                data-postid={dayContent.gif.postId}
                data-share-method="host"
                data-aspect-ratio={dayContent.gif.aspectRatio}
                data-width="100%"
            >
                <a href={dayContent.gif.url}>{dayContent.gif.title}</a>
            </div>
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
