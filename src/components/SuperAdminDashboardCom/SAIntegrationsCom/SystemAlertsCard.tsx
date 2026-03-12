// src/components/SuperAdminDashboardCom/SAIntegrationsCom/SystemAlertsCard.tsx
import { cn } from "@/hooks/useCn";
import { systemAlertsMock } from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/mock";
import { AlertTag } from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/SuperAdminIntegrations";
import { AlertTriangle, ExternalLink } from "lucide-react";

export function SystemAlertsCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm md:p-5">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#FFEDD4]">
          <AlertTriangle className="h-5 w-5 text-[#F54900]" />
        </div>

        <div>
          <div className="font-semibold text-black">System Alerts</div>
          <div className="text-[13px] text-[#666666]">
            Recent integration issues
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {systemAlertsMock.map((a) => (
          <div
            key={a.title}
            className={cn(
              "rounded-2xl border bg-amber-50/40 p-4",
              a.tone === "Critical" ? "border-rose-200" : "border-amber-200",
            )}
          >
            <div className="flex flex-wrap items-center gap-2">
              <div className="text-sm font-semibold text-black">{a.title}</div>
              <AlertTag tone={a.tone} />
            </div>

            <div className="mt-1 text-[13px] text-[#666]">{a.desc}</div>
            <div className="mt-1 text-[13px] text-[#666]">{a.time}</div>

            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ExternalLink className="h-4 w-4 text-[#666666]" />
              View Related Logs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
