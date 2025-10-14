
import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";


export default async function Page() {
  const page = (await fetchData("spolupraca-page", {
    populate: ["heading", "heading.image"],
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
