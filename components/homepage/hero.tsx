"use client";

import Image from "next/image";

import { cn, type TSlider } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";
import { GetStrapiImage } from "@/lib/strapi-image";
import { Button } from "../ui/button";
import Link from "next/link";

export function Hero({ slides }: { slides: TSlider[] }) {
  return (
    <section className={cn("custom-section", "pt-10 lg:pt-12 bg-primary/10")}>
      <Swiper
        pagination={true}
        modules={[Pagination]}
        loop={true}
        className={cn("custom-container", "mySwiper", "hero-swiper")}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.title}
            className={cn(
              "custom-container",
              "rounded-[12px] overflow-hidden relative sm:p-12 md:p-16 lg:p-[72px] flex items-start justify-end"
            )}
          >
            <div className="w-full flex flex-col items-start justify-start gap-5 sm:gap-6 relative z-10 pt-[336px]">
              <div className="flex flex-col items-start justify-start gap-2 sm:gap-3">
                <h4 className="py-0.5 px-2.5 bg-primary text-sm sm:text-base font-bold uppercase">
                  {slide.subtitle}
                </h4>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  {slide.title}
                </h1>
              </div>
              <p className="text-sm sm:text-base lg:text-lg line-clamp-2 text-white max-w-[600px] w-full">
                {slide.description}
              </p>
              <Button asChild>
                <Link prefetch={false} href={'/o-nas'}>
                  Viac o nás
                </Link>
              </Button>
            </div>
            <div
              className={cn(
                "absolute w-full h-full inset-0 z-[1]",
                "hero__image-overlay"
              )}
            />
            <Image
              src={GetStrapiImage(slide.image.url) ?? "/placeholder.png"}
              alt={slide.title}
              width={0}
              height={0}
              className="absolute w-full h-full inset-0 z-0 object-cover object-center"
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
