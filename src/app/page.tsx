"use client";

import { useState, useEffect, useCallback } from 'react';
import { BootScreen } from '@/components/app/BootScreen';
import { FloatingHearts } from '@/components/app/FloatingHearts';
import { WelcomeScreen } from '@/components/app/WelcomeScreen';
import * as Tone from 'tone';
import { useToast } from '@/hooks/use-toast';
import { FlashcardsScreen } from '@/components/app/FlashcardsScreen';
import { LetterScreen } from '@/components/app/LetterScreen';
import { AdventCalendarScreen } from '@/components/app/AdventCalendarScreen';
import { cn } from '@/lib/utils';
import { ValentineProposalScreen } from '@/components/app/ValentineProposalScreen';

export type Stage = 'booting' | 'loaded' | 'transitioning' | 'welcome' | 'flashcards' | 'valentineProposal' | 'proposalAccepted' | 'letter' | 'advent';

export default function Home() {
  const [stage, setStage] = useState<Stage>('booting');
  const [name, setName] = useState('Bhavika');
  const [isAudioReady, setIsAudioReady] = useState(false);
  const { toast } = useToast();

  const initializeAudio = useCallback(async () => {
    if (isAudioReady) return true;
    try {
      if (Tone.context.state !== 'running') {
        await Tone.start();
      }
      setIsAudioReady(true);
      return true;
    } catch (e) {
      console.warn('Audio context could not be started by the browser.');
      return false;
    }
  }, [isAudioReady]);

  const handleLoadingComplete = useCallback(() => {
    setTimeout(() => setStage('loaded'), 500);
  }, []);

  const handleHeartClick = useCallback(async () => {
    const audioInitialized = await initializeAudio();
    if (audioInitialized) {
      const chimeSynth = new Tone.MetalSynth({
        frequency: 400,
        envelope: { attack: 0.001, decay: 0.4, release: 0.2 },
        harmonicity: 5.1,
        modulationIndex: 32,
        resonance: 4000,
        octaves: 1.5,
      }).toDestination();
      chimeSynth.volume.value = -10;
      chimeSynth.triggerAttackRelease('C5', '8n', Tone.now());
    }
    setStage('transitioning');
  }, [initializeAudio]);

  const handleTransitionEnd = useCallback(() => {
    setStage('welcome');
  }, []);

  useEffect(() => {
    if (stage === 'welcome') {
      const timer = setTimeout(() => {
        setStage('flashcards');
      }, 4000); // Wait 4 seconds before showing flashcards
      return () => clearTimeout(timer);
    }
  }, [stage]);

  const handleGoToValentineProposal = useCallback(() => {
    setStage('valentineProposal');
  }, []);

  const handleProposalAccepted = useCallback(() => {
    setStage('proposalAccepted');
  }, []);
  
  const handleProposalNo = () => {
    toast({
      variant: 'destructive',
      title: "Error: That's not possible",
      description: 'haha',
    });
  };

  const handleGoToAdvent = useCallback(() => {
    setStage('advent');
  }, []);

  useEffect(() => {
    if (stage === 'proposalAccepted') {
      const timer = setTimeout(() => {
        setStage('letter');
      }, 3000); // Show for 3 seconds
      return () => clearTimeout(timer);
    }
  }, [stage]);


  return (
    <main className="relative w-full h-dvh overflow-hidden bg-background">
      <div className={cn("absolute inset-0 transition-opacity duration-1000", (stage === 'valentineProposal' || stage === 'proposalAccepted' || stage === 'letter' || stage === 'advent') ? 'opacity-0 pointer-events-none' : 'opacity-100')}>
        <BootScreen
          stage={stage}
          onLoadingComplete={handleLoadingComplete}
          onHeartClick={handleHeartClick}
          initializeAudio={initializeAudio}
          isAudioReady={isAudioReady}
        />

        {stage === 'transitioning' && (
          <FloatingHearts onTransitionEnd={handleTransitionEnd} />
        )}
        
        {(stage === 'welcome' || stage === 'flashcards') && <WelcomeScreen name={name} stage={stage} />}

        {stage === 'flashcards' && <FlashcardsScreen onNext={handleGoToValentineProposal} />}
      </div>
      
      {stage === 'valentineProposal' && <ValentineProposalScreen onYes={handleProposalAccepted} onNo={handleProposalNo} />}
      
      {stage === 'proposalAccepted' && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
          <div className="text-center animate-fade-in-up">
              <p className="font-headline text-5xl md:text-7xl text-primary drop-shadow-lg">AWWWWW</p>
              <p className="font-body text-2xl md:text-3xl text-foreground mt-4">I LYSM!! ❤️</p>
          </div>
        </div>
      )}

      {stage === 'letter' && <LetterScreen onNext={handleGoToAdvent} />}
      {stage === 'advent' && <AdventCalendarScreen initializeAudio={initializeAudio} />}
    </main>
  );
}
