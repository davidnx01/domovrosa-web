import Image from "next/image";

import type { TService, TServiceSection } from "@/types/service";

import { Heading } from "../ui/heading";
import { cn } from "@/lib/utils";
import { Paragraph } from "../ui/paragraph";
import { GetStrapiImage } from "@/lib/strapi-image";


export function Services({ section }: { section: TServiceSection }) {
  return (
    <section
      className={cn("custom-section", "py-12 sm:py-16 lg:py-20 bg-primary/10")}
    >
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-8 sm:gap-10 lg:gap-12"
        )}
      >
        <div className="w-full flex flex-col items-start justify-start gap-6">
          <Heading
            subtitle={section.heading.subtitle}
            title={section.heading.title}
          />
          <div className="w-full flex items-end justify-between">
            <Paragraph
              content={section.description}
              className="max-w-[766px] w-full"
            />
            {/* <Button className="hidden md:flex">Zobraziť služby</Button> */}
          </div>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-10 lg:gap-12">
          {section.services.map((service) => (
            <ServiceCard key={service.name} service={service} />
          ))}
        </div>
        {/* <Button className="flex w-full sm:w-auto md:hidden">
          Zobraziť služby
        </Button> */}
      </div>
    </section>
  );
}

function ServiceCard({ service }: { service: TService }) {
  return (
    <div className="w-full col-span-1 flex flex-col items-start gap-6 justify-start bg-white p-6 md:p-8 rounded-[8px] border border-[#D8D8D8]">
      <div className="w-full flex flex-col items-start justify-start gap-4">
        <Image
          src={GetStrapiImage(service.icon.url)}
          alt={service.name}
          width={64}
          height={64}
          className="min-w-16 max-w-16 min-h-16 max-h-16 object-contain"
        />
        <h3 className="text-lg font-medium md:text-xl lg:text-2xl">
          {service.name}
        </h3>
      </div>
      <Paragraph content={service.description} />
    </div>
  );
}
