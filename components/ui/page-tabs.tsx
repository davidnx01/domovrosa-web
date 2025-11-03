"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";
import { Paragraph } from "./paragraph";
import { GetStrapiImage } from "@/lib/strapi-image";
import { PageTabsSwiper } from "./page-tabs-swiper";
import { RiDownload2Line } from "react-icons/ri";
import { cn, TImage } from "@/lib/utils";
import type { TTab } from "@/types/page";

interface ClassNamesProps {
  tabs?: {
    container?: string;
    tabs_list?: string;
    tabs_trigger?: string;
    tabs_content?: string;
    tabs_content_description?: string;
  };
}

export function PageTabs({
  tabs,
  className,
}: {
  tabs: TTab[];
  className?: ClassNamesProps;
}) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const slugify = React.useCallback((name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/\s+/g, "-")
      .replace(/[^a-z0-9-]/g, "");
  }, []);

  const getInitialTab = React.useCallback(() => {
    if (typeof window === "undefined") return tabs[0]?.id.toString();
    const hash = window.location.hash.replace("#", "");
    if (!hash) return tabs[0]?.id.toString();

    const matchedTab = tabs.find((tab) => slugify(tab.name) === hash);
    return matchedTab ? matchedTab.id.toString() : tabs[0]?.id.toString();
  }, [tabs, slugify]);

  const [activeTab, setActiveTab] = React.useState<string>(getInitialTab);

  // ✅ React to Next.js SPA hash changes (fix bug)
  React.useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const matchedTab = tabs.find((tab) => slugify(tab.name) === hash);

    if (matchedTab) {
      setActiveTab(matchedTab.id.toString());
    } else {
      setActiveTab(tabs[0]?.id.toString());
    }
  }, [pathname, searchParams, tabs, slugify]);

  const handleTabChange = React.useCallback(
    (value: string) => {
      setActiveTab(value);
      const currentTab = tabs.find((tab) => tab.id.toString() === value);
      if (!currentTab) return;

      const hash = slugify(currentTab.name);
      window.history.pushState(null, "", `#${hash}`);
    },
    [tabs, slugify]
  );

  const currentTab = tabs.find((tab) => tab.id.toString() === activeTab);
  const allImages = [currentTab?.image, ...(currentTab?.images || [])].filter(
    (img): img is TImage => Boolean(img)
  );

  return (
    <Tabs
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn(
        "custom-section pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16 flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12 ea-page-tabs__tabs",
        className?.tabs?.container
      )}
    >
      <TabsList
        className={cn(
          "custom-container w-full flex items-start justify-start gap-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-hidden max-w-[875px]",
          className?.tabs?.tabs_list
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger
            value={tab.id.toString()}
            key={tab.id}
            className={cn(className?.tabs?.tabs_trigger)}
          >
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent
        value={activeTab}
        className={cn(
          "custom-container flex flex-col items-start justify-start gap-12 pr-6 md:pr-0",
          className?.tabs?.tabs_content
        )}
      >
        {(currentTab?.content || allImages.length > 0) && (
          <div className="w-full flex flex-col items-start justify-start gap-12 sm:gap-14 xl:gap-16 md:flex-row md:justify-between">
            {currentTab?.content && (
              <Paragraph
                content={currentTab.content}
                innerHTML
                className={cn(
                  "w-full page-tabs__content",
                  className?.tabs?.tabs_content_description,
                  currentTab?.images?.length
                    ? "md:max-w-[760px]"
                    : "md:max-w-[1500px]"
                )}
              />
            )}
            {allImages.length > 0 && <PageTabsSwiper images={allImages} />}
          </div>
        )}

        {currentTab?.files && currentTab?.files?.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentTab.files.map((file) => (
              <Link
                key={file.id}
                target="_blank"
                rel="noopener noreferrer"
                href={GetStrapiImage(file.url)}
                className="w-full col-span-1 flex items-center justify-between bg-white rounded-[8px] p-6 lg:p-8 ea-download-file"
              >
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl">
                  {file.name}
                </p>
                <div className="min-w-12 max-w-12 min-h-12 max-h-12 lg:min-w-[52px] lg:max-w-[52px] lg:min-h-[52px] lg:max-h-[52px] bg-primary/10 text-primary rounded-[4px] hover:bg-primary/25 transition-all flex items-center justify-center">
                  <RiDownload2Line size={24} />
                </div>
              </Link>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
