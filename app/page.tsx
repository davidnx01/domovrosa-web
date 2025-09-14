import { About } from "@/components/homepage/about";
import { Blogs } from "@/components/homepage/blogs";
import { Hero } from "@/components/homepage/hero";
import { Services } from "@/components/homepage/services";
import { fetchData } from "@/lib/api";
import { THomepageSlider } from "@/lib/utils";

export default async function Home() {
  const slider = (await fetchData("slider", {
    populate: ["slides.image"],
  })) as THomepageSlider;

  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Blogs />
    </main>
  );
}
