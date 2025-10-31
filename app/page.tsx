import type { THomepageSlider } from "@/lib/utils";

import { About } from "@/components/homepage/about";
import { Blogs } from "@/components/homepage/blogs";
import { Hero } from "@/components/homepage/hero";
import { fetchData, fetchGeneral } from "@/lib/api";
import { TAboutSection, TBlogSection } from "@/types/sections";
import { TGallery } from "@/types/gallery";
import { TPage } from "@/types/page";
import { TGeneral } from "@/types/general";

import { generateMetadata as generateSharedMetadata } from "@/hooks/generate-metadata";

export async function generateMetadata() {
  const [page, general] = await Promise.all([
    fetchData("homepage", { populate: ["seo", "seo.open_graph"] }) as Promise<TPage>,
    fetchGeneral() as Promise<TGeneral>,
  ]);

  return generateSharedMetadata({
    seo: page.seo,
    general,
  });
}

export default async function Home() {
  const slider = (await fetchData("slider", {
    populate: ["slides.image", "slides.button"],
  })) as THomepageSlider;

  const aboutSection = (await fetchData("about-section", {
    populate: ["heading", "image", "benefits"],
  })) as TAboutSection;

  const blogSection = (await fetchData("blog-section", {
    populate: ["heading"],
  })) as TBlogSection;

  const blogs = (await fetchData("fotogalleries", {
    populate: ['image', 'fotogallery_category'],
    sort: "createdAt:desc",
    filters: { fotogallery_category: { slug: { $eq: "2025" } } },
    pagination: { pageSize: 3 },
  })) as TGallery[];

  return (
    <main>
      <Hero slides={slider.slides} />
      <About section={aboutSection} />
      <Blogs section={blogSection} blogs={blogs} />
    </main>
  );
}
