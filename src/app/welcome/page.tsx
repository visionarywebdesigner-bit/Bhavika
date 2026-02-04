'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function WelcomePage() {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/proposal');
        }, 4000);
        return () => clearTimeout(timer);
    }, [router]);
    
    return (
        <main className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/80 to-primary animate-fade-in">
            <div className="text-center animate-fade-in-up">
                <h1 className="text-4xl md:text-6xl font-headline text-primary-foreground mb-4 drop-shadow-md">
                  To my Sweetu, Bhavika
                </h1>
                <p className="text-lg md:text-2xl font-body text-primary-foreground/90 animation-delay-300">
                  to my world, to the one who took my heart
                </p>
            </div>
        </main>
    );
}
