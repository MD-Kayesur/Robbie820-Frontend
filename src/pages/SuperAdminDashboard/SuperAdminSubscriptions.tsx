// src/pages/SuperAdmin/SuperAdminSubscriptions.tsx
import { useMemo, useState } from "react";
import { Search, Plus, Info } from "lucide-react";
import {
  PlanCard,
  SubscriptionRow,
  Tab,
} from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/types";
import {
  plansMock,
  subscriptionsMock,
} from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/mock";
import { SegmentedTabs } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/SegmentedTabs";
import { Dropdown } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/Dropdown";
import { SubscriptionAccountsTab } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/tabs/SubscriptionAccountsTab";
import { PlansPricingTab } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/tabs/PlansPricingTab";
import { RevenueAnalyticsTab } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/tabs/RevenueAnalyticsTab";

export default function SuperAdminSubscriptions() {
  const [tab, setTab] = useState<Tab>("Subscription Accounts");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<
    | "All Subscriptions"
    | "Active"
    | "Cancelled"
    | "Suspended"
    | "Trial"
    | "Payment Failed"
  >("All Subscriptions");

  const [menuKey, setMenuKey] = useState<string | null>(null);

  const [plans, setPlans] = useState<PlanCard[]>(plansMock);
  const [editPlan, setEditPlan] = useState<PlanCard | null>(null);

  const filteredSubscriptions = useMemo(() => {
    const s = q.trim().toLowerCase();
    const bySearch = (r: SubscriptionRow) =>
      !s
        ? true
        : `${r.brokerCompany} ${r.plan} ${r.monthlyPrice} ${r.status}`
            .toLowerCase()
            .includes(s);

    const byFilter = (r: SubscriptionRow) => {
      if (filter === "All Subscriptions") return true;
      return r.status === filter;
    };

    return subscriptionsMock.filter(bySearch).filter(byFilter);
  }, [q, filter]);

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto w-full max-w-7xl px-10 py-8">
        {/* header row */}
        <div className="flex items-start justify-between gap-6">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-slate-900">
              Subscriptions &amp; Billing
            </h1>

            {/* search */}
            <div className="mt-3 flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pl-3 pr-40 py-1.5">
                <Search className="h-4 w-4 text-slate-400 shrink-0" />

                <input
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search broker or company..."
                  className="flex-1 bg-transparent text-sm font-medium text-slate-700 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-[#070A1A] px-4 text-sm font-medium text-white shadow-sm hover:opacity-95"
          >
            <Plus className="h-4 w-4" />
            Create New Plan
          </button>
        </div>

        {/* divider */}
        <div className="mt-6 h-px w-full bg-slate-200" />

        {/* info banner */}
        <div className="mt-6 rounded-2xl border border-sky-300/70 bg-sky-50 p-4 ">
          <div className="flex items-center gap-3">
            <div className="rounded-full">
              <Info className="h-4.5 w-4.5 text-[#00B4FE]" />
            </div>
            <div className="text-xs text-[#00B4FE]">
              <span className="font-bold">Important:</span> ReferNow processes
              subscription billing only. Commission payments are managed
              directly between brokers and referrers.
            </div>
          </div>
        </div>

        {/* tabs + filter */}
        <div className="mt-6 flex items-center justify-between gap-4">
          <SegmentedTabs tab={tab} onChange={setTab} />

          {tab === "Subscription Accounts" ? (
            <Dropdown
              value={filter}
              options={[
                "All Subscriptions",
                "Active",
                "Cancelled",
                "Suspended",
                "Trial",
                "Payment Failed",
              ]}
              onChange={setFilter}
              minW={200}
            />
          ) : (
            <div className="h-10" />
          )}
        </div>

        {/* content */}
        {tab === "Subscription Accounts" && (
          <SubscriptionAccountsTab
            rows={filteredSubscriptions}
            menuKey={menuKey}
            setMenuKey={setMenuKey}
          />
        )}

        {tab === "Plans & Pricing" && (
          <PlansPricingTab
            plans={plans}
            setPlans={setPlans}
            editPlan={editPlan}
            setEditPlan={setEditPlan}
          />
        )}

        {tab === "Revenue Analytics" && <RevenueAnalyticsTab />}
      </div>
    </div>
  );
}
