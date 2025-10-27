"use client";

import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { Button } from "@/components/ui/button";
import { OrderCard } from "./order-card";
import { OrderListSkeleton } from "./order-list-skeleton";

import type { TOrder, TOrderCategory } from "@/types/order";
import { type TMeta, fetchClientData } from "@/lib/api";
import { CiSearch } from "react-icons/ci";

interface LastPageProps {
  meta: TMeta;
  data: TOrder[];
}

function getCategoryYearValue(name: string): number {
  const matches = name.match(/\d{4}/g)?.map(Number);
  return matches ? Math.min(...matches) : -Infinity;
}

export function OrdersList({ categories }: { categories: TOrderCategory[] }) {
  const [activeTab, setActiveTab] = React.useState<string>("all");
  const [search, setSearch] = React.useState("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search.trim());
    }, 300);
    return () => clearTimeout(timeout);
  }, [search]);

  const sortedCategories = React.useMemo(() => {
    return [...categories].sort(
      (a, b) => getCategoryYearValue(b.name) - getCategoryYearValue(a.name)
    );
  }, [categories]);

  const ordersQuery = useInfiniteQuery({
    queryKey: ["orders", activeTab, debouncedSearch],
    queryFn: async ({ pageParam = 1 }) => {
      const filters: Record<string, any> = {};

      if (activeTab !== "all") {
        filters.order_category = { slug: { $eq: activeTab } };
      }

      if (debouncedSearch) {
        filters.ico = { $containsi: debouncedSearch };
      }

      const response = await fetchClientData<{
        data: TOrder[];
        meta: TMeta;
      }>("orders", {
        populate: ["order_category"],
        pagination: { page: pageParam, pageSize: 10 },
        filters: Object.keys(filters).length ? filters : undefined,
      });

      return response;
    },
    getNextPageParam: (lastPage: LastPageProps) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const orders = ordersQuery.data?.pages.flatMap((page) => page.data) ?? [];
  const isEmpty =
    !ordersQuery.isLoading && !ordersQuery.error && orders.length === 0;

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
          <TabsList className="w-full flex items-start justify-start gap-3 flex-nowrap sm:flex-wrap overflow-x-auto sm:overflow-x-hidden">
            <TabsTrigger value="all">Všetky</TabsTrigger>
            {sortedCategories.map((tab) => (
              <TabsTrigger value={tab.slug} key={tab.slug}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>

          <div className="relative sm:max-w-[320px] w-full">
            <CiSearch size={20} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 opacity-75" />
          <input
            placeholder="Vyhľadať podľa IČO"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-[480px] w-full px-11 h-11 sm:h-12 border border-black/10 rounded-[4px] text-sm outline-none transition"
          />
          </div>


          <TabsContent value={activeTab} className="w-full">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              {ordersQuery.isLoading && <OrderListSkeleton amount={7} />}

              {!ordersQuery.isLoading &&
                !ordersQuery.error &&
                orders.length > 0 &&
                orders.map((order, index) => (
                  <OrderCard order={order} key={`${order.code}-${index}`} />
                ))}

              {isEmpty && (
                <p className="w-full col-span-1 sm:col-span-2 text-center mt-10 mb-40">
                  Žiadne objednávky neboli nájdené.
                </p>
              )}
            </div>
          </TabsContent>

          {ordersQuery.hasNextPage && (
            <div className="w-full flex items-center justify-center">
              <Button
                variant="dark"
                className="cursor-pointer"
                disabled={
                  ordersQuery.isLoading || ordersQuery.isFetchingNextPage
                }
                onClick={() => ordersQuery.fetchNextPage()}
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
