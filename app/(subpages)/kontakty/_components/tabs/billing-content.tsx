"use client";

import Link from "next/link";

import type { TGeneral } from "@/types/general";

import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function BillingContent({ general }: { general: TGeneral }) {
  return (
    <TabsContent
      value="Fakturačné údaje"
      className={cn(
        "custom-container",
        "w-full flex flex-col items-start justify-start sm:flex-row sm:justify-between gap-12"
      )}
    >
      <div className="sm:max-w-[400px] w-full flex flex-col items-start justify-start gap-8 md:gap-12">
        <div className="w-full flex flex-col items-start justify-start gap-4">
          <h4 className="text-lg md:text-xl font-semibold">
            {general.company_name}
          </h4>
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <p className="text-sm md:text-base">{general.company_address}</p>
            <p className="text-sm md:text-base">
              {general.company_post_code} {general.company_city}
            </p>
            <p className="text-sm md:text-base">{general.company_state}</p>
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-1">
            <p className="text-sm md:text-base">
              <b>IČO:</b> {general.ico}
            </p>
            <p className="text-sm md:text-base">
              <b>DIC:</b> {general.dic}
            </p>
          </div>
        </div>
        <Button asChild className="w-full sm:w-fit">
          <Link
            prefetch={false}
            target="_blank"
            rel="noopener noreferrer"
            href={
              "https://www.google.com/maps/place/D%C3%BAbravsk%C3%A1+cesta+3398%2F1,+841+04+Bratislava/@48.1675954,17.0769469,104m/data=!3m1!1e3!4m6!3m5!1s0x476c8c753f555769:0x84eb790b68d7612a!8m2!3d48.1676187!4d17.0772051!16s%2Fg%2F11c0psl__r?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D"
            }
          >
            Navigovať
          </Link>
        </Button>
      </div>
    </TabsContent>
  );
}
