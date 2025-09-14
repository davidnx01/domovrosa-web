import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { TStrapiData } from "./api";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export type TImage = {
  id: number;
  name: string;
  width: number;
  height: number;
  url: string;
};

export type TSlider = {
  id: number;
  subtitle: string;
  title: string;
  description: string;
  image: TImage;
};

export type THomepageSlider = TStrapiData & {
  slides: TSlider[];
};