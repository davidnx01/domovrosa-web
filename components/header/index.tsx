import Link from "next/link";

import { cn } from "@/lib/utils";
import { DesktopSidebar } from "./desktop-sidebar";
import { Button } from "../ui/button";

import { MdOutlinePhoneInTalk } from "react-icons/md";
import { Navbar } from "./navbar";

export async function Header() {
  return (
    <header
      className={cn(
        "custom-section",
        "header-main",
        "flex flex-col items-center justify-center pb-6 border-b border-b-black/15 pt-6"
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
          Logo
        </Link>
        <Button asChild size={"default-later-icon"} variant={"secondary"}>
          <Link prefetch={false} href={"/kontakty"}>
            <MdOutlinePhoneInTalk size={24} />{" "}
            <p className="hidden sm:block text-sm lg:text-base">Kontakty</p>
          </Link>
        </Button>
      </div>
      <Navbar />
    </header>
  );
}
