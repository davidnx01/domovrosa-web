"use client";

import Image from "next/image";
import Link from "next/link";

import { cn, type TSlider } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Autoplay, Pagination } from "swiper/modules";
import { GetStrapiImage } from "@/lib/strapi-image";
import { Button } from "../ui/button";

export function Hero({ slides }: { slides: TSlider[] }) {
  return (
    <section className={cn("custom-section", "pt-10 lg:pt-12 bg-primary/10 pb-8")}>
      <Swiper
        pagination={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 3000,
        }}
        loop={true}
        className={cn("custom-container", "mySwiper", "hero-swiper")}
      >
        {slides.map((slide) => (
          <SwiperSlide
            key={slide.title}
            className={cn(
              "custom-container",
              "rounded-[12px] overflow-hidden relative p-6 sm:p-12 md:p-16 lg:p-[72px] flex items-start justify-end"
            )}
          >
            <div className="w-full flex flex-col items-start justify-start gap-6 sm:gap-8 relative z-10 pt-[280px] sm:pt-[320px] md:pt-[380px]">
              <div className="flex flex-col items-start justify-start gap-2 sm:gap-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
                  {slide.subtitle}
                </h1>
              </div>
              <Button asChild>
                <Link prefetch={false} href={slide.button.href}>
                  {slide.button.name}
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
