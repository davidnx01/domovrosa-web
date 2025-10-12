"use client";

import Image from "next/image";
import Link from "next/link";

import type { TMember } from "@/types/general";

import { GetStrapiImage } from "@/lib/strapi-image";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

import { MdOutlinePhoneInTalk } from "react-icons/md";
import { BsEnvelope } from "react-icons/bs";

export function MembersContent({ members }: { members: TMember[] }) {
  return (
    <TabsContent
      value="Kontaktné osoby"
      className={cn(
        "custom-container",
        "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 xl:gap-12"
      )}
    >
      {members.map((member, index) => (
        <MemberCard
          member={member}
          key={`${member.name}-${index}`}
        />
      ))}
    </TabsContent>
  );
}

function MemberCard({ member }: { member: TMember }) {
  const contacts = [
    {
      label: member?.phone_1 ?? null,
      href: `tel:${member.phone_1}`,
      type: "phone",
    },
    {
      label: member?.phone_2 ?? null,
      href: `tel:${member.phone_2}`,
      type: "phone",
    },
    {
      label: member?.email_1 ?? null,
      href: `mailto:${member.email_1}`,
      type: "email",
    },
    {
      label: member?.email_2 ?? null,
      href: `mailto:${member.email_2}`,
      type: "email",
    },
  ];

  return (
    <div
      className={cn(
        "w-full col-span-1 flex flex-col items-start justify-start gap-6 lg:gap-8 xl:flex-row xl:justify-between p-6 lg:p-8 rounded-[12px]",
        "ea-members-card"
      )}
    >
      <Image
        src={GetStrapiImage(member?.image?.url)}
        alt={member?.name}
        width={0}
        height={0}
        className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] rounded-full object-cover"
        sizes="100vw"
      />
      <div className="w-full flex flex-col items-start justify-start gap-4">
        <div className="w-full flex flex-col items-start justify-start gap-0">
          <p className="font-semibold text-primary">{member?.role}</p>
          <h5 className="font-bold">
            {member?.name}
          </h5>
        </div>
        <div className="w-full h-[1px] bg-black/10" />
        <div className="w-full flex flex-col items-start justify-start gap-2">
          {contacts.map((contact) => {
            if (!contact.label) return null;

            return (
              <Link
                prefetch={false}
                key={contact.label}
                href={contact.href}
                className="flex items-center justify-start gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  {contact.type === "phone" ? (
                    <MdOutlinePhoneInTalk size={24} />
                  ) : (
                    <BsEnvelope size={24} />
                  )}
                </div>
                <p className="text-sm sm:text-base">{contact.label}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
