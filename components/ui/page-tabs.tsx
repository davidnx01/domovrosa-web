"use client";

import Image from "next/image";

import React from "react";

import type { TTab } from "@/types/page";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs";

import { cn } from "@/lib/utils";
import { Paragraph } from "./paragraph";
import { GetStrapiImage } from "@/lib/strapi-image";
import Link from "next/link";

export function PageTabs({ tabs }: { tabs: TTab[] }) {
  const [activeTab, setActiveTab] = React.useState<string>(
    tabs[0]?.id.toString()
  );

  const currentTab = tabs.find((tab) => tab.id.toString() === activeTab);

  console.log(currentTab);

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className={cn(
        "custom-section",
        "pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16 flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12"
      )}
    >
      <TabsList
        className={cn(
          "custom-container",
          "w-full flex items-start justify-start gap-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-hidden max-w-[875px]"
        )}
      >
        {tabs.map((tab) => (
          <TabsTrigger value={tab.id.toString()} key={tab.id}>
            {tab.name}
          </TabsTrigger>
        ))}
      </TabsList>
      <TabsContent
        value={activeTab}
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12"
        )}
      >
        <div className="w-full flex flex-col items-start justify-start gap-12 sm:gap-14 xl:gap-16 md:flex-row md:justify-between">
          {currentTab?.content && (
            <Paragraph
              content={currentTab.content}
              innerHTML
              className={cn("md:max-w-[760px] w-full", "page-tabs__content")}
            />
          )}
          <div className="md:max-w-[531px] w-full flex flex-col items-start justify-start gap-16 lg:gap-20 xl:gap-24">
            {currentTab?.image && (
              <div className="w-full relative">
                <Image
                  src={GetStrapiImage(currentTab.image.url)}
                  alt={currentTab.name}
                  width={0}
                  height={0}
                  className="relative w-full h-auto object-cover object-center z-[1]"
                  sizes="100vw"
                />
                <div className="absolute w-full h-full z-0 bg-secondary -right-3 top-3" />
              </div>
            )}
            {currentTab?.images && currentTab.images.length > 0 && (
              <div className="w-full flex flex-col items-start justify-start gap-4 lg:gap-5">
                <h5 className="text-xl sm:text-2xl lg:text-3xl">Galéria</h5>
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  {currentTab.images.map((image) => (
                    <Image
                      key={image.id}
                      src={GetStrapiImage(image.url)}
                      alt={currentTab.name}
                      width={0}
                      height={0}
                      className="w-full col-span-1 h-[160px] sm:h-[176px] object-cover object-center"
                      sizes="100vw"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        {currentTab?.files && currentTab.files.length > 0 && (
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6">
            {currentTab.files.map((file) => (
              <Link
                key={file.id}
                target="_blank"
                rel="noopener noreferrer"
                href={GetStrapiImage(file.url)}
                className="w-full col-span-1 flex items-center justify-between"
              >
                <p className="text-sm sm:text-base lg:text-lg xl:text-xl">{file.name}</p>
              </Link>
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
}
