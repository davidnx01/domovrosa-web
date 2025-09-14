import { About } from "@/components/homepage/about";
import { Blogs } from "@/components/homepage/blogs";
import { Hero } from "@/components/homepage/hero";
import { Services } from "@/components/homepage/services";

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <About />
      <Blogs />
    </main>
  );
}
