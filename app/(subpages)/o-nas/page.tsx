import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";

export default async function Page() {
  const page = (await fetchData("o-nas-stranka", {
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
    </>
  );
}
