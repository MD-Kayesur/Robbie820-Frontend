// src/pages/ReferrerDashboard/ReferrerOverview/ReferrerOverview.tsx

import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Activity as ActivityIcon,
  CalendarDays,
  DollarSign,
  TrendingUp,
  Users,
  ListFilter,
  ChevronDown,
  ChevronUp,
  Info,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

import type { ActivityRow, DashboardFilters, DealStage, Metric } from "./types";
import { dashboardFiltersMock, dashboardDataMock } from "./mock";
import { cn } from "@/hooks/useCn";

/* ------------------------------ helpers ----------------------------- */
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
] as const;

function ymToLabel(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return `${MONTHS[(m ?? 1) - 1]} ${y}`;
}
function rangeToLabel(start: string, end: string) {
  return `${ymToLabel(start)} - ${ymToLabel(end)}`;
}
function ymToNum(ym: string) {
  const [y, m] = ym.split("-").map(Number);
  return (y ?? 0) * 100 + (m ?? 0);
}
function clampRange(start: string, end: string) {
  return ymToNum(start) <= ymToNum(end)
    ? { start, end }
    : { start: end, end: start };
}
function buildMonthOptions() {
  // matches your screenshot timeframe vibe; adjust as needed
  const out: Array<{ value: string; label: string }> = [];
  for (let y = 2025; y <= 2026; y++) {
    for (let m = 1; m <= 12; m++) {
      const value = `${y}-${String(m).padStart(2, "0")}`;
      out.push({ value, label: `${MONTHS[m - 1]} ${y}` });
    }
  }
  return out;
}
const MONTH_OPTIONS = buildMonthOptions();

/* ------------------------------ icons ----------------------------- */
function MetricIcon({ name }: { name: Metric["icon"] }) {
  const cls = "h-6 w-6 text-[#00B4FE]";
  switch (name) {
    case "users":
      return <Users className={cls} />;
    case "dollar":
      return <DollarSign className={cls} />;
    case "trend":
      return <ArrowUpRight className={cls} />;
    case "briefcase":
      return <Users className={cls} />;
    case "spark":
    default:
      return <TrendingUp className={cls} />;
  }
}

/* --------------------------- ui components ------------------------ */
function PillToggle({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "py-1.5  rounded-sm px-8 text-sm font-medium transition",
        active
          ? "bg-black text-white"
          : "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50",
      )}
    >
      {children}
    </button>
  );
}

function MetricCard({ m }: { m: Metric }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "relative rounded-xl bg-white p-3.5",
        "border border-sky-200/80",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#00B4FE33]">
          <MetricIcon name={m.icon} />
        </div>

        <div className="flex items-center gap-2.5">
          {m.change ? (
            <div className="inline-flex items-center gap-2.5 rounded-full bg-[#1B72311A] px-3.5 py-1.5 text-sm text-[#1B7231]">
              {m.change}
              <ChevronUp className="h-4.25 w-4.25" />
            </div>
          ) : (
            <div className="h-7" />
          )}
          <Info className="h-4 w-4 text-black  rotate-180" />
        </div>
      </div>

      <div className="mt-6.25">
        <p className="text-sm uppercase tracking-wide text-[#666666]">
          {m.label}
        </p>
        <p className="mt-3 text-2xl font-medium text-black">{m.value}</p>
      </div>
    </motion.div>
  );
}

function StageBox({ s }: { s: DealStage }) {
  const tone = s.tone ?? "neutral";
  const border =
    tone === "blue"
      ? "border-[#00B4FE99]"
      : tone === "amber"
        ? "border-[#00B4FE99]"
        : "border-[#00B4FE99]";
  const bg =
    tone === "blue"
      ? "bg-[#E5F7FF]"
      : tone === "amber"
        ? "bg-[#FFFBF2]"
        : tone === "white-blue"
          ? "bg-[#F2FBFF]"
          : "bg-[#F8FAFC]";

  return (
    <div className={cn("rounded-xl border p-6", border, bg)}>
      <div className="text-2xl font-medium text-black">{s.count}</div>
      <div className="mt-3 text-sm uppercase tracking-wide text-slate-400">
        {s.label}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ActivityRow["status"] }) {
  const cls = {
    "LOAN SETTLED": "bg-[#00B4FE33] text-sky-700 border-sky-200",
    "LOAN LODGED": "bg-slate-100 text-slate-700 border-slate-200",
    "AWAITING REFERRAL FEE": "bg-amber-100 text-amber-700 border-amber-200",
    "REFERRAL SENT": "bg-slate-100 text-slate-600 border-slate-200",
    "FEE PAID": "bg-[#00B4FE33] text-sky-700 border-sky-200",
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-4 py-1.5",
        "text-[10px] font-semibold uppercase tracking-wide",
        cls,
      )}
    >
      {status}
    </span>
  );
}

/* ------------------------------ page ------------------------------ */
export default function ReferrerOverview() {
  const [filters, setFilters] =
    useState<DashboardFilters>(dashboardFiltersMock);
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  // ✅ calendar dropdown state
  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef<HTMLDivElement | null>(null);

  // close on outside click + esc
  useEffect(() => {
    if (!calOpen) return;

    const onDown = (e: MouseEvent) => {
      if (!calRef.current) return;
      if (!calRef.current.contains(e.target as Node)) setCalOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setCalOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [calOpen]);

  // switch dataset based on period (mocked)
  const data = useMemo(
    () => dashboardDataMock[filters.period],
    [filters.period],
  );

  const metrics = useMemo(() => data.metrics, [data.metrics]);
  const stages = useMemo(() => data.stages, [data.stages]);

  const filteredActivities = data.activities;

  const visibleActivities = useMemo(() => {
    if (showAll) return filteredActivities;
    return filteredActivities.slice(0, 5);
  }, [showAll, filteredActivities]);

  // ✅ apply calendar range (mock behavior)
  const applyRange = (start: string, end: string) => {
    const r = clampRange(start, end);
    const label = rangeToLabel(r.start, r.end);

    // rule: same month => MTD, otherwise FYTD (you can change)
    const nextPeriod: DashboardFilters["period"] =
      r.start === r.end ? "MTD" : "FYTD";

    setFilters((p) => ({
      ...p,
      period: nextPeriod,
      range: r,
      dateRangeLabel: label,
    }));
    setCalOpen(false);
  };

  return (
    <div className="mx-auto max-w-400 bg-white p-6">
      {/* top controls row */}
      <div className="flex flex-wrap items-center gap-8.5">
        <div className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-2.5">
          <PillToggle
            active={filters.period === "MTD"}
            onClick={() =>
              setFilters((p) => ({
                ...p,
                period: "MTD",
                dateRangeLabel: dashboardDataMock.MTD.dateRangeLabel,
              }))
            }
          >
            MTD
          </PillToggle>

          <PillToggle
            active={filters.period === "FYTD"}
            onClick={() =>
              setFilters((p) => ({
                ...p,
                period: "FYTD",
                dateRangeLabel: dashboardDataMock.FYTD.dateRangeLabel,
              }))
            }
          >
            FYTD
          </PillToggle>
        </div>

        {/* ✅ Custom calendar dropdown */}
        <div ref={calRef} className="relative">
          <button
            type="button"
            onClick={() => setCalOpen((v) => !v)}
            className={cn(
              "ml-2 inline-flex py-4.5 items-center gap-8 rounded-md border border-slate-200 bg-white px-2.5",
              "text-sm font-medium text-slate-700 hover:bg-slate-50",
            )}
          >
            <CalendarDays className="h-4.5 w-4.5  mb-0.5" />
            <div className="flex items-center gap-2">
              {filters.dateRangeLabel}
              <ChevronDown
                className={cn(
                  "h-4.5 w-4.5 transition mb-0.5",
                  calOpen && "rotate-180",
                )}
              />
            </div>
          </button>

          {calOpen ? (
            <div className="absolute left-2 top-12 z-50 w-90 rounded-xl border border-slate-200 bg-white p-4 shadow-lg">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Custom range (months)
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700">Start</p>
                  <select
                    value={filters.range.start}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        range: { ...p.range, start: e.target.value },
                      }))
                    }
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    {MONTH_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700">End</p>
                  <select
                    value={filters.range.end}
                    onChange={(e) =>
                      setFilters((p) => ({
                        ...p,
                        range: { ...p.range, end: e.target.value },
                      }))
                    }
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    {MONTH_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 px-3 py-2 text-xs text-slate-600">
                Preview:{" "}
                <span className="font-semibold text-slate-800">
                  {rangeToLabel(filters.range.start, filters.range.end)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    // reset to mock default
                    setFilters(dashboardFiltersMock);
                    setCalOpen(false);
                  }}
                  className="h-9 rounded-md border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() =>
                    applyRange(filters.range.start, filters.range.end)
                  }
                  className="h-9 rounded-md bg-black px-5 text-xs font-semibold text-white hover:bg-slate-900"
                >
                  Apply
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* metrics */}
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
        {metrics.map((m) => (
          <MetricCard key={m.id} m={m} />
        ))}
      </div>

      {/* Deal stage overview */}
      <section className="mt-10 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex p-2.5 items-center justify-center rounded-lg bg-[#00B4FE33]">
              <ListFilter className="h-6 w-6 text-[#00B4FE]" />
            </div>
            <h3 className="text-lg font-medium uppercase tracking-wide text-black">
              Deal Stage Overview
            </h3>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-[#00B4FE33] px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-[#00B4FE]">
            <span className="mt-1">LIVE TRACKING</span>
            <span className="h-2 w-2 rounded-full bg-[#00B4FE]" />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s) => (
            <StageBox key={s.id} s={s} />
          ))}
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-10 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#00B4FE33]">
              <ActivityIcon className="h-6 w-6 text-[#00B4FE]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-medium text-black">
                Recent Activity
              </h3>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAll((p) => !p)}
            className="text-base font-medium text-[#00B4FE] hover:underline"
          >
            {showAll ? (
              <div className="flex items-center gap-1.5">
                <span>view less</span>
                <ArrowDownRight className="h-4 w-4" />
              </div>
            ) : (
              <div className="flex items-center gap-1.5">
                <span>view all portfolios</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            )}
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-195">
            <thead>
              <tr className="bg-[#F5F5F5]">
                <th className="px-8.5 py-5.5 font-normal text-left text-black">
                  CLIENT NAME
                </th>
                <th className="px-8.5 py-5.5 font-normal text-left text-black">
                  STATUS
                </th>
                <th className="px-8.5 py-5.5 font-normal text-right text-black">
                  REFERRAL FEE
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {visibleActivities.map((a) => (
                <tr
                  key={a.id}
                  onClick={() => setSelectedId(a.id)}
                  className={cn(
                    "cursor-pointer hover:bg-slate-50",
                    selectedId === a.id && "bg-sky-50/60",
                  )}
                >
                  <td className="px-8.5 py-5.5">
                    <div className="font-medium text-black">{a.clientName}</div>
                    <div className="mt-2.5 text-sm text-slate-400">
                      {a.company}
                    </div>
                  </td>
                  <td className="px-8.5 py-5.5">
                    <StatusBadge status={a.status} />
                  </td>
                  <td className="px-8.5 py-5.5 text-right  text-black">
                    {a.referralFee}
                  </td>
                </tr>
              ))}

              {visibleActivities.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No activity found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
