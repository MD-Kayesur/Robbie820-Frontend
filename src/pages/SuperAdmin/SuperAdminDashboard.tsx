// src/components/dashboard/SuperAdminDashboard.tsx
"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  UserCheck,
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Info,
  ChevronDown,
} from "lucide-react";

import {
  TotalLicensedUsersModal,
  type UserRow,
} from "../../components/AdminDashboardCom/ADComModals/TotalLicensedUsersModal";
import { TotalRegisteredAccountsModal } from "../../components/AdminDashboardCom/ADComModals/TotalRegisteredAccountsModal";
import {
  ActiveSubscriptionsModal,
  type SubscriptionRow,
} from "../../components/AdminDashboardCom/ADComModals/ActiveSubscriptionsModal";
import {
  AnnualRevenueAnalyticsModal,
  type RevenueRow,
} from "../../components/AdminDashboardCom/ADComModals/AnnualRevenueAnalyticsModal";

type Tone = "indigo" | "blue" | "emerald" | "amber";

const toneStyles: Record<Tone, { iconWrap: string; icon: string }> = {
  indigo: { iconWrap: "bg-indigo-50", icon: "text-indigo-600" },
  blue: { iconWrap: "bg-sky-50", icon: "text-sky-600" },
  emerald: { iconWrap: "bg-emerald-50", icon: "text-emerald-600" },
  amber: { iconWrap: "bg-amber-50", icon: "text-amber-600" },
};

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="text-sm font-semibold text-slate-700">{children}</h2>;
}

function MetricCard({
  title,
  value,
  change,
  icon: Icon,
  tone,
  onInfo,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  tone: Tone;
  onInfo?: () => void;
}) {
  const t = toneStyles[tone];
  const isUp = change.trim().startsWith("+");

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
    >
      <div>
        <div className="flex items-center justify-end">
          {onInfo ? (
            <button
              type="button"
              onClick={onInfo}
              className="inline-flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-50"
              aria-label={`Open ${title} details`}
            >
              <Info className="h-4 w-4" />
            </button>
          ) : (
            <div className="h-8 w-8" />
          )}
        </div>

        <div className="flex items-center justify-between">
          <p className="text-xs text-black">{title}</p>
          <div
            className={[
              "inline-flex h-9 w-9 items-center justify-center rounded-xl",
              t.iconWrap,
            ].join(" ")}
          >
            <Icon className={[t.icon, "h-5 w-5"].join(" ")} />
          </div>
        </div>

        <div className="mt-2 flex items-end justify-between">
          <div className="text-xl font-medium tracking-tight text-slate-900">
            {value}
          </div>

          <div
            className={[
              "inline-flex items-center gap-1 text-sm font-semibold",
              isUp ? "text-[#00A63E]" : "text-rose-600",
            ].join(" ")}
          >
            <TrendingUp className="h-4 w-4" />
            {change}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function GrowthCard({
  title,
  value,
  change,
}: {
  title: string;
  value: string;
  change: string;
}) {
  const isUp = change.trim().startsWith("+");
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-3xl font-semibold tracking-tight text-slate-900">
          {value}
        </div>
        <div
          className={[
            "inline-flex items-center gap-1 text-sm font-semibold",
            isUp ? "text-emerald-600" : "text-rose-600",
          ].join(" ")}
        >
          {change}
          <ArrowUpRight className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function SnapshotCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function LinkRow({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700"
    >
      {label} <ArrowUpRight className="h-4 w-4" />
    </button>
  );
}

function Chip({ kind, label }: { kind: "healthy" | "warning"; label: string }) {
  const cls =
    kind === "healthy"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-amber-50 text-amber-700 border-amber-100";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        cls,
      ].join(" ")}
    >
      {label}
    </span>
  );
}

type ModalType =
  | "licensedUsers"
  | "registeredAccounts"
  | "activeSubscriptions"
  | "annualRevenue";

export default function SuperAdminDashboard() {
  const [range, setRange] = useState("Custom Range");
  const [modal, setModal] = useState<ModalType | null>(null);

  // --- mock data (from screenshots) ---
  const licensedUsers: UserRow[] = [
    {
      name: "John Smith",
      email: "john@example.com",
      date: "Feb 15, 2026",
      status: "Active",
    },
    {
      name: "Sarah Johnson",
      email: "sarah@example.com",
      date: "Feb 14, 2026",
      status: "Active",
    },
    {
      name: "Michael Brown",
      email: "michael@example.com",
      date: "Feb 13, 2026",
      status: "Active",
    },
    {
      name: "Emily Davis",
      email: "emily@example.com",
      date: "Feb 12, 2026",
      status: "Active",
    },
    {
      name: "David Wilson",
      email: "david@example.com",
      date: "Feb 11, 2026",
      status: "Inactive",
    },
  ];

  const subscriptions: SubscriptionRow[] = [
    {
      plan: "Pro Plan - Acme Corp",
      email: "billing@acme.com",
      price: "$299/mo",
      status: "Active",
    },
    {
      plan: "Enterprise - TechCo",
      email: "finance@techco.com",
      price: "$999/mo",
      status: "Active",
    },
    {
      plan: "Pro Plan - StartupXYZ",
      email: "admin@startupxyz.com",
      price: "$299/mo",
      status: "Active",
    },
    {
      plan: "Business - GlobalInc",
      email: "billing@globalinc.com",
      price: "$599/mo",
      status: "Active",
    },
  ];

  const annualRevenue: RevenueRow[] = [
    { label: "Pro Plan Revenue", value: "$45,600" },
    { label: "Enterprise Revenue", value: "$89,400" },
    { label: "Business Plan Revenue", value: "$23,800" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-6 py-6">
        {/* top filter */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
            onClick={() =>
              setRange((r) =>
                r === "Custom Range" ? "Last 30 Days" : "Custom Range",
              )
            }
          >
            {range}
            <ChevronDown className="h-4 w-4 text-slate-400" />
          </button>
        </div>

        {/* Key Metrics */}
        <div className="mt-7">
          <SectionTitle>Key Metrics</SectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            <MetricCard
              title="Total Licensed Users"
              value="8,547"
              change="+12.5%"
              icon={Users}
              tone="indigo"
              onInfo={() => setModal("licensedUsers")}
            />
            <MetricCard
              title="Total Registered Accounts"
              value="12,834"
              change="+8.2%"
              icon={UserCheck}
              tone="blue"
              onInfo={() => setModal("registeredAccounts")}
            />
            <MetricCard
              title="Active Subscriptions"
              value="1,247"
              change="+5.4%"
              icon={CreditCard}
              tone="emerald"
              onInfo={() => setModal("activeSubscriptions")}
            />
            <MetricCard
              title="Monthly Revenue"
              value="$158,800"
              change="+18.7%"
              icon={DollarSign}
              tone="blue"
            />
            <MetricCard
              title="Annual Revenue"
              value="$1.8M"
              change="+24.3%"
              icon={TrendingUp}
              tone="blue"
              onInfo={() => setModal("annualRevenue")}
            />
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="mt-9">
          <SectionTitle>Growth Metrics</SectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <GrowthCard title="New Signups" value="342" change="+15.3%" />
            <GrowthCard title="Churned Accounts" value="28" change="-5.2%" />
            <GrowthCard title="Net Growth" value="+314" change="+22.1%" />
          </div>
        </div>

        {/* Platform Control Snapshot */}
        <div className="mt-9">
          <SectionTitle>Platform Control Snapshot</SectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <SnapshotCard title="Active Brokers">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                147
              </div>
              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <div>Total count</div>
                <div className="text-slate-900">
                  3 <span className="text-slate-500">Suspended count</span>
                </div>
              </div>
              <LinkRow label="View Brokers" />
            </SnapshotCard>

            <SnapshotCard title="Active Referrers">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                2,845
              </div>
              <div className="mt-3 space-y-1 text-sm text-slate-500">
                <div>Total</div>
                <div className="text-slate-900">
                  1,923{" "}
                  <span className="text-slate-500">With Active Leads</span>
                </div>
              </div>
              <LinkRow label="View Referrers" />
            </SnapshotCard>

            <SnapshotCard title="Commission Tracking Snapshot">
              <div className="rounded-2xl bg-slate-50/60 p-5">
                <div className="text-sm font-semibold text-slate-700">
                  Total Commission Calculated
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  $847,250
                </div>
                <div className="text-xs font-medium text-slate-400">
                  Platform wide
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 text-sm">
                  <div className="text-slate-600">Market Paid</div>
                  <div className="font-semibold text-emerald-600">$742,100</div>
                </div>

                <div className="mt-2 flex items-center justify-between gap-4 text-sm">
                  <div className="text-slate-600">Pending</div>
                  <div className="font-semibold text-rose-500">$105,150</div>
                </div>
              </div>

              <LinkRow label="View Commission Details" />
            </SnapshotCard>
          </div>
        </div>

        {/* System Health */}
        <div className="mt-9">
          <SectionTitle>System Health</SectionTitle>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-5">
              <div className="text-sm font-semibold text-slate-800">
                Platform Infrastructure Health
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {[
                { label: "CRM Sync Status", status: "healthy" as const },
                { label: "Payment Gateway Status", status: "healthy" as const },
                { label: "Email Delivery Service", status: "warning" as const },
                { label: "API Performance", status: "healthy" as const },
                { label: "Background Job Queue", status: "healthy" as const },
              ].map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between px-6 py-4"
                >
                  <div className="text-sm text-slate-600">{r.label}</div>
                  <Chip
                    kind={r.status}
                    label={r.status === "healthy" ? "Healthy" : "Warning"}
                  />
                </div>
              ))}
            </div>

            <div className="px-6 py-5">
              <button
                type="button"
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
              >
                View Detailed Logs
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      <TotalLicensedUsersModal
        open={modal === "licensedUsers"}
        onClose={() => setModal(null)}
        data={licensedUsers}
      />

      <TotalRegisteredAccountsModal
        open={modal === "registeredAccounts"}
        onClose={() => setModal(null)}
        data={licensedUsers}
      />

      <ActiveSubscriptionsModal
        open={modal === "activeSubscriptions"}
        onClose={() => setModal(null)}
        data={subscriptions}
      />

      <AnnualRevenueAnalyticsModal
        open={modal === "annualRevenue"}
        onClose={() => setModal(null)}
        data={annualRevenue}
      />
    </div>
  );
}
