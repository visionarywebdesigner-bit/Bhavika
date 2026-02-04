'use client';
import { AdventCalendarScreen } from "@/components/app/AdventCalendarScreen";
import { useState, useCallback } from "react";
import * as Tone from 'tone';

export default function AdventPage() {
    const [isAudioReady, setIsAudioReady] = useState(false);
    
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

    return <AdventCalendarScreen initializeAudio={initializeAudio} />;
}
