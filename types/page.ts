import type { TStrapiData } from "@/lib/api";
import type { TImage } from "@/lib/utils";

import { SubpageHeadingProps } from "@/components/ui/subpage-heading";

export type TSEO = {
  title: string;
  description: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
  };
}

export type TPage = TStrapiData & {
  heading: SubpageHeadingProps;
  seo: TSEO;
};

export type TTabs = TStrapiData & {
  name: string;
  content: string;
  image: TImage;
  images: TImage[];
}