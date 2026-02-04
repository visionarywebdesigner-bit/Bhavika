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
      <Card className="w-full max-w-md animate-letter-slide-up shadow-2xl bg-card/90 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <p className="font-headline text-3xl text-primary mb-6">Dear Bhavika,</p>
          <p className="font-body text-lg text-foreground/90 mb-8">
            Words can't fully express how much you mean to me. You've brought so much light and happiness into my life.
          </p>
          <p className="font-headline text-2xl text-foreground">
            Only Your,
            <br />
            Shree
          </p>
        </CardContent>
      </Card>
      <div className="absolute bottom-10 right-10 z-10 animate-fade-in animation-delay-2000">
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
          "text-5xl md:text-6xl font-headline text-primary-foreground mb-16 drop-shadow-lg transition-opacity duration-700",
          letterState === 'revealing' && 'opacity-0'
        )}
      >
        You mean Alot to me......
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
