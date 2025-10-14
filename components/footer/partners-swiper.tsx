"use client";

import Image from "next/image";

import type { TPartner } from "@/types/sections";

import { GetStrapiImage } from "@/lib/strapi-image";
import { cn } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";

export function PartnersSwiper({ partners }: { partners: TPartner[] }) {
  return (
    <Swiper
      spaceBetween={56}
      slidesPerView={"auto"}
      className={cn("w-full", "mySwiper")}
      loop={true}
      breakpoints={{
        640: {
          spaceBetween: 20,
        },
        768: {
          spaceBetween: 24,
        },
      }}
    >
      {partners.map((partner) => (
        <SwiperSlide
          key={partner.name}
          className="max-w-[180px] sm:max-w-[200px] lg:max-w-[220px] w-full max-h-[80px] sm:max-h-[100px] lg:max-h-[120px] flex items-center justify-center"
        >
          <Image
            src={GetStrapiImage(partner.image.url)}
            alt={partner.name}
            width={0}
            height={0}
            className="w-full h-full object-contain object-center"
            sizes="100vw"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
