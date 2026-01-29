
"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export function FlashcardsScreen() {
  const flashcards = [
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
  ];

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-accent to-primary animate-fade-in animation-delay-500">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        className="w-full max-w-xs sm:max-w-sm"
      >
        <CarouselContent>
          {flashcards.map((flashcard, index) => (
            <CarouselItem key={flashcard.id}>
              <div className="p-8 group">
                 <div className="relative aspect-[3/4] w-full">
                    {/* Background cards for piled effect */}
                    <Card className="absolute inset-0 bg-card/50 transform -rotate-6 transition-transform duration-500 ease-in-out group-hover:rotate-[-8deg]" />
                    <Card className="absolute inset-0 bg-card/80 transform rotate-3 transition-transform duration-500 ease-in-out group-hover:rotate-[4deg]" />

                    {/* Main card */}
                    <Card className="relative w-full h-full shadow-lg transform transition-transform duration-500 ease-in-out group-hover:scale-105">
                      <CardContent className="flex flex-col items-center justify-center text-center h-full p-6 font-headline text-2xl text-foreground">
                        <p>{flashcard.text}</p>
                      </CardContent>
                    </Card>
                 </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="-translate-x-4"/>
        <CarouselNext className="translate-x-4"/>
      </Carousel>
    </div>
  );
}
