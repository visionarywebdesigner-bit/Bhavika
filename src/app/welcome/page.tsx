'use client';
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from 'next/image';
import { PlaceHolderImages } from "@/lib/placeholder-images";

const image1 = PlaceHolderImages.find(p => p.id === 'welcome-image-1');
const image2 = PlaceHolderImages.find(p => p.id === 'welcome-image-2');

export default function WelcomePage() {
    const router = useRouter();
    useEffect(() => {
        const timer = setTimeout(() => {
            router.push('/proposal');
        }, 5000); // Increased time to admire photos
        return () => clearTimeout(timer);
    }, [router]);
    
    return (
        <main className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 min-h-screen bg-gradient-to-b from-primary/80 to-primary p-8 animate-fade-in overflow-hidden">
            {image1 && (
                 <div className="relative w-48 h-72 md:w-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 animate-fade-in-up">
                    <Image
                        src={image1.imageUrl}
                        alt={image1.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image1.imageHint}
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                 </div>
            )}
            <div className="text-center animate-fade-in-up animation-delay-300 flex-shrink-0">
                <h1 className="text-4xl md:text-6xl font-headline text-primary-foreground mb-4 drop-shadow-md">
                  To my Sweetu, Bhavika
                </h1>
                <p className="text-lg md:text-2xl font-body text-primary-foreground/90">
                  to my world, to the one who took my heart
                </p>
            </div>
             {image2 && (
                 <div className="relative w-48 h-72 md:w-64 md:h-96 rounded-2xl overflow-hidden shadow-2xl transform rotate-6 animate-fade-in-up">
                    <Image
                        src={image2.imageUrl}
                        alt={image2.description}
                        fill
                        className="object-cover"
                        data-ai-hint={image2.imageHint}
                        sizes="(max-width: 768px) 50vw, 33vw"
                    />
                 </div>
            )}
        </main>
    );
}
