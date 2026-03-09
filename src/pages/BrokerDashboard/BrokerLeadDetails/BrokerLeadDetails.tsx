import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  CircleAlert,
  Save,
  Trash2,
  X,
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import { brokerTeamMembers, leadsMock } from "../BrokerOverview/mock";
import type { Lead, LeadStatus } from "../BrokerOverview/types";
import {
  formatMoney,
  getAllocatedTeamMemberName,
} from "../BrokerOverview/utils";

const leadStageOptions: LeadStatus[] = [
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

const statusPillClassMap: Record<LeadStatus, string> = {
  "NEW LEAD": "bg-slate-100 text-slate-600",
  CONTACTED: "bg-[#F3E9FF] text-[#9C62D6]",
  "APPLICATION IN PROGRESS": "bg-[#EEF2FF] text-[#4D59FF]",
  "SUBMITTED TO LENDER": "bg-indigo-50 text-indigo-600",
  "UNDER REVIEW": "bg-violet-50 text-violet-600",
  APPROVED: "bg-emerald-50 text-emerald-600",
  "AWAITING REFERRAL FEE": "bg-amber-50 text-amber-600",
  FUNDED: "bg-sky-50 text-sky-600",
  "SETTLEMENT COMPLETED": "bg-emerald-50 text-emerald-700",
};

function SectionCard({
  title,
  children,
  className,
  headerLeft,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  headerLeft?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "flex flex-col rounded-2xl border border-[#E5E7EB] bg-white p-4 sm:p-5",
        className,
      )}
    >
      <div className="mb-4">
        <h3 className="text-[15px] font-medium text-[#222]">{title}</h3>
        {headerLeft}
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
      <p className="text-[12px] text-[#8A8A8A]">{label}</p>
      <div className={cn("mt-1.5 text-[15px] text-[#222]", valueClassName)}>
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
}: {
  label: string;
  value: string | number;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <div>
      <p className="mb-2 text-[12px] text-[#8A8A8A]">{label}</p>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="h-10 w-full rounded-[10px] bg-[#F3F3F5] px-4 text-[14px] text-[#222] outline-none placeholder:text-[#A0A0A0]"
      />
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
      <p className="mb-2 text-[12px] text-[#8A8A8A]">{label}</p>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-10 w-full items-center justify-between rounded-[10px] bg-[#F3F3F5] px-4 text-left text-[14px] text-[#222]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#8A8A8A]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-2xl border border-[#E8E8E8] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
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
                    active ? "bg-[#F3F3F5]" : "hover:bg-[#FAFAFA]",
                  )}
                >
                  <span>{option}</span>
                  {active ? (
                    <span className="text-[13px] text-[#8A8A8A]">✓</span>
                  ) : null}
                </button>
              );
            })}
          </div>
        </>
      ) : null}
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
      <div className="min-h-full bg-[#F8F8F8] px-3 py-4 sm:px-5 lg:px-8 lg:py-6">
        <div className="mx-auto max-w-350 rounded-2xl border border-[#E5E7EB] bg-white p-6">
          <h2 className="text-[20px] font-semibold text-[#222]">
            Lead not found
          </h2>
        </div>
      </div>
    );
  }

  const allocatedTeamMember = getAllocatedTeamMemberName(
    brokerTeamMembers,
    lead.allocatedTeamMemberId,
  );

  const handleCancelEdit = () => {
    setLead(sourceLead ?? lead);
    setIsEditing(false);
  };

  const handleSave = () => {
    setIsEditing(false);
  };

  const expectedSettlementDisplay =
    lead.expectedSettlementDate && lead.expectedSettlementDate !== "0001-01-01"
      ? lead.expectedSettlementDate
      : "";

  const expectedPaymentDisplay =
    lead.expectedReferrerPaymentDate &&
    lead.expectedReferrerPaymentDate !== "0001-01-01"
      ? lead.expectedReferrerPaymentDate
      : "-";

  return (
    <div className="min-h-full">
      <div className="mx-auto max-w-350 space-y-4">
        {/* top actions */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DADADA] bg-white px-4 text-[13px] text-[#333]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Pipeline
          </button>

          {isEditing ? (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="inline-flex h-10 items-center gap-2 rounded-lg border border-[#DADADA] bg-white px-4 text-[13px] text-[#333]"
              >
                <X className="h-4 w-4" />
                Cancel Edit
              </button>

              <button
                type="button"
                onClick={handleSave}
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#1F6B35] px-5 text-[13px] text-white"
              >
                <Save className="h-4 w-4" />
                Save
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="inline-flex h-10 items-center justify-center rounded-lg border border-[#DADADA] bg-white px-6 text-[13px] text-[#333]"
              >
                Edit
              </button>

              <button
                type="button"
                className="inline-flex h-10 items-center gap-2 rounded-lg bg-[#E11D48] px-4 text-[13px] text-white"
              >
                <Trash2 className="h-4 w-4" />
                Delete Lead
              </button>
            </div>
          )}
        </div>

        {/* top grid */}
        <div className="grid items-stretch gap-5.5 xl:grid-cols-[minmax(0,1fr)_320px]">
          {/* left column */}
          <div className="flex h-full flex-col space-y-6">
            <SectionCard title="Client Details">
              <div className="grid gap-5 sm:grid-cols-2">
                <ReadonlyField label="Full Name" value={lead.borrowerName} />
                <ReadonlyField
                  label="Email Address"
                  value={lead.borrowerEmail}
                />
                <ReadonlyField
                  label="Mobile Number"
                  value={lead.mobileNumber}
                />
                <ReadonlyField label="Company Name" value={lead.companyName} />
              </div>
            </SectionCard>

            <SectionCard title="Lead Overview">
              {isEditing ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <SelectField<LeadStatus>
                    label="Lead Stage"
                    value={lead.leadStage}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev ? { ...prev, leadStage: value } : prev,
                      )
                    }
                    options={leadStageOptions}
                  />

                  <ReadonlyField
                    label="Lead Created Date"
                    value={lead.leadCreatedDate}
                  />

                  <div className="sm:col-span-2">
                    <SelectField<string>
                      label="Allocated Team Member"
                      value={lead.allocatedTeamMemberId}
                      onChange={(value) =>
                        setLead((prev) =>
                          prev
                            ? { ...prev, allocatedTeamMemberId: value }
                            : prev,
                        )
                      }
                      options={brokerTeamMembers.map((member) => member.id)}
                    />
                    <p className="mt-2 text-[12px] text-[#6F6F6F]">
                      {allocatedTeamMember}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <ReadonlyField
                    label="Lead Stage"
                    value={
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2.5 py-0.5 text-[12px] font-medium",
                          statusPillClassMap[lead.leadStage],
                        )}
                      >
                        {lead.leadStage}
                      </span>
                    }
                  />
                  <ReadonlyField
                    label="Lead Created Date"
                    value={lead.leadCreatedDate}
                  />
                  <div className="sm:col-span-2">
                    <ReadonlyField
                      label="Allocated Team Member"
                      value={allocatedTeamMember}
                    />
                  </div>
                </div>
              )}
            </SectionCard>

            <SectionCard
              title="Loan & Commission Details"
              headerLeft={
                <p className="text-[13px] text-[#8A8A8A]">
                  These fields can be filled once loan details are confirmed.
                </p>
              }
            >
              {isEditing ? (
                <div className="grid gap-4 sm:grid-cols-2">
                  <InputField
                    label="Estimated Loan Amount ($)"
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
                    placeholder="$750,000"
                    type="number"
                  />

                  <InputField
                    label="Interest Rate (%)"
                    value={lead.interestRate}
                    onChange={(value) =>
                      setLead((prev) =>
                        prev
                          ? {
                              ...prev,
                              interestRate: Number(value) || 0,
                            }
                          : prev,
                      )
                    }
                    placeholder="5.5"
                    type="number"
                  />

                  <div className="sm:col-span-2">
                    <InputField
                      label="Expected Settlement Date"
                      value={expectedSettlementDisplay}
                      onChange={(value) =>
                        setLead((prev) =>
                          prev
                            ? { ...prev, expectedSettlementDate: value }
                            : prev,
                        )
                      }
                      placeholder="YYYY-MM-DD"
                      type="date"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2">
                  <ReadonlyField
                    label="Estimated Loan Amount ($)"
                    value={formatMoney(lead.estimatedLoanAmount)}
                  />
                  <ReadonlyField
                    label="Interest Rate (%)"
                    value={`${lead.interestRate}%`}
                  />
                  <div className="sm:col-span-2">
                    <ReadonlyField
                      label="Expected Settlement Date"
                      value={expectedSettlementDisplay || "-"}
                    />
                  </div>
                </div>
              )}
            </SectionCard>
          </div>

          {/* right column */}
          <div className="flex h-full flex-col gap-5.5">
            <SectionCard title="Referrer Details">
              <div className="space-y-4">
                <ReadonlyField
                  label="Referrer Name"
                  value={lead.referrerName}
                />
                <ReadonlyField label="Company" value={lead.partnerCompany} />
                <ReadonlyField
                  label="Agreement Type"
                  value={lead.agreementType}
                />
                <ReadonlyField
                  label="Referrer Commission %"
                  value={`${lead.referrerCommissionPercent}%`}
                  valueClassName="font-semibold"
                />
              </div>
            </SectionCard>

            <SectionCard
              className="flex-1"
              title="Lead Milestone History"
              headerLeft={<span className="sr-only">Milestone history</span>}
            >
              <div className="space-y-4">
                {lead.milestoneHistory.map((item) => (
                  <div key={item.id}>
                    <p className="text-[14px] text-[#222]">{item.label}</p>
                    <p className="text-[12px] text-[#8A8A8A]">{item.date}</p>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>

        {/* lower grid */}
        <div className="grid gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
          {/* left column */}
          <SectionCard title="CRM Sync">
            <div className="space-y-4">
              <ReadonlyField
                label="Connected System"
                value={lead.crmConnectedSystem}
              />

              <div>
                <p className="text-[12px] text-[#8A8A8A]">Status</p>
                <span className="mt-1 inline-flex rounded-md bg-[#DDF6DF] px-2 py-0.5 text-[11px] text-[#2E9A4D]">
                  {lead.crmStatus}
                </span>
              </div>

              <button
                type="button"
                className="h-9 w-full rounded-md bg-[#C8EFFF] text-[12px] text-[#333]"
              >
                Push Lead to CRM
              </button>

              <p className="text-[11px] text-[#8A8A8A]">
                Sends this lead to your connected CRM.
              </p>
            </div>
          </SectionCard>

          {/* right column */}
          <SectionCard
            title="Broker Notes"
            headerLeft={
              <span className="rounded-full border border-[#E4E4E4] px-2 py-0.5 text-[10px] text-[#666]">
                Synced to referrer (read-only)
              </span>
            }
          >
            <div className="min-h-32.5 rounded-xl bg-[#F4F4F6] p-4">
              {lead.notes.length ? (
                <div className="space-y-3">
                  {lead.notes.map((note) => (
                    <div key={note.id}>
                      <p className="text-[14px] text-[#222]">{note.content}</p>
                      <p className="text-[12px] text-[#8A8A8A]">
                        {note.author} • {note.createdAt}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-[14px] text-[#8A8A8A]">
                  No notes available.
                </p>
              )}
            </div>
          </SectionCard>
        </div>

        {/* summary strip */}
        <section className="rounded-2xl border border-[#57BFFF] bg-white p-3">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-2.5">
              <p className="text-[13px] text-black">AGREEMENT SPLIT</p>
              <p className="mt-4 text-sm font-semibold">
                {lead.agreementSplitPercent}%
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-2.5">
              <p className="text-[13px] text-black">NET COMMISSION</p>
              <p className="mt-4 text-sm font-semibold">
                {formatMoney(lead.netCommission)}
              </p>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-2.5">
              <p className="text-[13px] text-black">Referrer Fee Expected</p>
              <p className="mt-4 text-2xl font-semibold text-[#1BAEF5]">
                {formatMoney(lead.referrerFeeExpected)}
              </p>
            </div>
          </div>
        </section>

        {/* payment card */}
        <section className="rounded-2xl border border-[#57BFFF] bg-[#CFEFFF] p-5">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-[22px] font-semibold uppercase text-[#16313E]">
                Expected Referrer Payment Date
              </p>
              <p className="mt-2 text-[18px] text-[#4C6470]">
                {expectedPaymentDisplay}
              </p>
            </div>

            <div className="flex max-w-107.5 items-start gap-2 text-[12px] leading-5 text-[#58727E]">
              <CircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-black" />
              <p>
                Automatically calculated as end of the following month after
                settlement. Example: If settlement occurs on 15 Jan, payment
                date will be 28 Feb.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
