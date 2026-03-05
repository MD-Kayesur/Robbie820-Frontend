// src/components/SuperAdminDashboardCom/SASettingsCom/SystemBehaviorTab.tsx

import React, { useMemo, useState } from "react";
import { Check, ChevronDown, Info } from "lucide-react";
import { SystemBehaviorSettings } from "@/pages/SuperAdminDashboard/SuperAdminSettings/types";
import { systemBehaviorMock } from "@/pages/SuperAdminDashboard/SuperAdminSettings/mock";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { Toggle } from "@/hooks/useToggle";
import { cn } from "@/hooks/useCn";

function Row({ label, right }: { label: string; right: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 border-t border-slate-100 py-4">
      <div className="min-w-0">
        <p className="text-sm font-semibold text-slate-900">{label}</p>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

type DDOption<V extends string> = { value: V; label: string };

function DropdownSelect<V extends string>({
  labelId,
  value,
  onChange,
  options,
  className,
  menuClassName,
}: {
  labelId?: string;
  value: V;
  onChange: (v: V) => void;
  options: Array<DDOption<V>>;
  className?: string;
  menuClassName?: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const selectedLabel = useMemo(
    () => options.find((o) => o.value === value)?.label ?? "",
    [options, value],
  );

  return (
    <div ref={wrapRef} className="relative w-full max-w-sm">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-labelledby={labelId}
        onClick={() => setOpen((p) => !p)}
        className={cn(
          "w-full rounded-xl px-4 py-3 text-left text-sm text-black",
          "bg-[#F3F3F5] ring-1 ring-transparent hover:ring-slate-200",
          "outline-none focus:ring-slate-300",
          "flex items-center justify-between gap-3",
          className,
        )}
      >
        <span className="truncate">{selectedLabel}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-slate-500 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div
          role="listbox"
          tabIndex={-1}
          className={cn(
            "absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden",
            "rounded-2xl border border-slate-200 bg-white shadow-xl",
            "p-2",
            menuClassName,
          )}
        >
          {options.map((opt) => {
            const active = opt.value === value;
            return (
              <button
                key={opt.value}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => {
                  onChange(opt.value);
                  setOpen(false);
                }}
                className={cn(
                  "w-full rounded-xl px-3 py-2.5 text-left text-sm",
                  "flex items-center justify-between gap-3",
                  active
                    ? "bg-slate-100 text-slate-900"
                    : "text-slate-900 hover:bg-slate-50",
                )}
              >
                <span className="truncate">{opt.label}</span>
                {active ? (
                  <Check className="h-4 w-4 text-slate-700" />
                ) : (
                  <span className="h-4 w-4" />
                )}
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------ page ------------------------------ */
export default function SystemBehaviorTab() {
  const [s, setS] = useState<SystemBehaviorSettings>(systemBehaviorMock);

  const paymentRuleOptions = useMemo(
    () =>
      [
        {
          value: "end_of_month_following_settlement",
          label: "End of month following settlement date",
        },
        { value: "weekly_after_settlement", label: "Weekly after settlement" },
        {
          value: "immediate_after_settlement",
          label: "Immediate after settlement",
        },
      ] as const,
    [],
  );

  const suspensionRuleOptions = useMemo(
    () =>
      [
        {
          value: "suspend_after_3_failed",
          label: "Suspend after 3 failed payment",
        },
        {
          value: "suspend_after_5_failed",
          label: "Suspend after 5 failed payment",
        },
        { value: "never_suspend", label: "Never suspend automatically" },
      ] as const,
    [],
  );

  return (
    <div className="space-y-5.5 inter">
      {/* Operational Settings */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="p-5.5">
          <h2 className="text-base font-semibold text-black">
            Operational Settings
          </h2>
        </div>

        {/* Content */}
        <div className="px-5.5 pb-5.5">
          <div className="space-y-4">
            {/* Default Expected Referrer Payment Rule */}
            <div>
              <label
                id="paymentRuleLabel"
                className="flex items-center gap-2 text-xs font-medium text-slate-700"
              >
                Default Expected Referrer Payment Rule{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>

              <div className="mt-2">
                <DropdownSelect
                  labelId="paymentRuleLabel"
                  value={s.defaultExpectedReferrerPaymentRule}
                  onChange={(v) =>
                    setS((p) => ({
                      ...p,
                      defaultExpectedReferrerPaymentRule: v,
                    }))
                  }
                  options={paymentRuleOptions as any}
                />
              </div>
            </div>

            {/* Overdue Commission Reminder */}
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Overdue Commission Reminder{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <div className="mt-2 flex max-w-md items-center gap-3">
                <input
                  value={s.overdueCommissionReminderDays}
                  onChange={(e) =>
                    setS((p) => ({
                      ...p,
                      overdueCommissionReminderDays: Number(
                        e.target.value || 0,
                      ),
                    }))
                  }
                  type="number"
                  step="1"
                  className="h-11 max-w-xs rounded-xl bg-[#F3F3F5] px-4 text-sm text-black outline-none ring-1 ring-transparent focus:ring-slate-300"
                />
                <p className="text-sm text-slate-500">
                  days after expected date
                </p>
              </div>
            </div>
          </div>

          {/* Default Subscription Auto-Renew */}
          <div className="mt-6">
            <Row
              label="Default Subscription Auto-Renew"
              right={
                <Toggle
                  value={s.defaultSubscriptionAutoRenew}
                  onChange={(v) =>
                    setS((p) => ({ ...p, defaultSubscriptionAutoRenew: v }))
                  }
                />
              }
            />

            {/* Failed Payment Grace Period */}
            <div className="border-t border-slate-100 py-4">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Failed Payment Grace Period{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <div className="mt-2 flex max-w-md items-center gap-3">
                <input
                  value={s.failedPaymentGracePeriodDays}
                  onChange={(e) =>
                    setS((p) => ({
                      ...p,
                      failedPaymentGracePeriodDays: Number(e.target.value || 0),
                    }))
                  }
                  type="number"
                  step="1"
                  className="h-11 w-28 rounded-xl bg-[#F3F3F5] px-4 text-sm text-black outline-none ring-1 ring-transparent focus:ring-slate-300"
                />
                <p className="text-sm text-slate-500">days</p>
              </div>
            </div>

            {/* Account Suspension Rule */}
            <div className="border-t border-slate-100 py-4">
              <label
                id="suspensionRuleLabel"
                className="flex items-center gap-2 text-xs font-medium text-slate-700"
              >
                Account Suspension Rule{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>

              <div className="mt-2">
                <DropdownSelect
                  labelId="suspensionRuleLabel"
                  value={s.accountSuspensionRule}
                  onChange={(v) =>
                    setS((p) => ({ ...p, accountSuspensionRule: v }))
                  }
                  options={suspensionRuleOptions as any}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Rules */}
      <div className="rounded-2xl border border-[#BEDBFF] bg-[#EFF6FF] px-6 py-4">
        <p className="text-sm text-[#1C398E]">
          <span className="font-bold">Important:</span> Changes to payment and
          suspension rules will apply to all new transactions going forward.
        </p>
      </div>
    </div>
  );
}
