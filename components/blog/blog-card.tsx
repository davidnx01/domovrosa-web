"use client";

import type { TBlog } from "@/types/blog";

import Image from "next/image";
import Link from "next/link";

import { Paragraph } from "../ui/paragraph";
import { Button } from "../ui/button";

export function BlogCard({ blog }: { blog: TBlog }) {
  return (
    <Link
      prefetch={false}
      href={`/${blog.slug}`}
      className="w-full col-span-1 rounded-[8px] overflow-hidden flex flex-col items-start justify-start"
    >
      <div className="w-full h-[220px] sm:h-[240px] relative overflow-hidden">
        {!!blog?.category && (
          <div className="py-1 px-1.5 bg-primary rounded-[2px] text-xs font-semibold uppercase absolute z-10 top-6 left-6">
            {blog?.category.name}
          </div>
        )}
        <div className="absolute w-full h-full inset-0 z-[1] bg-black/20" />
        <Image
          src={blog.image}
          alt={blog.name}
          width={0}
          height={0}
          className="absolute w-full h-full inset-0 object-cover object-center z-0"
          sizes="100vw"
        />
      </div>
      <div className="p-6 w-full flex flex-col items-start justify-start gap-4 border border-[#B9B9B9] rounded-b-[6px] border-t-0">
        <div className="w-full flex flex-col items-start justify-start gap-2">
          <h4 className="text-base sm:text-lg font-semibold line-clamp-2 h-12 sm:h-14">
            {blog.name}
          </h4>
          <Paragraph
            content={blog.content}
            innerHTML
            className="line-clamp-2 text-black/80 w-full max-h-12"
          />
        </div>
        <Button className="w-full">Čítať viac</Button>
      </div>
    </Link>
  );
}
