import { ReferrerRow } from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/types";
import { MoreVertical } from "lucide-react";
import { pillStatus } from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/mock";

export function MobileReferrerCard({
  row,
  onToggleMenu,
}: {
  row: ReferrerRow;
  onToggleMenu: (e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-900">{row.name}</p>
          <p className="mt-1 text-sm text-slate-500">{row.linkedBroker}</p>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
            aria-label="Open actions"
          >
            <MoreVertical className="h-4 w-4 text-slate-600" />
          </button>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-xs font-bold",
            pillStatus(row.status),
          ].join(" ")}
        >
          {row.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Referrals</p>
          <p className="mt-1 font-semibold text-slate-900">
            {row.totalReferrals}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Marked Paid</p>
          <p className="mt-1 font-semibold text-slate-900">{row.markedPaid}</p>
        </div>

        <div className="col-span-2 rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Commission Earned</p>
          <p className="mt-1 font-semibold text-slate-900">
            {row.totalCommission}
          </p>
        </div>

        <div className="col-span-2 rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Last Login</p>
          <p className="mt-1 font-medium text-slate-700">{row.lastLogin}</p>
        </div>
      </div>
    </div>
  );
}
