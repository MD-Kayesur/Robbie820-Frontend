// src/pages/SuperAdminDashboard/SuperAdminIntegrations/SuperAdminIntegrations.tsx
import { useMemo, useState } from "react";
import { Info, MoreVertical } from "lucide-react";
import IntegrationDetailsModal from "@/components/SuperAdminDashboardCom/SAIntegrationsCom/modals/IntegrationDetailsModal";
import { integrationCardsMock, webhookRowsMock } from "./mock";
import type {
  AlertTone,
  ConnStatus,
  Filter,
  IntegrationCardData,
  WebhookRow,
} from "./types";
import { StatusDropdown } from "@/components/SuperAdminDashboardCom/SAIntegrationsCom/StatusDropdown";
import { IntegrationCard } from "@/components/SuperAdminDashboardCom/SAIntegrationsCom/IntegrationCard";
import { EmailServicesCard } from "@/components/SuperAdminDashboardCom/SAIntegrationsCom/EmailServicesCard";
import { SystemAlertsCard } from "@/components/SuperAdminDashboardCom/SAIntegrationsCom/SystemAlertsCard";
import { cn } from "@/hooks/useCn";

export function StatusPill({ status }: { status: ConnStatus }) {
  const cls =
    status === "Connected"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : status === "Warning"
        ? "bg-amber-50 text-amber-700 border-amber-100"
        : "bg-rose-50 text-rose-700 border-rose-100";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[13px] font-medium",
        cls,
      )}
    >
      {status}
    </span>
  );
}

export function AlertTag({ tone }: { tone: AlertTone }) {
  const cls =
    tone === "Warning"
      ? "bg-[#FFEDD4] text-[#D76C6C]"
      : "bg-[#D4183D] text-white";

  return (
    <span
      className={cn(
        "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-bold",
        cls,
      )}
    >
      {tone}
    </span>
  );
}

function WebhookStatusPill({ s }: { s: WebhookRow["status"] }) {
  const cls =
    s === "Active"
      ? "bg-[#DCFCE7] text-[#1B7231]"
      : s === "Failed"
        ? "bg-[#D4183D] text-white"
        : "bg-[#FEF9C2] text-[#D76C6C]";

  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-[13px] font-medium",
        cls,
      )}
    >
      {s}
    </span>
  );
}

export default function SuperAdminIntegrations() {
  const [filter, setFilter] = useState<Filter>("All");
  const [selected, setSelected] = useState<IntegrationCardData | null>(null);

  const shownCards = useMemo(() => {
    if (filter === "All") return integrationCardsMock;
    if (filter === "Active")
      return integrationCardsMock.filter((c) => c.status === "Connected");
    if (filter === "Inactive")
      return integrationCardsMock.filter((c) => c.status === "Disconnected");
    if (filter === "Error")
      return integrationCardsMock.filter((c) => c.syncErrors > 0);

    return integrationCardsMock.filter(
      (c) => c.status === "Warning" || c.syncErrors > 0,
    );
  }, [filter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        <div>
          <h1 className="text-xl font-semibold text-black md:text-2xl">
            Integrations Management
          </h1>
          <p className="mt-1 text-sm text-[#666666]">
            Configure and monitor third-party integrations
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-sky-300/70 bg-sky-50 p-4">
          <div className="flex items-start gap-3">
            <Info className="mt-0.5 h-4 w-4 shrink-0 text-[#00B4FE]" />

            <p className="text-xs font-medium text-[#00B4FE] md:text-[13px]">
              <span className="font-semibold">Important:</span> Integrations
              affect broker workflow and commission tracking. Monitor connection
              status to ensure uninterrupted system performance.
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="font-semibold text-black">
            CRM &amp; Workflow Integrations
          </div>
          <StatusDropdown value={filter} onChange={setFilter} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {shownCards.map((c) => (
            <IntegrationCard
              key={c.id}
              item={c}
              onViewDetails={() => setSelected(c)}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-2">
          <div>
            <div className="mb-3 font-semibold text-black">Email Services</div>
            <EmailServicesCard />
          </div>
          <SystemAlertsCard />
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {/* header */}
          <div className="px-4 py-4 md:px-6 md:py-5">
            <div className="text-sm font-semibold text-black md:text-base">
              Webhook Monitor
            </div>
            <div className="mt-1 text-xs text-[#4A5565] md:text-[13px]">
              Real-time webhook delivery tracking
            </div>
          </div>

          {/* ---------------- MOBILE CARDS ---------------- */}
          <div className="space-y-4 px-4 pb-4 md:hidden">
            {webhookRowsMock.map((r) => (
              <div
                key={r.type}
                className="rounded-xl border border-slate-200 bg-white p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="text-sm font-semibold text-black">
                    {r.type}
                  </div>

                  <button
                    type="button"
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-slate-50"
                  >
                    <MoreVertical className="h-4 w-4 text-slate-700" />
                  </button>
                </div>

                <div className="mt-3 space-y-2 text-xs text-[#666]">
                  <div className="flex justify-between">
                    <span>Endpoint</span>
                    <span className="font-medium text-black truncate max-w-40 text-right">
                      {r.url}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Last Triggered</span>
                    <span className="font-medium text-black">
                      {r.lastTriggered}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Status</span>
                    <WebhookStatusPill s={r.status} />
                  </div>

                  <div className="flex justify-between">
                    <span>Failures</span>
                    <span
                      className={cn(
                        "font-semibold",
                        r.failures > 0 ? "text-[#D76C6C]" : "text-[#666]",
                      )}
                    >
                      {r.failures}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span>Retry</span>
                    <span className="font-medium text-black">{r.retry}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* ---------------- DESKTOP TABLE ---------------- */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-t border-[#0000001A] bg-[#F9FAFB]">
                  {[
                    "Event Type",
                    "Endpoint URL",
                    "Last Triggered",
                    "Status",
                    "Failure Count",
                    "Retry Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-3 text-left text-xs font-bold text-slate-700 md:text-[13px]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {webhookRowsMock.map((r) => (
                  <tr key={r.type} className="bg-white">
                    <td className="px-3 py-2 text-sm text-black">{r.type}</td>

                    <td className="px-3 py-2 text-xs text-[#666666] md:text-[13px]">
                      {r.url}
                    </td>

                    <td className="px-3 py-2 text-xs text-[#666666] md:text-[13px]">
                      {r.lastTriggered}
                    </td>

                    <td className="px-3 py-2">
                      <WebhookStatusPill s={r.status} />
                    </td>

                    <td
                      className={cn(
                        "px-3 py-2 text-sm font-semibold",
                        r.failures > 0 ? "text-[#D76C6C]" : "text-[#666666]",
                      )}
                    >
                      {r.failures}
                    </td>

                    <td className="px-3 py-2 text-xs text-[#666666] md:text-[13px]">
                      {r.retry}
                    </td>

                    <td className="px-3 py-2">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                      >
                        <MoreVertical className="h-4 w-4 text-slate-700" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <IntegrationDetailsModal
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
