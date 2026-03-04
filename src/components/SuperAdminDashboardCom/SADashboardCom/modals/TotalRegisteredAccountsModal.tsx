// src/components/AdminDashboardCom/ADComModals/TotalRegisteredAccountsModal.tsx
"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, Search } from "lucide-react";
import type { UserRow } from "./TotalLicensedUsersModal";

function Chip({ status }: { status: UserRow["status"] }) {
  const cls =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
        cls,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export function TotalRegisteredAccountsModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: UserRow[];
}) {
  const [q, setQ] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    const m = (v: string) => v.toLowerCase().includes(s);
    return data.filter(
      (x) => m(x.name) || m(x.email) || m(x.date) || m(x.status),
    );
  }, [q, data]);

  // Close on ESC + lock scroll while open
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          {/* overlay */}
          <motion.div
            className="fixed inset-0 z-80 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />

          {/* modal wrapper */}
          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center p-3 sm:p-4"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            role="dialog"
            aria-modal="true"
            aria-label="Total Registered Accounts"
          >
            <div
              ref={panelRef}
              className={[
                "w-full max-w-4xl",
                "max-h-[85vh] sm:max-h-[90vh]",
                "overflow-hidden rounded-2xl sm:rounded-3xl bg-white",
                "shadow-[0_30px_80px_rgba(0,0,0,0.35)]",
                "flex flex-col",
              ].join(" ")}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-start justify-between gap-4 border-b border-slate-100 px-4 py-4 sm:px-8 sm:py-6">
                <div className="min-w-0">
                  <h2 className="truncate text-xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                    Total Registered Accounts
                  </h2>
                  <p className="mt-1 text-xs sm:text-sm text-slate-500">
                    View and search registered accounts
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                  <button
                    type="button"
                    className="hidden sm:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>

                  <button
                    type="button"
                    className="sm:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    aria-label="Export CSV"
                  >
                    <Download className="h-5 w-5" />
                  </button>

                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                    aria-label="Close"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* search */}
              <div className="px-4 pt-4 sm:px-8 sm:pt-6">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 sm:px-5 sm:py-4">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm sm:text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* scrollable list area */}
              <div className="px-4 pb-4 pt-4 sm:px-8 sm:pb-8 sm:pt-6 overflow-y-auto">
                <div className="space-y-3 sm:space-y-4">
                  {list.map((u) => (
                    <div
                      key={u.email}
                      className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between rounded-2xl bg-slate-50/60 px-4 py-4 sm:px-7 sm:py-6"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-base sm:text-xl font-semibold text-slate-900">
                          {u.name}
                        </div>
                        <div className="truncate text-sm sm:text-base text-slate-500">
                          {u.email}
                        </div>
                        <div className="mt-1 text-xs sm:text-sm text-slate-400">
                          {u.date}
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end sm:pl-6">
                        <Chip status={u.status} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 sm:mt-10 text-xs sm:text-sm text-slate-400">
                  Showing {list.length} results
                </div>
              </div>
            </div>
          </motion.div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
