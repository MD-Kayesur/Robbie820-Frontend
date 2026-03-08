import {
  Pill,
  StatusPill,
} from "@/pages/SuperAdminDashboard/SuperAdminAuditLogs/SuperAdminAuditLogs";
import { AuditRow } from "@/pages/SuperAdminDashboard/SuperAdminAuditLogs/types";
import { Eye } from "lucide-react";

export function MobileLogCard({
  row,
  onView,
}: {
  row: AuditRow;
  onView: (r: AuditRow) => void;
}) {
  const actionTone =
    row.actionType === "Impersonation"
      ? "indigo"
      : row.actionType === "Refund"
        ? "amber"
        : row.actionType === "Manual Credit"
          ? "sky"
          : row.actionType.includes("Error") ||
              row.actionType.includes("Failed")
            ? "rose"
            : "slate";

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-bold text-[#101828]">{row.user}</p>
          <p className="mt-1 text-xs text-[#4A5565]">{row.role}</p>
        </div>

        <StatusPill status={row.status} />
      </div>

      <div className="mt-3 flex flex-wrap gap-2">
        <Pill tone={actionTone as any}>{row.actionType}</Pill>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[#4A5565]">Affected Account</span>
          <span className="text-right font-semibold text-[#0A0A0A]">
            {row.affectedAccount}
          </span>
        </div>

        <div className="flex items-start justify-between gap-3">
          <span className="text-[#4A5565]">IP Address</span>
          <span className="text-right font-semibold text-[#0A0A0A]">
            {row.ip}
          </span>
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-slate-50 px-3 py-3">
        <p className="text-xs font-bold text-[#4A5565]">Description</p>
        <p className="mt-1 text-sm text-[#0A0A0A]">{row.description}</p>
      </div>

      <button
        type="button"
        onClick={() => onView(row)}
        className="mt-4 inline-flex h-10 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 px-3 text-sm font-extrabold text-[#364153] hover:bg-slate-100"
      >
        <Eye className="h-4 w-4" />
        View
      </button>
    </div>
  );
}
