"use client";

import { TGallery } from "@/types/gallery";

import Image from "next/image";
import Link from "next/link";

import { Paragraph } from "../ui/paragraph";
import { Button } from "../ui/button";
import { GetStrapiImage } from "@/lib/strapi-image";
import { cn } from "@/lib/utils";

export function GalleryCard({
  gallery,
  isFirst = false,
}: {
  gallery: TGallery;
  isFirst?: boolean;
}) {
  if (isFirst)
    return (
      <Link
        prefetch={false}
        href={`/fotogaleria/${gallery.slug}`}
        className="w-full col-span-1 sm:col-span-2 lg:col-span-3 rounded-[8px] sm:rounded-[12px] lg:rounded-[16px] h-[600px] sm:h-[400px] lg:h-[530px] overflow-hidden flex flex-col items-start justify-end relative p-4 sm:p-8 md:p-10 lg:p-12 mb-0 sm:mb-4 lg:mb-6"
      >
        <div className="w-full flex flex-col items-start justify-start gap-4 relative z-10">
          <div className="w-full flex flex-col items-start justify-start gap-1">
            {!!gallery?.fotogallery_category && (
              <div className="py-1 px-1.5 sm:px-2 text-xs sm:text-sm lg:text-base font-semibold uppercase bg-primary text-black rounded-[2px] sm:rounded-[4px]">
                {gallery.fotogallery_category.name}
              </div>
            )}
            <h4 className="line-clamp-2 text-white text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-semibold">
              {gallery.name}
            </h4>
          </div>
          <Paragraph
            content={gallery.content}
            innerHTML
            className="line-clamp-2 text-white/80 max-w-[733px] w-full"
          />
          <Button variant={"secondary"} className="cursor-pointer">
            Otvoriť galériu
          </Button>
        </div>
        <div
          className={cn(
            "absolute w-full h-full inset-0 z-[1]",
            "bg-gradient-to-b from-black/20 to-black/60"
          )}
        />
        <Image
          src={GetStrapiImage(gallery.image.url)}
          alt={gallery.name}
          width={0}
          height={0}
          className="absolute w-full h-full inset-0 object-cover object-center z-0"
          sizes="100vw"
        />
      </Link>
    );

  return (
    <Link
      prefetch={false}
      href={`/fotogaleria/${gallery.slug}`}
      className="w-full col-span-1 rounded-[8px] overflow-hidden flex flex-col items-start justify-start"
    >
      <div className="w-full h-[220px] sm:h-[240px] relative overflow-hidden">
        {!!gallery?.fotogallery_category && (
          <div className="py-1 px-1.5 bg-primary rounded-[2px] text-xs font-semibold uppercase absolute z-10 top-6 left-6">
            {gallery?.fotogallery_category.name}
          </div>
        )}
        <div className="absolute w-full h-full inset-0 z-[1] bg-black/20" />
        <Image
          src={GetStrapiImage(gallery.image.url)}
          alt={gallery.name}
          width={0}
          height={0}
          className="absolute w-full h-full inset-0 object-cover object-center z-0"
          sizes="100vw"
        />
      </div>
      <div className="p-6 w-full flex flex-col items-start justify-start gap-4 border border-[#B9B9B9] rounded-b-[6px] border-t-0">
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <h4 className="text-base sm:text-lg font-semibold line-clamp-2 h-12 sm:h-14">
            {gallery.name}
          </h4>
          <Paragraph
            content={gallery.content}
            innerHTML
            className="line-clamp-2 text-black/80 w-full max-h-12"
          />
        </div>
        <Button className="w-full cursor-pointer">Čítať viac</Button>
      </div>
    </Link>
  );
}
