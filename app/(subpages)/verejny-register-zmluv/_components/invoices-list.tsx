'use client';

import React from "react";

import { useInfiniteQuery } from "@tanstack/react-query";
import { TMeta, fetchClientData } from "@/lib/api";
import { TOrder, TOrderCategory } from "@/types/order";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { OrderListSkeleton } from "./order-list-skeleton";
import { Button } from "@/components/ui/button";
import { OrderCard } from "./invoice-card";

interface GalleryListProps {
  categories: TOrderCategory[];
}

interface LastPageProps {
  meta: TMeta;
  data: TOrder[];
}

export function InvoicesList({ categories }: { categories: TOrderCategory[]; }) {
  const [activeTab, setActiveTab] = React.useState<string>("all");

  const ordersQuery = useInfiniteQuery({
    queryKey: ["orders", activeTab],
    //@ts-expect-error TS2345
    queryFn: ({ pageParam = 1 }) =>
      fetchClientData<{
        data: {
          pages: {
            data: TOrder[];
          }[];
        };
      }>("orders", {
        populate: ["order_category"],
        pagination: { page: pageParam, pageSize: 10 },
        filters:
          activeTab !== "all"
            ? { order_category: { slug: { $eq: activeTab } } }
            : undefined,
      }),
    getNextPageParam: (lastPage: LastPageProps) => {
      const { page, pageCount } = lastPage.meta.pagination;
      return page < pageCount ? page + 1 : undefined;
    },
    initialPageParam: 1,
  });

  const orders =
  ordersQuery.data?.pages.flatMap((page) => page.data) ?? [];

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
            <TabsTrigger value="all">Všetky</TabsTrigger>
            {categories.map((tab) => (
              <TabsTrigger value={tab.slug} key={tab.slug}>
                {tab.name}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent
            value={activeTab}
            className={cn(
              "w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
            )}
          >
            {ordersQuery.isLoading && <OrderListSkeleton amount={7} />}
            {!ordersQuery.isLoading &&
            !ordersQuery.error &&
            orders &&
            orders.length > 0 ? (
              orders.map((order, index) => (
                <OrderCard
                  order={order}
                  key={`${order.code}-${index}`}
                />
              ))
            ) : (
              <p className="w-full col-span-1 sm:col-span-2 lg:col-span-3 text-center mt-10 mb-40">
                Žiadne zmluvy neboli nenájdené.
              </p>
            )}
            {ordersQuery.hasNextPage && (
              <div className="w-full col-span-1 sm:col-span-2 lg:col-span-3 flex items-center justify-center">
                <Button
                  variant={"dark"}
                  className="cursor-pointer"
                  disabled={
                    ordersQuery.isLoading ||
                    ordersQuery.isFetchingNextPage
                  }
                  onClick={() => ordersQuery.fetchNextPage()}
                >
                  Načítať ďalšie
                </Button>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}