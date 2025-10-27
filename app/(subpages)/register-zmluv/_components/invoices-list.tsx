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

interface LastPageProps {
  meta: TMeta;
  data: TInvoice[];
}

/**
 * Extracts the lowest year from a category name like "2021", "2020-2023", or "2011-2019".
 * If no year is found, returns -Infinity so non-year categories appear last.
 */
function getCategoryYearValue(name: string): number {
  const matches = name.match(/\d{4}/g)?.map(Number);
  return matches ? Math.min(...matches) : -Infinity;
}

export function InvoicesList({ categories }: { categories: TInvoiceCategory[] }) {
  // ✅ Sort categories by year (highest → lowest)
  const sortedCategories = React.useMemo(() => {
    return [...categories].sort(
      (a, b) => getCategoryYearValue(b.name) - getCategoryYearValue(a.name)
    );
  }, [categories]);

  const [activeTab, setActiveTab] = React.useState<string>(sortedCategories[0]?.slug ?? "all");

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
    <section className={cn("custom-section", "pt-12 sm:pt-16 lg:pt-20 pb-10 lg:pb-24")}>
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
            {sortedCategories.map((tab) => (
              <TabsTrigger value={tab.slug} key={tab.slug}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value={activeTab} className={cn("w-full")}>
            <div className="w-full grid grid-cols-1 gap-6 md:grid-cols-2">
              {invoicesQuery.isLoading && <InvoiceListSkeleton amount={7} />}

              {!invoicesQuery.isLoading && !invoicesQuery.error && invoices.length > 0 ? (
                invoices.map((invoice, index) => (
                  <InvoiceCard invoice={invoice} key={`${invoice.code}-${index}`} />
                ))
              ) : (
                <p className="w-full col-span-1 sm:col-span-2 text-center mt-10 mb-40">
                  Žiadne zmluvy neboli nenájdené.
                </p>
              )}
            </div>
          </TabsContent>

          {invoicesQuery.hasNextPage && (
            <div className="w-full flex items-center justify-center">
              <Button
                variant="dark"
                className="cursor-pointer"
                disabled={invoicesQuery.isLoading || invoicesQuery.isFetchingNextPage}
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
