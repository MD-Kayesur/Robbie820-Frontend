// src/components/SuperAdminDashboardCom/SASettingsCom/SeatPricingTab.tsx

import React, { useMemo, useState } from "react";
import { Info } from "lucide-react";
import { SeatPricingSettings } from "@/pages/SuperAdminDashboard/SuperAdminSettings/types";
import {
  seatPricingMock,
  seatPricingPreviewMock,
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
    <div className="flex items-start justify-between gap-4 border-t border-slate-100 py-4">
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

export default function SeatPricingTab() {
  const [s, setS] = useState<SeatPricingSettings>(seatPricingMock);

  const preview = useMemo(() => {
    const base = seatPricingPreviewMock.basePlanPriceMonthly;
    const included = s.includedSeatsPerPlan;
    const price = s.pricePerAdditionalSeat;
    const totalSeats = seatPricingPreviewMock.totalSeatsExample;

    const additionalSeats = Math.max(0, totalSeats - included);
    const total = base + additionalSeats * price;

    return { base, included, price, totalSeats, additionalSeats, total };
  }, [s]);

  return (
    <div className="space-y-5.5">
      {/* Worker Seat Configuration */}
      <div className="rounded-2xl border border-slate-200 bg-white">
        {/* Header */}
        <div className="p-5.5">
          <h2 className="text-base font-semibold text-black">
            Broker Seat Configuration
          </h2>
        </div>

        {/* Body */}
        <div className="px-5.5">
          <div className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Included Seats Per Plan{" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <input
                value={s.includedSeatsPerPlan}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    includedSeatsPerPlan: Number(e.target.value || 0),
                  }))
                }
                type="number"
                step="1"
                className="mt-2 py-2 w-full max-w-xs rounded-xl bg-[#F3F3F5] px-3 text-sm text-black"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-xs font-medium text-slate-700">
                Price Per Additional Seat ($){" "}
                <Info className="h-4 w-4 text-slate-400" />
              </label>
              <input
                value={s.pricePerAdditionalSeat}
                onChange={(e) =>
                  setS((p) => ({
                    ...p,
                    pricePerAdditionalSeat: Number(e.target.value || 0),
                  }))
                }
                type="number"
                step="1"
                className="mt-2 py-2 w-full max-w-xs rounded-xl bg-[#F3F3F5] px-3 text-sm text-black"
              />
            </div>
          </div>

          <div className="mt-6">
            <Row
              label="Allow Seat Downgrade Mid-Cycle"
              right={
                <Toggle
                  value={s.allowSeatDowngradeMidCycle}
                  onChange={(v) =>
                    setS((p) => ({ ...p, allowSeatDowngradeMidCycle: v }))
                  }
                />
              }
            />
            <Row
              label="Prorate Additional Seats"
              right={
                <Toggle
                  value={s.prorateAdditionalSeats}
                  onChange={(v) =>
                    setS((p) => ({ ...p, prorateAdditionalSeats: v }))
                  }
                />
              }
            />
          </div>
        </div>
      </div>

      {/* Preview */}
      <div className="rounded-2xl border border-[#B9F8CF] bg-[#F0FDF4]">
        {/* Header */}
        <div className="px-5.5 pt-5.5 inter">
          <h3 className="text-base font-semibold text-slate-900">
            Pricing Logic Preview
          </h3>
        </div>

        {/* Body */}
        <div className="p-5.5">
          <div className="rounded-2xl bg-white px-5 py-4">
            <div className="grid grid-cols-2 gap-y-2 text-sm inter">
              <p className="text-slate-500">Base Plan:</p>
              <p className="text-right font-semibold text-slate-900">
                ${preview.base} / month
              </p>

              <p className="text-slate-500">Included Seats:</p>
              <p className="text-right font-semibold text-slate-900">
                {preview.included}
              </p>

              <p className="text-slate-500">Additional Seat Price:</p>
              <p className="text-right font-semibold text-slate-900">
                ${preview.price} per seat
              </p>
            </div>

            {/* horizontal separator */}
            <div className="mt-4 h-px bg-slate-200" />

            <div className="mt-4 rounded-xl border border-slate-200 bg-[#F9FAFB] px-4 py-3">
              <p className="text-xs font-bold text-slate-900 inter">
                Example: {preview.totalSeats} Seats Total
              </p>
              <div className="mt-2 grid grid-cols-2 gap-y-1 text-sm consolas">
                <p className="text-slate-500">Base Plan:</p>
                <p className="text-right text-slate-900">${preview.base}</p>

                <p className="text-slate-500">
                  Additional Seats ({preview.additionalSeats}):
                </p>
                <p className="text-right text-slate-900">
                  ${(preview.additionalSeats * preview.price).toLocaleString()}
                </p>
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-slate-200 pt-3 consolas">
                <p className="text-sm font-bold text-slate-900">Total:</p>
                <p className="text-sm font-black text-emerald-600">
                  ${preview.total.toLocaleString()} / month
                </p>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500 inter">
              Calculation: ${preview.base} + ({preview.additionalSeats} x $
              {preview.price}) = ${preview.total}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
