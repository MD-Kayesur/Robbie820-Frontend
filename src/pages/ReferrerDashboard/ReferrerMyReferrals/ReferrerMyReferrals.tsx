// src/pages/ReferrerDashboard/ReferrerMyReferrals/ReferrerMyReferrals.tsx

import React, { useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Filter,
  MoreVertical,
  UserRound,
} from "lucide-react";
import { Link } from "react-router-dom";

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
  const [y, m] = ym.split("-").map(Number);
  const d = new Date(y, (m || 1) - 1, 1);
  return d.toLocaleString(undefined, { month: "short", year: "numeric" });
}

function inMonthRange(dateISO: string, range: MonthRange) {
  const ym = dateISO.slice(0, 7);
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
  switch (status) {
    case "Loan Settled":
      return "border border-[#14A3FF] bg-[#D6EEFB] text-[#14A3FF]";
    case "Fee Paid":
      return "border border-[#14A3FF] bg-[#D6EEFB] text-[#14A3FF]";
    case "Awaiting Referral Fee":
      return "border border-[#C89A1C] bg-[#F4EFD9] text-[#C89A1C]";
    case "Loan Lodged":
      return "border border-[#B6B6B6] bg-[#D9D9D9] text-black";
    case "Referral Sent":
      return "border border-[#B6B6B6] bg-[#D9D9D9] text-black";
    case "Not Progressed":
      return "border border-[#B6B6B6] bg-[#D9D9D9] text-black";
    default:
      return "border border-[#B6B6B6] bg-[#D9D9D9] text-black";
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

  const fromMonthIndex = y * 12 + (m - 1) - 2;
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
  ariaLabel,
}: {
  leftIcon?: React.ReactNode;
  value: string;
  onClick: () => void;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      aria-haspopup="listbox"
      className={cn(
        "flex py-2.5 w-full rounded-lg items-center justify-between gap-3 border bg-white px-5 text-left",
        "border-[#D6DEDD] text-[#6F7B82] hover:bg-slate-50",
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        {leftIcon ? (
          <span className="shrink-0 text-[#6F7B82]">{leftIcon}</span>
        ) : null}
        <span className="truncate text-[16px] md:text-lg">{value}</span>
      </span>
      <ChevronDown className="h-6 w-6 shrink-0 text-black" />
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
        "absolute z-50 mt-2 w-full min-w-55 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg",
        className,
      )}
      role="menu"
      aria-hidden={!open}
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
        className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-slate-50 active:scale-[0.98]"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <MoreVertical className="h-5 w-5 text-black" />
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 w-44 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
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

function MobileReferralCard({
  row,
  onEdit,
  onRemove,
}: {
  row: ReferralRow;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="border-b border-[#CFCFCF] bg-white p-4 last:border-b-0">
      <div className="flex items-start justify-between gap-4">
        <Link
          to={`/referrer-dashboard/my-referrals/clients/${row.id}`}
          className="min-w-0 flex-1"
        >
          <p className="truncate text-base font-semibold leading-none text-black">
            {row.clientName}
          </p>
          <p className="mt-2 text-sm leading-none text-[#6B6B6B]">
            {row.company}
          </p>
        </Link>

        <RowActions onEdit={onEdit} onRemove={onRemove} />
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <span
          className={cn(
            "inline-flex max-w-full items-center rounded-full px-4 py-2 text-xs font-medium uppercase leading-none",
            statusPill(row.status),
          )}
        >
          {row.status}
        </span>

        <div className="shrink-0 text-right">
          <p className="text-base font-semibold leading-none text-black">
            {row.expectedRefFee == null
              ? "Pending"
              : toMoney(row.expectedRefFee)}
          </p>
          <p className="mt-1 text-sm leading-none text-[#6B6B6B]">Commission</p>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------ page ------------------------------ */
export const ReferrerMyReferrals = () => {
  const [rows, setRows] = useState<ReferralRow[]>(referralsMock);

  const [status, setStatus] = useState<StatusFilter>("All Statuses");
  const [timePreset, setTimePreset] = useState<TimePreset>("All Time");
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
      .filter(
        (r) =>
          timePreset === "All Time" || inMonthRange(r.dateSubmitted, range),
      )
      .sort((a, b) => (a.dateSubmitted < b.dateSubmitted ? 1 : -1));
  }, [rows, range, status, timePreset]);

  const rangeLabel =
    timePreset === "All Time"
      ? "All time"
      : `${monthLabel(range.from)} - ${monthLabel(range.to)}`;

  function applyPreset(p: TimePreset) {
    setTimePreset(p);
    const next = presetToRange(p);
    if (next) setRange(next);
  }

  function onRemoveRow(id: string) {
    setRows((prev) => prev.filter((r) => r.id !== id));
  }

  return (
    <div className="mx-auto w-full max-w-400 bg-white px-4 pb-24 pt-4 md:px-6 md:pb-8">
      {/* filters */}
      <div className="rounded-3xl border border-[#BFE6FF] bg-white p-4 md:rounded-2xl md:border-slate-200 md:p-4">
        <div className="grid grid-cols-1 gap-4 md:flex md:flex-wrap md:items-center md:justify-between">
          <div className="grid grid-cols-1 gap-4 md:flex md:flex-wrap md:items-center md:gap-4">
            {/* label */}
            <div className="col-span-1">
              <button
                type="button"
                className={cn(
                  "flex w-full items-center justify-center gap-2.5 rounded-lg border bg-white",
                  "border-[#D6DEDD] text-[#6F7B82]",
                  "h-11 min-w-27.5 md:justify-start px-3",
                )}
              >
                <Filter className="h-6 w-6" />
                <span className="md:text-sm">Status</span>
              </button>
            </div>

            {/* status */}
            <div className="col-span-1 relative" ref={statusRef}>
              <SelectLikeButton
                value={status}
                ariaLabel="Filter by status"
                onClick={() => {
                  setStatusOpen((v) => !v);
                  setTimeOpen(false);
                  setRangeOpen(false);
                }}
                className="md:min-w-45 md:border-slate-200 md:px-3 md:text-sm"
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

            {/* time */}
            <div className="col-span-1 relative" ref={timeRef}>
              <SelectLikeButton
                value={timePreset}
                ariaLabel="Filter by time range"
                onClick={() => {
                  setTimeOpen((v) => !v);
                  setStatusOpen(false);
                  setRangeOpen(false);
                }}
                className="md:min-w-40 md:border-slate-200 md:px-3 md:text-sm"
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

            {/* range */}
            <div className="col-span-1 relative" ref={rangeRef}>
              <SelectLikeButton
                leftIcon={<Calendar className="h-7 w-7 md:h-4 md:w-4" />}
                value={rangeLabel}
                ariaLabel="Select date range"
                onClick={() => {
                  setRangeOpen((v) => !v);
                  setStatusOpen(false);
                  setTimeOpen(false);
                }}
                className="md:min-w-60 md:border-slate-200 md:px-3 md:text-sm"
              />

              {rangeOpen ? (
                <div className="absolute left-0 z-50 mt-2 w-[320px] max-w-[calc(100vw-2rem)] rounded-2xl border border-slate-200 bg-white p-4 shadow-lg md:w-100">
                  <div className="grid gap-3">
                    <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                        <p className="text-xs font-semibold text-slate-600">
                          To
                        </p>
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

          <p className="leading-none text-black text-sm md:text-slate-500">
            showing{" "}
            <span className="font-semibold md:text-slate-700">
              {filtered.length}
            </span>{" "}
            results
          </p>
        </div>
      </div>

      {/* mobile cards */}
      <div className="mt-6 overflow-hidden border border-[#CFCFCF] bg-white md:hidden">
        {filtered.length === 0 ? (
          <div className="px-6 py-12 text-center text-sm text-slate-500">
            No referrals found for the selected filters.
          </div>
        ) : (
          filtered.map((r) => (
            <MobileReferralCard
              key={r.id}
              row={r}
              onEdit={() => {}}
              onRemove={() => onRemoveRow(r.id)}
            />
          ))
        )}
      </div>

      {/* desktop table */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white md:block">
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
                        "px-5 py-4 text-sm font-medium tracking-wide text-black lg:text-base",
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
                  <td className="px-5 py-4">
                    <Link
                      to={`/referrer-dashboard/my-referrals/clients/${r.id}`}
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-slate-900 lg:text-base">
                          {r.clientName}
                        </p>
                        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                          {r.company}
                        </p>
                      </div>
                    </Link>
                  </td>

                  <td className="px-5 py-4 text-center">
                    <span
                      className={cn(
                        "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-semibold",
                        statusPill(r.status),
                      )}
                    >
                      {r.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2 text-sm text-slate-700">
                      <UserRound className="h-4 w-4 text-slate-400" />
                      <span className="font-semibold text-slate-800">
                        {r.referredBy}
                      </span>
                    </div>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-semibold text-slate-900">
                      {r.expectedRefFee == null
                        ? "Pending"
                        : toMoney(r.expectedRefFee)}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <span className="text-sm font-semibold text-slate-900">
                      {r.dateSubmitted}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-left">
                    <RowActions
                      onEdit={() => {}}
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
