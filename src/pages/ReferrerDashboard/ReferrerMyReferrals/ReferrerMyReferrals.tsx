// src/pages/ReferrerDashboard/ReferrerMyReferrals/ReferrerMyReferrals.tsx

import React, { useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Filter,
  MoreVertical,
  UserRound,
} from "lucide-react";

import type {
  MonthRange,
  ReferralRow,
  StatusFilter,
  TimePreset,
} from "./types";
import {
  defaultRange,
  referralsMock,
  statusOptions,
  timeOptions,
} from "./mock";
import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";

/* ----------------------------- helpers ----------------------------- */
function monthLabel(ym: string) {
  // ym: YYYY-MM
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function inMonthRange(dateISO: string, range: MonthRange) {
  const ym = dateISO.slice(0, 7); // YYYY-MM
  return ym >= range.from && ym <= range.to;
}

function toMoney(n: number) {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

function statusPill(status: ReferralRow["status"]) {
  // Match screenshot vibe: blue (settled/paid), grey (lodged/sent), warm yellow (awaiting)
  switch (status) {
    case "Loan Settled":
      return "bg-sky-100 text-sky-700 ring-1 ring-sky-200";
    case "Fee Paid":
      return "bg-sky-100 text-sky-700 ring-1 ring-sky-200";
    case "Awaiting Referral Fee":
      return "bg-amber-100 text-amber-700 ring-1 ring-amber-200";
    case "Loan Lodged":
      return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
    case "Referral Sent":
      return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
    case "Not Progressed":
      return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
    default:
      return "bg-slate-200 text-slate-700 ring-1 ring-slate-300";
  }
}

function presetToRange(preset: TimePreset): MonthRange | null {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth() + 1;

  const pad = (v: number) => String(v).padStart(2, "0");
  const ym = (yy: number, mm: number) => `${yy}-${pad(mm)}`;

  if (preset === "All Time") return null;
  if (preset === "This Month") return { from: ym(y, m), to: ym(y, m) };

  const fromMonthIndex = y * 12 + (m - 1) - 2; // inclusive
  const fromY = Math.floor(fromMonthIndex / 12);
  const fromM = (fromMonthIndex % 12) + 1;

  return { from: ym(fromY, fromM), to: ym(y, m) };
}

/* ----------------------------- UI parts ---------------------------- */
function SelectLikeButton({
  leftIcon,
  value,
  onClick,
  className,
}: {
  leftIcon?: React.ReactNode;
  value: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-11 min-w-35 rounded-xl border border-slate-200 bg-white px-3",
        "flex items-center justify-between gap-3 text-sm text-slate-700",
        "hover:bg-slate-50 active:scale-[0.99] transition",
        className,
      )}
    >
      <span className="flex items-center gap-2 min-w-0">
        {leftIcon ? <span className="text-slate-400">{leftIcon}</span> : null}
        <span className="truncate">{value}</span>
      </span>
      <ChevronDown className="h-4 w-4 text-slate-400" />
    </button>
  );
}

function Menu({
  open,
  items,
  onPick,
  className,
}: {
  open: boolean;
  items: string[];
  onPick: (v: string) => void;
  className?: string;
}) {
  if (!open) return null;
  return (
    <div
      className={cn(
        "absolute z-50 mt-2 w-60 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg",
        className,
      )}
      role="menu"
    >
      {items.map((it) => (
        <button
          key={it}
          type="button"
          onClick={() => onPick(it)}
          className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
          role="menuitem"
        >
          {it}
        </button>
      ))}
    </div>
  );
}

function RowActions({
  onEdit,
  onRemove,
}: {
  onEdit: () => void;
  onRemove: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "grid h-9 w-9 place-items-center rounded-lg",
          "hover:bg-slate-50 active:scale-[0.98] transition",
        )}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreVertical className="h-4 w-4 text-slate-500" />
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 w-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Edit Referral
          </button>
          <button
            type="button"
            onClick={() => {
              onRemove();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ page ------------------------------ */
export const ReferrerMyReferrals = () => {
  const [rows, setRows] = useState<ReferralRow[]>(referralsMock);

  const [status, setStatus] = useState<StatusFilter>("All Statuses");
  const [timePreset, setTimePreset] = useState<TimePreset>("All Time");

  // Range is always visible (like screenshot). Presets can overwrite it.
  const [range, setRange] = useState<MonthRange>(defaultRange);

  const [statusOpen, setStatusOpen] = useState(false);
  const [timeOpen, setTimeOpen] = useState(false);
  const [rangeOpen, setRangeOpen] = useState(false);

  const statusRef = useOutsideClose<HTMLDivElement>(statusOpen, () =>
    setStatusOpen(false),
  );
  const timeRef = useOutsideClose<HTMLDivElement>(timeOpen, () =>
    setTimeOpen(false),
  );
  const rangeRef = useOutsideClose<HTMLDivElement>(rangeOpen, () =>
    setRangeOpen(false),
  );

  const filtered = useMemo(() => {
    return rows
      .filter((r) => (status === "All Statuses" ? true : r.status === status))
      .filter((r) => inMonthRange(r.dateSubmitted, range))
      .sort((a, b) => (a.dateSubmitted < b.dateSubmitted ? 1 : -1));
  }, [rows, range, status]);

  const rangeLabel = `${monthLabel(range.from)} - ${monthLabel(range.to)}`;

  function applyPreset(p: TimePreset) {
    setTimePreset(p);
    const next = presetToRange(p);
    if (next) setRange(next);
  }

  function onRemoveRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="mx-auto max-w-400 bg-white p-6">
      {/* filters bar */}
      <div
        className={cn(
          "w-full rounded-2xl border border-slate-200 bg-white",
          "px-3 py-3 sm:px-4",
          "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
        )}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          {/* Status (Static) */}
          <div className="relative">
            <div className="flex min-w-25 items-center justify-start gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
              <Filter className="h-4 w-4 text-slate-500" />
              <span>Status</span>
            </div>
          </div>

          <div className="relative" ref={statusRef}>
            <SelectLikeButton
              value={status}
              onClick={() => {
                setStatusOpen((v) => !v);
                setTimeOpen(false);
                setRangeOpen(false);
              }}
            />
            <Menu
              open={statusOpen}
              items={statusOptions}
              onPick={(v) => {
                setStatus(v as StatusFilter);
                setStatusOpen(false);
              }}
            />
          </div>

          {/* Time preset */}
          <div className="relative" ref={timeRef}>
            <SelectLikeButton
              value={timePreset}
              onClick={() => {
                setTimeOpen((v) => !v);
                setStatusOpen(false);
                setRangeOpen(false);
              }}
            />
            <Menu
              open={timeOpen}
              items={timeOptions}
              onPick={(v) => {
                applyPreset(v as TimePreset);
                setTimeOpen(false);
              }}
            />
          </div>

          {/* Month range */}
          <div className="relative" ref={rangeRef}>
            <SelectLikeButton
              leftIcon={<Calendar className="h-4 w-4" />}
              value={rangeLabel}
              onClick={() => {
                setRangeOpen((v) => !v);
                setStatusOpen(false);
                setTimeOpen(false);
              }}
              className="min-w-60"
            />

            {rangeOpen ? (
              <div className="absolute left-0 z-50 mt-2 w-100 rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
                <div className="grid gap-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-slate-600">
                        From
                      </p>
                      <input
                        type="month"
                        value={range.from}
                        onChange={(e) =>
                          setRange((r) => ({ ...r, from: e.target.value }))
                        }
                        className={cn(
                          "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700",
                          "outline-none focus:ring-2 focus:ring-sky-200",
                        )}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold text-slate-600">To</p>
                      <input
                        type="month"
                        value={range.to}
                        onChange={(e) =>
                          setRange((r) => ({ ...r, to: e.target.value }))
                        }
                        className={cn(
                          "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700",
                          "outline-none focus:ring-2 focus:ring-sky-200",
                        )}
                      />
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <p className="text-sm text-slate-500 sm:text-right">
          showing{" "}
          <span className="font-semibold text-slate-700">
            {filtered.length}
          </span>{" "}
          results
        </p>
      </div>

      {/* table */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="w-full overflow-x-auto">
          <table className="w-full min-w-230">
            <thead>
              <tr className="border-b border-slate-200">
                {[
                  "CLIENT NAME & CO.",
                  "CURRENT STATUS",
                  "REFERRED BY",
                  "EXPECTED REF FEE",
                  "DATE SUBMITTED",
                  "",
                ].map((h) => {
                  const align =
                    h === "EXPECTED REF FEE" || h === "DATE SUBMITTED"
                      ? "text-right"
                      : h === "CURRENT STATUS"
                        ? "text-center"
                        : "text-left";

                  return (
                    <th
                      key={h}
                      className={cn(
                        "px-5 py-2 text-lg font-medium tracking-wide text-black",
                        align,
                      )}
                    >
                      {h}
                    </th>
                  );
                })}
              </tr>
            </thead>

            <tbody>
              {filtered.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50/60">
                  <td className="px-5 py-2">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-slate-900">
                        {r.clientName}
                      </p>
                      <p className="truncate text-xs font-medium uppercase tracking-wide text-slate-400">
                        {r.company}
                      </p>
                    </div>
                  </td>

                  <td className="px-5 py-2 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                        statusPill(r.status),
                      )}
                    >
                      {r.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-5 py-2">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <UserRound className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        {r.referredBy}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-2 text-right">
                    <span className="text-sm font-semibold text-slate-900">
                      {r.expectedRefFee == null
                        ? "Pending"
                        : toMoney(r.expectedRefFee)}
                    </span>
                  </td>

                  <td className="py-2 text-center">
                    <span className="text-sm font-semibold text-slate-900">
                      {r.dateSubmitted}
                    </span>
                  </td>

                  <td className="py-4 text-left">
                    <RowActions
                      onEdit={() => {
                        // mock behaviour: edit does not change data, but stays functional
                        // You can replace this with a modal later.
                        // eslint-disable-next-line no-alert
                        alert(`Edit referral: ${r.clientName} (${r.company})`);
                      }}
                      onRemove={() => onRemoveRow(r.id)}
                    />
                  </td>
                </tr>
              ))}

              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-12 text-center text-sm text-slate-500"
                  >
                    No referrals found for the selected filters.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ReferrerMyReferrals;
