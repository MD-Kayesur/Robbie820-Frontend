// src/components/SuperAdminDashboardCom/SASettingsCom/CommissionDefaultsTab.tsx

import React, { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { CommissionSettings } from "@/pages/SuperAdminDashboard/SuperAdminSettings/types";
import {
  commissionDefaultsMock,
  commissionPreviewMock,
} from "@/pages/SuperAdminDashboard/SuperAdminSettings/mock";
import { Toggle } from "@/hooks/useToggle";

function Row({
  label,
  hint,
  right,
}: {
  label: string;
  hint?: string;
  right: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-t border-slate-100 py-4 md:flex-row md:items-start md:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm text-slate-900">{label}</p>
          <Info className="h-4 w-4 text-slate-400" />
        </div>
        {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  );
}

export default function CommissionDefaultsTab() {
  const [s, setS] = useState<CommissionSettings>(commissionDefaultsMock);

  const preview = useMemo(() => {
    const loan = commissionPreviewMock.loanAmount;
    const baseRate = s.defaultBankCommissionRatePct / 100;
    const gst = s.defaultGstMultiplier;
    const agg = s.defaultAggregatorFactor;
    const ref = s.defaultReferralCommissionPct / 100;
    const commission = loan * baseRate * gst * agg * ref;

    const formula = `(${loan.toLocaleString()} x ${baseRate.toFixed(4)} x ${gst} x ${agg} x ${ref.toFixed(
      2,
    )})`;

    return { loan, baseRate, gst, agg, ref, commission, formula };
  }, [s]);

  return (
    <div className="space-y-5">
      {/* Commission Engine */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="p-4 md:p-5.5">
          <h2 className="text-base font-semibold text-black">
            Commission Engine Settings
          </h2>
        </div>

        <div className="px-4 pb-4 md:px-5.5 md:pb-5.5">
          <div className="space-y-5">
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Default Bank Commission Rate (%){" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <input
                value={s.defaultBankCommissionRatePct}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    defaultBankCommissionRatePct: Number(e.target.value || 0),
                  }))
                }
                type="number"
                step="0.01"
                className="mt-2 w-full rounded-xl bg-[#F3F3F5] px-3 py-2 text-sm text-black md:max-w-xs"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Default GST Multiplier{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <input
                value={s.defaultGstMultiplier}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    defaultGstMultiplier: Number(e.target.value || 0),
                  }))
                }
                type="number"
                step="0.01"
                className="mt-2 w-full rounded-xl bg-[#F3F3F5] px-3 py-2 text-sm text-black md:max-w-xs"
              />
              <p className="mt-1 text-xs text-slate-500">
                Example: 1.1 for 10% GST
              </p>
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Default Aggregator Factor{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <input
                value={s.defaultAggregatorFactor}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    defaultAggregatorFactor: Number(e.target.value || 0),
                  }))
                }
                type="number"
                step="0.01"
                className="mt-2 w-full rounded-xl bg-[#F3F3F5] px-3 py-2 text-sm text-black md:max-w-xs"
              />
              <p className="mt-1 text-xs text-slate-500">
                If 5% aggregator fee → 0.95 multiplier
              </p>
            </div>
          </div>

          <div className="mt-6">
            <Row
              label="Allow Broker Override"
              right={
                <Toggle
                  value={s.allowBrokerOverride}
                  onChange={(v) =>
                    setS((p) => ({ ...p, allowBrokerOverride: v }))
                  }
                />
              }
            />
            <Row
              label="Allow Fixed Amount Commission Option"
              right={
                <Toggle
                  value={s.allowFixedAmountCommissionOption}
                  onChange={(v) =>
                    setS((p) => ({ ...p, allowFixedAmountCommissionOption: v }))
                  }
                />
              }
            />
            <div className="border-t border-slate-100 py-4">
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Default Referral Commission Percentage (%){" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <input
                value={s.defaultReferralCommissionPct}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    defaultReferralCommissionPct: Number(e.target.value || 0),
                  }))
                }
                type="number"
                step="1"
                className="mt-2 w-full rounded-xl bg-[#F3F3F5] px-3 py-2 text-sm text-black md:max-w-xs"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-[#BEDBFF] bg-[#EFF6FF]">
        <div className="px-4 pt-4 inter md:px-5.5 md:pt-5.5">
          <h3 className="text-base font-semibold text-slate-900">
            Example Calculation Preview
          </h3>
        </div>

        <div className="p-4 consolas md:p-5.5">
          <div className="rounded-2xl border border-slate-200 bg-white px-4 py-4 md:px-5">
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <p className="text-[#4A5565]">Loan Amount:</p>
              <p className="text-right font-bold text-[#101828]">
                ${preview.loan.toLocaleString()}
              </p>

              <p className="text-[#4A5565]">Base Rate:</p>
              <p className="text-right font-bold text-[#101828]">
                {s.defaultBankCommissionRatePct}%
              </p>

              <p className="text-[#4A5565]">GST Multiplier:</p>
              <p className="text-right font-bold text-[#101828]">
                {preview.gst}
              </p>

              <p className="text-[#4A5565]">Aggregator Factor:</p>
              <p className="text-right font-bold text-[#101828]">
                {preview.agg}
              </p>

              <p className="text-[#4A5565]">Referral %:</p>
              <p className="text-right font-bold text-[#101828]">
                {s.defaultReferralCommissionPct}%
              </p>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4 border-t border-slate-200 pt-4">
              <p className="text-sm font-bold text-slate-900">
                Calculated Commission:
              </p>
              <p className="text-sm font-bold text-[#00A63E]">
                ${Math.round(preview.commission).toLocaleString()}
              </p>
            </div>
          </div>
          <p className="mt-3 wrap-break-word text-xs text-slate-500 inter">
            Formula: {preview.formula} = $
            {Math.round(preview.commission).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}
