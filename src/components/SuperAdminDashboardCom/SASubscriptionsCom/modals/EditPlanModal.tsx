// src/pages/SuperAdmin/SubscriptionsCom/modals/EditPlanModal.tsx
import React, { useEffect, useId, useRef, useState } from "react";
import { X } from "lucide-react";
import type { PlanCard, PlanName } from "../types";
import { useEscClose, useLockBodyScroll } from "../utils";

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
        className="block text-sm font-semibold text-[#000000] sm:text-base"
      >
        {label}
      </label>
      {children}
    </div>
  );
}

const inputBase =
  "h-12 sm:h-14 w-full rounded-2xl px-4 sm:px-5 text-sm sm:text-base " +
  "bg-slate-100/70 text-[#000000] placeholder:text-[#000000] " +
  "outline-none ring-1 ring-slate-200 focus:ring-2 focus:ring-slate-300";

export function EditPlanModal({
  open,
  onClose,
  plan,
  onSave,
}: {
  open: boolean;
  onClose: () => void;
  plan: PlanCard | null;
  onSave: (next: PlanCard) => void;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const modalTitleId = useId();

  useEscClose(open, onClose);
  useLockBodyScroll(open);

  const [draft, setDraft] = useState<PlanCard | null>(plan);

  useEffect(() => {
    if (open) setDraft(plan);
  }, [open, plan]);

  // focus for accessibility
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => panelRef.current?.focus(), 0);
    return () => window.clearTimeout(t);
  }, [open]);

  if (!open || !draft) return null;

  const set = <K extends keyof PlanCard>(k: K, v: PlanCard[K]) =>
    setDraft((d) => (d ? { ...d, [k]: v } : d));

  return (
    <div className="fixed inset-0 z-200">
      {/* Backdrop (click to close) */}
      <button
        type="button"
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      <div className="absolute inset-0 flex items-end justify-center p-0 sm:items-center sm:p-6">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={modalTitleId}
          tabIndex={-1}
          className="w-full max-h-[92vh] overflow-hidden rounded-t-3xl bg-white shadow-[0_30px_90px_rgba(0,0,0,0.45)] outline-none sm:max-w-5xl sm:rounded-3xl"
        >
          <div className="flex items-start justify-between gap-4 px-4 py-4 sm:px-10 sm:py-6">
            <div className="min-w-0">
              <h2
                id={modalTitleId}
                className="truncate text-xl font-semibold tracking-tight text-[#000000] sm:text-4xl"
              >
                Edit Plan - {draft.name}
              </h2>
              <p className="mt-1 text-xs font-medium text-slate-500 sm:text-sm">
                Update pricing and limits, then save changes.
              </p>
            </div>

            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-600 hover:bg-slate-50 cursor-pointer"
              aria-label="Close"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </div>

          {/* Scroll area */}
          <div className="max-h-[calc(92vh-170px)] overflow-y-auto px-4 pb-5 sm:max-h-[calc(92vh-190px)] sm:px-10 sm:pb-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
              <Field label="Plan Name" htmlFor="plan_name">
                <input
                  id="plan_name"
                  value={draft.name}
                  onChange={(e) => set("name", e.target.value as PlanName)}
                  className={inputBase}
                />
              </Field>

              <div className="hidden sm:block" />

              <Field label="Monthly Price ($)" htmlFor="plan_monthly">
                <input
                  id="plan_monthly"
                  value={draft.monthly}
                  onChange={(e) => set("monthly", Number(e.target.value || 0))}
                  className={inputBase}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Yearly Price ($)" htmlFor="plan_yearly">
                <input
                  id="plan_yearly"
                  value={draft.yearly}
                  onChange={(e) => set("yearly", Number(e.target.value || 0))}
                  className={inputBase}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Included Seats" htmlFor="plan_included_seats">
                <input
                  id="plan_included_seats"
                  value={draft.includedSeats}
                  onChange={(e) =>
                    set("includedSeats", Number(e.target.value || 0))
                  }
                  className={inputBase}
                  inputMode="numeric"
                />
              </Field>

              <Field
                label="Price Per Additional Seat ($)"
                htmlFor="plan_additional_seat"
              >
                <input
                  id="plan_additional_seat"
                  value={draft.additionalSeat}
                  onChange={(e) =>
                    set("additionalSeat", Number(e.target.value || 0))
                  }
                  className={inputBase}
                  inputMode="numeric"
                />
              </Field>

              <Field label="Max Active Deals" htmlFor="plan_max_deals">
                <input
                  id="plan_max_deals"
                  value={String(draft.maxActiveDeals)}
                  onChange={(e) => set("maxActiveDeals", e.target.value)}
                  className={inputBase}
                />
              </Field>

              {/* keeping your original field (even though it reuses maxActiveDeals) */}
              <Field label="Max Referrers" htmlFor="plan_max_referrers">
                <input
                  id="plan_max_referrers"
                  value={String(draft.maxActiveDeals)}
                  onChange={(e) => set("maxActiveDeals", e.target.value)}
                  className={inputBase}
                />
              </Field>
            </div>
          </div>

          {/* Footer (responsive + no cut buttons) */}
          <div className="border-t border-slate-200 px-4 pt-4 pb-8 sm:px-10">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
              <button
                type="button"
                onClick={onClose}
                className="h-11 w-full rounded-2xl border border-slate-200 bg-white px-6 text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer sm:h-12 sm:w-auto sm:px-8 sm:text-base"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={() => {
                  onSave(draft);
                  onClose();
                }}
                className="h-11 w-full rounded-2xl bg-[#070A1A] px-6 text-sm font-semibold text-white hover:opacity-95 cursor-pointer sm:h-12 sm:w-auto sm:px-8 sm:text-base"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
