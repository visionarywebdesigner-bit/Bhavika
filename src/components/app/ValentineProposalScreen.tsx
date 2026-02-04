"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';

interface ValentineProposalScreenProps {
  onYes: () => void;
  onNo: () => void;
}

export function ValentineProposalScreen({ onYes, onNo }: ValentineProposalScreenProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
      <Card className="w-full max-w-md text-center shadow-2xl bg-card/80 backdrop-blur-sm rounded-2xl border border-primary/10 animate-fade-in-up">
        <CardHeader>
          <CardTitle className="font-headline text-4xl md:text-5xl text-primary">
            Will you be my Valentine?
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Image
            src="https://media.tenor.com/7gU3T2D5WRAAAAAC/hulkenberg.gif"
            alt="Cute GIF"
            width={150}
            height={125}
            className="mx-auto my-4 rounded-md"
            unoptimized
          />
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={onYes} size="lg" className="font-bold">Yes</Button>
          <Button onClick={onNo} size="lg" variant="destructive" className="font-bold">No</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
