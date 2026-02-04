'use client';
import { ValentineProposalScreen } from "@/components/app/ValentineProposalScreen";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

export default function ProposalPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleProposalAccepted = useCallback(() => {
        router.push('/proposal-accepted');
    }, [router]);

    const handleProposalNo = () => {
        toast({
          variant: 'destructive',
          title: "Error: That's not possible",
          description: 'haha',
        });
    };

    return <ValentineProposalScreen onYes={handleProposalAccepted} onNo={handleProposalNo} />;
}
