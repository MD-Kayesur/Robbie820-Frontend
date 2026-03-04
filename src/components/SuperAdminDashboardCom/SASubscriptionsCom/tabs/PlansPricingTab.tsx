// src/pages/SuperAdmin/SubscriptionsCom/tabs/PlansPricingTab.tsx
import React from "react";
import { Check, SquarePen } from "lucide-react";

import type { PlanCard } from "../../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";
import { cn } from "../utils";
import { EditPlanModal } from "../modals/EditPlanModal";

export function PlansPricingTab({
  plans,
  setPlans,
  editPlan,
  setEditPlan,
}: {
  plans: PlanCard[];
  setPlans: React.Dispatch<React.SetStateAction<PlanCard[]>>;
  editPlan: PlanCard | null;
  setEditPlan: React.Dispatch<React.SetStateAction<PlanCard | null>>;
}) {
  return (
    <div className="mt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">
          Available Plans
        </h2>
        <div className="text-sm text-[#4A5565]">
          Manage subscription tiers and pricing
        </div>
      </div>

      <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.name}
            className={cn(
              "relative flex h-full flex-col rounded-2xl border-2 bg-white px-4 pt-5 pb-10",
              p.popular
                ? "border-[#155DFC] shadow-[0_0_0_1px_rgba(59,130,246,0.15)]"
                : "border-slate-200",
            )}
          >
            {p.popular && (
              <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#155DFC] px-3 py-1 text-[10px] font-medium text-white">
                Most Popular
              </div>
            )}

            <div className="text-lg font-bold text-slate-900">{p.name}</div>

            <div className="mt-2 flex items-end gap-1">
              <div className="text-3xl font-bold text-slate-900">
                ${p.monthly}
              </div>
              <div className="pb-1 text-sm text-[#4A5565]">/month</div>
            </div>

            <div className="mt-2 text-xs text-[#4A5565]">
              or ${p.yearly}/year
            </div>

            <div className="mt-5 space-y-2 text-sm">
              <div className="flex items-center justify-between text-[#4A5565]">
                <span>Included Seats</span>
                <span className="font-semibold text-slate-900">
                  {p.includedSeats}
                </span>
              </div>
              <div className="flex items-center justify-between text-[#4A5565]">
                <span>Additional Seat</span>
                <span className="font-semibold text-slate-900">
                  ${p.additionalSeat}/mo
                </span>
              </div>
              <div className="flex items-center justify-between text-[#4A5565]">
                <span>Max Active Deals</span>
                <span className="font-semibold text-slate-900">
                  {p.maxActiveDeals}
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-slate-200 pt-4 pb-10 ">
              <div className="text-xs font-bold text-slate-900">Features:</div>
              <div className="mt-3 space-y-2">
                {p.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-2 text-sm text-slate-600"
                  >
                    <Check className="h-4 w-4 text-emerald-600" />
                    {f}
                  </div>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => setEditPlan(p)}
              className="mt-auto flex w-full items-center justify-center rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
            >
              <SquarePen className="mr-3 h-4 w-4" />
              Edit Plan
            </button>
          </div>
        ))}
      </div>

      <EditPlanModal
        open={!!editPlan}
        plan={editPlan}
        onClose={() => setEditPlan(null)}
        onSave={(next) =>
          setPlans((prev) => prev.map((p) => (p.name === next.name ? next : p)))
        }
      />
    </div>
  );
}
