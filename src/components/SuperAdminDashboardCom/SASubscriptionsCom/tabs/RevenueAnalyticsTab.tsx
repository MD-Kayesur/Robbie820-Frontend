// src/pages/SuperAdmin/SubscriptionsCom/tabs/RevenueAnalyticsTab.tsx
import {
  revenueByPlanMock,
  revenueTrendMock,
} from "../../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/mock";
import { RevenueLineChart } from "../charts/RevenueLineChart";
import { StatCard } from "../StatCard";
import {
  DollarSign,
  Info,
  Percent,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

function MobileRevenueCard({
  plan,
  activeAccounts,
  monthlyRevenue,
  contribution,
}: {
  plan: string;
  activeAccounts: number;
  monthlyRevenue: number;
  contribution: number;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-base font-semibold text-black">{plan}</p>
        <span className="inline-flex rounded-xl bg-[#DBEAFE] px-3 py-1 text-xs font-semibold text-[#00B4FE]">
          {contribution.toFixed(1)}%
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Active Accounts</p>
          <p className="mt-1 font-semibold text-black">{activeAccounts}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Monthly Revenue</p>
          <p className="mt-1 font-semibold text-black">
            ${monthlyRevenue.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export function RevenueAnalyticsTab() {
  return (
    <div className="mt-6">
      <div className="font-semibold text-black">Financial Overview</div>

      <div className="mt-3 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="MRR"
          value="$158,800"
          change="+12.4%"
          info={Info}
          icon={DollarSign}
        />
        <StatCard
          title="ARR"
          value="$1.9M"
          change="+18.7%"
          info={Info}
          icon={TrendingUp}
        />
        <StatCard
          title="Churn Rate"
          value="2.3%"
          change="-0.8%"
          info={Info}
          icon={TrendingDown}
        />
        <StatCard
          title="Net Revenue Growth"
          value="+14.2%"
          change="+3.1%"
          info={Info}
          icon={Percent}
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 md:p-4">
        <RevenueLineChart data={revenueTrendMock} />
      </div>

      <div className="mt-6">
        <div className="font-semibold text-black">Revenue by Plan</div>

        {/* mobile cards */}
        <div className="mt-3 space-y-4 lg:hidden">
          {revenueByPlanMock.map((r) => (
            <MobileRevenueCard key={r.plan} {...r} />
          ))}

          <div className="rounded-2xl border border-slate-200 bg-slate-50/40 p-4">
            <div className="flex items-center justify-between gap-3">
              <p className="font-semibold text-black">Total</p>
              <p className="font-semibold text-black">100%</p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-xl bg-white p-3">
                <p className="text-slate-500">Active Accounts</p>
                <p className="mt-1 font-semibold text-black">
                  {revenueByPlanMock.reduce((a, b) => a + b.activeAccounts, 0)}
                </p>
              </div>

              <div className="rounded-xl bg-white p-3">
                <p className="text-slate-500">Monthly Revenue</p>
                <p className="mt-1 font-semibold text-[#15D946]">
                  $
                  {revenueByPlanMock
                    .reduce((a, b) => a + b.monthlyRevenue, 0)
                    .toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* desktop table */}
        <div className="mt-3 hidden overflow-x-auto lg:block">
          <table className="w-full table-auto text-xs">
            <thead>
              <tr className="border-t border-slate-200 bg-[#F9FAFB] text-black">
                <th className="px-5 py-3 text-left font-semibold">Plan</th>
                <th className="px-5 py-3 text-left font-semibold">
                  Active Accounts
                </th>
                <th className="px-5 py-3 text-right font-semibold">
                  Monthly Revenue
                </th>
                <th className="px-5 py-3 text-right font-semibold">
                  Contribution %
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200 text-black">
              {revenueByPlanMock.map((r) => (
                <tr key={r.plan}>
                  <td className="px-5 py-3 font-semibold">{r.plan}</td>
                  <td className="px-5 py-3">{r.activeAccounts}</td>
                  <td className="px-5 py-3 text-right font-semibold">
                    ${r.monthlyRevenue.toLocaleString()}
                  </td>
                  <td className="px-5 py-3 text-right">
                    <span className="inline-flex rounded-xl bg-[#DBEAFE] px-3 py-1 font-semibold text-[#00B4FE]">
                      {r.contribution.toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}

              <tr className="bg-slate-50/40">
                <td className="px-5 py-3 font-semibold text-black">Total</td>
                <td className="px-5 py-3 font-semibold text-black">
                  {revenueByPlanMock.reduce((a, b) => a + b.activeAccounts, 0)}
                </td>
                <td className="px-5 py-3 text-right font-semibold text-[#15D946]">
                  $
                  {revenueByPlanMock
                    .reduce((a, b) => a + b.monthlyRevenue, 0)
                    .toLocaleString()}
                </td>
                <td className="px-5 py-3 text-right font-semibold text-black">
                  100%
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
