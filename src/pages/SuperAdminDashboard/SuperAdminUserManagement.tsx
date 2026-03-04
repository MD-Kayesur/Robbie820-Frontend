// src/pages/SuperAdmin/SuperAdminUserManagement.tsx

import { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Download,
  ChevronDown,
  MoreVertical,
  Eye,
  UserCog,
  FileText,
  Ban,
} from "lucide-react";

type Tab = "Brokers" | "Referrers";
type StatusFilter = "Active" | "Suspended";

type BrokerRow = {
  name: string;
  company: string;
  plan: "Enterprise" | "Pro" | "Business";
  seats: number;
  referrers: number;
  commissionYTD: string;
  status: "Active" | "Suspended";
};

type ReferrerRow = {
  name: string;
  linkedBroker: string;
  totalReferrals: number;
  totalCommission: string;
  markedPaid: string;
  status: "Active" | "Disabled";
  lastLogin: string;
};

const brokersMock: BrokerRow[] = [
  {
    name: "John Anderson",
    company: "Prime Mortgage Group",
    plan: "Enterprise",
    seats: 12,
    referrers: 45,
    commissionYTD: "$127,450",
    status: "Active",
  },
  {
    name: "Sarah Mitchell",
    company: "Capital Home Loans",
    plan: "Pro",
    seats: 8,
    referrers: 28,
    commissionYTD: "$89,200",
    status: "Active",
  },
  {
    name: "Michael Chen",
    company: "First Choice Finance",
    plan: "Business",
    seats: 5,
    referrers: 15,
    commissionYTD: "$42,800",
    status: "Active",
  },
  {
    name: "Emma Wilson",
    company: "Horizon Lending",
    plan: "Enterprise",
    seats: 15,
    referrers: 52,
    commissionYTD: "$156,900",
    status: "Active",
  },
  {
    name: "David Thompson",
    company: "Aussie Finance Co",
    plan: "Pro",
    seats: 6,
    referrers: 22,
    commissionYTD: "$68,400",
    status: "Suspended",
  },
];

const referrersMock: ReferrerRow[] = [
  {
    name: "Alice Cooper",
    linkedBroker: "Prime Mortgage Group",
    totalReferrals: 34,
    totalCommission: "$28,400",
    markedPaid: "$24,100",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    name: "Robert Greene",
    linkedBroker: "Capital Home Loans",
    totalReferrals: 52,
    totalCommission: "$42,800",
    markedPaid: "$39,200",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    name: "Jennifer Lee",
    linkedBroker: "First Choice Finance",
    totalReferrals: 28,
    totalCommission: "$19,600",
    markedPaid: "$19,600",
    status: "Active",
    lastLogin: "3 hours ago",
  },
  {
    name: "Mark Stevens",
    linkedBroker: "Horizon Lending",
    totalReferrals: 41,
    totalCommission: "$35,200",
    markedPaid: "$30,400",
    status: "Active",
    lastLogin: "5 days ago",
  },
  {
    name: "Lisa Martinez",
    linkedBroker: "Prime Mortgage Group",
    totalReferrals: 18,
    totalCommission: "$14,200",
    markedPaid: "$12,000",
    status: "Disabled",
    lastLogin: "2 weeks ago",
  },
];

const pillPlan = (p: BrokerRow["plan"]) =>
  p === "Enterprise"
    ? "bg-violet-50 text-violet-700"
    : p === "Pro"
      ? "bg-sky-50 text-sky-700"
      : "bg-slate-100 text-slate-700";

const pillStatus = (s: string) =>
  s === "Active"
    ? "bg-emerald-50 text-emerald-700"
    : s === "Suspended"
      ? "bg-rose-600 text-white"
      : "bg-slate-100 text-slate-700";

function useOutsideClose<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  return ref;
}

function SegmentedTabs({
  tab,
  setTab,
}: {
  tab: Tab;
  setTab: (t: Tab) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-full bg-slate-100 py-1 px-1.5">
      {(["Brokers", "Referrers"] as const).map((t) => {
        const active = tab === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={[
              "rounded-full px-7.5 py-1 text-sm font-semibold transition",
              active ? "bg-white shadow-sm text-slate-900" : "text-slate-600",
            ].join(" ")}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}

function StatusDropdown({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#F3F3F5] px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 min-w-35"
      >
        <span className="px-8">{value}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-45 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {(["Active", "Suspended"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={[
                "w-full px-4 py-3 text-left text-sm font-semibold",
                opt === value ? "bg-slate-50 text-slate-900" : "text-slate-700",
                "hover:bg-slate-50",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function ActionsMenu({
  open,
  onClose,
  onDisable,
}: {
  open: boolean;
  onClose: () => void;
  onDisable: () => void;
}) {
  const ref = useOutsideClose<HTMLDivElement>(open, onClose);

  if (!open) return null;

  return (
    <div
      ref={ref}
      className="absolute right-2 top-10 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl z-50"
    >
      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        onClick={onClose}
      >
        <Eye className="h-4 w-4 text-slate-500" />
        View Profile
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        onClick={onClose}
      >
        <UserCog className="h-4 w-4 text-slate-500" />
        Impersonate
      </button>

      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50"
        onClick={onClose}
      >
        <FileText className="h-4 w-4 text-slate-500" />
        Commission History
      </button>

      <div className="h-px bg-slate-100" />

      <button
        type="button"
        className="flex w-full items-center gap-3 px-4 py-3 text-sm font-semibold text-rose-600 hover:bg-rose-50"
        onClick={onDisable}
      >
        <Ban className="h-4 w-4 text-rose-500" />
        Disable Access
      </button>
    </div>
  );
}

export default function SuperAdminUserManagement() {
  const [tab, setTab] = useState<Tab>("Brokers");
  const [status, setStatus] = useState<StatusFilter>("Active");
  const [q, setQ] = useState("");
  const [menuKey, setMenuKey] = useState<string | null>(null);

  const [brokersData, setBrokersData] = useState(brokersMock);
  const [referrersData, setReferrersData] = useState(referrersMock);

  const brokers = useMemo(() => {
    const s = q.trim().toLowerCase();
    return brokersData
      .filter((r) => r.status === status)
      .filter((r) =>
        !s
          ? true
          : `${r.name} ${r.company} ${r.plan} ${r.commissionYTD}`
              .toLowerCase()
              .includes(s),
      );
  }, [q, status, brokersData]);

  const referrers = useMemo(() => {
    const s = q.trim().toLowerCase();

    const normalized: ReferrerRow["status"] =
      status === "Active" ? "Active" : "Disabled";

    return referrersData
      .filter((r) => r.status === normalized)
      .filter((r) =>
        !s
          ? true
          : `${r.name} ${r.linkedBroker} ${r.totalCommission} ${r.lastLogin}`
              .toLowerCase()
              .includes(s),
      );
  }, [q, status, referrersData]);

  const handleDisable = (key: string) => {
    if (key.startsWith("broker")) {
      setBrokersData((prev) =>
        prev.map((r) =>
          `broker:${r.name}:${r.company}` === key
            ? { ...r, status: "Suspended" }
            : r,
        ),
      );
    } else {
      setReferrersData((prev) =>
        prev.map((r) =>
          `referrer:${r.name}:${r.linkedBroker}` === key
            ? { ...r, status: "Disabled" }
            : r,
        ),
      );
    }

    setMenuKey(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="px-8 py-10">
        {/* header */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-2xl font-semibold text-slate-900">
              Account Management
            </h1>

            <div className="mt-3 flex items-center gap-3">
              <div className="flex w-95 items-center gap-2 rounded-xl border border-slate-200 bg-[#F9FAFB] px-4 py-2">
                <Search className="h-4 w-4 text-slate-400" />
                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search broker, referrer, company..."
                  className="w-full bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export CSV
          </button>
        </div>

        {/* divider */}
        <div className="mt-6 h-px w-full bg-slate-200" />

        {/* controls */}
        <div className="mt-5 flex items-center justify-between">
          <SegmentedTabs tab={tab} setTab={setTab} />
          <StatusDropdown value={status} onChange={setStatus} />
        </div>

        {/* table card */}
        <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {tab === "Brokers" ? (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-245">
                  <thead className="bg-[#F9FAFB]">
                    <tr className="border-b border-slate-200">
                      {[
                        "Broker Name",
                        "Company",
                        "Subscription Plan",
                        "Active Seats",
                        "Total Referrers",
                        "Total Commission (YTD)",
                        "Status",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-4 text-left text-xs font-bold text-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {brokers.map((r) => {
                      const key = `broker:${r.name}:${r.company}`;
                      const open = menuKey === key;

                      return (
                        <tr key={key} className="bg-white">
                          <td className="px-5 py-4 text-xs font-semibold text-slate-900">
                            {r.name}
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-700">
                            {r.company}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium ",
                                pillPlan(r.plan),
                              ].join(" ")}
                            >
                              {r.plan}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-700">
                            {r.seats}
                          </td>
                          <td className="px-5 py-4 text-xs text-slate-700">
                            {r.referrers}
                          </td>
                          <td className="px-5 py-4 text-xs font-semibold  text-slate-900">
                            {r.commissionYTD}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                                pillStatus(r.status),
                              ].join(" ")}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-4">
                            <div className="relative flex justify-start">
                              <button
                                type="button"
                                onClick={() =>
                                  setMenuKey((k) => (k === key ? null : key))
                                }
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                                aria-label="Open actions"
                              >
                                <MoreVertical className="h-4 w-4 text-slate-600" />
                              </button>

                              <ActionsMenu
                                open={open}
                                onClose={() => setMenuKey(null)}
                                onDisable={() => handleDisable(key)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full min-w-245">
                  <thead className="bg-white">
                    <tr className="border-b border-slate-200">
                      {[
                        "Referrer Name",
                        "Linked Broker",
                        "Total Referrals",
                        "Total Commission Earned",
                        "Marked Paid",
                        "Status",
                        "Last Login",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          className="px-5 py-4 text-left text-xs font-bold text-slate-700"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-200">
                    {referrers.map((r) => {
                      const key = `referrer:${r.name}:${r.linkedBroker}`;
                      const open = menuKey === key;

                      return (
                        <tr key={key} className="bg-white">
                          <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                            {r.name}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {r.linkedBroker}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {r.totalReferrals}
                          </td>
                          <td className="px-5 py-4 text-sm font-bold text-slate-900">
                            {r.totalCommission}
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-700">
                            {r.markedPaid}
                          </td>
                          <td className="px-5 py-4">
                            <span
                              className={[
                                "inline-flex rounded-full px-3 py-1 text-xs font-bold",
                                pillStatus(r.status),
                              ].join(" ")}
                            >
                              {r.status}
                            </span>
                          </td>
                          <td className="px-5 py-4 text-sm text-slate-500">
                            {r.lastLogin}
                          </td>
                          <td className="px-5 py-4">
                            <div className="relative flex justify-end">
                              <button
                                type="button"
                                onClick={() =>
                                  setMenuKey((k) => (k === key ? null : key))
                                }
                                className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                                aria-label="Open actions"
                              >
                                <MoreVertical className="h-4 w-4 text-slate-600" />
                              </button>

                              <ActionsMenu
                                open={open}
                                onClose={() => setMenuKey(null)}
                                onDisable={() => handleDisable(key)}
                              />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
