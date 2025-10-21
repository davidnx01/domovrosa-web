"use client";

import { cn } from "@/lib/utils";

export function OrderListSkeleton({ amount }: { amount: number }) {
  return [...Array(amount)].map((_, index) => (
    <div
      key={index}
      className={cn(
        "animate-pulse",
        "w-full bg-neutral-100 h-[377px] sm:h-[409px] lg:h-[429px] xl:h-[465px] rounded-[8px]"
      )}
    />
  ));
}
