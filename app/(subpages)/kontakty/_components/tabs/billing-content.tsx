"use client";

import Link from "next/link";

import type { TGeneral } from "@/types/general";

import { TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCookieConsent } from "@/components/cookie-consent/use-cookie-consent";
import { CookieSettingsLink } from "@/components/cookie-consent/cookie-settings-link";

export function BillingContent({ general }: { general: TGeneral }) {
  // Mapu Google Maps načítame až po udelení súhlasu s funkčnými cookies –
  // vloženie iframe-u nastavuje cookies tretej strany (Google).
  const mapsAllowed = useCookieConsent("functional");

  const locationURL =
    general.city && general.address
      ? encodeURI(
          `https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=${
            general.city + " " + general.address
          }(My%20Business%20Name)&amp;t=&amp;z=17&amp;ie=UTF8&amp;iwloc=B&amp;output=embed`
        ).replace(/&amp;/g, "&")
      : "https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=S%C3%A1rospatak,%20Hat%C3%A1r%20%C3%BAt%202/B,%203950%20Hungary+(My%20Business%20Name)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed".replace(
          /&amp;/g,
          "&"
        );

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
      {mapsAllowed ? (
        <iframe
          title="Mapa – poloha zariadenia"
          className="w-full aspect-square rounded-[8px] max-w-[616px]"
          src={locationURL}
        />
      ) : (
        <div className="w-full aspect-square rounded-[8px] max-w-[616px] border border-black/10 bg-secondary/10 flex flex-col items-center justify-center gap-4 p-6 text-center">
          <p className="text-sm md:text-base text-black/70 max-w-[420px]">
            Mapa sa načíta zo služby Google Maps, ktorá vo vašom prehliadači
            ukladá súbory cookies a spracúva vašu IP adresu (príjemca Google
            Ireland Limited / Google LLC, možný prenos do USA). Zobrazíme ju až
            po vašom súhlase s funkčnými cookies.
          </p>
          <CookieSettingsLink className="underline underline-offset-4 text-sm md:text-base cursor-pointer hover:text-black/50 transition-all" />
          <Button asChild variant="outline" className="w-full sm:w-fit">
            <Link
              prefetch={false}
              target="_blank"
              rel="noopener noreferrer"
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                `${general.address ?? ""} ${general.city ?? ""}`.trim()
              )}`}
            >
              Otvoriť mapu v novom okne
            </Link>
          </Button>
        </div>
      )}
    </TabsContent>
  );
}
