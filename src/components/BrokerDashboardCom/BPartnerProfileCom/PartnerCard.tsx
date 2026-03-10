import { Building2, User } from "lucide-react";

import { cn } from "@/hooks/useCn";
import type { PartnerActionKey, PartnerProfile } from "./types";
import PartnerActionsMenu from "./PartnerActionsMenu";

type PartnerCardProps = {
  partner: PartnerProfile;
  onAction: (partner: PartnerProfile, action: PartnerActionKey) => void;
};

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

function StatusBadge({ status }: { status: PartnerProfile["status"] }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        status === "Active"
          ? "bg-[#DCFCE7] text-[#15803D]"
          : "bg-[#E5E7EB] text-[#6B7280]",
      )}
    >
      {status}
    </span>
  );
}

const PartnerCard = ({ partner, onAction }: PartnerCardProps) => {
  const Icon = partner.partnerType === "Company" ? Building2 : User;

  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              partner.partnerType === "Company"
                ? "bg-[#DBEAFE] text-[#2563EB]"
                : "bg-[#F3E8FF] text-[#9333EA]",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>

          <div className="min-w-0">
            <h3 className="wrap-break-word text-base font-semibold text-[#111827] sm:text-lg">
              {partner.partnerName}
            </h3>
            <p className="mt-1 text-sm text-[#6B7280]">{partner.partnerType}</p>
          </div>
        </div>

        <div className="shrink-0">
          <PartnerActionsMenu
            onSelect={(action) => onAction(partner, action)}
          />
        </div>
      </div>

      <div className="mt-4">
        <StatusBadge status={partner.status} />
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:gap-x-6 sm:gap-y-4">
        <div className="min-w-0">
          <p className="text-xs text-[#6B7280]">Total Referrals</p>
          <p className="mt-1 text-base font-semibold text-[#111827] sm:text-[18px]">
            {partner.metrics.totalReferrals}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#6B7280]">Active Referrals</p>
          <p className="mt-1 text-base font-semibold text-[#111827] sm:text-[18px]">
            {partner.metrics.activeReferrals}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#6B7280]">Loan Volume</p>
          <p className="mt-1 wrap-break-word text-base font-semibold text-[#111827] sm:text-[18px]">
            {formatMoney(partner.metrics.loanVolume)}
          </p>
        </div>

        <div className="min-w-0">
          <p className="text-xs text-[#6B7280]">Commission</p>
          <p className="mt-1 wrap-break-word text-base font-semibold text-[#111827] sm:text-[18px]">
            {formatMoney(partner.metrics.commission)}
          </p>
        </div>
      </div>

      <div className="my-5 h-px bg-[#E5E7EB]" />

      <div className="space-y-3 text-sm">
        <div className="flex items-start justify-between gap-4">
          <span className="text-[#6B7280]">Conversion Rate</span>
          <span className="text-right font-medium text-[#111827]">
            {partner.metrics.conversionRate}%
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <span className="text-[#6B7280]">Avg Loan Size</span>
          <span className="text-right font-medium text-[#111827]">
            {formatMoney(partner.metrics.avgLoanSize)}
          </span>
        </div>

        <div className="flex items-start justify-between gap-4">
          <span className="text-[#6B7280]">Last Activity</span>
          <span className="text-right font-medium text-[#111827]">
            {partner.metrics.lastActivity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PartnerCard;
