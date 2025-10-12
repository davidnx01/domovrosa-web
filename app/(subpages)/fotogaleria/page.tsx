
import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { GalleryList } from "./_components/gallery-list";
import { TGalleryCategory } from "@/types/gallery";


export default async function Page() {
  const page = (await fetchData("fotogaleria-stranka", {
    populate: ["heading", "heading.image", "seo"],
  })) as TPage;

  const categories = (await fetchData("fotogallery-categories", {
    populate: "*",
  })) as TGalleryCategory[];

  return (
    <>
      <SubpageHeading
        image={page.heading.image}
        title={page.heading.title}
        description={page.heading.description}
      />
      <GalleryList categories={categories} />
    </>
  );
}
