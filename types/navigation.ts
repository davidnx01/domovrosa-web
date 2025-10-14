import { TStrapiData } from "@/lib/api";

export type THeaderLink = {
  name: string;
  link: string;
  isExternal?: boolean;
  childs?: THeaderLink[];
}

export type TNavigation = TStrapiData & {
  header_links: THeaderLink[];
  sidebar_links: THeaderLink[];
}