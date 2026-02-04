"use client";

import { useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "./HeartIcon";
import { KissIcon } from "./KissIcon";
import { RibbonIcon } from "./RibbonIcon";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";

interface FlashcardsScreenProps {
  onNext: () => void;
}

export function FlashcardsScreen({ onNext }: FlashcardsScreenProps) {
  const image1 = PlaceHolderImages.find(p => p.id === 'flashcard-image-1');
  const image2 = PlaceHolderImages.find(p => p.id === 'flashcard-image-2');

  const initialCards = useMemo(() => [
    {
      id: 1,
      text: "To the one who makes my world brighter, every single day. I love you more than words can say.",
      image: image1,
    },
    {
      id: 2,
      text: "You're my everything. My sun, my moon, and all my stars. You are my forever and always.",
      image: image2,
    },
    {
      id: 3,
      text: "I never knew what love was until I met you. Thank you for being with me, I just cant get enough of you nor Thank you enough for being mine",
    },
    {
      id: 4,
      text: "My heart beats for you, and only you. Always and forever.",
      widget: (
        <div className="absolute bottom-6 right-6 flex items-end gap-1">
          <HeartIcon className="w-6 h-6 text-primary/70 -rotate-12" />
          <HeartIcon className="w-8 h-8 text-primary/90 rotate-6" />
        </div>
      ),
    },
    {
      id: 5,
      text: "I\nLOVE\nYOUUU",
      isFinal: true,
    },
  ], [image1, image2]);

  const [cards, setCards] = useState(initialCards);
  const [isShuffling, setIsShuffling] = useState(false);
  const topCard = cards[0];

  const handleShuffle = () => {
    if (isShuffling || (topCard && topCard.isFinal)) {
      return;
    }
    setIsShuffling(true);
    setTimeout(() => {
      setCards(prevCards => {
        const newCards = [...prevCards];
        const cardToMove = newCards.shift();
        if (cardToMove) {
            newCards.push(cardToMove);
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
              index === 0 && topCard && !topCard.isFinal ? "cursor-pointer" : "pointer-events-none",
              isShuffling && index === 0 ? "animate-shuffle-card-out" : "",
              index > 2 ? "opacity-0" : "" // Only show top 3 cards
            )}
            style={{
              transform: `scale(${1 - index * 0.05}) translateY(${index * -15}px)`,
              zIndex: cards.length - index,
            }}
          >
            <CardContent className="relative flex flex-col justify-start text-center h-full p-4 overflow-hidden">
              {flashcard.isFinal ? (
                <div className="flex flex-col items-center justify-center h-full">
                  <RibbonIcon className="absolute top-4 right-4 w-10 h-10 text-primary/30 rotate-12" />
                  <KissIcon className="absolute top-4 left-4 w-10 h-10 text-primary/20 -rotate-12" />
                  <KissIcon className="absolute top-12 right-4 w-8 h-8 text-primary/10 rotate-12" />
                  <KissIcon className="absolute bottom-20 left-6 w-6 h-6 text-primary/30 rotate-45" />
                  <KissIcon className="absolute bottom-4 right-12 w-12 h-12 text-primary/20 -rotate-45" />
                  <KissIcon className="absolute bottom-4 left-12 w-8 h-8 text-primary/10 rotate-12" />
                  <div className="flex flex-col items-center justify-center gap-4">
                    <p className="font-headline text-5xl md:text-6xl text-foreground whitespace-pre-line leading-tight">
                      {flashcard.text}
                    </p>
                    <HeartIcon className="w-16 h-16 text-primary drop-shadow-lg" />
                  </div>
                </div>
              ) : (
                <>
                  {flashcard.image && (
                    <div className="relative w-full aspect-[4/3] mb-4 rounded-lg overflow-hidden shadow-md">
                      <Image
                        src={flashcard.image.imageUrl}
                        alt={flashcard.image.description}
                        fill
                        className="object-cover"
                        data-ai-hint={flashcard.image.imageHint}
                        sizes="(max-width: 640px) 80vw, 320px"
                      />
                    </div>
                  )}
                  <p className="font-headline text-2xl text-foreground mt-auto">
                    {flashcard.text}
                  </p>
                  {flashcard.widget}
                </>
              )}
            </CardContent>
          </Card>
        ))}
         {topCard && topCard.isFinal && (
          <div className="absolute bottom-6 right-6 z-[100] animate-fade-in animation-delay-500">
            <Button onClick={onNext}>Next --&gt;</Button>
          </div>
        )}
      </div>
    </div>
  );
}
