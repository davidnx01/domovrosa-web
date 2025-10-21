import type { TStrapiData } from "@/lib/api";
import type { TImage } from "@/lib/utils";

import { SubpageHeadingProps } from "@/components/ui/subpage-heading";

export type TOpenGraph = {
  title: string;
  description: string;
  image?: TImage;
}

export type TSEO = {
  title: string;
  description: string;
  openGraph: TOpenGraph;
}

export type TPage = TStrapiData & {
  heading: SubpageHeadingProps;
  seo: TSEO;
  tabs: TTab[];
};

export type TTab = TStrapiData & {
  name: string;
  slug: string;
  content: string;
  image: TImage;
  images: TImage[];
  files: TImage[];
}