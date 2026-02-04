'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProposalAcceptedPage() {
    const router = useRouter();

    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/letter');
        }, 3000); // Show for 3 seconds
        return () => clearTimeout(timer);
    }, [router]);

    return (
        <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-primary/10 to-accent animate-fade-in">
          <div className="text-center animate-fade-in-up">
              <p className="font-headline text-5xl md:text-7xl text-primary drop-shadow-lg">AWWWWW</p>
              <p className="font-body text-2xl md:text-3xl text-foreground mt-4">I LYSM!! ❤️</p>
          </div>
        </main>
    );
}
