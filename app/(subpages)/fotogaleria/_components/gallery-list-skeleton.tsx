"use client";

import { cn } from "@/lib/utils";

export function GalleryListSkeleton({ amount }: { amount: number }) {
  return [...Array(amount)].map((_, index) => (
    <div
      key={index}
      className={cn(
        "w-full bg-neutral-100",
        "animate-pulse",
        index === 0
          ? "col-span-1 sm:col-span-2 lg:col-span-3 rounded-[8px] sm:rounded-[12px] lg:rounded-[16px] h-[600px] sm:h-[400px] lg:h-[530px]"
          : "col-span-1 rounded-[8px] h-[461px]"
      )}
    />
  ));
}
