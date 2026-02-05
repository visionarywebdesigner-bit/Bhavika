"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './HeartIcon';
import { Card, CardContent } from '../ui/card';

interface LetterScreenProps {
  onNext: () => void;
}

type LetterState = 'waiting' | 'revealing';

const Envelope = ({ onClick }: { onClick: () => void }) => {
  return (
    <div
      className="relative w-[300px] sm:w-[350px] h-[200px] sm:h-[233px] cursor-pointer transition-transform duration-300 hover:scale-105"
      onClick={onClick}
    >
      {/* Letter paper inside, peeking from the bottom */}
      <div className="absolute w-[98%] h-[99%] bg-card rounded-lg top-[0.5%] left-[1%]"></div>

      {/* Back of the envelope */}
      <div className="absolute w-full h-full bg-primary/80 rounded-lg shadow-lg"></div>

      {/* Front flaps */}
      <div
        className="absolute top-0 left-0 w-[50.5%] h-full bg-primary"
        style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
      ></div>
      <div
        className="absolute top-0 right-0 w-[50.5%] h-full bg-primary"
        style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
      ></div>
      <div
        className="absolute bottom-0 left-0 w-full h-[50.5%] bg-primary"
        style={{ clipPath: 'polygon(50% 0, 0 100%, 100% 100%)' }}
      ></div>
      
      {/* Top flap */}
      <div
        className="absolute top-0 left-0 w-full h-[50.5%] bg-card"
        style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
      ></div>
      
      {/* Heart */}
      <div className="absolute top-[22%] left-1/2 -translate-x-1/2">
        <HeartIcon className="w-10 h-10 text-primary" />
      </div>
    </div>
  );
};


const Letter = ({ onNext }: { onNext: () => void }) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg animate-letter-slide-up shadow-2xl bg-card/90 backdrop-blur-sm">
        <CardContent className="p-6 md:p-8 text-left max-h-[80vh] overflow-y-auto">
          <p className="font-headline text-3xl text-primary mb-6">Dear Bhavika,</p>
          <div className="font-body text-base text-foreground/90 space-y-4 mb-8">
            <p>
              I never thought I would love someone, Bhavika honestly, not until I truly fell for you. The same guy who was advising his friends in November about why they shouldn’t be dating ended up falling for you himself. But honestly, what could I even do? I never thought love would be on my side too.
            </p>
            <p>
              Those days in December are something I’ll always remember. And you’re right—I often don’t notice things, but that’s because I overthink even the smallest details, and in the process I miss the important things.
            </p>
            <p>
              You have changed my life so much, Bhavika. You brought light into what was honestly a dull life. I can’t explain how much you mean to me. It’s still hard for me to comprehend that you are with me, that I have you in my life.
            </p>
            <p>
              And Bhavika, I’m really sorry. For the past few days, I haven’t been responding well—my replies have been dry, and I know I’ve been annoying you and making you feel sad. Most of that time, I was working on this, but that’s not an excuse. I’m genuinely sorry for making you feel that way.
            </p>
            <p>
              Bhavika, I really, really love you a lot. You can say you love me more, but let’s be real—I do more, Bhavuu.
            </p>
          </div>
          <p className="font-headline text-2xl text-foreground text-right">
            Yours,
            <br />
            Shree
          </p>
        </CardContent>
      </Card>
      <div className="absolute bottom-10 right-10 z-10 animate-fade-in animation-delay-3000">
        <Button onClick={onNext}>Next --&gt;</Button>
      </div>
    </div>
  );
};

export function LetterScreen({ onNext }: LetterScreenProps) {
  const [letterState, setLetterState] = useState<LetterState>('waiting');
  const [showFullLetter, setShowFullLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (letterState === 'waiting') {
      setLetterState('revealing');
      setTimeout(() => {
        setShowFullLetter(true);
      }, 500); // Time for fade out
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/80 to-primary/50 animate-fade-in">
      <h1
        className={cn(
          "text-5xl md:text-6xl font-headline text-primary-foreground mb-16 drop-shadow-lg transition-opacity duration-700 text-center",
          letterState === 'revealing' && 'opacity-0'
        )}
      >
        You mean a lot to me...
      </h1>

      <div
        className={cn(
          "flex items-center justify-center transition-opacity duration-500",
          letterState === 'revealing' && 'opacity-0'
        )}
      >
        {!showFullLetter && <Envelope onClick={handleEnvelopeClick} />}
      </div>
      
      {showFullLetter && <Letter onNext={onNext} />}
    </div>
  );
}
