"use client";

import type { Stage } from '@/app/page';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef, useCallback } from 'react';
import * as Tone from 'tone';
import { HeartIcon } from './HeartIcon';
import { BalloonIcon } from './BalloonIcon';

interface BootScreenProps {
  stage: Stage;
  onLoadingComplete: () => void;
  onHeartClick: () => void;
  initializeAudio: () => Promise<boolean>;
  isAudioReady: boolean;
}

function useHeartbeat(enabled: boolean) {
  const synth = useRef<Tone.MembraneSynth | null>(null);
  const loop = useRef<Tone.Loop | null>(null);
  const volumeFader = useRef<Tone.Volume | null>(null);

  useEffect(() => {
    if (!synth.current) {
      volumeFader.current = new Tone.Volume(-15).toDestination();
      synth.current = new Tone.MembraneSynth({
        pitchDecay: 0.01,
        octaves: 2,
        envelope: {
          attack: 0.001,
          decay: 0.3,
          sustain: 0.01,
          release: 0.2,
        },
      }).connect(volumeFader.current);
    }

    if (enabled && !loop.current && Tone.context.state === 'running') {
      Tone.Transport.start();
      loop.current = new Tone.Loop((time) => {
        synth.current?.triggerAttackRelease('C1', '8n', time);
        synth.current?.triggerAttackRelease('C1', '8n', time + 0.25);
      }, '0.8s').start(0); // Faster heartbeat
    } else if (!enabled && loop.current) {
      if (volumeFader.current) {
        volumeFader.current.volume.rampTo(-Infinity, 1);
      }
      setTimeout(() => {
        loop.current?.stop();
        Tone.Transport.stop();
        loop.current?.dispose();
        loop.current = null;
      }, 1000);
    }

    return () => {
      if (loop.current) {
        loop.current.stop(0);
        loop.current.dispose();
      }
      if (Tone.Transport.state === 'started') {
        Tone.Transport.stop(0);
        Tone.Transport.cancel(0);
      }
    };
  }, [enabled]);
}

export function BootScreen({
  stage,
  onLoadingComplete,
  onHeartClick,
  initializeAudio,
  isAudioReady,
}: BootScreenProps) {
  const [progress, setProgress] = useState(0);
  const show = stage === 'booting' || stage === 'loaded';

  const handleLoadingCompleteWithDelay = useCallback(() => {
    setTimeout(onLoadingComplete, 500);
  }, [onLoadingComplete]);

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  useHeartbeat((stage === 'booting' || stage === 'loaded') && isAudioReady);

  useEffect(() => {
    if (stage === 'booting') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            handleLoadingCompleteWithDelay();
            return 100;
          }
          return p + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [stage, handleLoadingCompleteWithDelay]);

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary/20 transition-opacity duration-1000 overflow-hidden',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      {/* Corner Hearts */}
      <HeartIcon className="absolute -top-8 -left-8 w-24 h-24 text-accent/50 opacity-50 -rotate-45" />
      <HeartIcon className="absolute -top-4 -right-10 w-24 h-24 text-accent/50 opacity-50 rotate-45" />
      <HeartIcon className="absolute -bottom-8 -left-4 w-20 h-20 text-accent/50 opacity-40 rotate-12" />
      <HeartIcon className="absolute -bottom-10 -right-6 w-24 h-24 text-accent/50 opacity-50 -rotate-12" />
      
      {/* Balloons */}
      <div className="absolute inset-0">
          <BalloonIcon className="w-24 h-24 absolute bottom-0 left-[10%] text-primary/40 animate-balloon-float animation-delay-1000" />
          <BalloonIcon className="w-32 h-32 absolute bottom-0 right-[15%] text-accent/80 animate-balloon-float animation-delay-3000" />
          <BalloonIcon className="w-20 h-20 absolute bottom-0 left-[30%] text-primary/60 animate-balloon-float animation-delay-5000" />
      </div>


      <div className="relative flex flex-col items-center justify-center z-10">
        <button
          onClick={stage === 'loaded' ? onHeartClick : undefined}
          aria-label="My Heart"
          disabled={stage !== 'loaded'}
          className={cn(
            'transition-all duration-500 transform-gpu',
            stage === 'loaded' ? 'cursor-pointer hover:scale-105' : ''
          )}
        >
          <HeartIcon
            className={cn(
              'w-32 h-32 md:w-40 md:h-40 text-primary drop-shadow-lg',
              stage !== 'transitioning' && 'animate-beat'
            )}
          />
        </button>

        {stage === 'booting' && (
          <div className="absolute top-full mt-8 flex items-center justify-center">
            <svg className="w-16 h-16 transform -rotate-90">
              <circle
                className="text-primary/20"
                strokeWidth="4"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
              />
              <circle
                className="text-primary"
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={
                  2 * Math.PI * 28 * (1 - progress / 100)
                }
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
              />
            </svg>
            <p className="absolute text-sm font-bold text-primary">{progress}%</p>
          </div>
        )}

        <div
          className={cn(
            'absolute top-full mt-8 text-center transition-opacity duration-1000 w-64',
            stage === 'loaded' ? 'opacity-100' : 'opacity-0'
          )}
        >
          <p className="font-headline text-3xl text-foreground animate-fade-in-up drop-shadow-sm">
            My heart only beats for you
          </p>
          <p className="mt-6 font-body text-lg text-foreground/80 animate-fade-in-up animation-delay-300">
            Tap my heart 💗
          </p>
        </div>
      </div>
    </div>
  );
}
