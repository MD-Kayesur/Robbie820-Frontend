// src/pages/SuperAdmin/SubscriptionsCom/tabs/SubscriptionAccountsTab.tsx
import React from "react";
import { MoreVertical } from "lucide-react";

import type { SubscriptionRow } from "../../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";
import { planPill, paymentPill, statusPill } from "../pills";
import { ActionsMenu } from "../ActionsMenu";
import { cn } from "@/hooks/useCn";

function MobileSubscriptionCard({
  row,
  open,
  onToggleMenu,
  onCloseMenu,
}: {
  row: SubscriptionRow;
  open: boolean;
  onToggleMenu: () => void;
  onCloseMenu: () => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-base font-semibold text-slate-900">
            {row.brokerCompany}
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-medium",
                planPill(row.plan),
              )}
            >
              {row.plan}
            </span>

            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-bold",
                paymentPill(row.paymentStatus),
              )}
            >
              {row.paymentStatus}
            </span>

            <span
              className={cn(
                "inline-flex rounded-full px-3 py-1 text-xs font-bold",
                statusPill(row.status),
              )}
            >
              {row.status}
            </span>
          </div>
        </div>

        <div className="relative shrink-0">
          <button
            type="button"
            onClick={onToggleMenu}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl hover:bg-slate-50"
            aria-label="Open actions"
          >
            <MoreVertical className="h-4 w-4 text-slate-700" />
          </button>

          <ActionsMenu open={open} onClose={onCloseMenu} />
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Active Seats</p>
          <p className="mt-1 font-semibold text-slate-900">{row.seats}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Monthly Price</p>
          <p className="mt-1 font-semibold text-slate-900">
            {row.monthlyPrice}
          </p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Billing Cycle</p>
          <p className="mt-1 font-medium text-slate-900">{row.billingCycle}</p>
        </div>

        <div className="rounded-xl bg-slate-50 p-3">
          <p className="text-slate-500">Next Billing</p>
          <p className="mt-1 font-medium text-slate-700">
            {row.nextBillingDate}
          </p>
        </div>
      </div>
    </div>
  );
}

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
      <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
        Active Subscriptions
      </h2>

      {/* mobile cards */}
      <div className="mt-4 space-y-4 lg:hidden">
        {rows.length ? (
          rows.map((r) => {
            const key = `${r.brokerCompany}:${r.plan}`;
            const open = menuKey === key;

            return (
              <MobileSubscriptionCard
                key={key}
                row={r}
                open={open}
                onToggleMenu={() => setMenuKey((k) => (k === key ? null : key))}
                onCloseMenu={() => setMenuKey(null)}
              />
            );
          })
        ) : (
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-10 text-center text-sm text-slate-500">
            No subscriptions found.
          </div>
        )}

        <div className="px-1 text-sm text-slate-400">
          Showing {rows.length} results
        </div>
      </div>

      {/* desktop table */}
      <div className="mt-4 hidden overflow-hidden rounded-2xl border border-slate-200 bg-white lg:block">
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

              {!rows.length && (
                <tr>
                  <td
                    colSpan={9}
                    className="px-4 py-12 text-center text-sm text-slate-500"
                  >
                    No subscriptions found.
                  </td>
                </tr>
              )}
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
