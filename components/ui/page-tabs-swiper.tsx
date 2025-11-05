"use client";

import Image from "next/image";

import { cn, type TImage } from "@/lib/utils";

import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { GetStrapiImage } from "@/lib/strapi-image";

import "swiper/css";
import "swiper/css/pagination";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useState } from "react";
import { LightboxComponent } from "../lightbox/lightbox-component";

export function PageTabsSwiper({ images }: { images: TImage[] }) {
  const { isOpen, setIsOpen } = useDisclosure(false);
  const [imagesSorted, setImagesSorted] = useState<
    { url: string; name: string }[]
  >([]);

  const handleOpenGallery = (images: TImage[], index: number) => () => {
    if (Array.isArray(images) && index >= 0 && index < images.length) {
      const newImages = [...images.slice(index), ...images.slice(0, index)];
      setImagesSorted(newImages);
      setIsOpen(true);
    } else if (images && !Array.isArray(images)) {
      setImagesSorted([images]);
      setIsOpen(true);
    }
  };

  return (
    <>
      <LightboxComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        images={imagesSorted}
      />
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
              <p
                onClick={handleOpenGallery(images, index)}
                className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 font-bold text-black px-2.5 py-1.5 rounded-[4px] bg-primary cursor-pointer"
              >
                Otvoriť fotografiu
              </p>
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
    </>
  );
}
