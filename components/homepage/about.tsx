import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { Paragraph } from "../ui/paragraph";
import { Button } from "../ui/button";

export function About() {
  const content = `
    <p>
      ZSS Rosa poskytuje starostlivosť ľuďom s <strong>telesným</strong> a mentálnym postihnutím, ktorí potrebujú pomoc druhých. Naše služby zahŕňajú sociálnu rehabilitáciu, fyzioterapiu, animoterapiu, muzikoterapiu, arteterapiu a pracovnú terapiu, ktoré podporujú rozvoj klientov a ich začlenenie do bežného života. 
      <br/><br/>
      Klienti (6-40 rokov) navštevujú naše zariadenie denne, týždenne alebo pobytovo, pričom aktuálne máme 123 klientov. Ponúkame aj kluby a kurzy, ako sú tvorivé dielne, športové a tanečné kluby či výroba ručného papiera. 
      <br/><br/>
      Pravidelne organizujeme podujatia, výlety, divadelné návštevy a workshopy, kde klienti prezentujú svoje výrobky.
    </p>
  `;

  const points = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut",
    "Lorem ipsum dolor sit amet, consectetur adipiscing",
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod",
  ];

  return (
    <section className={cn("py-12 sm:py-16 lg:py-20", "custom-section")}>
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12 md:flex-row md:justify-between"
        )}
      >
        <Image
          src={"/placeholder.png"}
          alt="O nás"
          width={0}
          height={0}
          className="max-w-[616px] w-full aspect-square rounded-[16px] object-cover object-center"
          sizes="616px"
        />
        <div className="w-full md:max-w-[616px] flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12">
          <div className="w-full flex flex-col items-start justify-start gap-6">
            <Heading subtitle="STAROSTLIVOSŤ PRE LEPŠÍ ŽIVOT" title="O nás" />
            <Paragraph content={content} innerHTML />
          </div>
          <div className="w-full flex flex-col items-start justify-start gap-4">
            {points.map((point) => (
              <div
                key={point}
                className="w-full flex items-center justify-start gap-3"
              >
                <Image
                  src={"/primary-check.svg"}
                  alt={point}
                  width={32}
                  height={32}
                  className="max-w-8 max-h-8 min-w-8 min-h-8 object-contain"
                />
                <p className="text-sm sm:text-base text-left">{point}</p>
              </div>
            ))}
          </div>
          <Button asChild className="w-full sm:w-fit">
            <Link prefetch={false} href={"/o-nas"}>
              Viac o nás
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
