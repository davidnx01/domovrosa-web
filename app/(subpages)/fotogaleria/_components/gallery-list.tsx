"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { GalleryCard } from "@/components/gallery/gallery-card";
import { GalleryListSkeleton } from "./gallery-list-skeleton";
import { fetchClientData, TMeta } from "@/lib/api";

import type { TGalleryCategory, TGallery } from "@/types/gallery";

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
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const sortedCategories = React.useMemo(() => {
    return [...categories].sort(
      (a, b) => getCategoryYearValue(b.name) - getCategoryYearValue(a.name)
    );
  }, [categories]);

  const getInitialTab = React.useCallback(() => {
    if (typeof window === "undefined") return "all";
    const hash = window.location.hash.replace("#", "");
    if (!hash) return "all";

    const matched = sortedCategories.find((c) => c.slug === hash);
    return matched ? matched.slug : "all";
  }, [sortedCategories]);

  const [activeTab, setActiveTab] = React.useState<string>(getInitialTab);

  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const matched = sortedCategories.find((c) => c.slug === hash);

    if (matched) {
      setActiveTab(matched.slug);
    } else {
      setActiveTab("all");
    }
  }, [pathname, searchParams, sortedCategories]);

  const handleTabChange = React.useCallback((value: string) => {
    setActiveTab(value);
    const hash = value === "all" ? "" : `#${value}`;
    window.history.pushState(null, "", `${window.location.pathname}${hash}`);
  }, []);

  const galleriesQuery = useInfiniteQuery({
    queryKey: ["fotogalleries", activeTab],
    //@ts-expect-error TS2345
    queryFn: ({ pageParam = 1 }) =>
      fetchClientData<{
        data: { pages: { data: TGallery[] }[] };
      }>("fotogalleries", {
        populate: ["image", "fotogallery_category"],
        pagination: { page: pageParam, pageSize: 7 },
        sort: "createdAt:desc",
        filters:
          activeTab !== "all"
            ? { fotogallery_category: { slug: { $eq: activeTab } } }
            : {
                fotogallery_category: {
                  slug: { $eq: sortedCategories[0]?.slug },
                },
              },
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
          onValueChange={handleTabChange}
          className="w-full flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
        >
          <TabsList className="w-full flex items-start justify-start gap-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-hidden">
            <TabsTrigger value="all">Všetky</TabsTrigger>
            {sortedCategories.map((tab) => (
              <TabsTrigger value={tab.slug} key={tab.id}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent
            value={activeTab}
            className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {galleriesQuery.isLoading && <GalleryListSkeleton amount={7} />}

            {!galleriesQuery.isLoading &&
            !galleriesQuery.error &&
            galleries.length > 0 ? (
              galleries.map((gallery, index) => (
                <GalleryCard
                  key={gallery.id}
                  gallery={gallery}
                  isFirst={index === 0}
                />
              ))
            ) : (
              <p className="w-full col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-10 mb-40">
                Žiadne galérie neboli nájdené.
              </p>
            )}

            {galleriesQuery.hasNextPage && (
              <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-center">
                <Button
                  variant="dark"
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
