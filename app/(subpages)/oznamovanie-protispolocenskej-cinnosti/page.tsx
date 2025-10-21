import type { TGeneral } from "@/types/general";
import type { TPage } from "@/types/page";

import { fetchData, fetchGeneral } from "@/lib/api";
import { PageTabs } from "@/components/ui/page-tabs";
import { SubpageHeading } from "@/components/ui/subpage-heading";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("protispolocenska-page", {
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
  const page = (await fetchData("protispolocenska-page", {
    populate: ["heading", "heading.image", "tabs"],
  })) as TPage;

  return (
    <>
      <SubpageHeading
        image={page?.heading?.image}
        title={page?.heading?.title}
        description={page?.heading?.description}
      />
      <PageTabs tabs={page.tabs} />
    </>
  );
}
