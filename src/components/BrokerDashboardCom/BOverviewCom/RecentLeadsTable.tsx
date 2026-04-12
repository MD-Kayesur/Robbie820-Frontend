// src/components/BrokerDashboardCom/BOverivewCom/RecentLeadsTable.tsx
import { useMemo, useState } from "react";
import { Eye, FileText, MoreHorizontal, RefreshCcw, UserPlus } from "lucide-react";

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
  onAssignMember?: (id: string) => void;
};

const statusClassMap: Record<LeadStatus, string> = {
  "NEW REFERRAL": "bg-[#F3F4F6] text-[#6B7280] border-[#E5E7EB]",
  CONTACTED: "bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]",
  "APPLICATION STARTED": "bg-[#FFF7ED] text-[#F97316] border-[#FED7AA]",
  "SUBMITTED TO LENDER": "bg-[#FAF5FF] text-[#9333EA] border-[#E9D5FF]",
  APPROVED: "bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]",
  FUNDED: "bg-[#ECFDF5] text-[#059669] border-[#A7F3D0]",
  DISQUALIFIED: "bg-[#FEF2F2] text-[#EF4444] border-[#FECACA]",
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
  onAssignMember,
}: {
  lead: Lead;
  onOpenDetails: (id: string) => void;
  onUpdateStatus?: (id: string) => void;
  onAddNote?: (id: string) => void;
  onAssignMember?: (id: string) => void;
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
            className="fixed z-30 w-64 rounded-[22px] border border-[#E7E7E7] bg-white p-2 shadow-[0_20px_48px_rgba(0,0,0,0.1)]"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className="flex flex-col py-1">
              <button
                type="button"
                onClick={() => handleAction(onOpenDetails)}
                className="flex items-center gap-4 rounded-[14px] px-4 py-3.5 text-left text-[14px] font-medium text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                <Eye className="h-5 w-5 text-[#6B7280]" strokeWidth={1.5} />
                View Details
              </button>

              <button
                type="button"
                onClick={() => handleAction(onUpdateStatus)}
                className="flex items-center gap-4 rounded-[14px] px-4 py-3.5 text-left text-[14px] font-medium text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                <RefreshCcw className="h-5 w-5 text-[#6B7280]" strokeWidth={1.5} />
                Update Stage
              </button>

              <button
                type="button"
                onClick={() => handleAction(onAddNote)}
                className="flex items-center gap-4 rounded-[14px] px-4 py-3.5 text-left text-[14px] font-medium text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                <FileText className="h-5 w-5 text-[#6B7280]" strokeWidth={1.5} />
                Add Internal Note
              </button>

              <button
                type="button"
                onClick={() => handleAction(onAssignMember)}
                className="flex items-center gap-4 rounded-[14px] px-4 py-3.5 text-left text-[14px] font-medium text-[#111827] transition hover:bg-[#F9FAFB]"
              >
                <UserPlus className="h-5 w-5 text-[#6B7280]" strokeWidth={1.5} />
                Assign Team Member
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
      {/* header */}
      <div className="flex items-center justify-between px-4 py-4 md:px-5">
        <div>
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Recent Referrals
          </h2>
          <p className="mt-1 text-[12px] text-[#9CA3AF]">
            Latest loan referrals and their status
          </p>
        </div>

        <button className="text-[13px] font-medium text-[#1BAEF5]">
          View All
        </button>
      </div>

      {/* ---------------- MOBILE CARDS ---------------- */}
      <div className="space-y-4 px-4 pb-4 lg:hidden">
        {tableRows.map((row) => {
          const lead = leads.find((l) => l.id === row.id);
          if (!lead) return null;

          return (
            <div
              key={row.id}
              className="rounded-xl border border-slate-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div className="font-medium text-[#111827]">{row.name}</div>
                <span
                  className={cn(
                    "inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium",
                    statusClassMap[row.status],
                  )}
                >
                  {row.status}
                </span>
              </div>

              <div className="mt-3 space-y-2 text-sm text-[#6B7280]">
                <div className="flex justify-between">
                  <span>Referrer</span>
                  <span className="text-black">{row.ref}</span>
                </div>

                <div className="flex justify-between">
                  <span>Loan Amount</span>
                  <span className="text-black">{formatMoney(row.amount)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Referrer Payout</span>
                  <span className="font-medium text-[#16A34A]">
                    {formatMoney(row.commission)}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Updated</span>
                  <span>{getRelativeTimeLabel(lead.lastSyncAt)}</span>
                </div>
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => onOpenDetails(row.id)}
                  className="flex-1 rounded-xl border border-slate-200 py-2 text-xs font-medium text-black"
                >
                  View
                </button>

                <ActionMenu
                  lead={lead}
                  onOpenDetails={onOpenDetails}
                  onUpdateStatus={onUpdateStatus}
                  onAddNote={onAddNote}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ---------------- DESKTOP TABLE ---------------- */}
      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-275 border-collapse">
          <thead>
            <tr className="border-b border-[#ECECEC] text-left">
              {[
                "Borrower Name",
                "Referrer",
                "Loan Amount",
                "Stage",
                "Referrer Comm",
                "Last Updated",
                "Actions",
              ].map((h) => (
                <th
                  key={h}
                  className="px-5 py-3 text-xs font-medium uppercase tracking-wide text-[#6B7280]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {tableRows.map((row) => {
              const lead = leads.find((l) => l.id === row.id);
              if (!lead) return null;

              return (
                <tr
                  key={row.id}
                  className="border-b border-[#F3F4F6] last:border-b-0"
                >
                  <td className="px-5 py-4 text-sm font-medium text-[#111827]">
                    {row.name}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#6B7280]">
                    {row.ref}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#111827]">
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

                  <td className="px-5 py-4 text-sm font-medium text-[#16A34A]">
                    {formatMoney(row.commission)}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#9CA3AF]">
                    {getRelativeTimeLabel(lead.lastSyncAt)}
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => onOpenDetails(row.id)}
                        className="rounded-xl border border-slate-200 px-2 py-1 text-xs font-medium text-black"
                      >
                        View
                      </button>

                      <ActionMenu
                        lead={lead}
                        onOpenDetails={onOpenDetails}
                        onUpdateStatus={onUpdateStatus}
                        onAddNote={onAddNote}
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
