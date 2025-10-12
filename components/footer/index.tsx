import Image from "next/image";
import Link from "next/link";

import type { TGeneral } from "@/types/general";

import { fetchData } from "@/lib/api";
import { TFooterSection } from "@/types/sections";
import { cn } from "@/lib/utils";
import { Heading } from "../ui/heading";
import { PartnersSwiper } from "./partners-swiper";
import { GetStrapiImage } from "@/lib/strapi-image";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { BsEnvelopeAt } from "react-icons/bs";

export async function Footer({ general }: { general: TGeneral }) {
const footerSection = (await fetchData("footer-section", {
  populate: ["heading", "partners", "partners.image", "menus", "menus.items"],
})) as TFooterSection;

  return (
    <footer
      className={cn(
        "pt-12 sm:pt-16 lg:pt-20 flex flex-col items-center justify-center gap-16 sm:gap-20 bg-secondary/10 pb-12 sm:pb-16"
      )}
    >
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-center justify-center gap-10 sm:gap-12"
        )}
      >
        <Heading
          subtitle={footerSection?.heading?.subtitle}
          title={footerSection?.heading?.title}
          className={{
            container: "items-center justify-center text-center px-6",
          }}
        />
        <PartnersSwiper partners={footerSection?.partners} />
      </div>
      <div className={cn("custom-section")}>
        <div
          className={cn(
            "custom-container",
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          )}
        >
          <div className="w-full col-span-1 flex flex-col items-start justify-start gap-14 md:gap-16">
            <div className="w-full flex flex-col items-start justify-start gap-6 md:gap-8">
              <Link prefetch={false} href={"/"}>
                <Image
                  src={GetStrapiImage(general?.logo?.url)}
                  alt="Domov ROSA"
                  width={0}
                  height={0}
                  className="h-auto max-w-24 md:max-w-28 lg:max-w-[140px] min-w-24 md:min-w-28 lg:min-w-[140px] w-full"
                  sizes="100vw"
                />
              </Link>
              <p className="text-sm sm:text-base">
                Kontaktujte nás:{" "}
                <Link
                  prefetch={false}
                  href={`mailto:${general.email}`}
                  className="font-bold"
                  target="_blank"
                >
                  {general.email}
                </Link>
              </p>
              <div className="flex items-start justify-start gap-3.5">
                <p className="text-black/70 text-sm md:text-base">
                  Zriaďovateľ:
                </p>
                <Link
                  prefetch={false}
                  href={"https://bratislavskykraj.sk/"}
                  target="_blank"
                >
                  <Image
                    src={"/bsk.png"}
                    alt="Bratislavský samosprávny kraj"
                    width={154}
                    height={53}
                  />
                </Link>
              </div>
            </div>
            <p className="hidden sm:block">&copy; DomovROSA, {new Date().getFullYear()}</p>
          </div>
          {footerSection.menus.map((menu) => (
            <div
              key={menu.name}
              className="w-full col-span-1 flex flex-col items-start justify-start gap-4"
            >
              <h4 className="font-bold text-sm sm:text-base xl:text-lg">
                {menu.name}
              </h4>
              <div className="w-full flex flex-col items-start justify-start gap-2.5">
                {menu.items.map((item) => (
                  <Link
                    key={item.name}
                    prefetch={false}
                    href={item.link}
                    className="text-sm sm:text-base text-black/70 transition-all hover:text-black/50"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <div className="w-full col-span-1 flex flex-col items-start justify-start gap-4">
            <h4 className="font-bold text-sm sm:text-base xl:text-lg">
              Kontakt
            </h4>
            <div className="flex flex-col gap-2.5 w-full">
              <Link
                prefetch={false}
                target="_blank"
                href={`tel:${general.phone}`}
                className="flex items-center justify-start gap-2.5 text-sm sm:text-base hover:opacity-70 transition-all"
              >
                <MdOutlinePhoneInTalk size={24} />
                <p className="text-black/70">{general.phone}</p>
              </Link>
              <Link
                prefetch={false}
                target="_blank"
                href={`mailto:${general.email}`}
                className="flex items-center justify-start gap-2.5 text-sm sm:text-base hover:opacity-70 transition-all"
              >
                <BsEnvelopeAt size={24} />
                <p className="text-black/70">{general.email}</p>
              </Link>
            </div>
          </div>
          <p className="block sm:hidden">&copy; DomovROSA, {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
