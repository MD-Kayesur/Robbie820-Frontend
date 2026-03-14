// src/pages/SuperAdminDashboard/SuperAdminDashboard/SuperAdminDashboard.tsx

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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

function LinkRow({ label, onClick }: LinkRowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#00B4FE] hover:underline"
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
  const navigate = useNavigate();
  const [range, setRange] = useState("Month to Date (MTD)");
  const [open, setOpen] = useState(false);
  const [modal, setModal] = useState<ModalType | null>(null);

  // Custom Range Date Picker States
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [monthsDiff, setMonthsDiff] = useState(1);

  const calculateMonthsDifference = (from: string, to: string) => {
    if (!from || !to) return 1;
    const d1 = new Date(from);
    const d2 = new Date(to);

    // Ensure from is before to
    if (d1 > d2) return 1;

    let months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();

    // Round up so even partial months count as at least 1 multiplier
    return months <= 0 ? 1 : months;
  };

  const applyCustomRange = () => {
    setMonthsDiff(calculateMonthsDifference(dateRange.from, dateRange.to));
    setRange("Custom Range");
    setCalendarOpen(false);
  };

  const scaleMetric = (metricStr: string, multiplier: number) => {
    // If it's a fixed string like "$1.8M", return it unscaled for now (or implement precise parsing)
    if (metricStr.endsWith("M") || metricStr.endsWith("K")) return metricStr;

    const isCurrency = metricStr.startsWith("$");
    const num = parseFloat(metricStr.replace(/[^0-9.-]+/g, ""));
    const scaledNum = Math.round(num * multiplier);

    if (isNaN(scaledNum)) return metricStr;
    return isCurrency
      ? `$${scaledNum.toLocaleString()}`
      : scaledNum.toLocaleString();
  };

  const dropdownRef = useOutsideClose<HTMLDivElement>(open, () =>
    setOpen(false),
  );

  const { ranges, systemHealth, metricsByRange } = dashboardMock;

  let activeMetrics =
    metricsByRange[range] || metricsByRange["Month to Date (MTD)"];

  // Dynamically project "Custom Range" from MTD explicitly.
  if (range === "Custom Range" && monthsDiff > 1) {
    const base = metricsByRange["Month to Date (MTD)"];
    activeMetrics = {
      ...base,
      licensedUsersCount: scaleMetric(base.licensedUsersCount, monthsDiff),
      registeredAccountsCount: scaleMetric(
        base.registeredAccountsCount,
        monthsDiff,
      ),
      activeSubscriptionsCount: scaleMetric(
        base.activeSubscriptionsCount,
        monthsDiff,
      ),
      monthlyRevenue: scaleMetric(base.monthlyRevenue, monthsDiff), // Actually aggregate revenue depending on interpretation, here scaled.
      newSignups: scaleMetric(base.newSignups, monthsDiff),
      churnedAccounts: scaleMetric(base.churnedAccounts, monthsDiff),
      activeBrokers: Math.round(base.activeBrokers * monthsDiff),
      suspendedBrokers: Math.round(base.suspendedBrokers * monthsDiff),
      activeReferrers: Math.round(base.activeReferrers * monthsDiff),
      referrersWithLeads: Math.round(base.referrersWithLeads * monthsDiff),
      totalCommission: scaleMetric(base.totalCommission, monthsDiff),
      marketPaid: scaleMetric(base.marketPaid, monthsDiff),
      pendingCommission: scaleMetric(base.pendingCommission, monthsDiff),
    } as any;
  }

  const {
    licensedUsersCount,
    licensedUsersChange,
    registeredAccountsCount,
    registeredAccountsChange,
    activeSubscriptionsCount,
    activeSubscriptionsChange,
    monthlyRevenue,
    monthlyRevenueChange,
    annualRevenueCount,
    annualRevenueChange,
    newSignups,
    newSignupsChange,
    churnedAccounts,
    churnedAccountsChange,
    netGrowth,
    netGrowthChange,
    activeBrokers,
    suspendedBrokers,
    activeReferrers,
    referrersWithLeads,
    totalCommission,
    marketPaid,
    pendingCommission,
    licensedUsers,
    registeredAccounts,
    subscriptions,
    annualRevenue,
  } = activeMetrics;

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
            {range === "Custom Range" && dateRange.from && dateRange.to
              ? `${dateRange.from} - ${dateRange.to}`
              : range}

            {open ? (
              <ChevronUp className="h-4 w-4 text-[#364153]" />
            ) : (
              <ChevronDown className="h-4 w-4 text-[#364153]" />
            )}
          </button>

          {open && (
            <div className="absolute left-7 top-full mt-2 w-56 rounded-xl border border-slate-200 bg-white z-20 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
              {ranges.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => {
                    if (item === "Custom Range") {
                      setCalendarOpen(true);
                      setOpen(false);
                    } else {
                      setRange(item);
                      setOpen(false);
                      setCalendarOpen(false);
                    }
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50"
                  style={
                    item === "Custom Range"
                      ? { borderTop: "1px solid #e2e8f0" }
                      : {}
                  }
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {calendarOpen && (
            <div className="absolute left-7 top-[calc(100%+8px)] z-30 w-[min(18rem,calc(100vw-2rem))] rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
              <div className="space-y-4">
                <p className="text-[14px] font-semibold text-[#222]">
                  Select Date Range
                </p>

                <div className="space-y-2 text-black">
                  <label className="text-[12px]">From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) =>
                      setDateRange({
                        ...dateRange,
                        from: e.target.value,
                      })
                    }
                    className="h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-[13px] outline-none"
                  />
                </div>

                <div className="space-y-2 text-black">
                  <label className="text-[12px]">To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) =>
                      setDateRange({
                        ...dateRange,
                        to: e.target.value,
                      })
                    }
                    className="h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-[13px] outline-none"
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(false)}
                    className="flex-1 rounded-lg border border-[#E5E7EB] py-2 text-[13px] font-medium text-[#222] transition hover:bg-[#F4F4F5]"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={applyCustomRange}
                    className="flex-1 rounded-lg bg-[#1BAEF5] py-2 text-[13px] font-medium text-white transition hover:bg-[#129fe2]"
                  >
                    Apply
                  </button>
                </div>
              </div>
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
              value={licensedUsersCount}
              change={licensedUsersChange}
              icon={Users}
              tone="indigo"
              onInfo={() => setModal("licensedUsers")}
            />
            <MetricCard
              title="Total Registered Accounts"
              value={registeredAccountsCount}
              change={registeredAccountsChange}
              icon={UserPlus}
              tone="blue"
              onInfo={() => setModal("registeredAccounts")}
            />
            <MetricCard
              title="Active Subscriptions"
              value={activeSubscriptionsCount}
              change={activeSubscriptionsChange}
              icon={CreditCard}
              tone="emerald"
              onInfo={() => setModal("activeSubscriptions")}
            />
            <MetricCard
              title="Monthly Revenue"
              value={monthlyRevenue}
              change={monthlyRevenueChange}
              icon={DollarSign}
              tone="blue"
            />
            <MetricCard
              title="Annual Revenue"
              value={annualRevenueCount}
              change={annualRevenueChange}
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
              value={newSignups}
              change={newSignupsChange}
              icon={UserCheck}
            />
            <GrowthCard
              title="Churned Accounts"
              value={churnedAccounts}
              change={churnedAccountsChange}
              icon={UserMinus}
            />
            <GrowthCard
              title="Net Growth"
              value={netGrowth}
              change={netGrowthChange}
              icon={TrendingUp}
            />
          </div>
        </div>

        <div className="mt-9 px-7">
          <SectionTitle>Platform Control Snapshot</SectionTitle>

          <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <SnapshotCard title="Active Brokers">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                {activeBrokers}
              </div>
              <div className="mt-3 space-y-1 text-sm text-black">
                <div>Total count</div>
                <div className="text-slate-900">
                  <p className="font-semibold">{suspendedBrokers} </p>
                  <span>Suspended count</span>
                </div>
              </div>
              <LinkRow
                label="View Brokers"
                onClick={() =>
                  navigate("/super-admin/user-management", {
                    state: { tab: "Brokers" },
                  })
                }
              />
            </SnapshotCard>

            <SnapshotCard title="Active Referrers">
              <div className="text-3xl font-semibold tracking-tight text-slate-900">
                {activeReferrers.toLocaleString()}
              </div>
              <div className="mt-3 space-y-1 text-sm text-black">
                <div>Total</div>
                <div className="text-slate-900">
                  <p className="font-semibold">
                    {referrersWithLeads.toLocaleString()}
                  </p>
                  <span>With Active Leads</span>
                </div>
              </div>
              <LinkRow
                label="View Referrers"
                onClick={() =>
                  navigate("/super-admin/user-management", {
                    state: { tab: "Referrers" },
                  })
                }
              />
            </SnapshotCard>

            <SnapshotCard title="Commission Tracking Snapshot">
              <div className="rounded-2xl bg-slate-50/60 p-5">
                <div className="text-sm font-semibold text-slate-700">
                  Total Commission Calculated
                </div>
                <div className="mt-2 text-2xl font-semibold text-slate-900">
                  {totalCommission}
                </div>
                <div className="text-xs font-medium text-slate-400">
                  Platform wide
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col justify-between text-sm">
                  <div className="text-black">Market Paid</div>
                  <div className="text-[16px] font-semibold text-[#15D946]">
                    {marketPaid}
                  </div>
                </div>

                <div className="flex flex-col justify-between text-sm">
                  <div className="text-black">Pending</div>
                  <div className="text-[16px] font-semibold text-[#D76C6C]">
                    {pendingCommission}
                  </div>
                </div>
              </div>

              <LinkRow
                label="View Commission Details"
                onClick={
                  () => alert("TODO: Add route to commission details page")
                  //  navigate("/super-admin/user-management")
                }
              />
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
                onClick={() => navigate("/super-admin/audit-logs")}
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
