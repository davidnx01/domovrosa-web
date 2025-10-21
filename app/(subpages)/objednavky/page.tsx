import type { TOrderCategory } from "@/types/order";
import type { TGeneral } from "@/types/general";
import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData, fetchGeneral } from "@/lib/api";
import { OrdersList } from "./_components/orders-list";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("invoices-page", {
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
  const page = (await fetchData("invoices-page", {
    populate: ["heading", "heading.image"],
  })) as TPage;

  const categories = (await fetchData("order-categories", {
    populate: "*",
  })) as TOrderCategory[];

  return (
    <>
      <SubpageHeading
        image={page?.heading?.image}
        title={page?.heading?.title}
        description={page?.heading?.description}
      />
      <OrdersList categories={categories} />
    </>
  );
}
