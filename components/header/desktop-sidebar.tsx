"use client";

import React from "react";

import type { THeaderLink } from "@/types/navigation";

import Link from "next/link";

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
        <Button size={"default-later-icon"}>
          <LuMenu size={24} className="min-w-6 min-h-6" />
          <p className="hidden sm:block text-sm lg:text-base">Menu</p>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-[500px] sm:max-w-[500px] p-0 flex flex-col items-start justify-start gap-0 overflow-y-auto pb-8"
      >
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
          className="w-full flex flex-col items-start justify-start gap-0 px-8 mt-8"
        >
          {sidebarLinks.map((link, index) => {
            const hasChildren = link.childs && link.childs.length > 0;
            const isLast = index === sidebarLinks.length - 1;

            return (
              <SidebarItem
                key={link.name}
                link={link}
                hasChildren={hasChildren!}
              />
            );
          })}
        </Accordion>
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
        <AccordionTrigger
          className={cn(
            "w-full flex items-center justify-between py-3 text-left no-underline cursor-pointer",
            "ea-desktop-sidebar__accordion-trigger"
          )}
        >
          <SheetClose asChild className="w-fit">
            <Link prefetch={false} href={link.link} className="text-xl">
              {link.name}
            </Link>
          </SheetClose>{" "}
          {hasChildren && (
            <MdKeyboardArrowDown
              size={20}
              className="text-primary transition-all"
            />
          )}
        </AccordionTrigger>
      ) : (
        <Link
          prefetch={false}
          href={link.link}
          className="w-full flex items-center justify-between text-left"
        >
          <SheetClose asChild className="w-full">
            <AccordionTrigger
              className={cn(
                "w-full flex items-center justify-center py-3 text-left text-xl no-underline cursor-pointer",
                "ea-desktop-sidebar__accordion-trigger"
              )}
            >
              {link.name}{" "}
              {hasChildren && (
                <MdKeyboardArrowDown
                  size={20}
                  className="text-primary transition-all"
                />
              )}
            </AccordionTrigger>
          </SheetClose>
        </Link>
      )}
      {hasChildren && (
        <AccordionContent className="w-full pl-6 flex flex-col items-start justify-start gap-3 mt-2">
          {link.childs?.map((child) => (
            <SheetClose asChild key={child.name} className="w-full">
              <Link
                target={child.isExternal ? "_blank" : "_self"}
                prefetch={false}
                href={child.link}
                className="text-lg"
              >
                {child.name}
              </Link>
            </SheetClose>
          ))}
        </AccordionContent>
      )}
    </AccordionItem>
  );
}
