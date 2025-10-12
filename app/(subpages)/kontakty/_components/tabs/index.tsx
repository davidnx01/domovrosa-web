"use client";

import React from "react";

import type { TGeneral, TMember } from "@/types/general";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { cn } from "@/lib/utils";
import { BillingContent } from "./billing-content";
import { MembersContent } from "./members-content";

export function ContactTabs({
  general,
  members,
}: {
  general: TGeneral;
  members: TMember[];
}) {
  const [activeTab, setActiveTab] = React.useState<string>('Fakturačné údaje');

  return (
    <Tabs
      defaultValue={activeTab}
      onValueChange={(value) => setActiveTab(value)}
      className={cn(
        "custom-section",
        "flex flex-col items-start justify-start gap-12 sm:gap-14 lg:gap-16 pb-16 sm:pb-20 lg:pb-24"
        
      )}
    >
      <TabsList
        className={cn(
          "custom-container",
          "grid grid-cols-2 gap-3 sm:flex items-center justify-start"
        )}
      >
        <TabsTrigger value="Fakturačné údaje" className="col-span-1">
          Fakturačné údaje
        </TabsTrigger>
        <TabsTrigger value="Kontaktné osoby" className="col-span-1">
          Kontaktné osoby
        </TabsTrigger>
      </TabsList>
      <BillingContent general={general} />
      <MembersContent members={members} />
    </Tabs>
  );
}
