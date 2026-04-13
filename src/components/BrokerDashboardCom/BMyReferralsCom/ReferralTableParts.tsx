import { useState } from "react";
import {
  ChevronDown,
  Eye,
  FileText,
  MoreHorizontal,
  RefreshCw,
  UserPlus,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import type {
  CommissionStatus,
  PipelineStage,
  ReferralRow,
} from "../../../pages/BrokerDashboard/BrokerMyReferrals/types";

export function formatMoney(amount: number) {
  return `$${amount.toLocaleString()}`;
}

export function StageBadge({ stage }: { stage: PipelineStage }) {
  const stageClasses: Record<PipelineStage, string> = {
    "New Referral": "bg-[#E8F0FF] text-[#2563EB]",
    Contacted: "bg-[#F3E8FF] text-[#9333EA]",
    "Application Started": "bg-[#FEF3C7] text-[#D97706]",
    "Submitted to Lender": "bg-[#FFF1E8] text-[#F97316]",
    Approved: "bg-[#DCFCE7] text-[#16A34A]",
    Funded: "bg-[#DCFCE7] text-[#16A34A]",
    "Closed / Not Proceeding": "bg-[#F3F4F6] text-[#6B7280]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none whitespace-nowrap",
        stageClasses[stage],
      )}
    >
      {stage}
    </span>
  );
}

export function CommissionStatusBadge({
  status,
}: {
  status: CommissionStatus;
}) {
  const statusClasses: Record<CommissionStatus, string> = {
    Pending: "bg-[#F3F4F6] text-[#4B5563]",
    Approved: "bg-[#E8F0FF] text-[#2563EB]",
    Paid: "bg-[#DCFCE7] text-[#16A34A]",
    Scheduled: "bg-[#FEF3C7] text-[#D97706]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none whitespace-nowrap",
        statusClasses[status],
      )}
    >
      {status}
    </span>
  );
}

export function FilterDropdown<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative min-w-0 w-full">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-[10px] border bg-[#F3F3F5] px-4 text-left text-[13px] font-medium text-[#374151] transition",
          open ? "border-[#3B82F6] ring-1 ring-[#3B82F6]" : "border-[#E5E7EB]",
        )}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#4B5563] transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-1 w-full overflow-hidden rounded-[10px] border border-[#A3A3A3] bg-white shadow-sm">
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-3 text-left text-[13px] text-[#374151] transition hover:bg-[#E8F1FF]",
                option === value && "bg-[#9EC5F8]",
                option !== value &&
                  index === 0 &&
                  value === options[0] &&
                  "bg-[#9EC5F8]",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function RowMenu({ onView }: { onView: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const items = [
    { label: "View Details", icon: Eye, onClick: onView },
    {
      label: "Update Stage",
      icon: RefreshCw,
      onClick: () => setOpen(false),
    },
    {
      label: "Add Internal Note",
      icon: FileText,
      onClick: () => setOpen(false),
    },
    {
      label: "Assign Team Member",
      icon: UserPlus,
      onClick: () => setOpen(false),
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#F3F4F6]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-57.5 overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          {items.map((item) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-4 px-6 py-4 text-left text-[15px] font-medium text-[#374151] transition hover:bg-[#F8FAFC]"
              >
                <Icon className="h-5 w-5 text-[#6B7280]" strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export function MobileReferralCard({ row }: { row: ReferralRow }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-[14px] font-medium text-[#111827]">
            {row.borrowerName}
          </h3>
          <p className="mt-1 text-[12px] text-[#6B7280]">{row.referrer}</p>
        </div>

        <RowMenu onView={() => {}} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <StageBadge stage={row.pipelineStage} />
        <CommissionStatusBadge status={row.commissionStatus} />
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-xl bg-[#F9FAFB] p-3">
          <p className="text-[11px] text-[#6B7280]">Loan Amount</p>
          <p className="mt-1 text-[13px] font-medium text-[#111827]">
            {formatMoney(row.loanAmount)}
          </p>
        </div>

        <div className="rounded-xl bg-[#F9FAFB] p-3">
          <p className="text-[11px] text-[#6B7280]">Expected Commission</p>
          <p className="mt-1 text-[13px] font-medium text-[#111827]">
            {formatMoney(row.expectedCommission)}
          </p>
        </div>

        <div className="rounded-xl bg-[#F9FAFB] p-3">
          <p className="text-[11px] text-[#6B7280]">Date Submitted</p>
          <p className="mt-1 text-[13px] text-[#374151]">{row.dateSubmitted}</p>
        </div>

        <div className="rounded-xl bg-[#F9FAFB] p-3">
          <p className="text-[11px] text-[#6B7280]">Team Member</p>
          <p className="mt-1 text-[13px] text-[#374151]">
            {row.assignedTeamMember}
          </p>
        </div>
      </div>
    </div>
  );
}
