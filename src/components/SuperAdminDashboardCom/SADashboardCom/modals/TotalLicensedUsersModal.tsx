// src/components/AdminDashboardCom/ADComModals/TotalLicensedUsersModal.tsx

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, Search } from "lucide-react";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

export type UserRow = {
  name: string;
  email: string;
  date: string;
  status: "Active" | "Inactive";
};

function Chip({ status }: { status: UserRow["status"] }) {
  const cls =
    status === "Active"
      ? "bg-emerald-50 text-emerald-700 border-emerald-100"
      : "bg-slate-100 text-slate-600 border-slate-200";
  return (
    <span
      className={[
        "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
        cls,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

export function TotalLicensedUsersModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: UserRow[];
}) {
  const [q, setQ] = useState("");
  const panelRef = useOutsideClose<HTMLDivElement>(open, onClose);
  useLockBodyScroll(open);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    const m = (v: string) => v.toLowerCase().includes(s);
    return data.filter(
      (x) => m(x.name) || m(x.email) || m(x.date) || m(x.status),
    );
  }, [q, data]);

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
            className="fixed inset-0 z-90 flex items-center justify-center p-3 md:p-4"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
            role="dialog"
            aria-modal="true"
            aria-label="Total Licensed Users"
          >
            <div
              ref={panelRef}
              className={[
                // responsive sizing
                "w-full max-w-2xl",
                "max-h-[85vh] md:max-h-[90vh]",
                // layout
                "overflow-hidden bg-white",
                "shadow-[0_30px_80px_rgba(0,0,0,0.35)]",
                "flex flex-col",
              ].join(" ")}
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-center justify-between gap-4 border-b border-slate-100 p-4 md:p-6">
                <h2 className="text-xl font-semibold text-slate-900">
                  Total Licensed Users
                </h2>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    className="hidden md:inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-black hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
                  </button>

                  {/* mobile export icon */}
                  <button
                    type="button"
                    className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
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
              <div className="p-4 md:p-6">
                <div className="flex items-center gap-3 rounded-lg bg-[#F3F3F5] px-4 py-3 md:px-5 md:py-3">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-sm md:text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* scrollable list area */}
              <div className="p-3 md:p-4 overflow-y-auto">
                <div className="space-y-3">
                  {list.map((u) => (
                    <div
                      key={u.email}
                      className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-lg bg-[#F9FAFB] p-4 md:p-6"
                    >
                      <div className="min-w-0">
                        <div className="text-base font-medium text-slate-900">
                          {u.name}
                        </div>
                        <div className="text-sm text-slate-500">{u.email}</div>
                        <div className="text-xs text-slate-400">{u.date}</div>
                      </div>

                      <div className="flex items-center justify-between md:justify-end md:pl-6">
                        <Chip status={u.status} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 md:mt-10 text-xs md:text-sm text-slate-400">
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
