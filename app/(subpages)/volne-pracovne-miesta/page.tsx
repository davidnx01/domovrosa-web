import type { TGeneral } from "@/types/general";
import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData, fetchGeneral } from "@/lib/api";
import { JobOffers } from "./_components/job-offers";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("ekonomika-page", {
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
  const page = (await fetchData("pracovne-miesta-page", {
    populate: ["heading", "heading.image", "tabs", "tabs.files"],
  })) as TPage;

  return (
    <>
      <SubpageHeading
        image={page?.heading?.image}
        title={page?.heading?.title}
        description={page?.heading?.description}
      />
      <JobOffers />
    </>
  );
}
