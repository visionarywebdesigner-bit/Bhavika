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

export type Stage = 'booting' | 'loaded' | 'transitioning' | 'welcome' | 'flashcards' | 'valentineProposal' | 'letter' | 'advent';

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

  const handleGoToLetter = useCallback(() => {
    setStage('letter');
  }, []);
  
  const handleProposalNo = () => {
    toast({
      variant: 'destructive',
      title: 'Error: Thats not possible haha',
      description: 'Click Yes.',
    });
  };

  const handleGoToAdvent = useCallback(() => {
    setStage('advent');
  }, []);


  return (
    <main className="relative w-full h-dvh overflow-hidden bg-background">
      <div className={cn("absolute inset-0 transition-opacity duration-1000", (stage === 'valentineProposal' || stage === 'letter' || stage === 'advent') ? 'opacity-0 pointer-events-none' : 'opacity-100')}>
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
      
      {stage === 'valentineProposal' && <ValentineProposalScreen onYes={handleGoToLetter} onNo={handleProposalNo} />}
      {stage === 'letter' && <LetterScreen onNext={handleGoToAdvent} />}
      {stage === 'advent' && <AdventCalendarScreen initializeAudio={initializeAudio} />}
    </main>
  );
}
