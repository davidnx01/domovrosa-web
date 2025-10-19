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
          <div className="w-full flex flex-col items-start justify-start gap-4">
            {section.benefits.map((point, index) => (
              <div
                key={index}
                className="w-full flex items-center justify-start gap-3"
              >
                <Image
                  src={"/primary-check.svg"}
                  alt={point.name}
                  width={32}
                  height={32}
                  className="max-w-8 max-h-8 min-w-8 min-h-8 object-contain"
                />
                <p className="text-sm sm:text-base text-left">{point.name}</p>
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
