"use client";

import Link from "next/link";

import type { TBlogSection } from "@/types/sections";
import type { TBlog } from "@/types/blog";

import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

import { BlogCard } from "../blog/blog-card";

import "swiper/css";

export function Blogs({
  section,
  blogs,
}: {
  section: TBlogSection;
  blogs: TBlog[];
}) {
  console.log(blogs);

  return (
    <section className={cn("custom-section", "pb-16 sm:pb-20 lg:pb-24 pt-8")}>
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12"
        )}
      >
        <div className="w-full flex items-end justify-between">
          <Heading
            subtitle={section.heading?.subtitle || "Novinky"}
            title={section.heading?.title || "Z nášho blogu"}
          />
          <Button asChild variant={"dark"} className="hidden sm:flex">
            <Link prefetch={false} href={"/fotogaleria"}>
              Všetky fotogalérie
            </Link>
          </Button>
        </div>
        <Swiper
          spaceBetween={16}
          slidesPerView={"auto"}
          className={cn("w-full", "mySwiper")}
          breakpoints={{
            640: {
              spaceBetween: 20,
            },
            768: {
              spaceBetween: 24,
            },
          }}
        >
          {blogs.map((blog) => (
            <SwiperSlide key={blog.slug} className="max-w-[410px] w-full">
              <BlogCard key={blog.slug} blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
        <Button asChild variant={"dark"} className="flex sm:hidden w-full">
          <Link prefetch={false} href={"/fotogaleria"}>
            Všetky fotogalérie
          </Link>
        </Button>
      </div>
    </section>
  );
}
