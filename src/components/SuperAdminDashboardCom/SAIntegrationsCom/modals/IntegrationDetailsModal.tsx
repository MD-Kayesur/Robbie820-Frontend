import React from "react";
import { X, RotateCcw, CheckCircle2, TrendingUp } from "lucide-react";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/hooks/useCn";

export type ConnStatus = "Connected" | "Warning" | "Disconnected";

export type IntegrationCardData = {
  id: string;
  name: string;
  status: ConnStatus;
  lastSync: string;
  syncErrors: number;
  brokers: number;
  icon: React.ElementType;
};

export default function IntegrationDetailsModal({
  open,
  onClose,
  item,
  onToggleStatus,
}: {
  open: boolean;
  onClose: () => void;
  item: IntegrationCardData | null;
  onToggleStatus: () => void;
}) {
  const panelRef = useOutsideClose<HTMLDivElement>(open, onClose);

  useLockBodyScroll(open);

  if (!open || !item) return null;

  const webhookUrl = "https://apirefernow.com/webhooks/salesforce";
  const metrics = {
    totalApiCalls24h: 1847,
    successfulSyncs: 1847,
    failedSyncs: 0,
    retryAttempts: 0,
  };

  const events = [
    { name: "New Lead Created", count: 342 },
    { name: "Status Updated", count: 856 },
    { name: "Commission Calculated", count: 234 },
    { name: "Referral Assigned", count: 415 },
  ];

  const StatusBadge = ({ status }: { status: ConnStatus }) => {
    const cls =
      status === "Connected"
        ? "bg-emerald-100 text-emerald-700"
        : status === "Warning"
          ? "bg-amber-100 text-amber-700"
          : "bg-rose-100 text-rose-700";

    return (
      <span
        className={cn(
          "inline-flex rounded-full px-3 py-1 text-xs font-medium",
          cls,
        )}
      >
        {status}
      </span>
    );
  };

  const MetricCard = ({
    label,
    value,
    tone,
  }: {
    label: string;
    value: number;
    tone: "slate" | "green" | "red" | "orange";
  }) => {
    const vCls =
      tone === "green"
        ? "text-emerald-600"
        : tone === "red"
          ? "text-rose-600"
          : tone === "orange"
            ? "text-orange-600"
            : "text-slate-900";

    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="text-xs font-semibold text-slate-500">{label}</div>
        <div className={cn("mt-2 text-2xl font-black tracking-tight", vCls)}>
          {value.toLocaleString()}
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-200">
      <div className="absolute inset-0 bg-black/45" />

      <div className="absolute inset-0 overflow-y-auto p-3 md:p-6">
        <div className="flex min-h-full items-start justify-center md:items-center">
          <div
            ref={panelRef}
            className={cn(
              "flex w-full max-w-2xl flex-col overflow-hidden bg-white",
              "shadow-[0_30px_90px_rgba(0,0,0,0.35)]",
              "max-h-[calc(100vh-1.5rem)] md:max-h-[calc(100vh-3rem)]",
            )}
          >
            <div className="shrink-0 flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
              <div className="min-w-0">
                <div className="truncate text-lg font-extrabold text-slate-900">
                  {item.name} Integration
                </div>
                <div className="mt-1 text-sm font-medium text-slate-500">
                  Integration Details &amp; Metrics
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
              <div className="rounded-xl bg-[#F9FAFB] p-5">
                <div className="text-base font-extrabold text-slate-900">
                  Integration Overview
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">Status</div>
                    <StatusBadge status={item.status} />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      Connected Brokers
                    </div>
                    <div className="text-sm font-semibold text-slate-900">
                      {item.brokers}
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-sm text-slate-500">
                      Last Sync Timestamp
                    </div>
                    <div className="text-sm font-medium text-slate-900">
                      {item.lastSync}
                    </div>
                  </div>

                  <div className="border-t border-slate-200 pt-3" />

                  <div>
                    <div className="text-sm text-slate-500">
                      Webhook Endpoint
                    </div>
                    <div className="mt-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-black">
                      {webhookUrl}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-[#BEDBFF] bg-[#EFF6FF] p-5">
                <div className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-blue-600" />
                  <div className="text-base font-extrabold text-slate-900">
                    Sync Metrics
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <MetricCard
                    label="Total API Calls (24h)"
                    value={metrics.totalApiCalls24h}
                    tone="slate"
                  />
                  <MetricCard
                    label="Successful Syncs"
                    value={metrics.successfulSyncs}
                    tone="green"
                  />
                  <MetricCard
                    label="Failed Syncs"
                    value={metrics.failedSyncs}
                    tone="red"
                  />
                  <MetricCard
                    label="Retry Attempts"
                    value={metrics.retryAttempts}
                    tone="orange"
                  />
                </div>
              </div>

              <div className="mt-5 rounded-3xl bg-[#F9FAFB] p-5">
                <div className="text-base font-extrabold text-slate-900">
                  Supported Event Types
                </div>

                <div className="mt-4 space-y-3">
                  {events.map((e) => (
                    <div
                      key={e.name}
                      className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="inline-flex h-6 w-6 items-center justify-center">
                          <CheckCircle2 className="h-4 w-4 text-[#00A63E]" />
                        </div>
                        <div className="text-sm font-medium text-black">
                          {e.name}
                        </div>
                      </div>

                      <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-xs font-medium text-[#030213]">
                        {e.count} events
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 rounded-3xl border border-orange-200 bg-orange-50/60 p-5">
                <div className="text-base font-semibold text-slate-900">
                  Retry Controls
                </div>
                <div className="mt-2 text-sm text-[#364153]">
                  If sync errors occurred, you can manually retry failed events.
                  This will attempt to reprocess all failed synchronization
                  attempts from the last 24 hours.
                </div>

                <button
                  type="button"
                  className="mt-4 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#F54900] text-sm font-medium text-white hover:opacity-95"
                >
                  <RotateCcw className="h-4 w-4 shrink-0" />
                  Retry Failed Events
                </button>
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-200 px-6 py-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))]">
              <div className="space-y-3">
                <button
                  type="button"
                  className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-[#0A0A0A] hover:bg-slate-50"
                >
                  Download Integration Report
                </button>

                <button
                  type="button"
                  onClick={onToggleStatus}
                  className={cn(
                    "h-12 w-full rounded-2xl text-sm font-medium text-white hover:opacity-95 transition-all",
                    item.status === "Disconnected" ? "bg-emerald-600" : "bg-[#D4183D]"
                  )}
                >
                  {item.status === "Disconnected" ? "Enable" : "Disable"} Integration
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
