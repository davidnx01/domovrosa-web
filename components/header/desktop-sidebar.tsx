"use client";

import { LuMenu } from "react-icons/lu";
import { Button } from "../ui/button";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";

export function DesktopSidebar() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size={"default-later-icon"}>
          <LuMenu size={24} className="min-w-6 min-h-6" />
          <p className="hidden sm:block text-sm lg:text-base">Menu</p>
        </Button>
      </SheetTrigger>
      <SheetContent>Content</SheetContent>
    </Sheet>
  );
}
