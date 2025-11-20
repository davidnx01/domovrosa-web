import Image from "next/image";

import type { TGallery } from "@/types/gallery";

import { fetchData } from "@/lib/api";
import { GetStrapiImage } from "@/lib/strapi-image";
import { cn } from "@/lib/utils";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { OpenGalleryButton } from "../_components/open-gallery-button";

interface PageProps {
  params: { slug: string };
}

export default async function Page({ params }: PageProps) {
  const photogalleryData = (await fetchData(
    `fotogalleries?filters[slug][$eq]=${params.slug}&populate=*`
  )) as TGallery[];

  const photogallery = photogalleryData[0];

  const galleriesData = (await fetchData("fotogalleries", {
    populate: ["image", "fotogallery_category", "gallery"],
    sort: "publishedAt:desc",
    pagination: { pageSize: 3 },
  })) as TGallery[];

  const galleries = galleriesData.filter((g) => g.slug !== photogallery.slug);

  const allImages = [photogallery.image, ...photogallery?.gallery || []];

  return (
    <article className="w-full flex flex-col items-center justify-center">
      <div className={cn('custom-container', 'relative')}>
        <OpenGalleryButton allImages={allImages} />
        <Image
          src={GetStrapiImage(photogallery.image?.url)}
          alt={photogallery.name}
          width={0}
          height={0}
          className={cn(
            "custom-container",
            "h-[400px] sm:h-[500px] lg:h-[600px] object-cover object-center rounded-b-[4px] sm:rounded-b-[6px] lg:rounded-b-[8px]"
          )}
          sizes="100vw"
          priority
          loading="eager"
        />
      </div>
      <section
        className={cn("custom-section", "py-12 sm:py-16 lg:py-20 xl:py-24")}
      >
        <div
          className={cn(
            "custom-container",
            "flex flex-col items-start justify-start gap-12 lg:gap-16 md:flex-row md:justify-between"
          )}
        >
          <div className="md:max-w-[774px] w-full flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold">
              {photogallery.name}
            </h2>
            <div
              className={cn("w-full", "photogallery__content")}
              dangerouslySetInnerHTML={{ __html: photogallery.content }}
            />
          </div>
          <div className="hidden md:grid grid-cols-1 gap-8 max-w-[410px] w-full">
            <h5 className="text-2xl font-bold">Odporúčané galérie</h5>
            {galleries.map((gallery) => (
              <GalleryCard gallery={gallery} key={gallery.slug} />
            ))}
          </div>
        </div>
      </section>
    </article>
  );
}
