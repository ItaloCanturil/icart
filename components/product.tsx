"use client";

import { AnimatePresence, motion } from "motion/react";
import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { StarRating } from "@/components/ui/star-rating";

type FilterProps = {
    categories?: string[];
    category: string | null;
    minRating: number | null;
    maxRating: number | null;
    sortBy: string | null;
    onUpdateParam: (key: string, value: string) => void;
    onCategoryChange: (selectedCategory: string) => void;
}

export function Products( {
    searchParams,
}: {
    searchParams: Record<string, string | string[]>;
}) {
    const router = useRouter();


    return (
        <>
            <div className="mb-8">
                <h1 className="text-4xl font-bold text-foreground">Produtos</h1>
            </div>
        </>
    )
}
