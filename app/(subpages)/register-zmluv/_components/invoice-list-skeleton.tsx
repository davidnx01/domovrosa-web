"use client";

import { cn } from "@/lib/utils";

export function InvoiceListSkeleton({ amount }: { amount: number }) {
  return [...Array(amount)].map((_, index) => (
    <div
      key={index}
      className={cn(
        "animate-pulse",
        "w-full bg-neutral-100 h-[450px] sm:h-[490px] lg:h-[490px] xl:h-[527px] rounded-[8px]"
      )}
    />
  ));
}
