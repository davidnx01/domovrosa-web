import Link from "next/link";

import type { TGeneral } from "@/types/general";

import { cn } from "@/lib/utils";
import { CiMobile3 } from "react-icons/ci";
import { BsEnvelope } from "react-icons/bs";
import { LuMapPinned } from "react-icons/lu";

export function ContactCards({ general }: { general: TGeneral }) {
  const cards = [
    {
      value: general?.phone,
      label: "Zavolajte nám",
      href: `tel:${general.phone}`,
      icon: <CiMobile3 className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      value: general?.email,
      label: "Napíšte nám",
      href: `mailto:${general.email}`,
      icon: <BsEnvelope className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
    {
      value: `${general.address}, ${general.city}`,
      label: "Navštívte nás",
      href: `https://www.google.com/maps/place/D%C3%BAbravsk%C3%A1+cesta+3398%2F1,+841+04+Bratislava/@48.1675954,17.0769469,104m/data=!3m1!1e3!4m6!3m5!1s0x476c8c753f555769:0x84eb790b68d7612a!8m2!3d48.1676187!4d17.0772051!16s%2Fg%2F11c0psl__r?entry=ttu&g_ep=EgoyMDI1MTAwNC4wIKXMDSoASAFQAw%3D%3D`,
      icon: <LuMapPinned className="w-8 h-8 sm:w-10 sm:h-10" />,
    },
  ];

  return (
    <section className={cn("custom-section", "py-16 sm:py-20 lg:py-24")}>
      <div
        className={cn(
          "custom-container",
          "grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        )}
      >
        {cards.map((card) => (
          <Link
            prefetch={false}
            key={card.label}
            href={card.href}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full col-span-1 flex items-center justify-start gap-4 bg-primary hover:bg-primary/80 transition-all ease-in-out rounded-[12px] p-6 lg:p-8"
          >
            {card.icon}
            <div className="flex flex-col items-start justify-start gap-0">
              <p className="text-sm sm:text-base font-semibold">{card.value}</p>
              <span className="text-xs sm:text-sm">{card.label}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
