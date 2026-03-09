// src/components/BrokerDashboardCom/BOverivewCom/RecentLeadsTable.tsx
import { useMemo, useState } from "react";
import { MoreHorizontal } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useFloatingMenu } from "@/hooks/useFloatingMenu";
import type {
  Lead,
  LeadStatus,
} from "../../../pages/BrokerDashboard/BrokerOverview/types";
import {
  formatMoney,
  mapLeadToTableRow,
} from "../../../pages/BrokerDashboard/BrokerOverview/utils";

type RecentLeadsTableProps = {
  leads: Lead[];
  onOpenDetails: (id: string) => void;
  onUpdateStatus?: (id: string) => void;
  onAddNote?: (id: string) => void;
};

const statusClassMap: Record<LeadStatus, string> = {
  "NEW REFERRAL": "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
  CONTACTED: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  "APPLICATION STARTED": "bg-[#FFF7ED] text-[#F97316] border-[#FED7AA]",
  "SUBMITTED TO LENDER": "bg-[#FAF5FF] text-[#9333EA] border-[#E9D5FF]",
  APPROVED: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  FUNDED: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
};

function getRelativeTimeLabel(date: string) {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  const diffMs = Date.now() - parsed.getTime();
  const diffHours = Math.max(1, Math.floor(diffMs / (1000 * 60 * 60)));
  const diffDays = Math.floor(diffHours / 24);

  if (diffDays >= 1) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
}

function ActionMenu({
  lead,
  onOpenDetails,
  onUpdateStatus,
  onAddNote,
}: {
  lead: Lead;
  onOpenDetails: (id: string) => void;
  onUpdateStatus?: (id: string) => void;
  onAddNote?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);

  const { triggerRef, menuRef, position } = useFloatingMenu({
    open,
    gap: 8,
    viewportPadding: 8,
  });

  const handleAction = (cb?: (id: string) => void) => {
    cb?.(lead.id);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#7C8B97] transition hover:bg-[#F3F4F6]"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />

          <div
            ref={menuRef}
            className="fixed z-30 w-56 rounded-[18px] border border-[#E7E7E7] bg-white p-2 shadow-[0_8px_24px_rgba(15,23,42,0.10)]"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => handleAction(onOpenDetails)}
                className="rounded-xl px-4 py-3 text-left text-[14px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
              >
                View
              </button>

              <button
                type="button"
                onClick={() => handleAction(onUpdateStatus)}
                className="rounded-xl px-4 py-3 text-left text-[14px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
              >
                Update Status
              </button>

              <button
                type="button"
                onClick={() => handleAction(onAddNote)}
                className="rounded-xl px-4 py-3 text-left text-[14px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
              >
                Add Note
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default function RecentLeadsTable({
  leads,
  onOpenDetails,
  onUpdateStatus,
  onAddNote,
}: RecentLeadsTableProps) {
  const tableRows = useMemo(() => leads.map(mapLeadToTableRow), [leads]);

  return (
    <section className="overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white">
      <div className="flex items-center justify-between px-4 py-4 sm:px-5">
        <div>
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Recent Referrals
          </h2>
          <p className="mt-1 text-[12px] text-[#9CA3AF]">
            Latest loan referrals and their status
          </p>
        </div>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[13px] font-medium text-[#1BAEF5]"
        >
          View All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-275 w-full border-collapse">
          <thead>
            <tr className="border-b border-[#ECECEC] text-left">
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Borrower Name
              </th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Referrer
              </th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Loan Amount
              </th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Stage
              </th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Interest Rate
              </th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Commission
              </th>
              <th className="px-5 py-3 text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Last Updated
              </th>
              <th className="px-5 py-3 text-center text-[11px] font-medium uppercase tracking-wide text-[#6B7280]">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {tableRows.length ? (
              tableRows.map((row) => {
                const fullLead = leads.find((lead) => lead.id === row.id);
                if (!fullLead) return null;

                return (
                  <tr
                    key={row.id}
                    className="border-b border-[#F3F4F6] last:border-b-0"
                  >
                    <td className="px-5 py-4 text-[14px] font-medium text-[#111827]">
                      {row.name}
                    </td>

                    <td className="px-5 py-4 text-[14px] text-[#6B7280]">
                      {row.ref}
                    </td>

                    <td className="px-5 py-4 text-[14px] text-[#111827]">
                      {formatMoney(row.amount)}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-medium",
                          statusClassMap[row.status],
                        )}
                      >
                        {row.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-[14px] text-[#6B7280]">
                      {row.rate.toFixed(2)}%
                    </td>

                    <td className="px-5 py-4 text-[14px] font-medium text-[#16A34A]">
                      {formatMoney(row.commission)}
                    </td>

                    <td className="px-5 py-4 text-[14px] text-[#9CA3AF]">
                      {getRelativeTimeLabel(fullLead.lastSyncAt)}
                    </td>

                    <td className="px-5 py-4 text-center">
                      <ActionMenu
                        lead={fullLead}
                        onOpenDetails={onOpenDetails}
                        onUpdateStatus={onUpdateStatus}
                        onAddNote={onAddNote}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  colSpan={8}
                  className="px-5 py-10 text-center text-[14px] text-[#8D8D8D]"
                >
                  No referrals found for the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
