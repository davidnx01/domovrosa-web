import Image from "next/image";

import type { TGallery } from "@/types/gallery";
import type { TGeneral } from "@/types/general";

import { fetchData, fetchGeneral } from "@/lib/api";
import { GetStrapiImage } from "@/lib/strapi-image";
import { cn } from "@/lib/utils";
import { GalleryCard } from "@/components/gallery/gallery-card";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";
import { Metadata } from "next";

type PageProps = {
  params: { slug: string };
};

export function generateSeoDescription(html: string, maxLength = 160): string {
  if (!html) return "";

  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

  return text.length > maxLength
    ? text.slice(0, text.lastIndexOf(" ", maxLength)) + "…"
    : text;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const [photogalleryData, general] = await Promise.all([
    fetchData(
      `fotogalleries?populate=*&filters[slug][$eq]=${params?.slug ?? ""}`
    ) as Promise<TGallery[]>,
    fetchGeneral() as Promise<TGeneral>,
  ]);

  const photogallery = photogalleryData?.[0];
  if (!photogallery) return {};

  const description = generateSeoDescription(photogallery.content);

  return generateSharedMetadata({
    seo: {
      title: photogallery.name,
      description,
      openGraph: {
        title: photogallery.name,
        description,
        image: photogallery.image,
      },
    },
    general,
  });
}

export default async function Page({ params }: PageProps) {
  const photogalleryData = (await fetchData(
    `fotogalleries?populate=*&filters[slug][$eq]=${params?.slug}`
  )) as TGallery[];

  const photogallery = photogalleryData[0];

  const galleriesData = (await fetchData("fotogalleries", {
    populate: ["image", "fotogallery_category"],
    sort: "publishedAt:asc",
    pagination: { pageSize: 8 },
  })) as TGallery[];

  const galleries = galleriesData.filter((g) => g.slug !== photogallery.slug);

  return (
    <article className="w-full flex flex-col items-center justify-center">
      <Image
        src={GetStrapiImage(photogallery.image?.url)}
        alt={photogallery.name}
        width={0}
        height={0}
        className={cn('custom-container', 'h-[400px] sm:h-[500px] lg:h-[600px] object-cover object-center rounded-b-[4px] sm:rounded-b-[6px] lg:rounded-b-[8px]')}
        sizes="100vw"
        priority
        loading="eager"
      />
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
