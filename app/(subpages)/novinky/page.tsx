import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { PageTabs } from "@/components/ui/page-tabs";

export default async function Page() {
  const page = (await fetchData("novinky-page", {
    populate: [
      "heading",
      "heading.image",
      "seo",
      "tabs",
      "tabs.image",
      "tabs.images",
    ],
  })) as TPage;

  return (
    <>
      <SubpageHeading
        image={page.heading.image}
        title={page.heading.title}
        description={page.heading.description}
      />
      <PageTabs tabs={page.tabs} />
    </>
  );
}
