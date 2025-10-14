import { PageTabs } from "@/components/ui/page-tabs";
import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { TPage } from "@/types/page";

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
