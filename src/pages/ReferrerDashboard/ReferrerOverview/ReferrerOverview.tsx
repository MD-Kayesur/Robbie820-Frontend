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
  const cls = "h-5 w-5 md:h-6 md:w-6 text-[#00B4FE]";

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
        "flex-1 rounded-md px-4 py-2 text-xs font-medium transition md:flex-none md:px-8 md:text-sm",
        active
          ? "bg-black text-white"
          : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50",
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
      className="relative rounded-2xl border border-sky-200/90 bg-white p-4 md:p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#00B4FE33] md:h-12 md:w-12">
          <MetricIcon name={m.icon} />
        </div>

        <div className="flex items-start gap-2 md:gap-2.5">
          {m.change ? (
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#1B723166] bg-[#1B72311A] px-3 py-1 text-xs text-[#1B7231] md:gap-2 md:px-3.5 md:py-1.5 md:text-sm">
              <span>{m.change}</span>
              <ChevronUp className="h-3.5 w-3.5 md:h-4 md:w-4" />
            </div>
          ) : (
            <div className="h-7" />
          )}

          <Info
            className="mt-0.5 h-4 w-4 rotate-180 text-black"
            aria-hidden
          />
        </div>
      </div>

      <div className="mt-8 md:mt-10">
        <p className="text-xs uppercase tracking-wide text-[#666666] md:text-sm">
          {m.label}
        </p>
        <p className="mt-2.5 text-[22px] font-medium leading-none text-black md:mt-3 md:text-4xl">
          {m.value}
        </p>
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
        ? "border-[#E7C26D]"
        : tone === "white-blue"
          ? "border-[#00B4FE99]"
          : "border-[#00B4FE99]";

  const bg =
    tone === "blue"
      ? "bg-[#DFF4FF]"
      : tone === "amber"
        ? "bg-[#FFFBF2]"
        : tone === "white-blue"
          ? "bg-[#F5FCFF]"
          : "bg-[#F8FAFC]";

  return (
    <div className={cn("rounded-2xl border p-4 md:p-5 lg:p-6", border, bg)}>
      <div className="text-3xl font-medium leading-none text-black md:text-4xl">
        {s.count}
      </div>
      <div className="mt-3 text-xs uppercase tracking-wide text-slate-500 md:text-sm">
        {s.label}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: ActivityRow["status"] }) {
  const cls = {
    "LOAN SETTLED": "border-sky-200 bg-[#00B4FE33] text-sky-700",
    "LOAN LODGED": "border-slate-300 bg-slate-100 text-slate-700",
    "AWAITING REFERRAL FEE": "border-amber-300 bg-amber-100 text-amber-700",
    "REFERRAL SENT": "border-slate-300 bg-slate-100 text-slate-700",
    "FEE PAID": "border-emerald-200 bg-emerald-50 text-emerald-700",
  }[status];

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-[10px] font-semibold uppercase tracking-wide md:px-4 md:py-1.5",
        cls,
      )}
    >
      {status}
    </span>
  );
}

function ActivityMobileCard({
  item,
  selected,
  onClick,
}: {
  item: ActivityRow;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "w-full border-b border-slate-200 px-4 py-4 text-left transition last:border-b-0",
        selected && "bg-sky-50/60",
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-medium text-black">
            {item.clientName}
          </p>
          <p className="mt-1 text-sm leading-5 text-slate-500">
            {item.company}
          </p>
          <div className="mt-3">
            <StatusBadge status={item.status} />
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-xl font-medium leading-none text-black">
            {item.referralFee}
          </p>
          <p className="mt-2 text-sm text-slate-500">Commission</p>
        </div>
      </div>
    </button>
  );
}

/* ------------------------------ page ------------------------------ */
export default function ReferrerOverview() {
  const [filters, setFilters] =
    useState<DashboardFilters>(dashboardFiltersMock);
  const [showAll, setShowAll] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const [calOpen, setCalOpen] = useState(false);
  const calRef = useRef<HTMLDivElement | null>(null);

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

  const applyRange = (start: string, end: string) => {
    const r = clampRange(start, end);
    const label = rangeToLabel(r.start, r.end);

    const nextPeriod: DashboardFilters["period"] =
      r.start === r.end ? "MTD" : "FYTD";

    setFilters((prev) => ({
      ...prev,
      period: nextPeriod,
      range: r,
      dateRangeLabel: label,
    }));
    setCalOpen(false);
  };

  return (
    <div className="mx-auto w-full max-w-400 bg-white px-4 pb-6 pt-4 md:px-6 md:pb-8 md:pt-6 lg:px-8">
      {/* top controls row */}
      <div className="flex flex-col gap-3 md:gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="inline-flex w-full items-center gap-1 rounded-xl border border-slate-200 bg-white p-1.5 md:w-auto md:rounded-lg md:p-2">
          <PillToggle
            active={filters.period === "MTD"}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
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
              setFilters((prev) => ({
                ...prev,
                period: "FYTD",
                dateRangeLabel: dashboardDataMock.FYTD.dateRangeLabel,
              }))
            }
          >
            FYTD
          </PillToggle>
        </div>

        <div ref={calRef} className="relative w-full md:w-auto">
          <button
            type="button"
            onClick={() => setCalOpen((v) => !v)}
            aria-expanded={calOpen}
            aria-haspopup="dialog"
            aria-label="Choose date range"
            className={cn(
              "inline-flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50 md:w-auto md:gap-6 md:rounded-md md:px-4 md:py-4",
            )}
          >
            <div className="flex items-center gap-3">
              <CalendarDays className="h-4.5 w-4.5" />
              <span className="truncate">{filters.dateRangeLabel}</span>
            </div>

            <ChevronDown
              className={cn(
                "h-4.5 w-4.5 shrink-0 transition",
                calOpen && "rotate-180",
              )}
            />
          </button>

          {calOpen ? (
            <div className="absolute left-0 top-[calc(100%+8px)] z-50 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:w-90">
              <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                Custom range (months)
              </p>

              <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="space-y-2">
                  <p className="text-xs font-semibold text-slate-700">Start</p>
                  <select
                    value={filters.range.start}
                    onChange={(e) =>
                      setFilters((prev) => ({
                        ...prev,
                        range: { ...prev.range, start: e.target.value },
                      }))
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
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
                      setFilters((prev) => ({
                        ...prev,
                        range: { ...prev.range, end: e.target.value },
                      }))
                    }
                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none focus:ring-2 focus:ring-slate-200"
                  >
                    {MONTH_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 rounded-xl bg-slate-50 px-3 py-2.5 text-xs text-slate-600">
                Preview:{" "}
                <span className="font-semibold text-slate-800">
                  {rangeToLabel(filters.range.start, filters.range.end)}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setFilters(dashboardFiltersMock);
                    setCalOpen(false);
                  }}
                  className="h-10 rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 hover:bg-slate-50"
                >
                  Reset
                </button>

                <button
                  type="button"
                  onClick={() =>
                    applyRange(filters.range.start, filters.range.end)
                  }
                  className="h-10 rounded-xl bg-black px-5 text-xs font-semibold text-white hover:bg-slate-900"
                >
                  Apply
                </button>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* metrics */}
      <div className="mt-5 grid grid-cols-1 gap-4 md:mt-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {metrics.map((m) => (
          <MetricCard key={m.id} m={m} />
        ))}
      </div>

      {/* Deal stage overview */}
      <section className="mt-8 border-t border-slate-200 pt-8 md:mt-10 md:pt-10">
        <div className="rounded-2xl bg-white">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00B4FE33] md:h-11 md:w-11">
                <ListFilter className="h-5 w-5 text-[#00B4FE] md:h-6 md:w-6" />
              </div>

              <h3 className="text-base font-medium uppercase tracking-wide text-black md:text-lg">
                Deal Stage Overview
              </h3>
            </div>

            <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#00B4FE33] px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-[#00B4FE] md:px-4 md:text-xs">
              <span>LIVE TRACKING</span>
              <span className="h-2 w-2 rounded-full bg-[#00B4FE]" />
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 md:mt-6 lg:grid-cols-4">
            {stages.map((s) => (
              <StageBox key={s.id} s={s} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="mt-8 border-t border-slate-200 pt-8 md:mt-10 md:pt-10">
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-4 md:flex-row md:items-center md:justify-between md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#00B4FE33] md:h-11 md:w-11">
                <ActivityIcon className="h-5 w-5 text-[#00B4FE] md:h-6 md:w-6" />
              </div>

              <h3 className="text-base font-medium text-black md:text-lg">
                Recent Activity
              </h3>
            </div>

            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#00B4FE] hover:underline md:text-base"
            >
              {showAll ? (
                <>
                  <span>view less</span>
                  <ArrowDownRight className="h-4 w-4" />
                </>
              ) : (
                <>
                  <span>view all portfolios</span>
                  <ArrowUpRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* mobile list */}
          <div className="block md:hidden">
            {visibleActivities.length > 0 ? (
              visibleActivities.map((a) => (
                <ActivityMobileCard
                  key={a.id}
                  item={a}
                  selected={selectedId === a.id}
                  onClick={() => setSelectedId(a.id)}
                />
              ))
            ) : (
              <div className="px-4 py-10 text-center text-sm text-slate-500">
                No activity found.
              </div>
            )}
          </div>

          {/* desktop table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full min-w-195">
              <thead>
                <tr className="bg-[#F5F5F5]">
                  <th className="px-6 py-4 text-left font-normal text-black lg:px-8">
                    CLIENT NAME
                  </th>
                  <th className="px-6 py-4 text-left font-normal text-black lg:px-8">
                    STATUS
                  </th>
                  <th className="px-6 py-4 text-right font-normal text-black lg:px-8">
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
                      "cursor-pointer transition hover:bg-slate-50",
                      selectedId === a.id && "bg-sky-50/60",
                    )}
                  >
                    <td className="px-6 py-5 lg:px-8">
                      <div className="font-medium text-black">
                        {a.clientName}
                      </div>
                      <div className="mt-2 text-sm text-slate-400">
                        {a.company}
                      </div>
                    </td>

                    <td className="px-6 py-5 lg:px-8">
                      <StatusBadge status={a.status} />
                    </td>

                    <td className="px-6 py-5 text-right text-black lg:px-8">
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
        </div>
      </section>
    </div>
  );
}
