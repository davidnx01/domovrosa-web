import { PageTabs } from "@/components/ui/page-tabs";
import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { TPage } from "@/types/page";
import { JobOffers } from "./_components/job-offers";

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
