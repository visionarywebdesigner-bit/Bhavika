"use client";

import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './HeartIcon';
import { FlowerIcon } from './FlowerIcon';
import { Card, CardContent } from '../ui/card';

type EnvelopeState = 'closed' | 'shaking' | 'opening' | 'open';

const Envelope = ({ state, onClick }: { state: EnvelopeState, onClick: () => void }) => {
    const [isShaking, setIsShaking] = useState(false);

    useEffect(() => {
        if (state === 'shaking') {
            setIsShaking(true);
            const timer = setTimeout(() => setIsShaking(false), 500);
            return () => clearTimeout(timer);
        }
    }, [state]);

    return (
        <div
            className={cn(
                "relative w-[300px] h-[200px] cursor-pointer transition-opacity duration-1000",
                isShaking && 'animate-shake',
                (state === 'opening' || state === 'open') ? 'opacity-0' : 'opacity-100'
            )}
            onClick={onClick}
        >
            {/* Envelope Body */}
            <div className="absolute w-full h-full bg-secondary rounded-md shadow-lg">
                {/* Visual top part of the envelope back */}
                <div className="absolute top-0 left-0 w-full h-1/2 bg-accent" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
            </div>

            {/* Top Flap */}
            <div className="absolute top-0 left-0 w-full h-1/2">
                <div className="absolute inset-0 bg-primary/80" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
            </div>

            {/* Seal */}
            <HeartIcon className="absolute top-[calc(50%-20px)] left-1/2 -translate-x-1/2 w-8 h-8 text-primary z-10" />
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
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-50">
        {particles.map(p => (
          <p.Icon
            key={p.id}
            className={cn("absolute animate-particle-burst", p.color)}
            style={{
              left: p.left,
              animationDelay: p.delay,
              animationDuration: p.duration,
              '--transform-end': `translate(${(Math.random() - 0.5) * 400}px, -${p.distance}) rotate(${p.angle}) scale(${0.5 + Math.random() * 0.5})`,
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
  const [showParticles, setShowParticles] = useState(false);


  const handleEnvelopeClick = () => {
    if (envelopeState === 'closed') {
      setEnvelopeState('shaking');
      setTimeout(() => {
        setEnvelopeState('opening');
        setShowParticles(true);
        setTimeout(() => {
          setShowLetter(true);
        }, 500); // letter appears a bit after particles
      }, 500); // Corresponds to shake animation duration
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary/50 animate-fade-in">
        <h1 className={cn(
            "text-4xl md:text-5xl font-headline text-primary-foreground mb-12 drop-shadow-md transition-opacity duration-1000",
            (envelopeState !== 'closed') && 'opacity-0'
        )}>
            You mean Alot to me......
        </h1>
        
        <div className="flex items-center justify-center">
            <Envelope state={envelopeState} onClick={handleEnvelopeClick} />
        </div>

        {showParticles && <Particles />}
        {showLetter && <Letter />}
    </div>
  );
}
