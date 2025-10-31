import Image from "next/image";
import Link from "next/link";

import { GetStrapiImage } from "@/lib/strapi-image";
import { fetchData } from "@/lib/api";
import { cn } from "@/lib/utils";

import { DesktopSidebar } from "./desktop-sidebar";
import { Button } from "../ui/button";

import { MdOutlinePhoneInTalk } from "react-icons/md";
import { Navbar } from "./navbar";
import { TNavigation } from "@/types/navigation";

import type { TGeneral } from "@/types/general";

export async function Header({ general }: { general: TGeneral }) {
  const navigation = (await fetchData("navigation", {
    populate: ["header_links.childs", "sidebar_links.childs"],
  })) as TNavigation;

  const headerLinks = navigation.header_links;
  const sidebarLinks = navigation.sidebar_links;

  return (
    <>
      <Link
        prefetch={false}
        href={"https://bratislavskykraj.sk/"}
        target="_blank"
        className="w-full py-1.5 sm:py-2 flex items-center justify-center gap-2 border-b border-b-black/15"
      >
        <p className="text-xs sm:text-sm font-medium text-black/70">
          Zriaďovateľ:
        </p>{" "}
        <Image
          src={"/bsk.png"}
          alt="Bratislavský samosprávny kraj"
          height={0}
          width={0}
          sizes="100vw"
          className="h-8 w-auto"
        />
      </Link>
      <header
        className={cn(
          "custom-section",
          "header-main",
          "flex flex-col items-center gap-5 justify-center pb-6 border-b border-b-black/15 pt-6"
        )}
      >
        <div
          className={cn(
            "custom-container",
            "flex items-center justify-between gap-4"
          )}
        >
          <DesktopSidebar
            headerLinks={headerLinks}
            sidebarLinks={sidebarLinks}
          />
          <Link
            prefetch={false}
            href={"/"}
            className="relative hover:opacity-85 transition-all"
          >
            <Image
              src={GetStrapiImage(general.logo.url)}
              alt={"ZSS Rosa"}
              width={131}
              height={64}
              className="max-h-14 sm:max-h-16 min-h-14 sm:min-h-[74px] w-auto object-contain relative z-10"
              sizes="300px"
            />
            <p className="bg-primary py-1.5 px-3 rounded-[4px] whitespace-nowrap text-xs sm:text-sm z-[1] mt-1 sm:mt-2">
              Všetci môžu rásť...
            </p>
          </Link>
          <Button asChild size={"default-later-icon"} variant={"secondary"}>
            <Link prefetch={false} href={"/kontakty"}>
              <MdOutlinePhoneInTalk size={24} className="min-w-6 min-h-6" />{" "}
              <p className="hidden sm:block text-sm lg:text-base">Kontakty</p>
            </Link>
          </Button>
        </div>
        <div
          className={cn(
            "custom-container",
            "bg-black/15 h-[1px] hidden xl:block"
          )}
        />
        <Navbar links={headerLinks} />
      </header>
    </>
  );
}
