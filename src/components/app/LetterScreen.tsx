"use client";

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { HeartIcon } from './HeartIcon';
import { Card, CardContent } from '../ui/card';

interface LetterScreenProps {
  onNext: () => void;
}

type EnvelopeState = 'closed' | 'shaking' | 'opening';

const Envelope = ({ state, onClick }: { state: EnvelopeState, onClick: () => void }) => {
    return (
        <div
            className={cn(
                "relative w-[300px] h-[200px] cursor-pointer transition-transform duration-500",
                state === 'shaking' && 'animate-shake'
            )}
            onClick={onClick}
        >
            {/* Back part of envelope */}
            <div className="absolute top-0 left-0 w-full h-full bg-secondary rounded-lg shadow-lg"></div>

            {/* Top Flap (part of the back that folds down) */}
            <div
                className={cn(
                    "absolute top-0 left-0 w-full h-1/2 bg-primary/80 transition-transform duration-1000",
                    state === 'opening' ? 'rotate-x-180' : ''
                )}
                style={{
                    clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                    transformOrigin: 'top',
                    transformStyle: 'preserve-3d',
                }}
            ></div>

            {/* Bottom part of envelope front */}
            <div className="absolute top-1/2 left-0 w-full h-1/2 bg-secondary" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)', transform: 'translateY(-1px)' }}></div>
            <div className="absolute top-0 left-0 w-full h-full bg-secondary" style={{ clipPath: 'polygon(0 0, 0 100%, 50% 50%)' }}></div>
            <div className="absolute top-0 right-0 w-full h-full bg-secondary" style={{ clipPath: 'polygon(100% 0, 100% 100%, 50% 50%)' }}></div>

            {/* Seal */}
            <HeartIcon className={cn("absolute top-[45%] left-1/2 -translate-x-1/2 w-8 h-8 text-primary z-10 transition-opacity", state === 'opening' && 'opacity-0')} />
        </div>
    );
};


const Letter = ({ onNext }: { onNext: () => void }) => {
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
                <Button onClick={onNext}>Next --&gt;</Button>
            </div>
        </div>
    )
}

export function LetterScreen({ onNext }: LetterScreenProps) {
  const [envelopeState, setEnvelopeState] = useState<EnvelopeState>('closed');
  const [showLetter, setShowLetter] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(true);

  const handleEnvelopeClick = () => {
    if (envelopeState === 'closed') {
      setEnvelopeState('shaking');
      setTimeout(() => {
        setEnvelopeState('opening');
        setTimeout(() => {
            setShowEnvelope(false);
            setShowLetter(true);
        }, 1000); // Wait for flap to open
      }, 500); // Shake duration
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
        
        {showEnvelope && (
            <div className="flex items-center justify-center">
                <Envelope state={envelopeState} onClick={handleEnvelopeClick} />
            </div>
        )}

        {showLetter && <Letter onNext={onNext} />}
    </div>
  );
}
