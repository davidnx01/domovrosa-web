'use client';

import { TOrder } from "@/types/order";

export function OrderCard({ order }: { order: TOrder; }) {
  return (
    <div>
      {order.code}
    </div>
  );
};