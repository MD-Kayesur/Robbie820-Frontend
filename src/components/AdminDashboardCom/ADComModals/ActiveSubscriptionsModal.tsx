// src/components/AdminDashboardCom/ADComModals/ActiveSubscriptionsModal.tsx

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Download, Search } from "lucide-react";

export type SubscriptionRow = {
  plan: string;
  email: string;
  price: string;
  status: "Active";
};

function Chip() {
  return (
    <span className="inline-flex items-center rounded-full border border-emerald-100 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
      Active
    </span>
  );
}

export function ActiveSubscriptionsModal({
  open,
  onClose,
  data,
}: {
  open: boolean;
  onClose: () => void;
  data: SubscriptionRow[];
}) {
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return data;
    const m = (v: string) => v.toLowerCase().includes(s);
    return data.filter(
      (x) => m(x.plan) || m(x.email) || m(x.price) || m(x.status),
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
              <div className="flex items-center justify-between border-b border-slate-100 px-8 py-6">
                <h2 className="text-3xl font-semibold tracking-tight text-slate-900">
                  Active Subscriptions
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

              <div className="px-8 pb-8 pt-6">
                <div className="space-y-4">
                  {list.map((s) => (
                    <div
                      key={s.email + s.plan}
                      className="flex items-center justify-between rounded-2xl bg-slate-50/60 px-7 py-6"
                    >
                      <div className="min-w-0">
                        <div className="truncate text-xl font-semibold text-slate-900">
                          {s.plan}
                        </div>
                        <div className="truncate text-base text-slate-500">
                          {s.email}
                        </div>
                      </div>

                      <div className="flex items-center gap-5">
                        <Chip />
                        <div className="text-2xl font-semibold text-slate-900">
                          {s.price}
                        </div>
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
