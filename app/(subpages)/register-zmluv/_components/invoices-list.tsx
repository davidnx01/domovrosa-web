"use client";

import React from "react";
import { useInfiniteQuery } from "@tanstack/react-query";

import type { TInvoice, TInvoiceCategory } from "@/types/invoice";
import { type TMeta, fetchClientData } from "@/lib/api";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { InvoiceCard } from "./invoice-card";
import { InvoiceListSkeleton } from "./invoice-list-skeleton";
import Link from "next/link";

interface LastPageProps {
  meta: TMeta;
  data: TInvoice[];
}

function getCategoryYearValue(name: string): number {
  const matches = name.match(/\d{4}/g)?.map(Number);
  return matches ? Math.min(...matches) : -Infinity;
}

export function InvoicesList({
  categories,
}: {
  categories: TInvoiceCategory[];
}) {
  const sortedCategories = React.useMemo(() => {
    return [...categories].sort(
      (a, b) => getCategoryYearValue(b.name) - getCategoryYearValue(a.name)
    );
  }, [categories]);

  const [activeTab, setActiveTab] = React.useState<string>(
    sortedCategories[0]?.slug ?? "all"
  );

  const invoicesQuery = useInfiniteQuery({
    queryKey: ["invoices", activeTab],
    //@ts-expect-error TS2345
    queryFn: ({ pageParam = 1 }) =>
      fetchClientData<{
        data: {
          pages: { data: TInvoice[] }[];
        };
      }>("invoices", {
        populate: ["invoice_category"],
        pagination: { page: pageParam, pageSize: 10 },
        filters:
          activeTab !== "all"
            ? { invoice_category: { slug: { $eq: activeTab } } }
            : undefined,
      }),
    getNextPageParam: (lastPage: LastPageProps) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const invoices = invoicesQuery.data?.pages.flatMap((page) => page.data) ?? [];

  return (
    <section
      className={cn("custom-section", "pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-24")}
    >
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-12 sm:gap-14 lg:gap-16"
        )}
      >
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="w-full flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12 xl:gap-16"
        >
          <TabsList
            className={cn(
              "w-full flex items-start justify-start gap-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-hidden"
            )}
          >
            <TabsTrigger value="2023">2023</TabsTrigger>
            {sortedCategories.map((tab) => (
              <TabsTrigger value={tab.slug} key={tab.slug}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {activeTab === "2023" ? (
            <TabsContent value={activeTab} className={cn("w-full")}>
              <p className="w-full col-span-1 md:col-span-2 mb-4 sm:mb-6 text-center">
                Zmluvy uzatvorené od 1.1.2023 nájdete na
                <Link
                  prefetch={false}
                  href={
                    "https://crz.gov.sk/2171273-sk/centralny-register-zmluv/?art_zs2=&art_predmet=&art_ico=&art_suma_spolu_od=&art_suma_spolu_do=&art_datum_zverejnene_od=&art_datum_zverejnene_do=&art_rezort=0&art_zs1=&nazov=&art_ico1=00603279&odoslat=&ID=2171273&frm_id_frm_filter_3=69026179e33d8&csrt=7752431419772045762"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold text-primary"
                >
                  &nbsp;stránke CRZ&nbsp;
                </Link>
                s vyhľadaním IČO objednávateľa: 00603279
              </p>
            </TabsContent>
          ) : (
            <TabsContent value={activeTab} className={cn("w-full")}>
              <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2">
                {invoicesQuery.isLoading && <InvoiceListSkeleton amount={7} />}
                {!invoicesQuery.isLoading && activeTab === "2022" && (
                  <p className="w-full col-span-1 md:col-span-2 mb-4 sm:mb-6 text-center">
                    Zmluvy uzatvorené po 1.5.2022 nájdete na
                    <Link
                      prefetch={false}
                      href={
                        "https://crz.gov.sk/2171273-sk/centralny-register-zmluv/?art_zs2=&art_predmet=&art_ico=&art_suma_spolu_od=&art_suma_spolu_do=&art_datum_zverejnene_od=&art_datum_zverejnene_do=&art_rezort=0&art_zs1=&nazov=&art_ico1=00603279&odoslat=&ID=2171273&frm_id_frm_filter_3=69026179e33d8&csrt=7752431419772045762"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-bold text-primary"
                    >
                      &nbsp;stránke CRZ&nbsp;
                    </Link>
                    s vyhľadaním IČO objednávateľa: 00603279
                  </p>
                )}
                {!invoicesQuery.isLoading &&
                !invoicesQuery.error &&
                invoices.length > 0 ? (
                  invoices.map((invoice, index) => (
                    <InvoiceCard
                      invoice={invoice}
                      key={`${invoice.code}-${index}`}
                    />
                  ))
                ) : (
                  <p className="w-full col-span-1 sm:col-span-2 text-center mt-10 mb-40">
                    Žiadne zmluvy neboli nenájdené.
                  </p>
                )}
              </div>
            </TabsContent>
          )}

          {invoicesQuery.hasNextPage && (
            <div className="w-full flex items-center justify-center">
              <Button
                variant="dark"
                className="cursor-pointer"
                disabled={
                  invoicesQuery.isLoading || invoicesQuery.isFetchingNextPage
                }
                onClick={() => invoicesQuery.fetchNextPage()}
              >
                Načítať ďalšie
              </Button>
            </div>
          )}
        </Tabs>
      </div>
    </section>
  );
}
