// src/pages/SuperAdmin/SuperAdminIntegrations.tsx

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ChevronDown,
  Check,
  Info,
  Cloud,
  Link2,
  Zap,
  Trello,
  Webhook,
  Mail,
  AlertTriangle,
  ExternalLink,
  MoreVertical,
} from "lucide-react";
import IntegrationDetailsModal, {
  ConnStatus,
  IntegrationCardData,
} from "@/components/SuperAdminDashboardCom/SAIntegrationsCom/modals/IntegrationDetailsModal";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function useOutsideClose<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  return ref;
}

/* ----------------------------- dropdown ----------------------------- */
type Filter = "All" | "Active" | "Inactive" | "Error" | "Needs Attention";

function StatusDropdown({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const options: Filter[] = [
    "All",
    "Active",
    "Inactive",
    "Error",
    "Needs Attention",
  ];

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 min-w-35 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-100"
      >
        {value}
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-55 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          {options.map((opt) => {
            const active = opt === value;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium hover:bg-slate-50",
                  active && "bg-slate-100",
                )}
              >
                <span className="text-slate-800">{opt}</span>
                {active ? (
                  <Check className="h-5 w-5 text-slate-500" />
                ) : (
                  <span className="h-5 w-5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ----------------------------- pills ----------------------------- */
function StatusPill({ status }: { status: ConnStatus }) {
  const cls =
    status === "Connected"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : status === "Warning"
        ? "bg-amber-50 text-amber-700 border-amber-100"
        : "bg-rose-50 text-rose-700 border-rose-100";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        cls,
      )}
    >
      {status}
    </span>
  );
}

/* ----------------------------- cards ----------------------------- */
function IntegrationCard({
  item,
  onViewDetails,
}: {
  item: IntegrationCardData;
  onViewDetails: () => void;
}) {
  const Icon = item.icon;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50">
            <Icon className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              {item.name}
            </div>
          </div>
        </div>
        <StatusPill status={item.status} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 text-xs">
        <div className="text-slate-500">
          <div>Last Sync</div>
          <div className="mt-1 font-semibold text-slate-900">
            {item.lastSync}
          </div>
        </div>

        <div className="text-right text-slate-500">
          <div>Sync Errors (24h)</div>
          <div
            className={cn(
              "mt-1 font-semibold",
              item.syncErrors > 0 ? "text-rose-600" : "text-emerald-600",
            )}
          >
            {item.syncErrors}
          </div>
        </div>

        <div className="text-slate-500">
          <div>Connected Brokers</div>
          <div className="mt-1 font-semibold text-slate-900">
            {item.brokers}
          </div>
        </div>

        <div />
      </div>

      <button
        type="button"
        onClick={onViewDetails}
        className="mt-4 w-full rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
      >
        View Details
      </button>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          View Logs
        </button>
        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-rose-500 hover:bg-rose-50"
        >
          Disable
        </button>
      </div>
    </div>
  );
}

/* ----------------------------- email + alerts ----------------------------- */
function EmailServicesCard() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <Mail className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-900">
              Email Delivery
            </div>
            <div className="text-xs text-slate-500">SendGrid Integration</div>
          </div>
        </div>

        <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
          Connected
        </span>
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4">
        <div className="rounded-2xl bg-slate-50/60 p-4">
          <div className="text-xs text-slate-500">Emails Sent (24h)</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">8,547</div>
          <div className="mt-1 text-xs font-semibold text-emerald-600">
            ~ +12% from yesterday
          </div>
        </div>

        <div className="rounded-2xl bg-slate-50/60 p-4">
          <div className="text-xs text-slate-500">Bounce Rate</div>
          <div className="mt-2 text-2xl font-bold text-slate-900">1.2%</div>
          <div className="mt-1 text-xs text-slate-500">
            Within acceptable range
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          View Logs
        </button>
        <button
          type="button"
          className="rounded-xl bg-[#070A1A] py-2 text-sm font-semibold text-white hover:opacity-95"
        >
          Test Email
        </button>
      </div>
    </div>
  );
}

type AlertTone = "Warning" | "Critical";

function AlertTag({ tone }: { tone: AlertTone }) {
  const cls =
    tone === "Warning"
      ? "bg-amber-50 text-amber-700 border-amber-100"
      : "bg-rose-50 text-rose-700 border-rose-100";
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

function SystemAlertsCard() {
  const alerts = [
    {
      title: "Failed Stripe Webhook",
      tone: "Warning" as const,
      desc: "3 webhook delivery attempts failed for payment succeeded event",
      time: "2 hours ago",
    },
    {
      title: "CRM Sync Delay",
      tone: "Warning" as const,
      desc: "Salesforce sync experiencing delays, 15-minute lag detected",
      time: "4 hours ago",
    },
    {
      title: "Email Delivery Failure Spike",
      tone: "Critical" as const,
      desc: "Bounce rate increased to 3.5%, investigating issue with SendGrid",
      time: "8 hours ago",
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
          <AlertTriangle className="h-5 w-5 text-amber-600" />
        </div>

        <div>
          <div className="text-sm font-semibold text-slate-900">
            System Alerts
          </div>
          <div className="text-xs text-slate-500">
            Recent integration issues
          </div>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {alerts.map((a) => (
          <div
            key={a.title}
            className={cn(
              "rounded-2xl border bg-amber-50/40 p-4",
              a.tone === "Critical" ? "border-rose-200" : "border-amber-200",
            )}
          >
            <div className="flex items-center gap-2">
              <div className="text-sm font-semibold text-slate-900">
                {a.title}
              </div>
              <AlertTag tone={a.tone} />
            </div>
            <div className="mt-1 text-xs text-slate-600">{a.desc}</div>
            <div className="mt-1 text-xs text-slate-400">{a.time}</div>

            <button
              type="button"
              className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <ExternalLink className="h-4 w-4 text-slate-500" />
              View Related Logs
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------- table ----------------------------- */
type WebhookRow = {
  type: string;
  url: string;
  lastTriggered: string;
  status: "Active" | "Failed" | "Retrying";
  failures: number;
  retry: string;
};

function WebhookStatusPill({ s }: { s: WebhookRow["status"] }) {
  const cls =
    s === "Active"
      ? "bg-emerald-50 text-emerald-700"
      : s === "Failed"
        ? "bg-rose-600 text-white"
        : "bg-amber-50 text-amber-700";
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-3 py-1 text-xs font-bold",
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

  const cards: IntegrationCardData[] = [
    {
      id: "sf",
      name: "Salesforce",
      status: "Connected",
      lastSync: "5 minutes ago",
      syncErrors: 0,
      brokers: 24,
      icon: Cloud,
    },
    {
      id: "hs",
      name: "HubSpot",
      status: "Connected",
      lastSync: "10 minutes ago",
      syncErrors: 0,
      brokers: 18,
      icon: Cloud,
    },
    {
      id: "zp",
      name: "Zapier",
      status: "Warning",
      lastSync: "2 hours ago",
      syncErrors: 3,
      brokers: 42,
      icon: Zap,
    },
    {
      id: "tr",
      name: "Trello",
      status: "Connected",
      lastSync: "15 minutes ago",
      syncErrors: 0,
      brokers: 12,
      icon: Trello,
    },
    {
      id: "wh",
      name: "Custom Webhook",
      status: "Connected",
      lastSync: "1 minute ago",
      syncErrors: 0,
      brokers: 35,
      icon: Webhook,
    },
    {
      id: "api",
      name: "API Integration",
      status: "Disconnected",
      lastSync: "3 days ago",
      syncErrors: 127,
      brokers: 0,
      icon: Link2,
    },
  ];

  const shownCards = useMemo(() => {
    if (filter === "All") return cards;
    if (filter === "Active")
      return cards.filter((c) => c.status === "Connected");
    if (filter === "Inactive")
      return cards.filter((c) => c.status === "Disconnected");
    if (filter === "Error") return cards.filter((c) => c.syncErrors > 0);
    return cards.filter((c) => c.status === "Warning" || c.syncErrors > 0);
  }, [filter]);

  const webhooks: WebhookRow[] = [
    {
      type: "lead.created",
      url: "https://broker1.com/webhook",
      lastTriggered: "2 minutes ago",
      status: "Active",
      failures: 0,
      retry: "N/A",
    },
    {
      type: "commission.calculated",
      url: "https://broker2.com/webhook",
      lastTriggered: "15 minutes ago",
      status: "Active",
      failures: 0,
      retry: "N/A",
    },
    {
      type: "status.updated",
      url: "https://broker3.com/webhook",
      lastTriggered: "1 hour ago",
      status: "Failed",
      failures: 3,
      retry: "Pending",
    },
    {
      type: "referral.assigned",
      url: "https://broker4.com/webhook",
      lastTriggered: "5 minutes ago",
      status: "Active",
      failures: 0,
      retry: "N/A",
    },
    {
      type: "payment.received",
      url: "https://broker5.com/webhook",
      lastTriggered: "3 hours ago",
      status: "Retrying",
      failures: 1,
      retry: "In Progress",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-10 py-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Integrations Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Configure and monitor third-party integrations
          </p>
        </div>

        <div className="mt-5 rounded-2xl border border-sky-300/70 bg-sky-50 px-5 py-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-sky-400/60 bg-white">
              <Info className="h-4 w-4 text-sky-600" />
            </div>

            <div className="text-sm font-semibold text-sky-700">
              <span className="font-extrabold">Important:</span> Integrations
              affect broker workflow and commission tracking. Monitor connection
              status to ensure uninterrupted system performance.
            </div>
          </div>
        </div>

        <div className="mt-8 flex items-center justify-between">
          <div className="text-sm font-bold text-slate-900">
            CRM &amp; Workflow Integrations
          </div>
          <StatusDropdown value={filter} onChange={setFilter} />
        </div>

        <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          {shownCards.map((c) => (
            <IntegrationCard
              key={c.id}
              item={c}
              onViewDetails={() => setSelected(c)}
            />
          ))}
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 text-sm font-bold text-slate-900">
              Email Services
            </div>
            <EmailServicesCard />
          </div>
          <div>
            <SystemAlertsCard />
          </div>
        </div>

        <div className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="px-6 py-5">
            <div className="text-sm font-bold text-slate-900">
              Webhook Monitor
            </div>
            <div className="text-xs text-slate-500">
              Real-time webhook delivery tracking
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-225">
              <thead>
                <tr className="border-t border-slate-200 bg-slate-50/40">
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
                      className="px-6 py-3 text-left text-xs font-bold text-slate-700"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {webhooks.map((r) => (
                  <tr key={r.type} className="bg-white">
                    <td className="px-6 py-4 text-sm text-slate-700">
                      {r.type}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {r.url}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {r.lastTriggered}
                    </td>
                    <td className="px-6 py-4">
                      <WebhookStatusPill s={r.status} />
                    </td>
                    <td
                      className={cn(
                        "px-6 py-4 text-sm font-semibold",
                        r.failures > 0 ? "text-rose-600" : "text-slate-700",
                      )}
                    >
                      {r.failures}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500">
                      {r.retry}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                        aria-label="Row actions"
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

      {/* ✅ modal (separate file) */}
      <IntegrationDetailsModal
        open={!!selected}
        item={selected}
        onClose={() => setSelected(null)}
      />
    </div>
  );
}
