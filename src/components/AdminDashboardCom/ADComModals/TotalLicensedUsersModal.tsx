// src/components/AdminDashboardCom/ADComModals/TotalLicensedUsersModal.tsx

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, Search } from "lucide-react";

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
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold",
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
          <motion.div
            className="fixed inset-0 z-80 bg-black/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="fixed inset-0 z-90 flex items-center justify-center p-4"
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.985 }}
          >
            <div
              className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* header */}
              <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Total Licensed Users
                </h2>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                  >
                    <Download className="h-4 w-4" />
                    Export CSV
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
              <div className="px-8 pt-6">
                <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-5 py-4">
                  <Search className="h-5 w-5 text-slate-400" />
                  <input
                    value={q}
                    onChange={(e) => setQ(e.target.value)}
                    placeholder="Search..."
                    className="w-full bg-transparent text-base text-slate-900 outline-none placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* list */}
              <div className="px-8 pb-8 pt-6">
                <div className="space-y-4">
                  {list.map((u) => (
                    <div
                      key={u.email}
                      className="flex items-center justify-between rounded-2xl bg-slate-50/60 px-7 py-6"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-xl font-semibold text-slate-900">
                          {u.name}
                        </div>
                        <div className="truncate text-base text-slate-500">
                          {u.email}
                        </div>
                        <div className="mt-1 text-sm text-slate-400">
                          {u.date}
                        </div>
                      </div>
                      <div className="shrink-0 pl-6">
                        <Chip status={u.status} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-10 text-sm text-slate-400">
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
