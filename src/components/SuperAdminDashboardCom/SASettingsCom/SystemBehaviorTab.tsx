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
    <div className="flex flex-col gap-3 border-t border-slate-100 py-4 sm:flex-row sm:items-start sm:justify-between">
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
          "flex w-full items-center justify-between gap-3 rounded-xl bg-[#F3F3F5] px-4 py-3 text-left text-sm text-black",
          "ring-1 ring-transparent outline-none hover:ring-slate-200 focus:ring-slate-300",
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
            "absolute left-0 top-[calc(100%+8px)] z-50 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-xl",
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
                  "flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm",
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
    <div className="space-y-5 inter">
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="p-4 sm:p-5.5">
          <h2 className="text-base font-semibold text-black">
            Operational Settings
          </h2>
        </div>

        <div className="px-4 pb-4 sm:px-5.5 sm:pb-5.5">
          <div className="space-y-4">
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

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Overdue Commission Reminder{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:max-w-md sm:items-center sm:gap-3">
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
                  className="h-11 w-full rounded-xl bg-[#F3F3F5] px-4 text-sm text-black outline-none ring-1 ring-transparent focus:ring-slate-300 sm:max-w-xs"
                />
                <p className="text-sm text-slate-500">
                  days after expected date
                </p>
              </div>
            </div>
          </div>

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

            <div className="border-t border-slate-100 py-4">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Failed Payment Grace Period{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:max-w-md sm:items-center sm:gap-3">
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
                  className="h-11 w-full rounded-xl bg-[#F3F3F5] px-4 text-sm text-black outline-none ring-1 ring-transparent focus:ring-slate-300 sm:w-28"
                />
                <p className="text-sm text-slate-500">days</p>
              </div>
            </div>

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

      <div className="rounded-2xl border border-[#BEDBFF] bg-[#EFF6FF] px-4 py-4 sm:px-6">
        <p className="text-sm text-[#1C398E]">
          <span className="font-bold">Important:</span> Changes to payment and
          suspension rules will apply to all new transactions going forward.
        </p>
      </div>
    </div>
  );
}
