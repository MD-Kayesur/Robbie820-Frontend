// src/pages/SuperAdmin/SuperAdminAuditLogs.tsx
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  ExternalLink,
  Eye,
  Info,
  Search,
  ShieldAlert,
  UserCog,
  X,
} from "lucide-react";
import { AuditRow, Option } from "./types";
import {
  actionOptions,
  makeAuditRows,
  makeSuspiciousCards,
  rangeOptions,
  userOptions,
} from "./mock";
import { cn } from "@/hooks/useCn";

function useEscClose(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);
}

function useLockBodyScroll(open: boolean) {
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);
}

function useOutsideClose<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      if (!el.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  return ref;
}

/* ----------------------------- small ui bits ----------------------------- */

function Pill({
  tone = "slate",
  children,
}: {
  tone?: "slate" | "indigo" | "sky" | "emerald" | "amber" | "rose";
  children: React.ReactNode;
}) {
  const styles =
    tone === "indigo"
      ? "bg-[#DBEAFE] text-[#193CB8]"
      : tone === "sky"
        ? "bg-sky-50 text-sky-700"
        : tone === "emerald"
          ? "bg-emerald-50 text-emerald-700"
          : tone === "amber"
            ? "bg-amber-50 text-amber-700"
            : tone === "rose"
              ? "bg-[#FFE2E2] text-rose-700"
              : "bg-slate-50 text-[#364153]";

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium",
        styles,
      )}
    >
      {children}
    </span>
  );
}

function StatusPill({ status }: { status: "Success" | "Warning" | "Failed" }) {
  if (status === "Success") return <Pill tone="emerald">Success</Pill>;
  if (status === "Warning") return <Pill tone="amber">Warning</Pill>;
  return <Pill tone="rose">Failed</Pill>;
}

function SelectMenu({
  value,
  onChange,
  options,
  icon,
  className,
  align = "right",
}: {
  value: string;
  onChange: (v: string) => void;
  options: Option[];
  icon?: React.ReactNode;
  className?: string;
  align?: "left" | "right";
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));
  useEscClose(open, () => setOpen(false));

  const selected = options.find((o) => o.value === value) ?? options[0];

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-[#0A0A0A]",
          "hover:bg-slate-50",
        )}
      >
        {icon ? <span className="text-slate-600">{icon}</span> : null}
        <span className="max-w-42.5 truncate">{selected?.label}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-slate-500" />
        )}
      </button>

      {open ? (
        <div
          className={cn(
            "absolute z-50 mt-2 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl",
            align === "right" ? "right-0" : "left-0",
          )}
        >
          <div className="py-2">
            {options.map((o) => {
              const active = o.value === value;
              return (
                <button
                  key={o.value}
                  type="button"
                  onClick={() => {
                    onChange(o.value);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-3.5 py-2.5 text-left text-sm font-semibold",
                    active
                      ? "bg-slate-100 text-[#101828]"
                      : "text-[#364153] hover:bg-slate-50",
                  )}
                >
                  <span>{o.label}</span>
                  {active ? <span className="text-[#101828]">✓</span> : null}
                </button>
              );
            })}
          </div>
        </div>
      ) : null}
    </div>
  );
}

/* ----------------------------- modal ----------------------------- */

function RowDetailsModal({
  open,
  row,
  onClose,
}: {
  open: boolean;
  row: AuditRow | null;
  onClose: () => void;
}) {
  useLockBodyScroll(open);
  useEscClose(open, onClose);

  if (!open || !row) return null;

  const roleTone =
    row.role === "Platform Owner"
      ? "indigo"
      : row.role === "Super Admin"
        ? "sky"
        : row.role === "Broker"
          ? "slate"
          : row.role === "Referrer"
            ? "amber"
            : "rose";

  return (
    <div className="fixed inset-0 z-80 flex items-center justify-center p-4">
      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-black/40"
      />
      <div className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-6">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-lg font-black text-[#101828]">
                Log Details
              </h3>
              <Pill tone={roleTone as any}>{row.role}</Pill>
              <StatusPill status={row.status} />
            </div>
            <p className="mt-1 text-sm font-semibold text-slate-600">
              {new Date(row.at).toLocaleString()}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="grid h-10 w-10 place-items-center rounded-2xl border border-slate-200 bg-white text-[#364153] hover:bg-slate-50"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-5 py-5 sm:px-6">
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">User</p>
              <p className="mt-1 text-sm font-black text-[#101828]">
                {row.user}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">
                Action Type
              </p>
              <p className="mt-1 text-sm font-black text-[#101828]">
                {row.actionType}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">
                Affected Account
              </p>
              <p className="mt-1 text-sm font-black text-[#101828]">
                {row.affectedAccount}
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50/60 p-4">
              <p className="text-xs font-extrabold text-[#4A5565]">
                IP Address
              </p>
              <p className="mt-1 text-sm font-black text-[#101828]">{row.ip}</p>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <p className="text-xs font-extrabold text-[#4A5565]">Description</p>
            <p className="mt-1 text-sm font-semibold text-[#0A0A0A]">
              {row.description}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-5 py-4 sm:px-6">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-2xl border border-slate-200 bg-white px-5 text-sm font-extrabold text-[#0A0A0A] hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- page ----------------------------- */

function msAgo(ms: number) {
  const m = Math.max(1, Math.round(ms / 60000));
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h} hour${h > 1 ? "s" : ""} ago`;
  const d = Math.round(h / 24);
  return `${d} day${d > 1 ? "s" : ""} ago`;
}

function toCsv(rows: AuditRow[]) {
  const header = [
    "Timestamp",
    "User",
    "Role",
    "Action Type",
    "Affected Account",
    "Description",
    "IP Address",
    "Status",
  ];

  const escape = (v: string) => `"${String(v).replace(/"/g, '""')}"`;

  const lines = [
    header.map(escape).join(","),
    ...rows.map((r) =>
      [
        new Date(r.at).toISOString(),
        r.user,
        r.role,
        r.actionType,
        r.affectedAccount,
        r.description,
        r.ip,
        r.status,
      ]
        .map((x) => escape(String(x)))
        .join(","),
    ),
  ];

  return lines.join("\n");
}

function downloadCsv(filename: string, csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

const SuperAdminAuditLogs = () => {
  const now = Date.now();

  const [q, setQ] = useState("");
  const [userFilter, setUserFilter] = useState(userOptions[0].value);
  const [actionFilter, setActionFilter] = useState(actionOptions[0].value);
  const [range, setRange] = useState(rangeOptions[1].value);

  // only used when range = custom
  const [from, setFrom] = useState<string>(() => {
    const d = new Date(now - 7 * 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  const [to, setTo] = useState<string>(() =>
    new Date(now).toISOString().slice(0, 10),
  );

  const [rows] = useState<AuditRow[]>(() => makeAuditRows(now));

  const [detailsOpen, setDetailsOpen] = useState(false);
  const [activeRow, setActiveRow] = useState<AuditRow | null>(null);

  const actionTypeLabel = useMemo(() => {
    const found = actionOptions.find((o) => o.value === actionFilter);
    return found?.label ?? "All Actions";
  }, [actionFilter]);

  const rangeLabel = useMemo(() => {
    const found = rangeOptions.find((o) => o.value === range);
    return found?.label ?? "Custom Range";
  }, [range]);

  const cutoff = useMemo(() => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    if (range === "today") {
      const start = new Date();
      start.setHours(0, 0, 0, 0);
      return { start: start.getTime(), end: end.getTime() };
    }
    if (range === "7d")
      return { start: now - 7 * 24 * 60 * 60 * 1000, end: now };
    if (range === "30d")
      return { start: now - 30 * 24 * 60 * 60 * 1000, end: now };

    // custom
    const start = new Date(from);
    start.setHours(0, 0, 0, 0);
    const end2 = new Date(to);
    end2.setHours(23, 59, 59, 999);
    return { start: start.getTime(), end: end2.getTime() };
  }, [range, from, to, now]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    const matchUser = (r: AuditRow) => {
      if (userFilter === "all") return true;
      if (userFilter === "super_admin")
        return r.user.toLowerCase().includes("super admin");
      if (userFilter === "brokers") return r.role === "Broker";
      if (userFilter === "referrers") return r.role === "Referrer";
      if (userFilter === "system") return r.role === "System";
      return true;
    };

    const matchAction = (r: AuditRow) =>
      actionFilter === "all" ? true : r.actionType === actionFilter;

    const matchRange = (r: AuditRow) => {
      const t = new Date(r.at).getTime();
      return t >= cutoff.start && t <= cutoff.end;
    };

    const matchQuery = (r: AuditRow) => {
      if (!query) return true;
      const blob = [
        r.user,
        r.role,
        r.actionType,
        r.affectedAccount,
        r.description,
        r.ip,
        r.status,
      ]
        .join(" ")
        .toLowerCase();
      return blob.includes(query);
    };

    return rows
      .filter(
        (r) => matchUser(r) && matchAction(r) && matchRange(r) && matchQuery(r),
      )
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  }, [rows, q, userFilter, actionFilter, cutoff]);

  const impersonationsLast7 = useMemo(() => {
    const start = now - 7 * 24 * 60 * 60 * 1000;
    return rows.filter(
      (r) =>
        r.actionType === "Impersonation" && new Date(r.at).getTime() >= start,
    ).length;
  }, [rows, now]);

  const lastImpersonation = useMemo(() => {
    const item = [...rows]
      .filter((r) => r.actionType === "Impersonation")
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime())[0];
    if (!item) return null;
    return { when: item.at, account: item.affectedAccount };
  }, [rows]);

  const suspiciousCards = useMemo(() => makeSuspiciousCards(now), [now]);

  const openDetails = (r: AuditRow) => {
    setActiveRow(r);
    setDetailsOpen(true);
  };

  const onExport = () => {
    const csv = toCsv(filtered);
    downloadCsv(`audit-logs-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  };

  return (
    <div className="p-6 sm:p-10 bg-white">
      {/* Header row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tighter text-[#101828]">
            Audit Logs
          </h1>
          <p className="mt-1 text-sm text-[#4A5565]">
            Complete activity history and security monitoring
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto lg:items-center lg:justify-end">
          <div className="relative w-full lg:w-85">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search logs..."
              className={cn(
                "h-11 w-full rounded-lg  border border-[#E5E7EB] bg-[#F9FAFB] pl-10 pr-3.5 text-sm font-semibold text-[#0A0A0A]",
                "placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-slate-200",
              )}
            />
          </div>

          <button
            type="button"
            onClick={onExport}
            className={cn(
              "inline-flex h-11 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-[#0A0A0A]",
              "hover:bg-slate-50",
            )}
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Info banner */}
      <div className="mt-6 rounded-2xl border border-[#00B4FE] bg-[#00B4FE0D] px-4 py-3 text-[#00B4FE]">
        <div className="flex items-start gap-3">
          <Info className="h-4 w-4 shrink-0" />

          <p className="text-sm font-semibold">
            All platform actions are logged for transparency, compliance, and
            security monitoring.
          </p>
        </div>
      </div>

      {/* Filters row */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
        <SelectMenu
          value={userFilter}
          onChange={setUserFilter}
          options={userOptions}
        />

        <SelectMenu
          value={actionFilter}
          onChange={setActionFilter}
          options={actionOptions}
        />

        <div className="flex flex-col items-end gap-2">
          <SelectMenu
            value={range}
            onChange={setRange}
            options={rangeOptions}
            icon={<Calendar className="h-4 w-4" />}
          />

          {range === "custom" ? (
            <div className="w-full max-w-90 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-[#4A5565]">From</p>
                  <input
                    type="date"
                    value={from}
                    onChange={(e) => setFrom(e.target.value)}
                    className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0A0A0A] outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-extrabold text-[#4A5565]">To</p>
                  <input
                    type="date"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="h-10 w-full rounded-2xl border border-slate-200 bg-white px-3 text-sm font-semibold text-[#0A0A0A] outline-none focus:ring-2 focus:ring-slate-200"
                  />
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      {/* Cards */}
      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Impersonation */}
        <div className="rounded-3xl border border-orange-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-start gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-[10px] bg-[#FFEDD4] ring-1 ring-orange-100">
                <UserCog className="h-5.5 w-5.5 text-[#F54900]" />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[#101828]">
                  Impersonation Activity
                </h3>
                <p className="text-sm text-[#4A5565]">Security monitoring</p>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-[#F9FAFB] p-4">
              <p className="text-xs text-[#4A5565]">Total Impersonations</p>
              <p className="mt-1 text-2xl font-bold text-[#101828]">
                {impersonationsLast7}
              </p>
              <p className="mt-1 text-xs text-[#4A5565]">Last 7 days</p>
            </div>

            <div className="rounded-2xl bg-[#F9FAFB] p-4">
              <p className="text-xs text-[#4A5565]">Last Impersonation</p>
              <p className="mt-1 text-2xl font-bold text-[#101828]">
                {lastImpersonation
                  ? msAgo(now - new Date(lastImpersonation.when).getTime())
                  : "—"}
              </p>
              <p className="mt-1 text-xs text-[#4A5565]">
                {lastImpersonation?.account ?? "No recent impersonations"}
              </p>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-700" />
              <p className="text-sm text-amber-800">
                All impersonation sessions are logged for security and
                compliance.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white text-sm font-medium text-[#0A0A0A] hover:bg-slate-50"
          >
            <ExternalLink className="h-4 w-4" />
            View Impersonation Logs
          </button>
        </div>

        {/* Suspicious */}
        <div className="rounded-3xl border border-rose-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-lg bg-[#FFE2E2] ring-1 ring-rose-100">
              <ShieldAlert className="h-5 w-5 text-[#E7000B]" />
            </div>
            <div>
              <h3 className="text-base font-semibold text-[#101828]">
                Suspicious Activity
              </h3>
              <p className="text-sm text-[#4A5565]">Security alerts</p>
            </div>
          </div>

          <div className="mt-5 space-y-3">
            {suspiciousCards.map((a) => (
              <div
                key={a.id}
                className={cn(
                  "relative overflow-hidden rounded-2xl p-5",
                  a.tone === "high"
                    ? "border-l-8 border-[#E7000B] bg-[#FEF2F2 ]"
                    : "border-l-8 border-[#F97316] bg-[#FFF7ED]",
                  "before:absolute before:left-0 before:top-0 before:h-full before:w-1.5 before:rounded-l-2xl",
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <AlertTriangle
                        className={cn(
                          "h-4 w-4",
                          a.tone === "high"
                            ? "text-[#E7000B]"
                            : "text-[#F97316]",
                        )}
                      />
                      <p className="text-sm font-semibold text-[#101828]">
                        {a.title}
                      </p>

                      <span
                        className={cn(
                          "inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium",
                          a.tone === "high"
                            ? "bg-[#D4183D] text-white"
                            : "bg-[#FFEDD4] text-[#9F2D00]",
                        )}
                      >
                        {a.tone === "high" ? "High" : "Medium"}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#364153]">{a.desc}</p>
                    <p className="mt-2 text-xs text-[#4A5565]">
                      {msAgo(now - a.at)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-2xl border border-rose-200 bg-white text-sm font-medium  text-[#C10007] hover:bg-[#FFE2E2]"
          >
            View Security Events
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="mt-8">
        <div className="mb-3">
          <h2 className="font-semibold text-[#101828]">Activity Log</h2>
          <p className="text-xs text-[#4A5565]">
            Complete history of system events and user actions
          </p>
        </div>

        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-245">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/50">
                  {[
                    "User",
                    "Role",
                    "Action Type",
                    "Affected Account",
                    "Description",
                    "IP Address",
                    "Status",
                    "Actions",
                  ].map((h) => (
                    <th
                      key={h}
                      className="px-3 py-2 text-left text-xs font-semibold text-[#0A0A0A]"
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-200">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-5 py-10 text-center">
                      <p className="text-sm font-bold text-[#4A5565]">
                        No logs match your filters.
                      </p>
                      <p className="mt-1 text-xs font-semibold text-slate-400">
                        Try changing {actionTypeLabel}, {rangeLabel}, or the
                        search query.
                      </p>
                    </td>
                  </tr>
                ) : (
                  filtered.map((r) => {
                    const actionTone =
                      r.actionType === "Impersonation"
                        ? "indigo"
                        : r.actionType === "Refund"
                          ? "amber"
                          : r.actionType === "Manual Credit"
                            ? "sky"
                            : r.actionType.includes("Error") ||
                                r.actionType.includes("Failed")
                              ? "rose"
                              : "slate";

                    return (
                      <tr key={r.id} className="hover:bg-slate-50/60">
                        <td className="px-3 py-2 text-xs font-medium text-[#101828]">
                          {r.user}
                        </td>
                        <td className="px-3 py-2 text-xs text-[#4A5565]">
                          {r.role}
                        </td>
                        <td className="px-3 py-2">
                          <Pill tone={actionTone as any}>{r.actionType}</Pill>
                        </td>
                        <td className="px-3 py-2 text-xs text-[#0A0A0A]">
                          {r.affectedAccount}
                        </td>
                        <td className="px-3 py-2 text-sm text-[#0A0A0A]">
                          <span className="line-clamp-2">{r.description}</span>
                        </td>
                        <td className="px-3 py-2 text-sm text-[#0A0A0A]">
                          {r.ip}
                        </td>
                        <td className="px-3 py-2">
                          <StatusPill status={r.status} />
                        </td>
                        <td className="px-3 py-2">
                          <button
                            type="button"
                            onClick={() => openDetails(r)}
                            className="inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-extrabold text-[#364153] hover:bg-slate-100"
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <RowDetailsModal
        open={detailsOpen}
        row={activeRow}
        onClose={() => {
          setDetailsOpen(false);
          setActiveRow(null);
        }}
      />
    </div>
  );
};

export default SuperAdminAuditLogs;
