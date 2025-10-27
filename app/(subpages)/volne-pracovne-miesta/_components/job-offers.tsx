import Link from "next/link";

import type { TJobOffer } from "@/types/general";

import { cn } from "@/lib/utils";

import { BsEnvelope } from "react-icons/bs";
import { MdOutlinePhoneInTalk } from "react-icons/md";

export function JobOffers({ offers }: { offers: TJobOffer[] }) {
  return (
    <section
      className={cn("custom-section", "pt-16 sm:pt-20 lg:pt-24 pb-12 lg:pb-16")}
    >
      <div
        className={cn(
          "custom-container",
          "grid grid-cols-1 md:grid-cols-2 gap-6"
        )}
      >
        {offers.map((offer) => (
          <JobOfferCard key={offer.id} offer={offer} />
        ))}
      </div>
    </section>
  );
}

function JobOfferCard({ offer }: { offer: TJobOffer }) {
  return (
    <div className="w-full col-span-1 rounded-[8px] flex flex-col items-center justify-center border border-[#D8D8D8]">
      <div className="w-full p-4 sm:p-6 lg:p-8 border-b border-b-[#D8D8D8]">
        <div className="w-full h-12 bg-secondary flex items-center justify-center font-semibold text-lg sm:text-xl text-center">
          {offer.role}
        </div>
      </div>
      <div className="w-full p-4 sm:p-6 lg:p-8 border-b border-b-[#D8D8D8] flex flex-col items-start justify-start gap-4 sm:gap-5 lg:gap-6">
        <p className="text-sm sm:text-base">
          <strong>Náplň práce:&nbsp;</strong>
          {offer.job_description}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Termín nástupu:&nbsp;</strong>
          {offer.date_start}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Druh pracovného pomeru:&nbsp;</strong>
          {offer.employment_type}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Požiadavky na uchádzača:&nbsp;</strong>
          {offer.requirements}
        </p>
        <p className="text-sm sm:text-base">
          <strong>Ponúkame:&nbsp;</strong>
          {offer.we_offer}
        </p>
      </div>
      <div className="w-full flex flex-col items-start justify-start p-4 sm:p-5 lg:p-6 gap-1 sm:gap-1.5">
        <p className="text-sm sm:text-base font-semibold">Kontaktná osoba</p>
        <p className="text-sm sm:text-base">{offer.contact_person_name}</p>
        {offer?.contact_person_email && (
          <Link
            prefetch={false}
            href={`mailto:${offer.contact_person_email}`}
            className="text-sm sm:text-base font-semibold text-primary flex items-center justify-start gap-2"
          >
            <BsEnvelope size={24} /> {offer.contact_person_email}
          </Link>
        )}
        {offer?.contact_person_phone && (
          <Link
            prefetch={false}
            href={`tel:${offer.contact_person_phone}`}
            className="text-sm sm:text-base font-semibold text-primary flex items-center justify-start gap-2"
          >
            <MdOutlinePhoneInTalk size={24} /> {offer.contact_person_phone}
          </Link>
        )}
      </div>
    </div>
  );
}