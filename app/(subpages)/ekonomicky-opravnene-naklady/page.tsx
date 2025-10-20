import { PageTabs } from "@/components/ui/page-tabs";
import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { cn } from "@/lib/utils";
import { TPage } from "@/types/page";

export default async function Page() {
  const page = (await fetchData("naklady-page", {
    populate: ["heading", "heading.image", "tabs", "tabs.files"],
  })) as TPage;

  return (
    <>
      <SubpageHeading
        image={page?.heading?.image}
        title={page?.heading?.title}
        description={page?.heading?.description}
      />
      <PageTabs
        tabs={page.tabs}
        className={{
          tabs: {
            tabs_content_description: cn("ea-naklady__content-description"),
          },
        }}
      />
    </>
  );
}
