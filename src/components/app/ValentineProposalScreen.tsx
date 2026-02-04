"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ValentineProposalScreenProps {
  onYes: () => void;
  onNo: () => void;
}

export function ValentineProposalScreen({
  onYes,
  onNo,
}: ValentineProposalScreenProps) {
  useEffect(() => {
    // Prevent loading the script multiple times
    if (!document.querySelector('script[src="https://tenor.com/embed.js"]')) {
      const script = document.createElement("script");
      script.src = "https://tenor.com/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-2xl bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/10 animate-fade-in-up">
        <CardHeader>
          <CardTitle className="font-headline text-4xl md:text-5xl text-primary">
            Will you be my Valentine?
          </CardTitle>
        </CardHeader>

        {/* 🔽 EXACT same spot as your Image */}
        <CardContent className="flex justify-center">
          <div
            className="tenor-gif-embed mx-auto my-4 rounded-md"
            data-postid="10413028580779796295"
            data-share-method="host"
            data-aspect-ratio="1.22905"
            data-width="200px"
          >
            <a href="https://tenor.com/view/hulkenberg-gif-10413028580779796295">
              Hulkenberg Sticker
            </a>
          </div>
        </CardContent>

        <CardFooter className="flex justify-center gap-4">
          <Button onClick={onYes} size="lg" className="font-bold">
            Yes
          </Button>
          <Button
            onClick={onNo}
            size="lg"
            variant="destructive"
            className="font-bold"
          >
            No
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
