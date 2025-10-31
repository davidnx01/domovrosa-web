"use client";

import React from "react";
import Link from "next/link";
import type { THeaderLink } from "@/types/navigation";

import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";

import { LuMenu, LuX } from "react-icons/lu";
import { MdKeyboardArrowDown } from "react-icons/md";

export function DesktopSidebar({
  headerLinks,
  sidebarLinks,
}: {
  headerLinks: THeaderLink[];
  sidebarLinks: THeaderLink[];
}) {
  return (
    <Sheet>
      <SheetTrigger asChild className="cursor-pointer">
        <Button size="default-later-icon">
          <LuMenu size={24} className="min-w-6 min-h-6" />
          <p className="hidden sm:block text-sm lg:text-base">Menu</p>
        </Button>
      </SheetTrigger>

      <SheetContent
        side="left"
        className="w-full max-w-[500px] sm:max-w-[500px] p-0 flex gap-0 flex-col items-start justify-start overflow-y-auto pb-8"
      >
        {/* Header */}
        <div className="w-full flex items-center justify-between py-6 px-8">
          <SheetTitle className="text-3xl font-semibold">Menu</SheetTitle>
          <SheetClose className="cursor-pointer hover:opacity-80 transition-all">
            <LuX size={24} className="opacity-75" />
          </SheetClose>
        </div>

        <div className="w-full h-[1px] bg-black/20" />
        <Accordion
          type="single"
          collapsible
          className="w-full hidden xl:flex flex-col items-start justify-start gap-0 px-8 mt-8"
        >
          {" "}
          {sidebarLinks.map(link => {
            const hasChildren = link.childs && link.childs.length > 0;

            return (
              <SidebarItem
                key={link.name}
                link={link}
                hasChildren={hasChildren!}
              />
            );
          })}{" "}
        </Accordion>

        <div className="w-full flex xl:hidden flex-col items-start justify-start gap-2 px-8 mt-8">
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="menu">
              <AccordionTrigger className="text-xl font-semibold">
                Menu
                <MdKeyboardArrowDown
                  size={24}
                  className="text-secondary transition-all"
                />
              </AccordionTrigger>
              <AccordionContent className="mt-2">
                <div className="flex flex-col gap-2 pl-4">
                  {sidebarLinks.map((link) => {
                    const hasChildren = link.childs && link.childs.length > 0;
                    return (
                      <SidebarItem
                        key={link.name}
                        link={link}
                        hasChildren={hasChildren!}
                      />
                    );
                  })}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <Accordion type="multiple" className="w-full">
            <AccordionItem value="navigacia">
              <AccordionTrigger className="text-xl font-semibold">
                Navigácia
                <MdKeyboardArrowDown
                  size={24}
                  className="text-secondary transition-all"
                />
              </AccordionTrigger>
              <AccordionContent className="mt-2">
                <div className="flex flex-col gap-2 pl-4">
                  {headerLinks.map((link) => (
                    <SheetClose asChild key={link.name}>
                      <Link
                        prefetch={false}
                        href={link.link}
                        target={link.isExternal ? "_blank" : "_self"}
                        className="text-lg"
                      >
                        {link.name}
                      </Link>
                    </SheetClose>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </SheetContent>
    </Sheet>
  );
}

function SidebarItem({
  link,
  hasChildren,
}: {
  link: THeaderLink;
  hasChildren: boolean;
}) {
  return (
    <AccordionItem
      key={link.name}
      value={link.name}
      className="w-full border-b-0"
    >
      {hasChildren ? (
        <>
          <AccordionTrigger
            className={cn(
              "w-full flex items-center justify-between py-1.5 sm:py-3 text-left no-underline cursor-pointer text-lg font-normal",
              "ea-desktop-sidebar__accordion-trigger"
            )}
          >
            {link.name}
            <MdKeyboardArrowDown
              size={20}
              className="text-primary transition-all"
            />
          </AccordionTrigger>
          <AccordionContent className="pl-6 flex flex-col gap-3 mt-2">
            {link.childs?.map((child) => (
              <SheetClose asChild key={child.name}>
                <Link
                  prefetch={false}
                  href={child.link}
                  target={child.isExternal ? "_blank" : "_self"}
                  className="text-base"
                >
                  {child.name}
                </Link>
              </SheetClose>
            ))}
          </AccordionContent>
        </>
      ) : (
        <SheetClose asChild>
          <Link
            prefetch={false}
            href={link.link}
            target={link.isExternal ? "_blank" : "_self"}
            className="block py-3 text-lg"
          >
            {link.name}
          </Link>
        </SheetClose>
      )}
    </AccordionItem>
  );
}
