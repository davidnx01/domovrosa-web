import type { TImage } from "@/lib/utils";
import type { THeading } from "./general";

export type TAboutSection = {
  heading: THeading;
  content: string;
  benefits: {
    name: string;
  }[];
  image: TImage;
};

export type TBlogSection = {
  heading: THeading;
}

export type TPartner = {
  name: string;
  image: TImage;
}

export type TFooterSection = {
  heading: THeading;
  partners: TPartner[];
  menus: {
    name: string;
    items: {
      name: string;
      link: string;
    }[]
  }[];
}