// src/pages/SuperAdmin/SuperAdminSubscriptions.tsx
import { useMemo, useState } from "react";
import { Search, Plus, Info } from "lucide-react";
import {
  PlanCard,
  SubscriptionRow,
  Tab,
} from "@/pages/SuperAdminDashboard/SuperAdminSubscriptions/types";
import {
  plansMock,
  subscriptionsMock,
} from "@/pages/SuperAdminDashboard/SuperAdminSubscriptions/mock";
import { SegmentedTabs } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/SegmentedTabs";
import { Dropdown } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/Dropdown";
import { SubscriptionAccountsTab } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/tabs/SubscriptionAccountsTab";
import { PlansPricingTab } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/tabs/PlansPricingTab";
import { RevenueAnalyticsTab } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/tabs/RevenueAnalyticsTab";
import { CreatePlanModal } from "@/components/SuperAdminDashboardCom/SASubscriptionsCom/modals/CreatePlanModal";


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
  const [showCreateModal, setShowCreateModal] = useState(false);


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
      <div className="px-4 py-6 md:px-6 md:py-8 lg:px-8 lg:py-10">
        {/* header row */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <h1 className="text-xl font-semibold text-slate-900 md:text-2xl">
              Subscriptions &amp; Billing
            </h1>

            {/* search */}
            <div className="mt-3">
              <div className="flex w-full items-center gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-3 py-2.5 md:max-w-105">
                <Search className="h-4 w-4 shrink-0 text-slate-400" />

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
            onClick={() => setShowCreateModal(true)}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#070A1A] px-4 text-sm font-medium text-white shadow-sm hover:opacity-95 md:w-auto"
          >
            <Plus className="h-4 w-4" />
            Create New Plan
          </button>

        </div>

        {/* divider */}
        <div className="mt-6 h-px w-full bg-slate-200" />

        {/* info banner */}
        <div className="mt-6 rounded-2xl border border-sky-300/70 bg-sky-50 p-4">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 shrink-0 rounded-full">
              <Info className="h-4.5 w-4.5 text-[#00B4FE]" />
            </div>
            <div className="text-xs leading-5 text-[#00B4FE] md:text-sm">
              <span className="font-bold">Important:</span> ReferNow processes
              subscription billing only. Commission payments are managed
              directly between brokers and referrers.
            </div>
          </div>
        </div>

        {/* tabs + filter */}
        <div className="mt-6 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
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
          ) : null}
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

      <CreatePlanModal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreate={(next) => {
          setPlans((prev) => [...prev, next]);
          setTab("Plans & Pricing");
        }}
      />
    </div>

  );
}
