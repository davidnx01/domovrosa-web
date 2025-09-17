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
import { TGeneral } from "@/types/general";

export async function Header({ general }: { general: TGeneral }) {
  const navigation = (await fetchData("navigation", {
    populate: ["header_links.childs"],
  })) as TNavigation;

  return (
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
        <DesktopSidebar />
        <Link prefetch={false} href={"/"}>
          <Image
            src={GetStrapiImage(general.logo.url)}
            alt={"DomovROSA logo"}
            width={131}
            height={64}
          />
        </Link>
        <Button asChild size={"default-later-icon"} variant={"secondary"}>
          <Link prefetch={false} href={"/kontakty"}>
            <MdOutlinePhoneInTalk size={24} className="min-w-6 min-h-6" />{" "}
            <p className="hidden sm:block text-sm lg:text-base">Kontakty</p>
          </Link>
        </Button>
      </div>
      <div className={cn("custom-container", "bg-black/15 h-[1px]")} />
      <Navbar links={navigation.header_links} />
    </header>
  );
}
