import { Building2, User } from "lucide-react";

import { cn } from "@/hooks/useCn";
import PartnerActionsMenu from "./PartnerActionsMenu";
import PartnerCard from "./PartnerCard";
import {
  PartnerActionKey,
  PartnerProfile,
} from "@/pages/BrokerDashboard/BrokerPartnerProfiles/types";

type PartnerTableProps = {
  partners: PartnerProfile[];
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

const PartnerTable = ({ partners, onAction }: PartnerTableProps) => {
  if (partners.length === 0) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white px-4 py-10 text-center text-sm text-[#6B7280] md:px-6">
        No partners found.
      </div>
    );
  }

  return (
    <>
      {/* mobile / tablet cards */}
      <div className="grid gap-4 xl:hidden">
        {partners.map((partner) => (
          <PartnerCard key={partner.id} partner={partner} onAction={onAction} />
        ))}
      </div>

      {/* desktop table */}
      <div className="hidden overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white xl:block">
        <div className="overflow-x-auto">
          <table className="w-full min-w-245 border-collapse">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Partner
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Type
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Status
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Total Referrals
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Active
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Loan Volume
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Commission
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Last Activity
                </th>
                <th className="px-4 py-4 text-left text-xs font-medium uppercase tracking-wide text-[#6B7280]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {partners.map((partner) => {
                const Icon =
                  partner.partnerType === "Company" ? Building2 : User;

                return (
                  <tr
                    key={partner.id}
                    className="border-b border-[#E5E7EB] last:border-b-0"
                  >
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl",
                            partner.partnerType === "Company"
                              ? "bg-[#DBEAFE] text-[#2563EB]"
                              : "bg-[#F3E8FF] text-[#9333EA]",
                          )}
                        >
                          <Icon className="h-4 w-4" />
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-[#111827]">
                            {partner.partnerName}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-4 text-sm text-[#111827]">
                      {partner.partnerType}
                    </td>

                    <td className="px-4 py-4">
                      <StatusBadge status={partner.status} />
                    </td>

                    <td className="px-4 py-4 text-sm text-[#111827]">
                      {partner.metrics.totalReferrals}
                    </td>

                    <td className="px-4 py-4 text-sm text-[#111827]">
                      {partner.metrics.activeReferrals}
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-[#111827]">
                      {formatMoney(partner.metrics.loanVolume)}
                    </td>

                    <td className="px-4 py-4 text-sm font-medium text-[#111827]">
                      {formatMoney(partner.metrics.commission)}
                    </td>

                    <td className="px-4 py-4 text-sm text-[#6B7280]">
                      {partner.metrics.lastActivity}
                    </td>

                    <td className="px-4 py-4">
                      <PartnerActionsMenu
                        onSelect={(action) => onAction(partner, action)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default PartnerTable;
