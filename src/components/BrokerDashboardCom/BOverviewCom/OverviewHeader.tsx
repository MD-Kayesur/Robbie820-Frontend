// src/components/BrokerDashboardCom/BOverivewCom/OverviewHeader.tsx
import { Bell, Search } from "lucide-react";

type OverviewHeaderProps = {
  search: string;
  onSearchChange: (value: string) => void;
};

export default function OverviewHeader({
  search,
  onSearchChange,
}: OverviewHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div>
        <h1 className="text-xl font-medium leading-none text-[#111827]">
          Broker Dashboard
        </h1>
        <p className="mt-1 text-[14px] text-[#9CA3AF]">
          overview of your referral pipeline and performance
        </p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-full sm:w-65 lg:w-75">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A8A8]" />
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="search referrals..."
            className="h-11 w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-4 text-[13px] text-[#333] outline-none placeholder:text-[#B8B8B8]"
          />
        </div>

        <button
          type="button"
          className="relative inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#444]"
        >
          <span className="sr-only">Notifications</span>
          <Bell size={24} />
        </button>
      </div>
    </div>
  );
}
