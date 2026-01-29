"use client";

import type { Stage } from '@/app/page';
import { cn } from '@/lib/utils';
import { useEffect, useState, useRef } from 'react';
import * as Tone from 'tone';
import { HeartIcon } from './HeartIcon';

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
      }, '1.1s').start(0);
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

  useEffect(() => {
    initializeAudio();
  }, [initializeAudio]);

  useHeartbeat(stage === 'booting' && isAudioReady);

  useEffect(() => {
    if (stage === 'booting') {
      const interval = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) {
            clearInterval(interval);
            onLoadingComplete();
            return 100;
          }
          return p + 1;
        });
      }, 35);
      return () => clearInterval(interval);
    }
  }, [stage, onLoadingComplete]);

  return (
    <div
      className={cn(
        'absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-background to-primary transition-opacity duration-1000',
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
    >
      <div className="relative flex flex-col items-center justify-center">
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
              stage === 'booting' && 'animate-beat'
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
                className="text-accent/70"
                strokeWidth="4"
                strokeDasharray={2 * Math.PI * 28}
                strokeDashoffset={
                  2 * Math.PI * 28 * (1 - progress / 100)
                }
                strokeLinecap="round"
                stroke="url(#gradient)"
                fill="transparent"
                r="28"
                cx="32"
                cy="32"
              />
              <defs>
                <linearGradient id="gradient">
                  <stop offset="0%" stopColor="hsl(var(--primary))" />
                  <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        )}

        <div
          className={cn(
            'absolute top-full mt-8 text-center transition-opacity duration-1000',
            stage === 'loaded' ? 'opacity-100' : 'opacity-0'
          )}
        >
          <p className="font-headline text-xl text-primary-foreground animate-fade-in-up">
            My heart beats for only you
          </p>
          <p className="mt-4 font-body text-sm text-foreground/70 animate-fade-in-up animation-delay-300">
            Tap my heart 💗
          </p>
        </div>
      </div>
    </div>
  );
}
