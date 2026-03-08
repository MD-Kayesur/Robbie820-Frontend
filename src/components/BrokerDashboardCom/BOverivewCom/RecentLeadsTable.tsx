import { useMemo, useState } from "react";
import { ArrowUpRight, MoreHorizontal } from "lucide-react";

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
  "NEW LEAD": "text-slate-500",
  CONTACTED: "text-sky-600",
  "APPLICATION IN PROGRESS": "text-[#4D59FF]",
  "SUBMITTED TO LENDER": "text-indigo-600",
  "UNDER REVIEW": "text-violet-600",
  APPROVED: "text-[#2E9A4D]",
  "AWAITING REFERRAL FEE": "text-[#D6A100]",
  FUNDED: "text-[#0E7ADB]",
  "SETTLEMENT COMPLETED": "text-emerald-600",
};

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
        className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FB] text-[#7C8B97] transition hover:bg-[#E4F0F7]"
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
            className="fixed z-30 w-60 rounded-[22px] border border-[#E7E7E7] bg-white px-3 py-3 shadow-[0_8px_24px_rgba(15,23,42,0.10)]"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className="flex flex-col">
              <button
                type="button"
                onClick={() => handleAction(onOpenDetails)}
                className="rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
              >
                View Lead Details
              </button>

              <button
                type="button"
                onClick={() => handleAction(onUpdateStatus)}
                className="rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
              >
                Update Status
              </button>

              <button
                type="button"
                onClick={() => handleAction(onAddNote)}
                className="rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
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
    <section className="overflow-hidden rounded-2xl border border-[#E1E1E1] bg-white">
      <div className="flex items-center justify-between px-4 py-4 sm:px-5">
        <h2 className="text-[18px] font-medium text-[#222]">Recent Leads</h2>

        <button
          type="button"
          className="inline-flex items-center gap-1 text-[14px] font-medium text-[#1BAEF5]"
        >
          View All
          <ArrowUpRight className="h-4 w-4" />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-245 w-full border-collapse">
          <thead>
            <tr className="border-b border-[#ECECEC] text-left">
              <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                Borrower
              </th>
              <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                Amount
              </th>
              <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                Last Updated
              </th>
              <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                Status
              </th>
              <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                Rate
              </th>
              <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                Exp. Comm To Referrer
              </th>
              <th className="px-5 py-3 text-center text-[12px] font-medium uppercase text-[#555]">
                Action
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
                    className="border-b border-[#F0F0F0] last:border-b-0"
                  >
                    <td className="px-5 py-4">
                      <div>
                        <p className="text-[16px] font-medium text-[#222]">
                          {row.name}
                        </p>
                        <p className="text-[12px] text-[#8D8D8D]">
                          ref: {row.ref}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-[16px] text-[#4A4A4A]">
                      {formatMoney(row.amount)}
                    </td>

                    <td className="px-5 py-4 text-[15px] text-[#666]">
                      {row.date}
                    </td>

                    <td
                      className={cn(
                        "px-5 py-4 text-[14px] font-medium",
                        statusClassMap[row.status],
                      )}
                    >
                      {row.status}
                    </td>

                    <td className="px-5 py-4 text-[15px] text-[#4A4A4A]">
                      {row.rate}%
                    </td>

                    <td className="px-5 py-4 text-[15px] font-medium text-[#2E9A4D]">
                      {formatMoney(row.commission)}
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
                  colSpan={7}
                  className="px-5 py-10 text-center text-[14px] text-[#8D8D8D]"
                >
                  No leads found for the current filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
