// src/pages/SuperAdmin/SubscriptionsCom/tabs/SubscriptionAccountsTab.tsx
import React from "react";
import { MoreVertical } from "lucide-react";

import type { SubscriptionRow } from "../../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";
import { cn } from "../utils";
import { planPill, paymentPill, statusPill } from "../pills";
import { ActionsMenu } from "../ActionsMenu";

export function SubscriptionAccountsTab({
  rows,
  menuKey,
  setMenuKey,
}: {
  rows: SubscriptionRow[];
  menuKey: string | null;
  setMenuKey: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold text-slate-900">
        Active Subscriptions
      </h2>

      <div className="mt-4 overflow-hidden rounded-2xl border border-slate-200 bg-white z-10">
        <div className="overflow-x-auto">
          <table className="w-full min-w-275">
            <thead>
              <tr className="border-b border-slate-200 bg-[#F9FAFB]">
                {[
                  "Broker Company",
                  "Plan Name",
                  "Active Seats",
                  "Monthly Price",
                  "Billing Cycle",
                  "Next Billing Date",
                  "Payment Status",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold text-slate-900"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {rows.map((r) => {
                const key = `${r.brokerCompany}:${r.plan}`;
                const open = menuKey === key;

                return (
                  <tr key={key} className="bg-white">
                    <td className="px-4 py-3 text-xs font-medium text-slate-900">
                      {r.brokerCompany}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                          planPill(r.plan),
                        )}
                      >
                        {r.plan}
                      </span>
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-900">
                      {r.seats}
                    </td>

                    <td className="px-4 py-3 text-xs font-semibold text-slate-900">
                      {r.monthlyPrice}
                    </td>

                    <td className="px-4 py-3 text-xs text-slate-900">
                      {r.billingCycle}
                    </td>

                    <td className="px-4 py-3 text-xs text-[#666]">
                      {r.nextBillingDate}
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-bold",
                          paymentPill(r.paymentStatus),
                        )}
                      >
                        {r.paymentStatus}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-bold",
                          statusPill(r.status),
                        )}
                      >
                        {r.status}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="relative flex justify-end">
                        <button
                          type="button"
                          onClick={() =>
                            setMenuKey((k) => (k === key ? null : key))
                          }
                          className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
                          aria-label="Open actions"
                        >
                          <MoreVertical className="h-4 w-4 text-slate-700" />
                        </button>

                        <ActionsMenu
                          open={open}
                          onClose={() => setMenuKey(null)}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="px-4 py-3 text-sm text-slate-400">
          Showing {rows.length} results
        </div>
      </div>
    </div>
  );
}
