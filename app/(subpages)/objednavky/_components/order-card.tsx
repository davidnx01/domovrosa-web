'use client';

import type { TOrder } from "@/types/order";

import { cn } from "@/lib/utils";

export function OrderCard({ order }: { order: TOrder }) {
  const data = [
    { label: 'Číslo objednávky', value: order.code ?? '-' },
    { label: 'Cena s DPH', value: order.price ?? '-' },
    { label: 'Dátum vystavenia', value: order?.date_start ?? '-' },
    { label: 'Dátum zverejnenia', value: order.publication_date ?? '-' },
    { label: 'Podpísané', value: order.signed_by ?? '-' },
    { label: 'Predmet objednávky', value: order.subject ?? '-' },
    { label: 'Partner', value: order.partner ?? '-' },
    { label: 'IČO', value: order.ico ?? '-' },
  ];

  return (
    <div className="w-full col-span-1 border border-border rounded-[8px] p-4 sm:p-6 flex flex-col items-start justify-start">
      {data.map((item, index) => (
        <div
          key={item.label}
          className={cn('w-full flex items-start justify-between gap-3 py-3', {
            'border-t border-border': index !== 0,
            'pb-0': index === data.length - 1,
          })}
        >
          <p className="text-xs sm:text-sm xl:text-base font-bold whitespace-nowrap">
            {item.label}:
          </p>

          <p className="text-xs sm:text-sm xl:text-base text-black text-right break-words max-w-[80%] sm:max-w-[70%]">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
