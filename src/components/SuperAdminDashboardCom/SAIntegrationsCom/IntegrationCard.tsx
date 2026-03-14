// src/components/SuperAdminDashboardCom/SAIntegrationsCom/IntegrationCard.tsx
import { cn } from "@/hooks/useCn";
import { StatusPill } from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/SuperAdminIntegrations";
import { IntegrationCardData } from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/types";

export function IntegrationCard({
  item,
  onViewDetails,
  onViewLogs,
  onToggleStatus,
}: {
  item: IntegrationCardData;
  onViewDetails: () => void;
  onViewLogs: () => void;
  onToggleStatus: () => void;
}) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EFF6FF]">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0">
            <div className="truncate text-sm font-semibold text-black">
              {item.name}
            </div>
          </div>
        </div>
        <StatusPill status={item.status} />
      </div>

      <div className="mt-4 text-[13px]">
        <div className="mt-1 flex items-start justify-between gap-3 text-[#666666]">
          <div>Last Sync</div>
          <div className="mt-1 text-right font-semibold text-black">
            {item.lastSync}
          </div>
        </div>

        <div className="mt-1 flex items-start justify-between gap-3 text-[#666666]">
          <div>Sync Errors (24h)</div>
          <div
            className={cn(
              "mt-1 text-right font-semibold",
              item.syncErrors > 0 ? "text-rose-600" : "text-emerald-600",
            )}
          >
            {item.syncErrors}
          </div>
        </div>

        <div className="mt-1 flex items-start justify-between gap-3 text-[#666666]">
          <div>Connected Brokers</div>
          <div className="mt-1 text-right font-semibold text-black">
            {item.brokers}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={onViewDetails}
        className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
      >
        View Details
      </button>

      <div className="mt-3 grid gap-3 grid-cols-2">
        <button
          type="button"
          onClick={onViewLogs}
          className="rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
        >
          View Logs
        </button>
        <button
          type="button"
          onClick={onToggleStatus}
          className={cn(
            "rounded-xl border border-slate-200 py-2 text-sm font-semibold transition-colors",
            item.status === "Disconnected"
              ? "bg-emerald-600 text-white hover:bg-emerald-700 border-none"
              : "bg-white text-[#D76C6C] hover:bg-rose-50 border-slate-200"
          )}
        >
          {item.status === "Disconnected" ? "Enable" : "Disable"}
        </button>
      </div>
    </div>
  );
}
