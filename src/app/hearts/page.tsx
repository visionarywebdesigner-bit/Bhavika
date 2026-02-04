'use client';
import { FloatingHearts } from "@/components/app/FloatingHearts";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function HeartsPage() {
    const router = useRouter();
    const handleTransitionEnd = useCallback(() => {
        router.push('/welcome');
    }, [router]);

    return <FloatingHearts onTransitionEnd={handleTransitionEnd} />;
}
