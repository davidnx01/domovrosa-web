"use client";

import Image from "next/image";

import { cn, type TImage } from "@/lib/utils";

import { useDisclosure } from "@/hooks/use-disclosure";
import { GetStrapiImage } from "@/lib/strapi-image";
import { useState } from "react";
import { LightboxComponent } from "@/components/lightbox/lightbox-component";

export function Menu({ images }: { images: TImage[] }) {
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
    <LightboxComponent isOpen={isOpen} setIsOpen={setIsOpen} images={imagesSorted} />
    <section className={cn("custom-section", 'py-16 sm:py-20')}>
      <div
        className={cn(
          "custom-container",
          "grid grid-cols-1 sm:grid-cols-2 gap--6 lg:gap-8 xl:gap-10"
        )}
      >
        {images.map((image, index) => (
          <Image
            src={GetStrapiImage(image.url)}
            onClick={handleOpenGallery(images, index)}
            key={image.url}
            alt={image.name}
            width={0}
            height={0}
            className="w-full col-span-1 h-auto object-cover cursor-pointer"
            sizes="100vw"
          />
        ))}
      </div>
    </section>
    </>
  );
}
