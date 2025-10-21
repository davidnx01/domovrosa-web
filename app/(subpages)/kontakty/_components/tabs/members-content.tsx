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
  const orderedMembers = [...members].sort((a, b) =>
    a.id === 33 ? -1 : b.id === 33 ? 1 : 0
  );

  return (
    <TabsContent
      value="Kontaktné osoby"
      className={cn(
        "custom-container",
        "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 xl:gap-12"
      )}
    >
      {orderedMembers.map((member, index) => (
        <MemberCard key={`${member.id}-${index}`} member={member} />
      ))}
    </TabsContent>
  );
}

function MemberCard({ member }: { member: TMember }) {
  const contacts = [
    member?.phone_1 && {
      label: member.phone_1,
      href: `tel:${member.phone_1}`,
      type: "phone",
    },
    member?.phone_2 && {
      label: member.phone_2,
      href: `tel:${member.phone_2}`,
      type: "phone",
    },
    member?.email_1 && {
      label: member.email_1,
      href: `mailto:${member.email_1}`,
      type: "email",
    },
    member?.email_2 && {
      label: member.email_2,
      href: `mailto:${member.email_2}`,
      type: "email",
    },
  ].filter(Boolean) as {
    label: string;
    href: string;
    type: "phone" | "email";
  }[];

  return (
    <div
      className={cn(
        "w-full col-span-1 flex flex-col items-start justify-start gap-6 lg:gap-8 xl:flex-row xl:justify-between p-6 lg:p-8 rounded-[12px]",
        "ea-members-card"
      )}
    >
      {member?.image?.url && (
        <Image
          src={GetStrapiImage(member.image.url)}
          alt={member.name}
          width={100}
          height={100}
          className="min-w-[100px] max-w-[100px] min-h-[100px] max-h-[100px] rounded-full object-cover"
        />
      )}

      <div className="w-full flex flex-col items-start justify-start gap-4">
        <div className="w-full flex flex-col items-start justify-start gap-0">
          {member?.role && (
            <p className="font-semibold text-primary">{member.role}</p>
          )}
          <h5 className="font-bold">{member?.name}</h5>
        </div>

        <div className="w-full h-[1px] bg-black/10" />

        <div className="w-full flex flex-col items-start justify-start gap-2">
          {contacts.map((contact) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}
