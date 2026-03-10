import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import {
  BadgeDollarSign,
  Building2,
  CalendarDays,
  CircleDollarSign,
  Clock3,
  CreditCard,
  Mail,
  Phone,
  RefreshCcw,
  Save,
  SquarePen,
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
import Breadcrumbs from "@/components/BrokerDashboardCom/BLeadDetailsCom/Breadcrumbs";
import SectionCard from "@/components/BrokerDashboardCom/BLeadDetailsCom/SectionCard";
import ReadonlyField from "@/components/BrokerDashboardCom/BLeadDetailsCom/ReadonlyField";
import {
  InputField,
  SelectField,
  TextareaField,
} from "@/components/BrokerDashboardCom/BLeadDetailsCom/FormFields";
import PipelineTracker from "@/components/BrokerDashboardCom/BLeadDetailsCom/PipelineTracker";
import TimelineItem from "@/components/BrokerDashboardCom/BLeadDetailsCom/TimelineItem";

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

export default function BrokerLeadDetails() {
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
        <div className="mx-auto max-w-350 rounded-2xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-[20px] font-semibold text-[#111827]">
            Referral not found
          </h2>
        </div>
      </div>
    );
  }

  const breadcrumbItems = [
    { label: "Overview", to: "/broker-dashboard/overview" },
    { label: "Referrals", to: "/broker-dashboard/my-referrals" },
    { label: "Referral Details" },
  ];

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
    <div className="space-y-4 sm:space-y-5">
      <Breadcrumbs items={breadcrumbItems} />

      <div className="flex flex-col gap-4 lg:gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-[22px] font-bold leading-tight text-[#111827] sm:text-[24px] lg:text-[28px]">
            {isEditing ? "Edit Referral" : "Referral Details"}
          </h1>
          <p className="mt-1 text-[13px] text-[#9CA3AF] sm:text-sm">
            {isEditing
              ? "Update borrower and loan details"
              : "Manage and track this referral's progress"}
          </p>
        </div>

        <div className="grid w-full grid-cols-1 gap-2.5 sm:grid-cols-2 xl:w-auto xl:grid-cols-3">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#374151] transition hover:bg-[#F9FAFB] sm:h-10 sm:w-auto"
              >
                <X className="h-4 w-4 shrink-0" />
                <span className="truncate">Cancel</span>
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[13px] font-medium text-white transition hover:bg-[#1D4ED8] sm:h-10 sm:w-auto sm:col-span-1"
              >
                <Save className="h-4 w-4 shrink-0" />
                <span className="truncate">Save Changes</span>
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#374151] transition hover:bg-[#F9FAFB] sm:h-10 sm:w-auto"
              >
                <SquarePen className="h-4 w-4 shrink-0" />
                <span className="truncate">Edit Referral</span>
              </button>

              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-[#FECACA] bg-white px-4 text-[13px] font-medium text-[#EF4444] transition hover:bg-[#FEF2F2] sm:h-10 sm:w-auto"
              >
                <Trash2 className="h-4 w-4 shrink-0" />
                <span className="truncate">Delete</span>
              </button>

              <button
                type="button"
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-4 text-[13px] font-medium text-white transition hover:bg-[#1D4ED8] sm:col-span-2 sm:h-10 sm:w-auto xl:col-span-1"
              >
                <RefreshCcw className="h-4 w-4 shrink-0" />
                <span className="truncate">Update Stage</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 2xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="min-w-0 space-y-5">
          <SectionCard title="Borrower Profile" icon={User}>
            <div className="grid grid-cols-2 gap-4">
              <ReadonlyField label="Full Name" value={lead.borrowerName} />
              <ReadonlyField
                label="Email"
                value={
                  <span className="inline-flex min-w-0 items-start gap-2 break-all">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                    <span className="min-w-0 break-all">
                      {lead.borrowerEmail}
                    </span>
                  </span>
                }
              />
              <ReadonlyField
                label="Phone"
                value={
                  <span className="inline-flex min-w-0 items-start gap-2 break-all">
                    <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                    <span>{lead.mobileNumber}</span>
                  </span>
                }
              />
              <ReadonlyField
                label="Company"
                value={
                  <span className="inline-flex min-w-0 items-start gap-2 wrap-break-word">
                    <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                    <span className="min-w-0 wrap-break-word">
                      {lead.companyName}
                    </span>
                  </span>
                }
              />
            </div>
          </SectionCard>

          <SectionCard title="Referrer Information" icon={BadgeDollarSign}>
            <div className="grid grid-cols-2 gap-4">
              <ReadonlyField label="Referrer Name" value={lead.referrerName} />
              <ReadonlyField label="Company" value={lead.partnerCompany} />
              <ReadonlyField
                label="Agreement Type"
                value={
                  <span className="inline-flex max-w-full wrap-break-word rounded-full bg-[#EFF6FF] px-2 py-0.5 text-[11px] text-[#2563EB]">
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
              <div className="grid grid-cols-2 gap-4">
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
                        "inline-flex max-w-full wrap-break-word rounded-full border px-2.5 py-1 text-[12px] font-medium",
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
                      prev ? { ...prev, expectedSettlementDate: value } : prev,
                    )
                  }
                  type="date"
                />
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <ReadonlyField
                  label="Estimated Loan Amount"
                  value={formatMoney(lead.estimatedLoanAmount)}
                  valueClassName="text-[24px] leading-tight sm:text-[28px] lg:text-[32px]"
                />
                <ReadonlyField
                  label="Interest Rate"
                  value={`${lead.interestRate.toFixed(2)}%`}
                  valueClassName="text-[24px] leading-tight sm:text-[28px] lg:text-[32px]"
                />
                <ReadonlyField
                  label="Loan Status"
                  value={
                    <span
                      className={cn(
                        "inline-flex max-w-full wrap-break-word rounded-full border px-2.5 py-1 text-[12px] font-medium",
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
                    <span className="inline-flex min-w-0 items-start gap-2 wrap-break-word">
                      <CalendarDays className="mt-0.5 h-4 w-4 shrink-0 text-[#9CA3AF]" />
                      <span>
                        {formatDisplayDate(lead.expectedSettlementDate)}
                      </span>
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
              <div className="grid grid-cols-2 gap-4">
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
                        <p className="wrap-break-word text-[14px] text-[#111827]">
                          {note.content}
                        </p>
                        <p className="mt-1 wrap-break-word text-[12px] text-[#9CA3AF]">
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

              <div className="mt-4 flex justify-stretch sm:justify-end">
                <button
                  type="button"
                  className="inline-flex h-10 w-full items-center justify-center rounded-md bg-[#1BAEF5] px-4 text-[12px] font-medium text-white transition hover:bg-[#0ea5e9] sm:h-8 sm:w-auto sm:px-3"
                >
                  Save Notes
                </button>
              </div>
            </SectionCard>
          )}
        </div>

        <div className="min-w-0 space-y-5">
          <SectionCard
            title={isEditing ? "Commission Calculation" : "Commission Summary"}
            icon={BadgeDollarSign}
            className="bg-[#EEF2FF]"
          >
            {isEditing ? (
              <div className="space-y-3">
                <div className="rounded-xl bg-white p-4">
                  <p className="text-[12px] text-[#9CA3AF]">Total Commission</p>
                  <p className="mt-1 wrap-break-word text-[22px] font-semibold text-[#111827] sm:text-[24px]">
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
                  <p className="mt-1 wrap-break-word text-[22px] font-semibold text-[#F97316] sm:text-[24px]">
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
                  <p className="mt-1 wrap-break-word text-[22px] font-semibold text-[#16A34A] sm:text-[24px]">
                    {formatMoney(recalculated.brokerCommission)}
                  </p>
                  <p className="mt-1 text-[11px] text-[#9CA3AF]">
                    Remaining amount
                  </p>
                </div>

                <div className="rounded-xl bg-[#1BAEF5] p-4 text-white">
                  <p className="text-[12px]/5 text-white/80">Net Earnings</p>
                  <p className="mt-1 wrap-break-word text-[22px] font-semibold sm:text-[24px]">
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
                  <p className="mt-1 wrap-break-word text-[28px] font-semibold leading-tight text-[#111827] sm:text-[32px] lg:text-[34px]">
                    {formatMoney(lead.brokerCommission)}
                  </p>
                </div>

                <div className="border-t border-[#DCE7F5] pt-4">
                  <p className="text-[12px] text-[#9CA3AF]">
                    Referrer Commission %
                  </p>
                  <p className="mt-1 text-[20px] font-semibold text-[#2563EB] sm:text-[22px]">
                    {lead.referrerCommissionPercent}%
                  </p>
                </div>

                <div className="border-t border-[#DCE7F5] pt-4">
                  <p className="text-[12px] text-[#9CA3AF]">
                    Referrer Expected Earnings
                  </p>
                  <p className="mt-1 wrap-break-word text-[24px] font-semibold text-[#16A34A] sm:text-[26px] lg:text-[28px]">
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
                        "inline-flex max-w-full wrap-break-word rounded-full border px-2.5 py-1 text-[12px] font-medium",
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
                    lead.paymentDate ? formatDisplayDate(lead.paymentDate) : "-"
                  }
                />

                <ReadonlyField label="Payment Method" value="Bank Transfer" />

                <ReadonlyField
                  label="Payment Notes"
                  value={
                    lead.paymentNotes ||
                    "Payment will be processed within 5 business days after settlement."
                  }
                  valueClassName="wrap-break-word font-normal text-[#6B7280]"
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
  );
}
