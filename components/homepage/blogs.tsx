"use client";

import Link from "next/link";

import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { Button } from "../ui/button";
import { Swiper, SwiperSlide } from "swiper/react";

import { BLOGS_CONFIG } from "@/constants/blogs";
import { BlogCard } from "../blog/blog-card";

import "swiper/css";

export function Blogs() {
  return (
    <section className={cn("custom-section", "pb-16 sm:pb-20 lg:pb-24")}>
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12"
        )}
      >
        <div className="w-full flex items-end justify-between">
          <Heading
            subtitle="Inšpirácia a príbehy z našej komunity"
            title="Aktivity a novinky"
          />
          <Button asChild variant={"dark"} className="hidden sm:flex">
            <Link prefetch={false} href={"/fotogaleria"}>
              Všetky fotogalérie
            </Link>
          </Button>
        </div>
        <Swiper
          spaceBetween={16}
          breakpoints={{
            640: {
              spaceBetween: 20
            },
            768: {
              spaceBetween: 24
            },
          }}
        >
          {BLOGS_CONFIG.blogs.map((blog) => (
            <SwiperSlide key={blog.slug} className="max-w-[410px] w-full">
              <BlogCard key={blog.slug} blog={blog} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
