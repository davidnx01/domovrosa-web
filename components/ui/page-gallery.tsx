"use client";

import Image from "next/image";

import { useState } from "react";

import { cn, type TImage } from "@/lib/utils";
import { GetStrapiImage } from "@/lib/strapi-image";
import { useDisclosure } from "@/hooks/use-disclosure";
import { LightboxComponent } from "../lightbox/lightbox-component";

export function PageGallery({ gallery }: { gallery: TImage[] }) {
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
      <section className={cn("custom-section", "pb-12 sm:pb-16")}>
        <div
          className={cn(
            "custom-container",
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          )}
        >
          {gallery.map((image, index) => (
            <Image
              key={image?.id}
              src={GetStrapiImage(image?.url)}
              onClick={handleOpenGallery(gallery, index)}
              width={0}
              height={0}
              alt={image.name}
              className="w-full col-span-1 object-cover object-center rounded-[4px] sm:rounded-[6px] lg:rounded-[8px] h-[200px] sm:h-[220px] md:h-[240px] lg:h-[300px] cursor-pointer hover:opacity-85 transition-all"
              sizes="100vw"
            />
          ))}
        </div>
      </section>
    </>
  );
}
