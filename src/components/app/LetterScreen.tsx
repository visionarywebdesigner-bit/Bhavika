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

const OpenEnvelope = ({ state, onClick }: { state: LetterState; onClick: () => void }) => {
  const letterRevealed = state === 'revealing';
  return (
    <div
      className={cn(
        "relative w-[300px] sm:w-[350px] h-[200px] sm:h-[233px] cursor-pointer transition-all duration-700",
        "hover:scale-105",
        letterRevealed && 'opacity-0 -translate-y-8'
      )}
      onClick={onClick}
    >
      {/* Letter peeking out */}
      <div
        className={cn(
          "absolute top-0 left-[2.5%] w-[95%] h-full bg-card rounded-t-lg shadow-md z-10 transition-transform duration-700 ease-out",
          letterRevealed ? '-translate-y-[100%]' : 'translate-y-[5%]'
        )}
      >
        <div className="flex w-full justify-center pt-4">
          <HeartIcon
            className={cn(
              "w-12 h-12 text-primary transition-opacity duration-300",
              letterRevealed && 'opacity-0'
            )}
          />
        </div>
      </div>

      {/* Back of envelope (the main rectangle) */}
      <div className="absolute inset-0 bg-primary/90 rounded-lg shadow-lg"></div>

      {/* Top flap (tucked behind) */}
      <div
        className="absolute top-0 left-0 w-full h-1/2 bg-rose-400"
        style={{
          clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
          zIndex: 0,
          transform: 'translateY(-1px)',
        }}
      ></div>

      {/* Envelope Front (made of 3 triangles) */}
      <div className="absolute inset-0 z-20">
        {/* Left Flap */}
        <div
          className="absolute top-0 left-0 w-1/2 h-full bg-primary/80"
          style={{ clipPath: 'polygon(0 0, 100% 50%, 0 100%)' }}
        ></div>
        {/* Right Flap */}
        <div
          className="absolute top-0 right-0 w-1/2 h-full bg-primary/80"
          style={{ clipPath: 'polygon(100% 0, 0 50%, 100% 100%)' }}
        ></div>
        {/* Bottom Flap */}
        <div
          className="absolute bottom-0 left-0 w-full h-1/2 bg-primary"
          style={{ clipPath: 'polygon(0 100%, 100% 100%, 50% 0)' }}
        ></div>
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
      }, 700); // Time for letter to slide out
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary/50 animate-fade-in">
      <h1
        className={cn(
          "text-5xl md:text-6xl font-headline text-primary-foreground mb-16 drop-shadow-lg transition-opacity duration-700",
          letterState === 'revealing' && 'opacity-0'
        )}
      >
        You mean Alot to me......
      </h1>

      {!showFullLetter && (
        <div className="flex items-center justify-center">
          <OpenEnvelope state={letterState} onClick={handleEnvelopeClick} />
        </div>
      )}

      {showFullLetter && <Letter onNext={onNext} />}
    </div>
  );
}
