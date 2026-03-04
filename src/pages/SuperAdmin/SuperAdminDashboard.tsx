// src/components/dashboard/SuperAdminDashboard.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  ArrowUpRight,
  Info,
  ChevronDown,
  Calendar,
  UserPlus,
  Banknote,
  UserCheck,
  UserMinus,
  ArrowDownRight,
  ArrowRight,
  ChevronUp,
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
  icon: Icon,
}: {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
}) {
  const isUp = change.trim().startsWith("+");

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-slate-500">{title}</p>

        <div className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100">
          <Icon className="h-5 w-5 text-[#155DFC]" />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between">
        <div className="text-3xl font-semibold tracking-tight text-slate-900">
          {value}
        </div>

        <div
          className={`inline-flex items-center gap-1 text-sm font-semibold ${
            isUp ? "text-emerald-600" : "text-rose-600"
          }`}
        >
          {change}
          {isUp ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : (
            <ArrowDownRight className="h-4 w-4" />
          )}
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
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00B4FE] hover:text-[#00A63E]"
    >
      {label} <ArrowRight className="h-4 w-4" />
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
  const [range, setRange] = useState("Month to Date (MTD)");
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<ModalType | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  // close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- mock data
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

  const ranges = [
    "Month to Date (MTD)",
    "Year to Date (YTD)",
    "Last 6 Months",
    "Custom Range",
  ];

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-10 py-6">
        {/* top filter */}
        <div
          ref={dropdownRef}
          className="relative flex items-center justify-between"
        >
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
          >
            <Calendar className="h-4 w-4 text-[#364153]" />
            {range}

            {open ? (
              <ChevronUp className="h-4 w-4 text-[#364153]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#364153]" />
            )}
          </button>

          {open && (
            <div className="absolute left-0 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-md">
              {ranges.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setRange(item);
                    setOpen(false);
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="mt-2 text-xs text-slate-500">
            Date range dynamically updates all metrics below
          </p>
        </div>

        {/* Key Metrics */}
        <div className="pt-7 mt-3 border-t border-slate-200">
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
              icon={UserPlus}
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
              icon={Banknote}
              tone="blue"
              onInfo={() => setModal("annualRevenue")}
            />
          </div>
        </div>

        {/* Growth Metrics */}
        <div className="mt-9">
          <SectionTitle>Growth Metrics</SectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <GrowthCard
              title="New Signups"
              value="342"
              change="+15.3%"
              icon={UserCheck}
            />
            <GrowthCard
              title="Churned Accounts"
              value="28"
              change="-5.2%"
              icon={UserMinus}
            />
            <GrowthCard
              title="Net Growth"
              value="+314"
              change="+22.1%"
              icon={TrendingUp}
            />
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
              <div className="mt-3 space-y-1 text-sm text-black">
                <div>Total count</div>
                <div className="text-slate-900">
                  <p className="font-semibold">3 </p>
                  <span>Suspended count</span>
                </div>
              </div>
              <LinkRow label="View Brokers" />
            </SnapshotCard>

            <SnapshotCard title="Active Referrers">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                2,845
              </div>
              <div className="mt-3 space-y-1 text-sm text-black">
                <div>Total</div>
                <div className="text-slate-900">
                  <p className="font-semibold">1,923</p>
                  <span>With Active Leads</span>
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
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col justify-between text-sm">
                  <div className="text-black">Market Paid</div>
                  <div className="font-semibold text-emerald-600 text-[16px]">
                    $742,100
                  </div>
                </div>

                <div className="flex flex-col justify-between text-sm">
                  <div className="text-black">Pending</div>
                  <div className="font-semibold text-rose-500 text-[16px]">
                    $105,150
                  </div>
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
              <div className="font-semibold text-slate-800">
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
                  className="flex items-center justify-between px-6 py-3 space-y-3"
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
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
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
