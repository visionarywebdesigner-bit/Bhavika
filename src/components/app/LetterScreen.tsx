"use client";

import { useState, useMemo, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './HeartIcon';
import { FlowerIcon } from './FlowerIcon';
import { Card, CardContent } from '../ui/card';

type EnvelopeState = 'closed' | 'shaking' | 'partiallyOpen' | 'opening' | 'open';

const Envelope = ({ state, onClick }: { state: EnvelopeState, onClick: () => void }) => {
    const [isShaking, setIsShaking] = useState(false);
  
    useEffect(() => {
      if (state === 'shaking') {
        setIsShaking(true);
        const timer = setTimeout(() => setIsShaking(false), 500);
        return () => clearTimeout(timer);
      }
    }, [state]);

    const showLetterPeek = state === 'partiallyOpen' || state === 'opening' || state === 'open';

    return (
        <div
            className={cn(
                "relative w-[300px] h-[200px] cursor-pointer transition-all duration-700 ease-in-out",
                isShaking && 'animate-shake',
                state === 'opening' || state === 'open' ? 'opacity-0 scale-90' : 'opacity-100 scale-100'
            )}
            onClick={onClick}
            style={{ perspective: '1000px' }}
        >
            {/* Letter Peek */}
            <div className={cn(
                "absolute inset-x-2 top-0 h-[180px] bg-white rounded-t-md shadow-inner transition-transform duration-700 ease-in-out z-0",
                showLetterPeek ? 'transform -translate-y-28' : 'transform translate-y-2',
                "flex justify-center pt-2"
            )}>
                <p className="font-headline text-2xl text-foreground">Dear Bhavika,</p>
            </div>

            {/* Envelope Body */}
            <div className="absolute w-full h-full z-10">
                {/* Back part */}
                <div className="absolute w-full h-full bg-secondary rounded-md"></div>
                {/* Left flap */}
                <div className="absolute w-[152px] h-full" style={{ left: '0px', top: '0px', clipPath: 'polygon(0% 0%, 100% 50%, 0% 100%)', backgroundColor: 'hsl(var(--accent))' }}></div>
                {/* Right flap */}
                <div className="absolute w-[152px] h-full" style={{ right: '0px', top: '0px', clipPath: 'polygon(100% 0%, 0% 50%, 100% 100%)', backgroundColor: 'hsl(var(--accent))' }}></div>
                {/* Bottom flap */}
                <div className="absolute w-full h-[102px]" style={{ left: '0px', bottom: '0px', clipPath: 'polygon(0% 0%, 100% 0%, 50% 100%)', backgroundColor: 'hsl(var(--primary) / 0.5)' }}></div>

                {/* Top Flap (the one that opens) */}
                <div
                    className={cn(
                        "absolute top-0 left-0 w-full h-[102px] origin-bottom transition-transform duration-1000 ease-in-out z-20",
                        state === 'partiallyOpen' && "transform rotate-x-[45deg]",
                        (state === 'opening' || state === 'open') && "transform rotate-x-[-180deg]"
                    )}
                    style={{ transformStyle: 'preserve-3d', clipPath: 'polygon(0% 100%, 100% 100%, 50% 0%)' }}
                >
                    {/* Front of the flap */}
                    <div className="absolute inset-0 bg-primary/80"></div>
                    {/* Back of the flap (visible when open) */}
                    <div className="absolute inset-0 bg-primary/50" style={{ transform: 'rotateX(180deg)', backfaceVisibility: 'hidden' }}></div>
                </div>

                {/* Seal */}
                <HeartIcon className={cn(
                    "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[calc(50%_+_10px)] w-8 h-8 text-primary transition-opacity duration-500 z-30",
                    state !== 'closed' && 'opacity-0'
                )} />
            </div>
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

  const handleEnvelopeClick = () => {
    if (envelopeState === 'closed') {
      setEnvelopeState('shaking');
      setTimeout(() => {
        setEnvelopeState('partiallyOpen');
      }, 500); // Corresponds to shake animation duration
    } else if (envelopeState === 'partiallyOpen') {
      setEnvelopeState('opening');
      setTimeout(() => {
        setShowLetter(true);
      }, 500); // Show letter shortly after opening starts
      setTimeout(() => {
        setEnvelopeState('open');
      }, 1500); // Hide envelope after it has opened
    }
  };

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary/50 animate-fade-in">
        <h1 className={cn(
            "text-4xl md:text-5xl font-headline text-primary-foreground mb-12 drop-shadow-md transition-opacity duration-1000",
            (envelopeState !== 'closed') && 'opacity-0'
        )}>
            You mean Alot to me.
        </h1>
        
        <div className="flex items-center justify-center">
            <Envelope state={envelopeState} onClick={handleEnvelopeClick} />
        </div>

        {envelopeState === 'opening' && <Particles />}
        {showLetter && <Letter />}
    </div>
  );
}
