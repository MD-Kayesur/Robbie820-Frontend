import {
  pillPlan,
  pillStatus,
} from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/mock";
import { BrokerRow } from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/types";
import { MoreVertical } from "lucide-react";
import { ActionsMenu } from "./ActionsMenu";

export function MobileBrokerCard({
  row,
  open,
  onToggleMenu,
  onCloseMenu,
  onDisable,
}: {
  row: BrokerRow;
  open: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
  onDisable: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-900">{row.name}</p>
          <p className="mt-1 text-sm text-slate-500">{row.company}</p>
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

          <ActionsMenu
            open={open}
            onClose={onCloseMenu}
            onDisable={onDisable}
          />
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
            pillPlan(row.plan),
          ].join(" ")}
        >
          {row.plan}
        </span>
        <span
          className={[
            "inline-flex rounded-full px-3 py-1 text-xs font-medium",
            pillStatus(row.status),
          ].join(" ")}
        >
          {row.status}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Active Seats</p>
          <p className="mt-1 font-semibold text-slate-900">{row.seats}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Total Referrers</p>
          <p className="mt-1 font-semibold text-slate-900">{row.referrers}</p>
        </div>

        <div className="col-span-2 rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Commission (YTD)</p>
          <p className="mt-1 font-semibold text-slate-900">
            {row.commissionYTD}
          </p>
        </div>
      </div>
    </div>
  );
}
