"use client";

import Image from "next/image";

import { cn, type TImage } from "@/lib/utils";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GetStrapiImage } from "@/lib/strapi-image";

import "swiper/css";
import "swiper/css/pagination";

export function PageTabsSwiper({ images }: { images: TImage[] }) {
  return (
    <div className="max-w-[531px] w-full overflow-hidden">
      <Swiper
        pagination={true}
        modules={[Pagination]}
        className={cn(
          "mySwiper",
          "w-full h-[400px] sm:h-[500px] xl:h-[600px] overflow-hidden rounded-[4px] sm:rounded-[6px] lg:rounded-[8px]",
          "ea-page-tabs__swiper"
        )}
      >
        {images.map((image, index) => (
          <SwiperSlide
            key={index}
            className="w-full h-[400px] sm:h-[500px] xl:h-[600px] relative"
          >
            <Image
              src={GetStrapiImage(image?.url)}
              alt={image?.name || `Image ${index + 1}`}
              className="absolute w-full h-full inset-0 z-0  object-cover object-center"
              sizes="100vw"
              height={0}
              width={0}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
