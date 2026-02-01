"use client";

import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './HeartIcon';
import { FlowerIcon } from './FlowerIcon';
import { Card, CardContent } from '../ui/card';

type EnvelopeState = 'closed' | 'partiallyOpen' | 'opening' | 'open';

const Envelope = ({ state, onClick }: { state: EnvelopeState, onClick: () => void }) => {
  return (
    <div className="relative w-[280px] h-[180px] cursor-pointer" onClick={onClick}>
      {/* Envelope Back */}
      <div className="absolute inset-0 bg-secondary rounded-lg shadow-lg"></div>

      {/* Flaps */}
      <div
        className={cn(
          "absolute top-0 left-0 right-0 h-1/2 bg-secondary rounded-t-lg transition-transform duration-1000 ease-in-out",
          "origin-bottom",
          state === 'partiallyOpen' && "transform -translate-y-1",
          (state === 'opening' || state === 'open') && "transform rotate-x-180"
        )}
        style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}
      >
        <div className="absolute inset-0 bg-accent rounded-t-lg" style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}></div>
      </div>
      
      {/* Seal */}
      <HeartIcon className={cn(
        "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 w-8 h-8 text-primary transition-opacity duration-500",
        state !== 'closed' && 'opacity-0'
      )} />
    </div>
  );
};

const Particles = () => {
    const particles = useMemo(() => Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 500}ms`,
      duration: `${1 + Math.random()}s`,
      angle: `${(Math.random() - 0.5) * 90}deg`,
      distance: `${50 + Math.random() * 50}vh`,
      Icon: Math.random() > 0.5 ? HeartIcon : FlowerIcon,
      color: `text-primary/${Math.random() > 0.5 ? '90' : '50'}`,
    })), []);
  
    return (
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {particles.map(p => (
          <p.Icon
            key={p.id}
            className={cn("absolute animate-particle-burst", p.color)}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--transform-end': `translate(${(Math.random() - 0.5) * 400}px, -${p.distance}) rotate(${p.angle}) scale(1)`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    );
  };


const Letter = () => {
    const handleNext = () => {
        // Next functionality to be implemented
    };

    return (
        <div className="absolute inset-0 flex items-center justify-center p-4">
            <Card className="w-full max-w-md animate-letter-slide-up shadow-2xl">
                <CardContent className="p-8 text-center">
                    <p className="font-headline text-3xl text-foreground mb-6">Dear Bhavika,</p>
                    <p className="font-body text-lg text-foreground/80 mb-8">
                        {/* Placeholder for the letter body */}
                        Words can't fully express how much you mean to me. You've brought so much light and happiness into my life.
                    </p>
                    <p className="font-headline text-2xl text-foreground">
                        Only Your,
                        <br />
                        Shree
                    </p>
                </CardContent>
            </Card>
             <div className="absolute bottom-10 right-10 z-10 animate-fade-in animation-delay-3000">
                <Button onClick={handleNext}>Next --&gt;</Button>
            </div>
        </div>
    )
}

export function LetterScreen() {
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>('closed');
  const [showLetter, setShowLetter] = useState(false);

  const handleEnvelopeClick = () => {
    if (envelopeState === 'closed') {
      setEnvelopeState('partiallyOpen');
    } else if (envelopeState === 'partiallyOpen') {
      setEnvelopeState('opening');
      setTimeout(() => {
        setShowLetter(true);
      }, 1000); // Let particles fly before letter appears
       setTimeout(() => {
        setEnvelopeState('open');
      }, 2000);
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary/50 animate-fade-in">
        <h1 className={cn(
            "text-4xl md:text-5xl font-headline text-primary-foreground mb-12 drop-shadow-md transition-opacity duration-1000",
            showLetter && 'opacity-0'
        )}>
            You mean Alot to me.
        </h1>
        
        <div className={cn("transition-opacity duration-1000", showLetter ? 'opacity-0' : 'opacity-100')}>
            <Envelope state={envelopeState} onClick={handleEnvelopeClick} />
        </div>

        {envelopeState === 'opening' && <Particles />}
        {showLetter && <Letter />}
    </div>
  );
}
