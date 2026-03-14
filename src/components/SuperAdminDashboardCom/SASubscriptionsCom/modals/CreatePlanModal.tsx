// src/components/SuperAdminDashboardCom/SASubscriptionsCom/modals/CreatePlanModal.tsx
import React, { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import type {
  PlanCard,
  PlanName,
} from "../../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";
import { useEscClose } from "@/hooks/useEscClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { cn } from "@/hooks/useCn";

function Field({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label
        htmlFor={htmlFor}
        className="block text-sm font-medium text-[#000000]"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "h-11 w-full rounded-lg px-3 text-sm " +
  "bg-[#F3F3F5] text-[#000000] placeholder:text-slate-400 ";

const DEFAULT_PLAN: PlanCard = {
  name: "",
  monthly: 0,
  yearly: 0,
  includedSeats: 0,
  additionalSeat: 0,
  maxActiveDeals: "Standard",
  features: ["Access to CRM", "Custom Reporting", "Email Support"],
  popular: false,
};

export function CreatePlanModal({
  open,
  onClose,
  onCreate,
}: {
  open: boolean;
  onClose: () => void;
  onCreate: (next: PlanCard) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const modalTitleId = useId();

  useEscClose(open, onClose);
  useLockBodyScroll(open);

  const [draft, setDraft] = useState<PlanCard>(DEFAULT_PLAN);

  useEffect(() => {
    if (open) setDraft(DEFAULT_PLAN);
  }, [open]);

  // focus for accessibility
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open) return null;

  const set = <K extends keyof PlanCard>(k: K, v: PlanCard[K]) =>
    setDraft((d) => ({ ...d, [k]: v }));

  return (
    <div className="fixed inset-0 z-200">
      {/* Backdrop (click to close) */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div className="absolute inset-0 flex items-end justify-center p-0 md:items-center md:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          tabIndex={-1}
          className="w-full max-h-[92vh] overflow-hidden rounded-t-3xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] outline-none md:max-w-2xl md:rounded-lg"
        >
          <div className="flex items-start justify-between gap-4 px-4 pt-4 md:px-6 md:pt-6">
            <h2
              id={modalTitleId}
              className="text-xl font-semibold tracking-tight text-[#000000]"
            >
              Create New Plan
            </h2>

            <button
              type="button"
              onClick={onClose}
              className="text-black cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>

          {/* Scroll area */}
          <div className="max-h-[calc(92vh-170px)] overflow-y-auto md:max-h-[calc(92vh-190px)] px-4 pt-4 pb-4 md:px-6 md:pt-4 md:pb-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6">
              <div className="md:col-span-2">
                <Field label="Plan Name" htmlFor="plan_name">
                  <input
                    id="plan_name"
                    value={draft.name}
                    onChange={(e) => set("name", e.target.value as PlanName)}
                    placeholder="e.g. Pro, Enterprise, etc."
                    className={inputBase}
                  />
                </Field>
              </div>

              <Field label="Monthly Price ($)" htmlFor="plan_monthly">
                <input
                  id="plan_monthly"
                  value={draft.monthly || ""}
                  onChange={(e) => set("monthly", Number(e.target.value || 0))}
                  className={inputBase}
                  placeholder="0"
                  type="number"
                />
              </Field>

              <Field label="Yearly Price ($)" htmlFor="plan_yearly">
                <input
                  id="plan_yearly"
                  value={draft.yearly || ""}
                  onChange={(e) => set("yearly", Number(e.target.value || 0))}
                  className={inputBase}
                  placeholder="0"
                  type="number"
                />
              </Field>

              <Field label="Included Seats" htmlFor="plan_included_seats">
                <input
                  id="plan_included_seats"
                  value={draft.includedSeats || ""}
                  onChange={(e) =>
                    set("includedSeats", Number(e.target.value || 0))
                  }
                  className={inputBase}
                  placeholder="0"
                  type="number"
                />
              </Field>

              <Field
                label="Price Per Additional Seat ($)"
                htmlFor="plan_additional_seat"
              >
                <input
                  id="plan_additional_seat"
                  value={draft.additionalSeat || ""}
                  onChange={(e) =>
                    set("additionalSeat", Number(e.target.value || 0))
                  }
                  className={inputBase}
                  placeholder="0"
                  type="number"
                />
              </Field>

              <Field label="Max Active Deals" htmlFor="plan_max_deals">
                <input
                  id="plan_max_deals"
                  value={String(draft.maxActiveDeals)}
                  onChange={(e) => set("maxActiveDeals", e.target.value)}
                  placeholder="e.g. 50, Unlimited"
                  className={inputBase}
                />
              </Field>

              <div className="flex items-center gap-3 py-2 md:col-span-2">
                <button
                  type="button"
                  onClick={() => set("popular", !draft.popular)}
                  className={cn(
                    "flex h-5 w-10 shrink-0 cursor-pointer items-center rounded-full px-0.5 transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-500",
                    draft.popular ? "bg-[#155DFC]" : "bg-slate-200",
                  )}
                >
                  <div
                    className={cn(
                      "h-4 w-4 transform rounded-full bg-white transition-transform",
                      draft.popular ? "translate-x-5" : "translate-x-0",
                    )}
                  />
                </button>
                <span className="text-sm font-medium text-slate-700">
                  Mark as Most Popular
                </span>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-4 pt-2 pb-8 md:px-6 md:pb-6">
            <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-end md:gap-4">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  onCreate(draft);
                  onClose();
                }}
                disabled={!draft.name}
                className="rounded-lg bg-[#070A1A] px-4 py-2 text-sm font-medium text-white hover:opacity-95 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
