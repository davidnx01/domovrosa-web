import Image from "next/image";

import { Paragraph } from "./paragraph";
import { cn, type TImage } from "@/lib/utils";
import { GetStrapiImage } from "@/lib/strapi-image";

export interface SubpageHeadingProps {
  title: string;
  description?: string;
  image: TImage;
}

export function SubpageHeading({
  title,
  description,
  image,
}: SubpageHeadingProps) {
  return (
    <section
      className={cn(
        "custom-section",
        "h-[330px] sm:h-[360px] lg:h-[390px] relative pt-8 sm:pt-10 lg:pt-12"
      )}
    >
      <div
        className={cn(
          "custom-container",
          "flex flex-col items-start justify-start gap-4 sm:gap-5 relative z-10"
        )}
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-black max-w-[900px] w-full">
          {title}
        </h2>
        {description && (
          <Paragraph
            content={description}
            className="text-black text-sm sm:text-base lg:text-lg max-w-[766px] w-full"
          />
        )}
      </div>
      <div className="absolute z-[1] w-full h-full bg-white/35 inset-0" />
      <Image 
        src={GetStrapiImage(image.url)}
        alt={title}
        width={0}
        height={0}
        className="absolute w-full h-full object-cover object-center inset-0"
        sizes="100vw"
        priority
        loading="eager"
      />
    </section>
  );
};