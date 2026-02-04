'use client';
import { LetterScreen } from "@/components/app/LetterScreen";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function LetterPage() {
    const router = useRouter();
    const onNext = useCallback(() => {
        router.push('/flashcards');
    }, [router]);

    return <LetterScreen onNext={onNext} />;
}
