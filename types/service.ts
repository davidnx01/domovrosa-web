import type { TStrapiData } from "@/lib/api";
import type { THeading } from "./general";
import type { TImage } from "@/lib/utils";

export type TService = {
  icon: TImage;
  name: string;
  description: string;
};

export type TServiceSection = TStrapiData & {
  heading: THeading;
  description: string;
  services: TService[];
};