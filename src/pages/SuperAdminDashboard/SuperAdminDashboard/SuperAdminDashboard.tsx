// src/pages/SuperAdminDashboard/SuperAdminDashboard/SuperAdminDashboard.tsx

import React, { useState } from "react";
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

import { TotalLicensedUsersModal } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/TotalLicensedUsersModal";
import { TotalRegisteredAccountsModal } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/TotalRegisteredAccountsModal";
import { ActiveSubscriptionsModal } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/ActiveSubscriptionsModal";
import { AnnualRevenueAnalyticsModal } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/AnnualRevenueAnalyticsModal";

import { dashboardMock, toneStyles } from "./mock";
import type {
  ChipProps,
  GrowthCardProps,
  LinkRowProps,
  MetricCardProps,
  ModalType,
  SnapshotCardProps,
} from "./types";
import { useOutsideClose } from "@/hooks/useOutsideClose";

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
}: MetricCardProps) {
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

function GrowthCard({ title, value, change, icon: Icon }: GrowthCardProps) {
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

function SnapshotCard({ title, children }: SnapshotCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="text-sm font-semibold text-slate-700">{title}</h3>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function LinkRow({ label }: LinkRowProps) {
  return (
    <button
      type="button"
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00B4FE] hover:text-[#00A63E]"
    >
      {label} <ArrowRight className="h-4 w-4" />
    </button>
  );
}

function Chip({ kind, label }: ChipProps) {
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

export default function SuperAdminDashboard() {
  const [range, setRange] = useState("Month to Date (MTD)");
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<ModalType | null>(null);

  const dropdownRef = useOutsideClose<HTMLDivElement>(open, () =>
    setOpen(false),
  );

  const {
    licensedUsers,
    registeredAccounts,
    subscriptions,
    annualRevenue,
    ranges,
    systemHealth,
  } = dashboardMock;

  return (
    <div className="min-h-screen bg-white">
      <div className="md:px-8 md:pb-6 md:pt-2">
        <div
          ref={dropdownRef}
          className="relative flex items-center justify-between border-t border-slate-200 px-7 pt-3.5"
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
            <div className="absolute left-7 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white shadow-md">
              {ranges.map((item) => (
                <button
                  key={item}
                  type="button"
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

        <div className="px-7">
          <p className="mt-2 text-xs text-slate-500">
            Date range dynamically updates all metrics below
          </p>
        </div>

        <div className="mt-3 border-t border-slate-200 px-7 pt-7">
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

        <div className="mt-9 px-7">
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

        <div className="mt-9 px-7">
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
                  <div className="text-[16px] font-semibold text-emerald-600">
                    $742,100
                  </div>
                </div>

                <div className="flex flex-col justify-between text-sm">
                  <div className="text-black">Pending</div>
                  <div className="text-[16px] font-semibold text-rose-500">
                    $105,150
                  </div>
                </div>
              </div>

              <LinkRow label="View Commission Details" />
            </SnapshotCard>
          </div>
        </div>

        <div className="mt-9 px-7">
          <SectionTitle>System Health</SectionTitle>

          <div className="mt-4 rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="px-6 py-5">
              <div className="font-semibold text-slate-800">
                Platform Infrastructure Health
              </div>
            </div>

            <div className="divide-y divide-slate-100">
              {systemHealth.map((r) => (
                <div
                  key={r.label}
                  className="flex items-center justify-between space-y-3 px-6 py-3"
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

      <TotalLicensedUsersModal
        open={modal === "licensedUsers"}
        onClose={() => setModal(null)}
        data={licensedUsers}
      />

      <TotalRegisteredAccountsModal
        open={modal === "registeredAccounts"}
        onClose={() => setModal(null)}
        data={registeredAccounts}
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
