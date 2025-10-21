'use client';

import type { TInvoice } from "@/types/invoice";

import { cn } from "@/lib/utils";

export function InvoiceCard({ invoice }: { invoice: TInvoice }) {
  const data = [
    { label: 'Číslo zmluvy', value: invoice.code ?? '-' },
    { label: 'Cena s DPH', value: invoice.price ?? '-' },
    { label: 'Dátum zverejnenia', value: invoice.publication_date ?? '-' },
    { label: 'Dátum podpisu', value: invoice.signature_date ?? '-' },
    { label: 'Platnosť od', value: invoice.valid_from ?? '-' },
    { label: 'Platnosť do', value: invoice.valid_to ?? '-' },
    { label: 'Druh zmluvy', value: invoice.category ?? '-' },
    { label: 'Názov zmluvy', value: invoice.name ?? '-' },
    { label: 'Predmet zmluvy', value: invoice.subject ?? '-' },
    { label: 'Partner', value: invoice.partner ?? '-' },
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
