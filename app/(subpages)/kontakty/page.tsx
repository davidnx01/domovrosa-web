import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData, fetchGeneral } from "@/lib/api";
import { TPage } from "@/types/page";
import { ContactCards } from "./_components/contact-cards";
import { TGeneral, TMember } from "@/types/general";
import { ContactTabs } from "./_components/tabs";
import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("contacts-page", { populate: ["seo"] }) as Promise<TPage>,
    fetchGeneral() as Promise<TGeneral>,
  ]);

  return generateSharedMetadata({
    seo: page.seo,
    general,
  });
}

export default async function Page() {
  const page = (await fetchData("contacts-page", {
    populate: ["heading", "heading.image", "seo"],
  })) as TPage;

  const members = (await fetchData("members", {
    populate: ["image"],
  })) as TMember[];

  const general = (await fetchGeneral()) as TGeneral;

  return (
    <>
      <SubpageHeading
        image={page?.heading?.image}
        title={page?.heading?.title}
        description={page?.heading?.description}
      />
      <ContactCards general={general} />
      <ContactTabs general={general} members={members} />
    </>
  );
}
