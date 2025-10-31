"use client";

import React from "react";

import type { TGalleryCategory } from "@/types/gallery";
import type { TGallery } from "@/types/gallery";

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchClientData, TMeta } from "@/lib/api";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { GalleryListSkeleton } from "./gallery-list-skeleton";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { Button } from "@/components/ui/button";

interface GalleryListProps {
  categories: TGalleryCategory[];
}

interface LastPageProps {
  meta: TMeta;
  data: TGallery[];
}

function getCategoryYearValue(name: string): number {
  const matches = name.match(/\d{4}/g)?.map(Number);
  return matches ? Math.min(...matches) : -Infinity;
}

export function GalleryList({ categories }: GalleryListProps) {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const sortedCategories = React.useMemo(() => {
    return [...categories].sort(
      (a, b) => getCategoryYearValue(b.name) - getCategoryYearValue(a.name)
    );
  }, [categories]);

  const galleriesQuery = useInfiniteQuery({
    queryKey: ["fotogalleries", activeTab],
    //@ts-expect-error TS2345
    queryFn: ({ pageParam = 1 }) =>
      fetchClientData<{
        data: {
          pages: {
            data: TGallery[];
          }[];
        };
      }>("fotogalleries", {
        populate: ["image", "fotogallery_category"],
        pagination: { page: pageParam, pageSize: 7 },
        sort: "createdAt:desc",
        filters:
          activeTab !== "all"
            ? { fotogallery_category: { slug: { $eq: activeTab } } }
            : { fotogallery_category: { slug: { $eq: sortedCategories[0]?.slug } } },
      }),
    getNextPageParam: (lastPage: LastPageProps) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const galleries =
    galleriesQuery.data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section
      className={cn("custom-section", "pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-24")}
    >
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12 sm:gap-14 lg:gap-16"
        )}
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
        >
          <TabsList
            className={cn(
              "w-full flex items-start justify-start gap-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-hidden"
            )}
          >
            <TabsTrigger value="all">Všetky</TabsTrigger>
            {sortedCategories.map((tab) => (
              <TabsTrigger value={tab.slug} key={tab.id}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={activeTab}
            className={cn(
              "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            )}
          >
            {galleriesQuery.isLoading && <GalleryListSkeleton amount={7} />}

            {!galleriesQuery.isLoading &&
            !galleriesQuery.error &&
            galleries &&
            galleries.length > 0 ? (
              galleries.map((gallery, index) => (
                <GalleryCard
                  gallery={gallery}
                  key={gallery.id}
                  isFirst={index === 0}
                />
              ))
            ) : (
              <p className="w-full col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-10 mb-40">
                Žiadne galérie neboli nenájdené.
              </p>
            )}

            {galleriesQuery.hasNextPage && (
              <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-center">
                <Button
                  variant={"dark"}
                  className="cursor-pointer"
                  disabled={
                    galleriesQuery.isLoading ||
                    galleriesQuery.isFetchingNextPage
                  }
                  onClick={() => galleriesQuery.fetchNextPage()}
                >
                  Načítať ďalšie
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
