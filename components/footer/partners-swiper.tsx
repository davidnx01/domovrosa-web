"use client";

import Image from "next/image";

import type { TPartner } from "@/types/sections";

import { GetStrapiImage } from "@/lib/strapi-image";

export function PartnersSwiper({ partners }: { partners: TPartner[] }) {
  return (
    <div className="w-full flex flex-wrap items-center justify-center gap-12 sm:gap-16">
      {partners.map(partner => (
        <Image 
          key={partner.name}
          src={GetStrapiImage(partner?.image?.url)}
          alt={partner.name || "Partner Logo"}
          width={0}
          height={0}
          className="max-w-[100px] sm:max-w-[200px] lg:max-w-[220px] w-full max-h-[80px] sm:max-h-[100px] lg:max-h-[120px] flex items-center justify-center"
          sizes="100vw"
        />
      ))}
    </div>
  );
}
