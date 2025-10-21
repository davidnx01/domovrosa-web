import { GetStrapiImage } from "@/lib/strapi-image";

import type { TGeneral } from "@/types/general";
import type { TPage } from "@/types/page";
import type { TImage } from "@/lib/utils";

export async function generateMetadata({ seo, general, openGraphImage }: { seo: TPage["seo"]; general: TGeneral; openGraphImage?: TImage; }) {
  return {
    title: seo?.title || general?.seo?.title || 'test',
    description: seo?.description || general?.seo?.description || 'test',
    openGraph: {
      title: seo?.openGraph?.title || general?.seo?.title || 'test',
      description: seo?.openGraph?.description || general?.seo?.description || 'test',
      images: [
        {
          url: openGraphImage ? GetStrapiImage(openGraphImage.url) : GetStrapiImage(general.logo.url),
          width: 1200,
          height: 630,
          alt: general?.company_name,
        },
      ],
    },
  };
}