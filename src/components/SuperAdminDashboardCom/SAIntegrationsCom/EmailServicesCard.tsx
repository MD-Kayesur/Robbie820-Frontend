// src/components/SuperAdminDashboardCom/SAIntegrationsCom/EmailServicesCard.tsx
import { Mail, TrendingUp } from "lucide-react";

export function EmailServicesCard() {
  return (
    <div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 md:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#DCFCE7]">
              <Mail className="h-5.5 w-5.5 text-[#00A63E]" />
            </div>
            <div className="min-w-0">
              <div className="font-semibold text-black">Email Delivery</div>
              <div className="text-[13px] text-[#666666]">
                SendGrid Integration
              </div>
            </div>
          </div>

          <span className="inline-flex items-center rounded-full border border-emerald-100 bg-[#DCFCE7] px-3 py-1 text-[13px] font-semibold text-[#1B7231]">
            Connected
          </span>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-[#F9FAFB] p-4">
            <div className="text-[13px] text-[#666666]">Emails Sent (24h)</div>
            <div className="mt-2 text-2xl font-bold text-black">8,547</div>
            <div className="mt-2 text-[13px] text-[#15D946]">
              <TrendingUp className="mr-1 inline-block h-3 w-3" />
              <span>+12% from yesterday</span>
            </div>
          </div>

          <div className="rounded-2xl bg-[#F9FAFB] p-4">
            <div className="text-[13px] text-[#666666]">Bounce Rate</div>
            <div className="mt-2 text-2xl font-bold text-black">1.2%</div>
            <div className="mt-2 text-[13px] text-[#666666]">
              Within acceptable range
            </div>
          </div>

          <div className="hidden h-px bg-slate-200 md:block" />
          <div className="hidden h-px bg-slate-200 md:block" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="mt-4">
            <div className="text-[13px] text-[#666666]">
              <div>Delivery Success</div>
              <div className="mt-2 text-2xl font-semibold text-[#00A63E]">
                98.8%
              </div>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-[13px] text-[#666666]">
              <div>Failed Emails</div>
              <div className="mt-2 text-2xl font-semibold text-[#E7000B]">
                103
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <button
          type="button"
          className="rounded-xl border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-800 hover:bg-slate-50"
        >
          View Logs
        </button>
        <button
          type="button"
          className="rounded-xl bg-[#070A1A] py-2 text-sm font-semibold text-white hover:opacity-95"
        >
          Test Email
        </button>
      </div>
    </div>
  );
}
