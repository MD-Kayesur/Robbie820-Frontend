import { CalendarDays, ChevronDown, Filter } from "lucide-react";
import type React from "react";

import { cn } from "@/hooks/useCn";
import {
  datePresetOptions,
  rangeOptions,
  referrerOptions,
} from "@/pages/BrokerDashboard/BrokerReport/mock";
import {
  ReferrerKey,
  ReportRangeKey,
} from "@/pages/BrokerDashboard/BrokerReport/types";

type OpenTopMenu = null | "range" | "date" | "referrer";

type ReportFiltersProps = {
  containerRef: React.RefObject<HTMLDivElement | null>;
  openMenu: OpenTopMenu;
  onOpenMenuChange: React.Dispatch<React.SetStateAction<OpenTopMenu>>;
  range: ReportRangeKey;
  datePreset: string;
  referrer: ReferrerKey;
  selectedRangeLabel: string;
  selectedDateLabel: string;
  selectedReferrerLabel: string;
  onRangeChange: (value: ReportRangeKey) => void;
  onDatePresetChange: (value: string) => void;
  onReferrerChange: (value: ReferrerKey) => void;
};

const ReportFilters = ({
  containerRef,
  openMenu,
  onOpenMenuChange,
  range,
  datePreset,
  referrer,
  selectedRangeLabel,
  selectedDateLabel,
  selectedReferrerLabel,
  onRangeChange,
  onDatePresetChange,
  onReferrerChange,
}: ReportFiltersProps) => {
  return (
    <div
      ref={containerRef}
      className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:flex xl:flex-wrap xl:items-center"
    >
      <div className="relative min-w-0">
        <TopFilterButton
          icon={<CalendarDays className="h-4 w-4" />}
          label={selectedRangeLabel}
          open={openMenu === "range"}
          onClick={() =>
            onOpenMenuChange((prev) => (prev === "range" ? null : "range"))
          }
        />

        {openMenu === "range" ? (
          <DropdownCard className="w-full min-w-0 md:w-60">
            {rangeOptions.map((option) => (
              <CompactMenuRow
                key={option.value}
                label={option.label}
                active={range === option.value}
                onClick={() => {
                  onRangeChange(option.value);
                  onOpenMenuChange(null);
                }}
              />
            ))}
          </DropdownCard>
        ) : null}
      </div>

      <div className="relative min-w-0">
        <TopFilterButton
          icon={<CalendarDays className="h-4 w-4" />}
          label={selectedDateLabel}
          open={openMenu === "date"}
          onClick={() =>
            onOpenMenuChange((prev) => (prev === "date" ? null : "date"))
          }
        />

        {openMenu === "date" ? (
          <DropdownCard className="w-full min-w-0 md:w-[320px]">
            {datePresetOptions.map((option) => (
              <CompactMenuRow
                key={option.value}
                label={option.label}
                icon={
                  option.withCalendar ? (
                    <CalendarDays className="h-4 w-4" />
                  ) : undefined
                }
                active={datePreset === option.value}
                onClick={() => {
                  onDatePresetChange(option.value);
                  onOpenMenuChange(null);
                }}
              />
            ))}
          </DropdownCard>
        ) : null}
      </div>

      <div className="relative min-w-0 md:col-span-2 xl:col-span-1">
        <TopFilterButton
          icon={<Filter className="h-4 w-4" />}
          label={selectedReferrerLabel}
          open={openMenu === "referrer"}
          onClick={() =>
            onOpenMenuChange((prev) =>
              prev === "referrer" ? null : "referrer",
            )
          }
        />

        {openMenu === "referrer" ? (
          <DropdownCard className="w-full min-w-0 md:w-[320px]">
            {referrerOptions.map((option) => (
              <CompactMenuRow
                key={option.value}
                label={option.label}
                active={referrer === option.value}
                onClick={() => {
                  onReferrerChange(option.value);
                  onOpenMenuChange(null);
                }}
              />
            ))}
          </DropdownCard>
        ) : null}
      </div>
    </div>
  );
};

function TopFilterButton({
  icon,
  label,
  open,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-lg border bg-white px-4 text-sm text-[#111827] transition xl:min-w-40 xl:w-auto",
        open ? "border-[#8ED3FF]" : "border-[#E5E7EB] hover:border-[#CBEAFE]",
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 text-[#111827]">{icon}</span>
        <span className="truncate">{label}</span>
      </span>

      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-[#6B7280] transition",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

function DropdownCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CompactMenuRow({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-13 w-full items-center gap-3 border-b border-[#D1D5DB] px-4 py-3 text-left text-sm font-medium text-[#111827] transition last:border-b-0 hover:bg-[#F8FAFC] md:min-h-14",
        active && "bg-[#F8FAFC]",
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="min-w-0 flex-1 wrap-break-word">{label}</span>
    </button>
  );
}

export default ReportFilters;
