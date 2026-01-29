"use client";

import { generatePersonalizedWelcomeMessage } from '@/ai/flows/personalized-welcome-message';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '../ui/skeleton';
import { useEffect, useState } from 'react';

interface WelcomeScreenProps {
  name: string;
}

export function WelcomeScreen({ name }: WelcomeScreenProps) {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function getMessage() {
      setIsLoading(true);
      try {
        const result = await generatePersonalizedWelcomeMessage({
          userName: name,
          sentiment: 'romantic',
          length: 'short',
        });
        setMessage(result.welcomeMessage);
      } catch (error) {
        console.error('Failed to generate welcome message', error);
        setMessage('You are my everything.'); // Fallback message
        toast({
          variant: 'destructive',
          title: 'Message generation failed',
          description: 'Showing a default message.',
        });
      } finally {
        setIsLoading(false);
      }
    }
    getMessage();
  }, [name, toast]);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline text-primary-foreground mb-4 drop-shadow-md animate-fade-in-up">
          To my dearest, {name}
        </h1>
        <div className="h-8">
        {isLoading ? (
          <Skeleton className="h-6 w-64 mx-auto bg-primary/20" />
        ) : (
          <p className="text-lg md:text-2xl font-body text-foreground animate-fade-in-up animation-delay-300">
            {message}
          </p>
        )}
        </div>
      </div>
    </div>
  );
}
