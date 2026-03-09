// src/components/BrokerDashboardCom/BOverivewCom/CrmIntegrationCard.tsx
import { RefreshCcw, Share2 } from "lucide-react";
import { cn } from "@/hooks/useCn";

type CrmIntegrationCardProps = {
  crmStatus: "operational" | "syncing";
  lastSync: string;
  onRefresh: () => void;
};

export default function CrmIntegrationCard({
  crmStatus,
  lastSync,
  onRefresh,
}: CrmIntegrationCardProps) {
  return (
    <section className="rounded-2xl border border-[#D9E7F2] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <Share2 className="h-4.5 w-4.5 text-[#8A8A8A]" />
          <h2 className="text-[18px] font-medium text-[#222]">
            CRM Integration
          </h2>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          className="text-[#8A8A8A] transition hover:text-[#222]"
        >
          <RefreshCcw
            className={cn("h-4 w-4", crmStatus === "syncing" && "animate-spin")}
          />
        </button>
      </div>

      <div className="mt-6 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-[20px] font-semibold text-white">
          S
        </div>

        <div>
          <h3 className="text-[18px] font-medium leading-none text-[#181818]">
            Salesforce Enterprise
          </h3>
          <p className="mt-1 text-[12px] text-[#8D8D8D]">
            api integration v2.4.1
          </p>
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-[#9FD1AA] bg-[#EEF7F0] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-[#4B9961]">
            <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#4B9961]">
              <div className="h-1.5 w-1.5 rounded-full bg-[#4B9961]" />
            </div>
            <span className="text-[13px] font-medium">
              {crmStatus === "syncing" ? "syncing" : "operational"}
            </span>
          </div>

          <div className="h-2.5 w-2.5 rounded-full bg-[#2E9A4D]" />
        </div>
      </div>

      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#8A8A8A]">auto-sync referrals</span>
          <span className="font-medium text-[#222]">Enabled</span>
        </div>
        <div className="flex items-center justify-between text-[14px]">
          <span className="text-[#8A8A8A]">last sync</span>
          <span className="font-medium text-[#222]">{lastSync}</span>
        </div>
      </div>

      <div className="mt-6 text-center text-[13px] text-[#4B9961]">
        sync type: two-way sync enabled
      </div>
    </section>
  );
}
