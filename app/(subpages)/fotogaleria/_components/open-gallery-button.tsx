"use client";

import type { TImage } from "@/lib/utils";

import { LightboxComponent } from "@/components/lightbox/lightbox-component";
import { Button } from "@/components/ui/button";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useState } from "react";

export function OpenGalleryButton({ allImages }: { allImages: TImage[]; }) {
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
      <Button 
        className="absolute bottom-4 left-4 z-10 sm:bottom-6 sm:left-6 lg:bottom-8 lg:left-8 cursor-pointer"
        onClick={handleOpenGallery(allImages, 0)}
      >
        Všetky fotografie
      </Button>
    </>
  );
}
