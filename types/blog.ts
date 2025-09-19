import type { TStrapiData } from "@/lib/api";
import type { TImage } from "@/lib/utils";

export type TBlogCategory = {
  id: number;
  name: string;
  slug: string;
};

export type TBlog = TStrapiData & {
  id: number;
  name: string;
  slug: string;
  category: TBlogCategory;
  image: TImage;
  content: string;
}