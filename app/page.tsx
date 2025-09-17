import type { TServiceSection } from "@/types/service";
import type { THomepageSlider } from "@/lib/utils";

import { About } from "@/components/homepage/about";
import { Blogs } from "@/components/homepage/blogs";
import { Hero } from "@/components/homepage/hero";
import { Services } from "@/components/homepage/services";
import { fetchData } from "@/lib/api";

export default async function Home() {
  const slider = (await fetchData("slider", {
    populate: ["slides.image"],
  })) as THomepageSlider;

  const serviceSection = (await fetchData("service-section", {
    populate: [
      "heading",
      "services.icon",
    ],
  })) as TServiceSection;

  return (
    <main>
      <Hero slides={slider.slides} />
      <Services section={serviceSection} />
      <About />
      <Blogs />
    </main>
  );
}
