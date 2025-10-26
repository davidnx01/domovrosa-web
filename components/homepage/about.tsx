'use client';

import Image from "next/image";
import Link from "next/link";

import type { TAboutSection } from "@/types/sections";

import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { Paragraph } from "../ui/paragraph";
import { Button } from "../ui/button";
import { GetStrapiImage } from "@/lib/strapi-image";

export function About({ section }: { section: TAboutSection; }) {
  return (
    <section className={cn("py-12 sm:py-16 lg:py-20", "custom-section")}>
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12 md:flex-row md:justify-between"
        )}
      >
        <Image
          src={GetStrapiImage(section.image.url)}
          alt={section.heading.title}
          width={0}
          height={0}
          className="max-w-[616px] w-full aspect-square rounded-[16px] object-cover object-center"
          sizes="616px"
        />
        <div className="w-full md:max-w-[616px] flex flex-col items-start justify-start gap-8">
          <div className="w-full flex flex-col items-start justify-start gap-6">
            <Heading subtitle="STAROSTLIVOSŤ PRE LEPŠÍ ŽIVOT" title="O nás" />
            <Paragraph content={section.content} innerHTML />
          </div>
          <div className="flex items-start justify-start flex-col gap-3 sm:flex-wrap sm:flex-row">
          <Button asChild className="w-full sm:w-fit">
            <Link prefetch={false} href={"/o-nas#domov-socialnych-sluzieb"}>
              Domov sociálnych služieb
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-fit">
            <Link prefetch={false} href={"/o-nas#rehabilitacne-stredisko"}>
              Rehabilizačné stredisko
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-fit">
            <Link prefetch={false} href={"/o-nas#specializovane-zariadenie"}>
              Špecializované zariadenie
            </Link>
          </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
