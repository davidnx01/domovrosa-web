import type { TGeneral } from "@/types/general";
import type { TImage } from "@/lib/utils";
import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData, fetchGeneral } from "@/lib/api";
import { Menu } from "./_components/menu";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

type TPageWithImage = TPage & {
  images: TImage[];
};

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("jedalny-listok-page", {
      populate: ["seo", "seo.open_graph"],
    }) as Promise<TPage>,
    fetchGeneral() as Promise<TGeneral>,
  ]);

  return generateSharedMetadata({
    seo: page.seo,
    general,
  });
}

export default async function Page() {
  const page = (await fetchData("jedalny-listok-page", {
    populate: ["heading", "heading.image", "images"],
  })) as TPageWithImage;

  return (
    <>
      <SubpageHeading
        image={page.heading.image}
        title={page.heading.title}
        description={page.heading.description}
      />
      <Menu images={page.images} />
    </>
  );
}
