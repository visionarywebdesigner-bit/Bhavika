"use client";

import { useState, useCallback } from 'react';
import { BootScreen } from '@/components/app/BootScreen';
import * as Tone from 'tone';
import { useRouter } from 'next/navigation';

export type Stage = 'booting' | 'loaded';

export default function Home() {
  const [stage, setStage] = useState<Stage>('booting');
  const [isAudioReady, setIsAudioReady] = useState(false);
  const router = useRouter();

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
    await initializeAudio();
    router.push('/hearts');
  }, [initializeAudio, router]);

  return (
    <main className="relative w-full h-dvh overflow-hidden bg-background">
      <BootScreen
        stage={stage}
        onLoadingComplete={handleLoadingComplete}
        onHeartClick={handleHeartClick}
        initializeAudio={initializeAudio}
        isAudioReady={isAudioReady}
      />
    </main>
  );
}
