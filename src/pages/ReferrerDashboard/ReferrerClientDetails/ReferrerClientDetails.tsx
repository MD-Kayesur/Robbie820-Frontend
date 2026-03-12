// src/pages/ReferrerDashboard/ReferrerClientDetails/ReferrerClientDetails.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleDollarSign,
  Clock3,
  FileText,
  Info,
  Mail,
  Phone,
  ReceiptText,
} from "lucide-react";
import { clientDetailsMock } from "./mock";
import type { ClientContactItem, ClientProgressStep, IconMap } from "./types";
import { cn } from "@/hooks/useCn";

const progressIcons: IconMap = {
  file: FileText,
  clock: Clock3,
  check: Check,
  dollar: CircleDollarSign,
};

const contactIcons: IconMap = {
  mail: Mail,
  phone: Phone,
  calendar: CalendarDays,
};

function SectionCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn("rounded-xl border border-[#E6E6E6] bg-white", className)}
    >
      {children}
    </div>
  );
}

function ProgressStepCard({ item }: { item: ClientProgressStep }) {
  const Icon = progressIcons[item.icon] ?? FileText;

  return (
    <div
      className={cn(
        "flex min-h-33 flex-col items-center justify-center rounded-xl border px-4 py-5 text-center transition",
        item.tone === "beige"
          ? "border-[#E7E0D3] bg-[#F6F1E8]"
          : "border-[#CBEAFB] bg-[#EAF7FE]",
      )}
    >
      <div className="mb-5 grid h-9 w-9 place-items-center rounded-full bg-[#15A9F4] text-white">
        <Icon className="h-4.5 w-4.5" strokeWidth={2.1} />
      </div>

      <p className="text-[14px] font-medium uppercase leading-5 text-black">
        {item.title}
      </p>
      <p className="mt-2 text-[13px] text-[#808080]">{item.date}</p>
    </div>
  );
}

function formatContactHref(item: ClientContactItem) {
  if (item.icon === "mail") return `mailto:${item.value}`;
  if (item.icon === "phone") return `tel:${item.value.replace(/\s+/g, "")}`;
  return null;
}

function ContactRow({ item }: { item: ClientContactItem }) {
  const Icon = contactIcons[item.icon] ?? Mail;
  const href = formatContactHref(item);

  return (
    <div className="flex items-start gap-3">
      <div className="grid h-8 w-8 shrink-0 place-items-center rounded-sm border border-[#D7D7D7] bg-[#F9F9F9] text-[#3B3B3B]">
        <Icon className="h-4.5 w-4.5" strokeWidth={1.9} />
      </div>

      <div className="min-w-0">
        <p className="text-[13px] font-medium uppercase leading-4 text-[#2F2F2F]">
          {item.label}
        </p>

        {href ? (
          <a
            href={href}
            className="mt-1 block wrap-break-word text-[13px] leading-4 text-[#8B8B8B] transition hover:text-[#15A9F4]"
          >
            {item.value}
          </a>
        ) : (
          <p className="mt-1 wrap-break-word text-[13px] leading-4 text-[#8B8B8B]">
            {item.value}
          </p>
        )}
      </div>
    </div>
  );
}

const ReferrerClientDetails = () => {
  const navigate = useNavigate();
  const data = clientDetailsMock;

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen p-8 clash space-y-8">
      {/* back */}
      <button
        type="button"
        onClick={handleBack}
        className="inline-flex items-center gap-2.5 text-sm leading-6 text-black transition hover:opacity-80"
        aria-label="Back to portfolio"
      >
        <span className="grid p-1.75 place-items-center rounded-sm border border-[#D6D6D6] bg-[#FAFAFA]">
          <ArrowLeft size={20} />
        </span>
        Back To Portfolio
      </button>

      {/* hero card */}
      <SectionCard className="p-3">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex min-w-0 items-center gap-3 md:gap-4">
            <div className="relative shrink-0">
              <div className="grid h-11.5 w-11.5 place-items-center rounded-lg bg-[#19A8F3] text-3xl font-medium text-white">
                {data.avatarText}
              </div>
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-[24px] font-medium leading-none text-[#666666]">
                {data.clientName}
              </h1>
              <p className="mt-2 text-sm font-medium uppercase leading-none tracking-[0.01em] text-[#545454]">
                {data.companyName}
              </p>
            </div>

            <span className="ml-2 hidden h-8 items-center rounded-full border border-[#5BC3F6] bg-[#CBEFFF] px-4 text-[13px] font-medium uppercase text-[#0DA7F4] md:inline-flex">
              {data.badgeText}
            </span>
          </div>

          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between lg:justify-end">
            <span className="inline-flex h-8 w-fit items-center rounded-full border border-[#5BC3F6] bg-[#F5F5F5] px-4 text-[13px] font-medium uppercase text-[#0DA7F4] md:hidden">
              {data.badgeText}
            </span>

            <div className="w-full rounded-xl border border-[#D2D2D2] bg-[#F7F7F7] px-4 py-4 md:w-44.5">
              <p className="text-[13px] text-[#7E7E7E]">
                Expected Referral Fee
              </p>
              <p className="mt-4 text-[18px] font-semibold leading-none text-black">
                {data.expectedReferralFee}
              </p>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* content grid */}
      <div className="space-y-8">
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_255px]">
          <SectionCard className="px-5 py-6 md:px-6">
            <div className="flex items-center gap-3">
              <Clock3 className="h-5 w-5 text-[#16AAF5]" strokeWidth={1.9} />
              <h2 className="text-[16px] font-medium text-black">
                Progress Timeline
              </h2>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.progressTimeline.map((item) => (
                <ProgressStepCard key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>

          <SectionCard className="px-5 py-6">
            <div className="flex items-center gap-3">
              <ReceiptText
                className="h-5 w-5 text-[#16AAF5]"
                strokeWidth={1.9}
              />
              <h2 className="text-[16px] font-medium text-black">
                Client Information
              </h2>
            </div>

            <div className="mt-7 space-y-5">
              {data.clientInformation.map((item) => (
                <ContactRow key={item.id} item={item} />
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_255px]">
          <SectionCard className="px-5 py-7 md:px-6">
            <div className="grid grid-cols-[minmax(0,1fr)_160px] items-center gap-4 border-b border-[#EAEAEA] pb-5">
              <h2 className="text-[16px] font-semibold uppercase tracking-[0.02em] text-[#3C3C3C]">
                Status History
              </h2>
              <p className="text-right text-[16px] font-semibold uppercase tracking-[0.02em] text-[#3C3C3C]">
                Date Submitted
              </p>
            </div>

            <div className="divide-y divide-transparent">
              {data.statusHistory.map((item, idx) => (
                <div
                  key={item.id}
                  className={cn(
                    "grid grid-cols-1 gap-3 py-6 md:grid-cols-[minmax(0,1fr)_160px] md:items-center",
                    idx === data.statusHistory.length - 1 ? "pb-2" : "",
                  )}
                >
                  <div className="min-w-0">
                    <p className="text-[16px] font-medium leading-6 text-black">
                      {item.title}
                    </p>
                    <p className="mt-1 text-[13px] leading-5 text-[#6F6F6F]">
                      {item.description}
                    </p>
                  </div>

                  <p className="text-left text-[16px] font-medium text-black md:text-right">
                    {item.date}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard className="px-5 py-6">
            <div className="flex items-center gap-3">
              <Info className="h-5 w-5 text-[#16AAF5]" />
              <h2 className="text-[16px] font-medium text-black">
                Broker Progress Notes
              </h2>
            </div>

            <div className="mt-4 rounded-[9px] border border-[#CDE7F6] bg-[#EEF8FD] p-4">
              <p className="text-[13px] leading-8 text-[#5E5E5E]">
                {data.brokerProgressNotes}
              </p>
            </div>

            <p className="mt-4 text-[13px] uppercase text-[#3E3E3E]">
              LAST UPDATED: {data.lastUpdated}
            </p>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default ReferrerClientDetails;
