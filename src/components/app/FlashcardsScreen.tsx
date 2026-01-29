"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function FlashcardsScreen() {
  const initialCards = useMemo(() => [
    {
      id: 1,
      text: "To the one who makes my world brighter, every single day. I love you more than words can say.",
    },
    {
      id: 2,
      text: "You're my everything. My sun, my moon, and all my stars. Happy Valentine's Day, my love.",
    },
    {
      id: 3,
      text: "I never knew what love was until I met you. Thank you for being you, and for being mine.",
    },
    {
      id: 4,
      text: "My heart beats for you, and only you. Always and forever.",
    },
  ], []);

  const [cards, setCards] = useState(initialCards);
  const [isShuffling, setIsShuffling] = useState(false);

  const handleShuffle = () => {
    if (isShuffling) return;
    setIsShuffling(true);
    setTimeout(() => {
      setCards(prevCards => {
        const newCards = [...prevCards];
        const topCard = newCards.shift();
        if (topCard) {
            newCards.push(topCard);
        }
        return newCards;
      });
      setIsShuffling(false);
    }, 500);
  };
  
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary animate-fade-in animation-delay-500">
      <div className="relative aspect-[3/4] w-full max-w-xs sm:max-w-sm">
        {cards.map((flashcard, index) => (
          <Card
            key={flashcard.id}
            onClick={index === 0 ? handleShuffle : undefined}
            className={cn(
              "absolute inset-0 w-full h-full shadow-lg transition-all duration-300 ease-in-out",
              index === 0 ? "cursor-pointer" : "pointer-events-none",
              isShuffling && index === 0 ? "animate-shuffle-card-out" : "",
              index > 2 ? "opacity-0" : "" // Only show top 3 cards
            )}
            style={{
              transform: `scale(${1 - index * 0.05}) translateY(${index * -15}px)`,
              zIndex: cards.length - index,
            }}
          >
            <CardContent className="flex flex-col items-center justify-center text-center h-full p-6 font-headline text-2xl text-foreground">
              <p>{flashcard.text}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
