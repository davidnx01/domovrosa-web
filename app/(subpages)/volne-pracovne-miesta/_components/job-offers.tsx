import Link from "next/link";

import { cn } from "@/lib/utils";

import { BsEnvelope } from "react-icons/bs";

export function JobOffers() {
  return (
    <section
      className={cn("custom-section", "pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16")}
    >
      <div
        className={cn(
          "custom-container",
          "grid grid-cols-1 md:grid-cols-2 gap-6"
        )}
      >
        <JobOfferCard />
      </div>
    </section>
  );
}

function JobOfferCard() {
  return (
    <div className="w-full col-span-1 rounded-[8px] flex flex-col items-center justify-center border border-[#D8D8D8]">
      <div className="w-full p-4 sm:p-6 lg:p-8 border-b border-b-[#D8D8D8]">
        <div className="w-full h-12 bg-secondary flex items-center justify-center font-semibold text-lg sm:text-xl text-center">
          Fyzioterapeut
        </div>
      </div>
      <div className="w-full p-4 sm:p-6 lg:p-8 border-b border-b-[#D8D8D8] flex flex-col items-start justify-start gap-4 sm:gap-5 lg:gap-6">
        <p className="text-sm sm:text-base">
          <strong>Náplň práce:&nbsp;</strong>samostatná rehabilitačná práca na
          úseku liečebnej telesnej výchovy, individuálne a v skupinách na úseku
          fyzikálnej terapie a asistencie pri odborných liečebných výkonoch
        </p>
        <p className="text-sm sm:text-base">
          <strong>Termín nástupu:&nbsp;</strong>podľa dohody
        </p>
        <p className="text-sm sm:text-base">
          <strong>Druh pracovného pomeru:&nbsp;</strong>pracovný pomer na dobu
          určitú na 1 rok s možnosťou predĺženia na dobu neurčitú.
        </p>
        <p className="text-sm sm:text-base">
          <strong>Požiadavky na uchádzača:&nbsp;</strong>VOV v odbore
          diplomovaný fyzioterapeut resp. VŠ i stupňa v odbore fyziatria
        </p>
        <p className="text-sm sm:text-base">
          <strong>Ponúkame:&nbsp;</strong>odmeňovanie v zmysle zákona č.
          553/2003 Z. z.; odmeny dvakrát ročne, príspevok na doplnkové
          dôchodkové sporenie
        </p>
      </div>
      <div className="w-full flex flex-col items-start justify-start p-4 sm:p-5 lg:p-6 gap-1 sm:gap-1.5">
        <p className="text-sm sm:text-base font-semibold">Kontaktná osoba</p>
        <p className="text-sm sm:text-base">
          Ing. Jana Mačugová, personálna referentka
        </p>
        <Link
          prefetch={false}
          href={`#`}
          className="text-sm sm:text-base font-semibold text-primary flex items-center justify-start gap-2"
        >
          <BsEnvelope size={24} /> jana.macugova@domovrosa.sk
        </Link>
      </div>
    </div>
  );
}
