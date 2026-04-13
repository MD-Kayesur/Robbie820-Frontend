import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import {
  Pill,
  StatusPill,
} from "@/pages/SuperAdminDashboard/SuperAdminAuditLogs/SuperAdminAuditLogs";
import { AuditRow } from "@/pages/SuperAdminDashboard/SuperAdminAuditLogs/types";
import { X } from "lucide-react";

export function RowDetailsModal({
  open,
  row,
  onClose,
}: {
  open: boolean;
  row: AuditRow | null;
  onClose: () => void;
}) {
  const panelRef = useOutsideClose<HTMLDivElement>(open, onClose);

  useLockBodyScroll(open);

  if (!open || !row) return null;

  const roleTone =
    row.role === "Platform Owner"
      ? "indigo"
      : row.role === "Super Admin"
        ? "sky"
        : row.role === "Broker"
          ? "slate"
          : row.role === "Referrer"
            ? "amber"
            : "rose";

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div
        ref={panelRef}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 md:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-black text-[#101828]">
                Log Details
              </h3>
              <Pill tone={roleTone as any}>{row.role}</Pill>
              <StatusPill status={row.status} />
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              {new Date(row.at).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 shrink-0 place-items-center rounded-2xl border border-slate-200 bg-white text-[#364153] hover:bg-slate-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5 md:px-6">
          <div className="grid gap-3 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">User</p>
              <p className="mt-1 text-sm font-black text-[#101828]">
                {row.user}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">
                Action Type
              </p>
              <p className="mt-1 text-sm font-black text-[#101828]">
                {row.actionType}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">
                Affected Account
              </p>
              <p className="mt-1 text-sm font-black text-[#101828]">
                {row.affectedAccount}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">
                IP Address
              </p>
              <p className="mt-1 text-sm font-black text-[#101828]">{row.ip}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-extrabold text-[#4A5565]">Description</p>
            <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
              {row.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4 md:px-6">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-[#0A0A0A] hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
