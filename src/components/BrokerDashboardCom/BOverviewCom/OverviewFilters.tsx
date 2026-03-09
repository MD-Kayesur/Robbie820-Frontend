// src/components/BrokerDashboardCom/BOverivewCom/OverviewFilters.tsx
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
  "NEW REFERRAL",
  "CONTACTED",
  "APPLICATION STARTED",
  "SUBMITTED TO LENDER",
  "APPROVED",
  "FUNDED",
];

function formatRangeLabel(value: RangeKey) {
  if (value === "monthly") return "This Monthly";
  if (value === "mtd") return "MTD";
  return "FYTD";
}

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
      <div className="grid w-full grid-cols-1 gap-3 lg:flex lg:w-auto lg:items-center lg:justify-between">
        <div className="inline-flex w-full rounded-xl border border-[#E5E7EB] bg-white p-1 lg:w-auto">
          {rangeOptions.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onRangeChange(item)}
              className={cn(
                "flex-1 rounded-md px-3 py-2 text-[12px] font-medium transition sm:px-5",
                range === item
                  ? "bg-black text-white"
                  : "text-[#222] hover:bg-[#F4F4F5]",
              )}
            >
              {formatRangeLabel(item)}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 lg:flex lg:w-auto lg:flex-wrap lg:items-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setFilterOpen((prev) => !prev);
                setCalendarOpen(false);
              }}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#222] lg:w-auto lg:justify-start"
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

                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 w-full min-w-0 rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:w-64 sm:min-w-[16rem] sm:right-auto">
                  <p className="px-2 pb-2 text-[14px] font-semibold text-[#222]">
                    Referral Status
                  </p>

                  <div className="space-y-1">
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
                            ? "bg-[#EFF6FF] text-[#2563EB]"
                            : "text-[#2A2A2A] hover:bg-[#F7F7F7]",
                        )}
                      >
                        <span className="truncate">{status}</span>
                        {statusFilter === status ? (
                          <Check className="h-4 w-4 shrink-0" />
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
              onClick={() => {
                setCalendarOpen((prev) => !prev);
                setFilterOpen(false);
              }}
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#222] lg:w-auto lg:justify-start"
            >
              <Calendar className="h-4 w-4" strokeWidth={1.8} />
              <span className="truncate">{dateLabel}</span>
            </button>

            {calendarOpen && (
              <>
                <button
                  type="button"
                  className="fixed inset-0 z-20"
                  onClick={() => setCalendarOpen(false)}
                />

                <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 w-full min-w-0 rounded-2xl border border-[#E5E7EB] bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.10)] sm:w-72 sm:min-w-[18rem] sm:right-auto">
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
                        className="h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-[13px] outline-none"
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
                        className="h-10 w-full rounded-lg border border-[#E5E7EB] px-3 text-[13px] outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        onApplyDate();
                        setCalendarOpen(false);
                      }}
                      className="w-full rounded-lg bg-[#1BAEF5] py-2 text-[13px] font-medium text-white transition hover:bg-[#129fe2]"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            type="button"
            onClick={onCreateLead}
            className="col-span-2 inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#1BAEF5] px-5 text-[13px] font-medium text-white transition hover:bg-[#129fe2] lg:col-span-1 lg:w-auto lg:rounded-md"
          >
            <Plus className="h-4 w-4" />
            Create Lead
          </button>
        </div>
      </div>
    </div>
  );
}
