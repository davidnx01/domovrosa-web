import type { TGeneral } from "@/types/general";
import type { TPage } from "@/types/page";
import type { TImage } from "@/lib/utils";

import { PageGallery } from "@/components/ui/page-gallery";
import { PageTabs } from "@/components/ui/page-tabs";
import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData, fetchGeneral } from "@/lib/api";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("zaujmova-cinnost-page", {
      populate: ["seo", "seo.open_graph"],
    }) as Promise<TPage>,
    fetchGeneral() as Promise<TGeneral>,
  ]);

  return generateSharedMetadata({
    seo: page.seo,
    general,
  });
}

interface TCinnostPage extends TPage {
  gallery: TImage[];
}

export default async function Page() {
  const page = (await fetchData("zaujmova-cinnost-page", {
    populate: ["heading", "heading.image", "tabs", "tabs.files", "gallery"],
  })) as TCinnostPage;

  return (
    <>
      <SubpageHeading
        image={page?.heading?.image}
        title={page?.heading?.title}
        description={page?.heading?.description}
      />
      <PageTabs tabs={page.tabs} />
      <PageGallery gallery={page.gallery} />
    </>
  );
}
