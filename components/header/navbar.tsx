"use client";

import Link from "next/link";

import type { THeaderLink } from "@/types/navigation";

import { ChevronRightIcon } from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { GiKnifeFork } from "react-icons/gi";

export function Navbar({ links }: { links: THeaderLink[] }) {
  return (
    <div
      className={cn(
        "custom-container",
        "flex items-center justify-between w-full"
      )}
    >
      <NavigationMenu viewport={false} className="hidden xl:flex">
        <NavigationMenuList>
          {links.map((link) => (
            <NavigationMenuItem key={link.name}>
              <NavigationMenuTrigger
                hasChilds={!!link.childs && link.childs.length > 0}
              >
                <Link
                  prefetch={false}
                  href={link.link}
                  target={link.isExternal ? "_blank" : "_self"}
                  rel={link.isExternal ? "noopener noreferrer" : undefined}
                >
                  {link.name}
                </Link>
              </NavigationMenuTrigger>
              {link.childs && link.childs.length > 0 && (
                <NavigationMenuContent
                  className={cn(
                    "navbar__navigation-menu-content",
                    "z-30 min-w-[260px] w-max rounded-[8px] p-3 bg-white border border-[#CFCFCF]"
                  )}
                >
                  <ul className="w-full flex flex-col items-start justify-start gap-1">
                    {link.childs.map((child) => (
                      <ListItem
                        key={child.name}
                        title={child.name}
                        href={child.link}
                      />
                    ))}
                  </ul>
                </NavigationMenuContent>
              )}
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>
      <Button asChild variant={'accent'} className="flex sm:hidden xl:flex w-full xl:w-fit">
        <Link
          prefetch={false}
          href={"/jedalny-listok"}
          className="font-medium text-sm lg:text-base text-black whitespace-nowrap bg-primary "
        >
          <GiKnifeFork className="max-w-5 min-w-5 max-h-5 min-h-5" /> Jedálny lístok
        </Link>
      </Button>
    </div>
  );
}

function ListItem({
  title,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props} className="w-full">
      <NavigationMenuLink asChild className="w-full">
        <Link
          href={href}
          className="w-full flex flex-row items-center justify-between"
        >
          <div className="font-medium text-sm lg:text-base text-black whitespace-nowrap">
            {title}
          </div>
          <ChevronRightIcon className="w-5 h-5 text-black" />
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
