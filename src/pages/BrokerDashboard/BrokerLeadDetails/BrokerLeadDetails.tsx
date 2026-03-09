import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  BadgeDollarSign,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Circle,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Edit3,
  Mail,
  Phone,
  Save,
  Trash2,
  User,
  X,
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import { brokerTeamMembers, leadsMock } from "../BrokerOverview/mock";
import type { Lead, LeadStatus, PaymentStatus } from "../BrokerOverview/types";
import {
  calculateCommissionValues,
  formatDisplayDate,
  formatMoney,
  getAllocatedTeamMemberLabel,
} from "../BrokerOverview/utils";

const leadStageOptions: LeadStatus[] = [
  "NEW REFERRAL",
  "CONTACTED",
  "APPLICATION STARTED",
  "SUBMITTED TO LENDER",
  "APPROVED",
  "FUNDED",
];

const paymentStatusOptions: PaymentStatus[] = [
  "Pending",
  "Scheduled",
  "Paid",
  "Failed",
];

const stagePillClassMap: Record<LeadStatus, string> = {
  "NEW REFERRAL": "bg-slate-100 text-slate-600 border-slate-200",
  CONTACTED: "bg-sky-50 text-sky-600 border-sky-200",
  "APPLICATION STARTED": "bg-orange-50 text-orange-600 border-orange-200",
  "SUBMITTED TO LENDER": "bg-violet-50 text-violet-600 border-violet-200",
  APPROVED: "bg-emerald-50 text-emerald-600 border-emerald-200",
  FUNDED: "bg-green-50 text-green-700 border-green-200",
};

const paymentPillClassMap: Record<PaymentStatus, string> = {
  Pending: "bg-slate-100 text-slate-600 border-slate-200",
  Scheduled: "bg-amber-50 text-amber-700 border-amber-200",
  Paid: "bg-emerald-50 text-emerald-600 border-emerald-200",
  Failed: "bg-rose-50 text-rose-600 border-rose-200",
};

function Breadcrumbs() {
  return (
    <div className="flex flex-wrap items-center gap-2 text-[12px] text-[#9CA3AF]">
      <span>Overview</span>
      <span>&gt;</span>
      <span>Referrals</span>
      <span>&gt;</span>
      <span className="font-medium text-[#111827]">Referral Details</span>
    </div>
  );
}

function SectionCard({
  title,
  icon: Icon,
  children,
  className,
  rightSlot,
}: {
  title: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  rightSlot?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          {Icon ? <Icon className="h-4 w-4 text-[#2563EB]" /> : null}
          <h3 className="text-[15px] font-semibold text-[#111827]">{title}</h3>
        </div>
        {rightSlot}
      </div>
      {children}
    </section>
  );
}

function ReadonlyField({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div>
      <p className="text-[12px] text-[#9CA3AF]">{label}</p>
      <div
        className={cn(
          "mt-1.5 text-[14px] font-medium text-[#111827]",
          valueClassName,
        )}
      >
        {value}
      </div>
    </div>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  prefix,
  suffix,
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] text-[#9CA3AF]">{label}</p>
      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9CA3AF]">
            {prefix}
          </span>
        ) : null}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={cn(
            "h-11 w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB]",
            prefix && "pl-8",
            suffix && "pr-8",
          )}
        />

        {suffix ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#9CA3AF]">
            {suffix}
          </span>
        ) : null}
      </div>
    </div>
  );
}

function SelectField<T extends string>({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: T;
  onChange: (value: T) => void;
  options: readonly T[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <p className="mb-2 text-[12px] text-[#9CA3AF]">{label}</p>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-[12px] border border-[#E5E7EB] bg-white px-4 text-left text-[14px] text-[#111827]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
            {options.map((option) => {
              const active = option === value;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between px-4 py-3 text-left text-[14px] transition",
                    active ? "bg-[#DBEAFE]" : "hover:bg-[#F8FAFC]",
                  )}
                >
                  <span>{option}</span>
                  {active ? <span className="text-[13px]">✓</span> : null}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
    </div>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] text-[#9CA3AF]">{label}</p>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={4}
        className="w-full rounded-[12px] border border-[#E5E7EB] bg-white px-4 py-3 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#2563EB]"
      />
    </div>
  );
}

function TimelineItem({
  title,
  date,
  time,
  tone = "neutral",
}: {
  title: string;
  date: string;
  time?: string;
  tone?: "neutral" | "info" | "warning" | "success" | "pending";
}) {
  const toneMap = {
    neutral: "border-slate-300 bg-white text-slate-400",
    info: "border-blue-200 bg-blue-50 text-blue-600",
    warning: "border-amber-200 bg-amber-50 text-amber-600",
    success: "border-emerald-200 bg-emerald-50 text-emerald-600",
    pending: "border-violet-200 bg-violet-50 text-violet-600",
  } as const;

  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          toneMap[tone],
        )}
      >
        <Circle className="h-3.5 w-3.5 fill-current" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <p className="text-[14px] font-medium text-[#111827]">{title}</p>
          {time ? (
            <p className="shrink-0 text-[11px] text-[#9CA3AF]">{time}</p>
          ) : null}
        </div>
        <p className="mt-1 text-[12px] text-[#9CA3AF]">{date}</p>
      </div>
    </div>
  );
}

function PipelineTracker({ stage }: { stage: LeadStatus }) {
  const steps: Array<{
    label: string;
    key: LeadStatus;
  }> = [
    { label: "New Referral", key: "NEW REFERRAL" },
    { label: "Contacted", key: "CONTACTED" },
    { label: "Application Started", key: "APPLICATION STARTED" },
    { label: "Submitted to Lender", key: "SUBMITTED TO LENDER" },
    { label: "Approved", key: "APPROVED" },
    { label: "Funded", key: "FUNDED" },
  ];

  const currentIndex = steps.findIndex((item) => item.key === stage);

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[720px]">
        <div className="flex items-center">
          {steps.map((item, index) => {
            const done = index < currentIndex;
            const current = index === currentIndex;

            return (
              <div
                key={item.key}
                className="flex flex-1 items-center last:flex-none"
              >
                <div className="flex flex-col items-center">
                  <div
                    className={cn(
                      "flex h-7 w-7 items-center justify-center rounded-full border-2 text-[11px]",
                      done && "border-[#2563EB] bg-[#2563EB] text-white",
                      current && "border-[#2563EB] bg-white text-[#2563EB]",
                      !done &&
                        !current &&
                        "border-[#D1D5DB] bg-white text-[#D1D5DB]",
                    )}
                  >
                    {done ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <span className="h-2.5 w-2.5 rounded-full bg-current" />
                    )}
                  </div>
                  <p className="mt-2 text-center text-[11px] text-[#111827]">
                    {item.label}
                  </p>
                </div>

                {index < steps.length - 1 ? (
                  <div
                    className={cn(
                      "mb-6 h-[2px] flex-1",
                      index < currentIndex ? "bg-[#2563EB]" : "bg-[#D1D5DB]",
                    )}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default function BrokerLeadDetails() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const sourceLead = useMemo(
    () => leadsMock.find((item) => item.id === id),
    [id],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [lead, setLead] = useState<Lead | null>(sourceLead ?? null);

  if (!lead) {
    return (
      <div className="min-h-full">
        <div className="mx-auto max-w-[1400px] rounded-2xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Referral not found
          </h2>
        </div>
      </div>
    );
  }

  const allocatedTeamMemberLabel = getAllocatedTeamMemberLabel(
    brokerTeamMembers,
    lead.allocatedTeamMemberId,
  );

  const recalculated = calculateCommissionValues(
    lead.estimatedLoanAmount,
    lead.referrerCommissionPercent,
  );

  const handleCancelEdit = () => {
    setLead(sourceLead ?? lead);
    setIsEditing(false);
  };

  const handleSave = () => {
    setLead((prev) =>
      prev
        ? {
            ...prev,
            totalCommission: recalculated.totalCommission,
            brokerCommission: recalculated.brokerCommission,
            referrerFeeExpected: recalculated.referrerFeeExpected,
            agreementSplitPercent: prev.referrerCommissionPercent,
          }
        : prev,
    );
    setIsEditing(false);
  };

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-[1400px] space-y-5">
        <Breadcrumbs />

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#E5E7EB] bg-white text-[#6B7280]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>

              <div>
                <h1 className="text-[30px] font-semibold leading-none text-[#111827]">
                  {isEditing ? "Edit Referral" : "Referral Details"}
                </h1>
                <p className="mt-2 text-[14px] text-[#9CA3AF]">
                  {isEditing
                    ? "Update borrower and loan details"
                    : "Manage and track this referral's progress"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {isEditing ? (
              <>
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#374151]"
                >
                  <X className="h-4 w-4" />
                  Cancel
                </button>

                <button
                  type="button"
                  onClick={handleSave}
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[13px] font-medium text-white"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </button>
              </>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#374151]"
                >
                  <Edit3 className="h-4 w-4" />
                  Edit Referral
                </button>

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#FECACA] bg-white px-4 text-[13px] font-medium text-[#EF4444]"
                >
                  <Trash2 className="h-4 w-4" />
                  Delete
                </button>

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[13px] font-medium text-white"
                >
                  <Clock3 className="h-4 w-4" />
                  Update Stage
                </button>
              </>
            )}
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-5">
            <SectionCard title="Borrower Profile" icon={User}>
              <div className="grid gap-5 sm:grid-cols-2">
                <ReadonlyField label="Full Name" value={lead.borrowerName} />
                <ReadonlyField
                  label="Email"
                  value={
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4 text-[#9CA3AF]" />
                      {lead.borrowerEmail}
                    </span>
                  }
                />
                <ReadonlyField
                  label="Phone"
                  value={
                    <span className="inline-flex items-center gap-2">
                      <Phone className="h-4 w-4 text-[#9CA3AF]" />
                      {lead.mobileNumber}
                    </span>
                  }
                />
                <ReadonlyField
                  label="Company"
                  value={
                    <span className="inline-flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-[#9CA3AF]" />
                      {lead.companyName}
                    </span>
                  }
                />
              </div>
            </SectionCard>

            <SectionCard title="Referrer Information" icon={BadgeDollarSign}>
              <div className="grid gap-5 sm:grid-cols-2">
                <ReadonlyField
                  label="Referrer Name"
                  value={lead.referrerName}
                />
                <ReadonlyField label="Company" value={lead.partnerCompany} />
                <ReadonlyField
                  label="Agreement Type"
                  value={
                    <span className="inline-flex rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[11px] text-[#2563EB]">
                      {lead.agreementType}
                    </span>
                  }
                />
                <ReadonlyField
                  label="Commission Percentage"
                  value={`${lead.referrerCommissionPercent}%`}
                  valueClassName="text-[#16A34A]"
                />
              </div>

              <div className="mt-5">
                <ReadonlyField
                  label="Allocated Team Member"
                  value={allocatedTeamMemberLabel}
                />
              </div>
            </SectionCard>

            <SectionCard title="Loan Details" icon={CircleDollarSign}>
              {isEditing ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Estimated Loan Amount"
                    value={lead.estimatedLoanAmount}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev
                          ? {
                              ...prev,
                              estimatedLoanAmount: Number(value) || 0,
                            }
                          : prev,
                      )
                    }
                    placeholder="450000"
                    type="number"
                    prefix="$"
                  />

                  <InputField
                    label="Interest Rate"
                    value={lead.interestRate}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev
                          ? { ...prev, interestRate: Number(value) || 0 }
                          : prev,
                      )
                    }
                    placeholder="6.25"
                    type="number"
                    suffix="%"
                  />

                  <ReadonlyField
                    label="Loan Status"
                    value={
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-medium",
                          stagePillClassMap[lead.leadStage],
                        )}
                      >
                        {lead.leadStage}
                      </span>
                    }
                  />

                  <InputField
                    label="Expected Settlement Date"
                    value={lead.expectedSettlementDate}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev
                          ? { ...prev, expectedSettlementDate: value }
                          : prev,
                      )
                    }
                    type="date"
                  />
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <ReadonlyField
                    label="Estimated Loan Amount"
                    value={formatMoney(lead.estimatedLoanAmount)}
                    valueClassName="text-[32px] leading-none"
                  />
                  <ReadonlyField
                    label="Interest Rate"
                    value={`${lead.interestRate.toFixed(2)}%`}
                    valueClassName="text-[32px] leading-none"
                  />
                  <ReadonlyField
                    label="Loan Status"
                    value={
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-medium",
                          stagePillClassMap[lead.leadStage],
                        )}
                      >
                        {lead.leadStage}
                      </span>
                    }
                  />
                  <ReadonlyField
                    label="Expected Settlement Date"
                    value={
                      <span className="inline-flex items-center gap-2">
                        <CalendarDays className="h-4 w-4 text-[#9CA3AF]" />
                        {formatDisplayDate(lead.expectedSettlementDate)}
                      </span>
                    }
                  />
                </div>
              )}
            </SectionCard>

            <SectionCard title="Pipeline Stage Tracker">
              <PipelineTracker stage={lead.leadStage} />
            </SectionCard>

            {isEditing ? (
              <SectionCard title="Payment Information" icon={CreditCard}>
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField<PaymentStatus>
                    label="Payment Status"
                    value={lead.paymentStatus}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev ? { ...prev, paymentStatus: value } : prev,
                      )
                    }
                    options={paymentStatusOptions}
                  />

                  <InputField
                    label="Payment Date"
                    value={lead.paymentDate}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev ? { ...prev, paymentDate: value } : prev,
                      )
                    }
                    type="date"
                  />

                  <div className="sm:col-span-2">
                    <TextareaField
                      label="Payment Notes"
                      value={lead.paymentNotes}
                      onChange={(value) =>
                        setLead((prev) =>
                          prev ? { ...prev, paymentNotes: value } : prev,
                        )
                      }
                      placeholder="Add any notes about payment processing..."
                    />
                  </div>
                </div>
              </SectionCard>
            ) : (
              <SectionCard title="Internal Notes">
                <div className="rounded-xl bg-[#F3F4F6] p-4">
                  {lead.notes.length ? (
                    <div className="space-y-3">
                      {lead.notes.map((note) => (
                        <div key={note.id}>
                          <p className="text-[14px] text-[#111827]">
                            {note.content}
                          </p>
                          <p className="mt-1 text-[12px] text-[#9CA3AF]">
                            {note.author} • {note.createdAt}
                          </p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[14px] text-[#9CA3AF]">
                      Add internal notes about this referral...
                    </p>
                  )}
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    type="button"
                    className="inline-flex h-8 items-center justify-center rounded-md bg-[#1BAEF5] px-3 text-[12px] font-medium text-white"
                  >
                    Save Notes
                  </button>
                </div>
              </SectionCard>
            )}
          </div>

          <div className="space-y-5">
            <SectionCard
              title={
                isEditing ? "Commission Calculation" : "Commission Summary"
              }
              icon={BadgeDollarSign}
              className={isEditing ? "bg-[#F5F9FF]" : "bg-[#F5F9FF]"}
            >
              {isEditing ? (
                <div className="space-y-3">
                  <div className="rounded-xl bg-white p-4">
                    <p className="text-[12px] text-[#9CA3AF]">
                      Total Commission
                    </p>
                    <p className="mt-1 text-[24px] font-semibold text-[#111827]">
                      {formatMoney(recalculated.totalCommission)}
                    </p>
                    <p className="mt-1 text-[11px] text-[#9CA3AF]">
                      1% of loan amount
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-[12px] text-[#9CA3AF]">
                      Referrer Commission
                    </p>
                    <p className="mt-1 text-[24px] font-semibold text-[#F97316]">
                      {formatMoney(recalculated.referrerFeeExpected)}
                    </p>
                    <p className="mt-1 text-[11px] text-[#9CA3AF]">
                      ({lead.referrerCommissionPercent}% of total)
                    </p>
                  </div>

                  <div className="rounded-xl bg-white p-4">
                    <p className="text-[12px] text-[#9CA3AF]">
                      Broker Commission
                    </p>
                    <p className="mt-1 text-[24px] font-semibold text-[#16A34A]">
                      {formatMoney(recalculated.brokerCommission)}
                    </p>
                    <p className="mt-1 text-[11px] text-[#9CA3AF]">
                      Remaining amount
                    </p>
                  </div>

                  <div className="rounded-xl bg-[#1BAEF5] p-4 text-white">
                    <p className="text-[12px]/5 text-white/80">Net Earnings</p>
                    <p className="mt-1 text-[24px] font-semibold">
                      {formatMoney(recalculated.brokerCommission)}
                    </p>
                    <p className="mt-1 text-[11px] text-white/80">
                      Your total earnings
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div>
                    <p className="text-[12px] text-[#9CA3AF]">
                      Broker Commission
                    </p>
                    <p className="mt-1 text-[34px] font-semibold leading-none text-[#111827]">
                      {formatMoney(lead.brokerCommission)}
                    </p>
                  </div>

                  <div className="border-t border-[#DCE7F5] pt-4">
                    <p className="text-[12px] text-[#9CA3AF]">
                      Referrer Commission %
                    </p>
                    <p className="mt-1 text-[22px] font-semibold text-[#2563EB]">
                      {lead.referrerCommissionPercent}%
                    </p>
                  </div>

                  <div className="border-t border-[#DCE7F5] pt-4">
                    <p className="text-[12px] text-[#9CA3AF]">
                      Referrer Expected Earnings
                    </p>
                    <p className="mt-1 text-[28px] font-semibold text-[#16A34A]">
                      {formatMoney(lead.referrerFeeExpected)}
                    </p>
                  </div>
                </div>
              )}
            </SectionCard>

            {!isEditing ? (
              <SectionCard title="Payment Status" icon={CreditCard}>
                <div className="space-y-4">
                  <ReadonlyField
                    label="Status"
                    value={
                      <span
                        className={cn(
                          "inline-flex rounded-full border px-2.5 py-1 text-[12px] font-medium",
                          paymentPillClassMap[lead.paymentStatus],
                        )}
                      >
                        {lead.paymentStatus}
                      </span>
                    }
                  />

                  <ReadonlyField
                    label="Expected Payment Date"
                    value={
                      lead.paymentDate
                        ? formatDisplayDate(lead.paymentDate)
                        : "-"
                    }
                  />

                  <ReadonlyField label="Payment Method" value="Bank Transfer" />

                  <ReadonlyField
                    label="Payment Notes"
                    value={
                      lead.paymentNotes ||
                      "Payment will be processed within 5 business days after settlement."
                    }
                    valueClassName="font-normal text-[#6B7280]"
                  />
                </div>
              </SectionCard>
            ) : null}

            <SectionCard title="Activity Timeline" icon={Clock3}>
              <div className="space-y-4">
                {lead.milestoneHistory.map((item) => (
                  <TimelineItem
                    key={item.id}
                    title={item.label}
                    date={item.date}
                    time={item.time}
                    tone={item.tone}
                  />
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      </div>
    </div>
  );
}
