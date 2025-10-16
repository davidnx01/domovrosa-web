import type { TOrderCategory } from "@/types/order";
import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { InvoicesList } from "./_components/invoices-list";

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
      <InvoicesList categories={categories} />
    </>
  );
}
