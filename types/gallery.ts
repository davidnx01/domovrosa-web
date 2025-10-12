import type { TStrapiData } from "@/lib/api";
import type { TImage } from "@/lib/utils";

export type TGalleryCategory = {
  id: number;
  name: string;
  slug: string;
};

export type TGallery = TStrapiData & {
  id: number;
  name: string;
  slug: string;
  fotogallery_category: TGalleryCategory;
  image: TImage;
  content: string;
}