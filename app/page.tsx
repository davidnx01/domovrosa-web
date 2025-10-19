import type { TServiceSection } from "@/types/service";
import type { THomepageSlider } from "@/lib/utils";

import { About } from "@/components/homepage/about";
import { Blogs } from "@/components/homepage/blogs";
import { Hero } from "@/components/homepage/hero";
import { Services } from "@/components/homepage/services";
import { fetchData, fetchGeneral } from "@/lib/api";
import { TAboutSection, TBlogSection } from "@/types/sections";
import { TGallery } from "@/types/gallery";

export default async function Home() {
  const slider = (await fetchData("slider", {
    populate: ["slides.image", "slides.button"],
  })) as THomepageSlider;

  const serviceSection = (await fetchData("service-section", {
    populate: ["heading", "services.icon"],
  })) as TServiceSection;

  const aboutSection = (await fetchData("about-section", {
    populate: ["heading", "image", "benefits"],
  })) as TAboutSection;

  const blogSection = (await fetchData("blog-section", {
    populate: ["heading"],
  })) as TBlogSection;

  const blogs = (await fetchData("fotogalleries", {
    populate: ['image', 'fotogallery_category'],
    sort: "publishedAt:asc",
    pagination: { pageSize: 3 },
  })) as TGallery[];


  return (
    <main>
      <Hero slides={slider.slides} />
      <Services section={serviceSection} />
      <About section={aboutSection} />
      <Blogs section={blogSection} blogs={blogs} />
    </main>
  );
}
