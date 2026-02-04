'use client';
import { FlashcardsScreen } from "@/components/app/FlashcardsScreen";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function FlashcardsPage() {
    const router = useRouter();
    const onNext = useCallback(() => {
        router.push('/advent');
    }, [router]);

    return <FlashcardsScreen onNext={onNext} />;
}
