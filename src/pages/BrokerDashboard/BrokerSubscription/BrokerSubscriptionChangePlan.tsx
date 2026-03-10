import { useMemo, useState } from "react";
import { ArrowLeft, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

import { cn } from "@/hooks/useCn";
import { pricingPlansMock } from "./mock";
import type { BillingCycle, PricingPlan, SubscriptionPlanKey } from "./types";

type ChangePlanRouteState = {
  selectedPlanId?: SubscriptionPlanKey;
  selectedCycle?: BillingCycle;
};

const BrokerSubscriptionChangePlan = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const routeState = (location.state as ChangePlanRouteState | null) ?? null;

  const [cycle, setCycle] = useState<BillingCycle>(
    routeState?.selectedCycle ?? "monthly",
  );

  const currentPlanId = routeState?.selectedPlanId ?? "professional";

  const plans = useMemo(() => pricingPlansMock, []);

  const handleSelectPlan = (planId: SubscriptionPlanKey) => {
    navigate("/broker-dashboard/subscription", {
      state: {
        selectedPlanId: planId,
        selectedCycle: cycle,
      } satisfies ChangePlanRouteState,
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#D1D5DB] text-[#6B7280] transition hover:bg-slate-50"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-lg font-medium text-[#111827]">Change Plan</h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Choose the plan that fits your business.
          </p>
        </div>
      </div>

      <section className="rounded-3xl border border-[#D1D5DB] bg-white p-4 shadow-[0_30px_90px_rgba(0,0,0,0.06)] sm:p-7">
        <div className="text-center">
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#0EA5E9] sm:text-[24px]">
            Choose Your Plan
          </h2>
          <p className="mt-2 text-[15px] text-[#111827] sm:text-[16px]">
            Monthly and yearly options are available.
          </p>

          <div className="mt-4 inline-flex rounded-full bg-[#F3F4F6] p-1">
            <button
              type="button"
              onClick={() => setCycle("monthly")}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-medium transition sm:px-6 sm:py-3",
                cycle === "monthly"
                  ? "bg-[#0EA5E9] text-white shadow-sm"
                  : "text-[#6B7280]",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => setCycle("yearly")}
              className={cn(
                "rounded-full px-4 py-2.5 text-sm font-medium transition sm:px-6 sm:py-3",
                cycle === "yearly"
                  ? "bg-[#0EA5E9] text-white shadow-sm"
                  : "text-[#6B7280]",
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 lg:mt-12 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              cycle={cycle}
              isCurrent={currentPlanId === plan.id}
              onSelect={handleSelectPlan}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

function PlanCard({
  plan,
  cycle,
  isCurrent,
  onSelect,
}: {
  plan: PricingPlan;
  cycle: BillingCycle;
  isCurrent: boolean;
  onSelect: (planId: SubscriptionPlanKey) => void;
}) {
  const planPrice = cycle === "monthly" ? plan.monthly : plan.yearly;

  return (
    <div
      className={cn(
        "relative rounded-2xl border bg-white p-4",
        plan.isPopular
          ? "border-[#0EA5E9] shadow-[0_0_0_1px_#0EA5E9]"
          : "border-[#D8EAF7]",
      )}
    >
      {plan.isPopular ? (
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316] px-3 py-1 text-[11px] font-medium text-white">
          MOST POPULAR
        </div>
      ) : null}

      <p className="text-[18px] text-[#8B5CF6]">{plan.name}</p>
      <p className="mt-3 text-[16px] text-[#111827]">{plan.tagline}</p>

      <div className="mt-5 flex items-end gap-1">
        <span className="text-[38px] font-semibold tracking-[-0.04em] text-[#111827] sm:text-[44px]">
          {planPrice.label}
        </span>
        {planPrice.suffix ? (
          <span className="mb-2 text-[12px] text-[#6B7280]">
            {planPrice.suffix}
          </span>
        ) : null}
      </div>

      <div className="mt-5 space-y-3">
        {plan.features.map((feature, index) => (
          <div
            key={`${plan.id}-${index}`}
            className="flex items-start gap-2 text-[14px] leading-5 text-[#6B7280]"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
            <span>{feature}</span>
          </div>
        ))}
      </div>

      <button
        type="button"
        disabled={isCurrent}
        onClick={() => onSelect(plan.id)}
        className={cn(
          "mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg px-4 text-sm font-medium transition",
          isCurrent
            ? "cursor-not-allowed bg-slate-200 text-slate-500"
            : "bg-[#0EA5E9] text-white hover:bg-sky-600",
        )}
      >
        {isCurrent ? "Current Plan" : plan.ctaLabel}
      </button>
    </div>
  );
}

export default BrokerSubscriptionChangePlan;
