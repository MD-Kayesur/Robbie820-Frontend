import { useState } from "react";
import { Calendar, Check, Filter, Plus } from "lucide-react";

import { cn } from "@/hooks/useCn";
import type {
  LeadStatus,
  RangeKey,
} from "../../../pages/BrokerDashboard/BrokerOverview/types";

type OverviewFiltersProps = {
  range: RangeKey;
  onRangeChange: (value: RangeKey) => void;
  statusFilter: LeadStatus | "ALL";
  onStatusChange: (value: LeadStatus | "ALL") => void;
  dateLabel: string;
  dateRange: {
    from: string;
    to: string;
  };
  onDateRangeChange: (value: { from: string; to: string }) => void;
  onApplyDate: () => void;
  onCreateLead: () => void;
};

const rangeOptions: RangeKey[] = ["monthly", "mtd", "fytd"];

const statusOptions: Array<LeadStatus | "ALL"> = [
  "ALL",
  "NEW LEAD",
  "CONTACTED",
  "APPLICATION IN PROGRESS",
  "SUBMITTED TO LENDER",
  "UNDER REVIEW",
  "APPROVED",
  "AWAITING REFERRAL FEE",
  "FUNDED",
  "SETTLEMENT COMPLETED",
];

export default function OverviewFilters({
  range,
  onRangeChange,
  statusFilter,
  onStatusChange,
  dateLabel,
  dateRange,
  onDateRangeChange,
  onApplyDate,
  onCreateLead,
}: OverviewFiltersProps) {
  const [filterOpen, setFilterOpen] = useState(false);
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-xl border border-[#DDDDDD] bg-white p-1">
          {rangeOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRangeChange(item)}
              className={cn(
                "rounded-md px-5 py-2 text-[12px] font-medium transition",
                range === item
                  ? "bg-black text-white"
                  : "text-[#222] hover:bg-[#F4F4F4]",
              )}
            >
              {item === "monthly" ? "This Monthly" : item.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setFilterOpen((prev) => !prev)}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#DDDDDD] bg-white px-4 text-[13px] font-medium text-[#222]"
          >
            <Filter className="h-4 w-4" strokeWidth={1.8} />
            Filter
          </button>

          {filterOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-20"
                onClick={() => setFilterOpen(false)}
              />

              <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-65 rounded-2xl border border-[#E7E7E7] bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
                <div className="space-y-3">
                  <p className="text-[14px] font-semibold text-[#222]">
                    Lead Status
                  </p>

                  {statusOptions.map((status) => (
                    <button
                      key={status}
                      type="button"
                      onClick={() => {
                        onStatusChange(status);
                        setFilterOpen(false);
                      }}
                      className={cn(
                        "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[14px] transition",
                        statusFilter === status
                          ? "bg-[#EFF6FB] text-[#1BAEF5]"
                          : "text-[#2A2A2A] hover:bg-[#F7F7F7]",
                      )}
                    >
                      <span>{status}</span>
                      {statusFilter === status ? (
                        <Check className="h-4 w-4" />
                      ) : null}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setCalendarOpen((prev) => !prev)}
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#DDDDDD] bg-white px-4 text-[13px] font-medium text-[#222]"
          >
            <Calendar className="h-4 w-4" strokeWidth={1.8} />
            {dateLabel}
          </button>

          {calendarOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-20"
                onClick={() => setCalendarOpen(false)}
              />

              <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-72 rounded-2xl border border-[#E7E7E7] bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
                <div className="space-y-4">
                  <p className="text-[14px] font-semibold text-[#222]">
                    Select Date Range
                  </p>

                  <div className="space-y-2">
                    <label className="text-[12px] text-[#777]">From</label>
                    <input
                      type="date"
                      value={dateRange.from}
                      onChange={(e) =>
                        onDateRangeChange({
                          ...dateRange,
                          from: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-lg border border-[#E5E5E5] px-3 text-[13px]"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[12px] text-[#777]">To</label>
                    <input
                      type="date"
                      value={dateRange.to}
                      onChange={(e) =>
                        onDateRangeChange({
                          ...dateRange,
                          to: e.target.value,
                        })
                      }
                      className="h-10 w-full rounded-lg border border-[#E5E5E5] px-3 text-[13px]"
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      onApplyDate();
                      setCalendarOpen(false);
                    }}
                    className="mt-2 w-full rounded-lg bg-[#1BAEF5] py-2 text-[13px] font-medium text-white hover:bg-[#099fe8]"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      <button
        type="button"
        onClick={onCreateLead}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1BAEF5] px-5 text-[13px] font-medium text-white transition hover:bg-[#099fe8]"
      >
        <Plus className="h-4 w-4" />
        Create Lead
      </button>
    </div>
  );
}
