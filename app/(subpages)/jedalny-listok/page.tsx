import type { TPage } from "@/types/page";

import { SubpageHeading } from "@/components/ui/subpage-heading";
import { fetchData } from "@/lib/api";
import { TImage } from "@/lib/utils";
import { Menu } from "./_components/menu";

type TPageWithImage = TPage & {
  images: TImage[];
};

export default async function Page() {
  const page = (await fetchData("jedalny-listok-page", {
    populate: ["heading", "heading.image", "images"],
  })) as TPageWithImage;

  return (
    <>
      <SubpageHeading
        image={page.heading.image}
        title={page.heading.title}
        description={page.heading.description}
      />
      <Menu images={page.images} />
    </>
  );
}
