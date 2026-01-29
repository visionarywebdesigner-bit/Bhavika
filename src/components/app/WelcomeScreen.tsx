"use client";

interface WelcomeScreenProps {
  name: string;
}

export function WelcomeScreen({ name }: WelcomeScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary animate-fade-in">
      <div className="text-center">
        <h1 className="text-4xl md:text-6xl font-headline text-primary-foreground mb-4 drop-shadow-md animate-fade-in-up">
          To my Sweetu, {name}
        </h1>
        <p className="text-lg md:text-2xl font-body text-primary-foreground/90 animate-fade-in-up animation-delay-300">
          to my world, to the one who took my heart
        </p>
      </div>
    </div>
  );
}
