// src/components/BrokerDashboardCom/BOverviewCom/modals/CreateLeadModal.tsx
import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, DollarSign, TrendingUp, X } from "lucide-react";
import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type {
  AgreementType,
  CreateLeadForm,
  CreateLeadStage,
  Lead,
  LoanType,
  RangeKey,
  ReferrerOption,
  TeamMember,
} from "../../../pages/BrokerDashboard/BrokerOverview/types";
import {
  buildLeadFromCreateForm,
  calculateCommissionValues,
  formatMoney,
  parseMoneyInput,
} from "../../../pages/BrokerDashboard/BrokerOverview/utils";

const stageOptions: CreateLeadStage[] = [
  "New Referral",
  "Contacted",
  "Application Started",
  "Submitted to Lender",
];

const loanTypeOptions: LoanType[] = [
  "Home Loan",
  "Refinance",
  "Commercial Loan",
  "Investment Property",
  "Construction Loan",
];

const defaultForm: CreateLeadForm = {
  fullName: "",
  email: "",
  mobile: "",
  companyName: "",
  referrerId: "",
  agreementType: "",
  referrerCommissionPercent: "",
  estimatedLoanAmount: "",
  loanType: "",
  interestRate: "",
  expectedSettlementDate: "",
  leadStage: "New Referral",
  assignTo: "",
};

type SelectOption<T extends string> = {
  label: string;
  value: T;
};

function SelectMenu<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T | "";
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const selectedLabel =
    options.find((option) => option.value === value)?.label || "";

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-12 w-full items-center justify-between rounded-[14px] border border-transparent bg-[#EBEBEB] px-4 text-left text-[14px] text-[#2A2A2A] outline-none transition",
          "hover:border-[#D1D5DB] focus:border-[#2563EB] focus:bg-white",
        )}
      >
        <span className={cn(!value && "text-[#9CA3AF]")}>
          {selectedLabel || placeholder}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+8px)] z-130 overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="max-h-72 overflow-y-auto py-1">
          {options.map((option) => {
            const active = value === option.value;

            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-[15px] transition",
                  active
                    ? "bg-[#F3F4F6] text-[#111827]"
                    : "text-[#2A2A2A] hover:bg-[#FAFAFA]",
                )}
              >
                <span className="pr-4">{option.label}</span>
                {active ? (
                  <Check className="h-4 w-4 shrink-0 text-[#6B7280]" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-[14px] font-medium text-[#111827]">
        {label}
        {required ? <span className="ml-1 text-[#F15B5B]">*</span> : null}
      </label>
      {children}
    </div>
  );
}

function SectionTitle({ title }: { title: string }) {
  return (
    <div className="border-b border-[#E5E7EB] pb-3">
      <div className="flex items-center gap-2">
        <div className="h-8 w-1 rounded-full bg-[#2563EB]" />
        <h4 className="md:text-lg font-semibold text-[#111827]">{title}</h4>
      </div>
    </div>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
  icon,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={cn(
          "h-12 w-full rounded-[14px] border border-transparent bg-[#EBEBEB] px-4 text-[14px] text-[#111827] outline-none transition",
          "placeholder:text-[#9CA3AF] hover:border-[#D1D5DB] focus:border-[#2563EB] focus:bg-white",
          icon ? "pr-11" : undefined,
        )}
      />
      {icon ? (
        <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#6B7280]">
          {icon}
        </div>
      ) : null}
    </div>
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (lead: Lead) => void;
  timeline: RangeKey;
  teamMembers: TeamMember[];
  referrers: ReferrerOption[];
};

export default function CreateLeadModal({
  open,
  onClose,
  onCreate,
  timeline,
  teamMembers,
  referrers,
}: Props) {
  const [form, setForm] = useState<CreateLeadForm>(defaultForm);

  useLockBodyScroll(open);

  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    closeButtonRef.current?.focus();

    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const commissionPercent = Number(form.referrerCommissionPercent) || 0;
  const amount = parseMoneyInput(form.estimatedLoanAmount);

  const commissionValues = useMemo(
    () => calculateCommissionValues(amount, commissionPercent),
    [amount, commissionPercent],
  );

  const referrerOptionsMapped = useMemo(
    () =>
      referrers.map((item) => ({
        value: item.id,
        label: item.name,
      })),
    [referrers],
  );

  const agreementOptions = useMemo(
    () =>
      [
        "Standard Partnership Agreement",
        "Revenue Share",
        "Flat Referral Fee",
      ].map((item) => ({
        value: item,
        label: item,
      })) as SelectOption<AgreementType>[],
    [],
  );

  const teamMemberOptions = useMemo(
    () =>
      teamMembers.map((member) => ({
        value: member.id,
        label: `${member.name} - ${member.role}`,
      })),
    [teamMembers],
  );

  const loanOptions = useMemo(
    () =>
      loanTypeOptions.map((item) => ({
        value: item,
        label: item,
      })),
    [],
  );

  const stageOptionsMapped = useMemo(
    () =>
      stageOptions.map((stage) => ({
        label: stage,
        value: stage,
      })),
    [],
  );

  const disabled =
    !form.fullName.trim() ||
    !form.email.trim() ||
    !form.mobile.trim() ||
    !form.companyName.trim() ||
    !form.referrerId ||
    !form.agreementType ||
    !form.referrerCommissionPercent.trim() ||
    !form.estimatedLoanAmount.trim() ||
    !form.loanType ||
    !form.interestRate.trim() ||
    !form.expectedSettlementDate.trim() ||
    !form.assignTo;

  const handleCreate = () => {
    if (disabled) return;

    const newLead = buildLeadFromCreateForm({
      form,
      timeline,
      teamMembers,
      referrers,
    });

    onCreate(newLead);
    setForm(defaultForm);
    onClose();
  };

  const handleReferrerChange = (value: string) => {
    const selected = referrers.find((item) => item.id === value);

    setForm((prev) => ({
      ...prev,
      referrerId: value,
      agreementType: selected?.agreementType || "",
      referrerCommissionPercent: selected
        ? String(selected.commissionPercent)
        : "",
    }));
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-120">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]" />

      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-3 md:p-6">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-lead-modal-title"
            className="relative flex w-full max-w-3xl max-h-[calc(100vh-24px)] flex-col overflow-hidden rounded-sm bg-white shadow-[0_24px_80px_rgba(0,0,0,0.22)] md:max-h-[calc(100vh-48px)]"
          >
            <div className="flex items-start justify-between gap-4 px-6 py-6 md:px-8">
              <div>
                <h3
                  id="create-lead-modal-title"
                  className="text-lg md:text-2xl font-semibold leading-tight text-[#111827]"
                >
                  Create Lead / New Referral
                </h3>
                <p className="mt-3 text-xs md:text-sm text-[#6B7280]">
                  Register a new borrower referred by a partner
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[#6B7280] transition hover:bg-[#F3F4F6]"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto px-6 pb-6 md:px-8">
              <div className="space-y-6">
                <section className="space-y-5">
                  <SectionTitle title="Borrower Information" />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Full Name" required>
                      <TextInput
                        value={form.fullName}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, fullName: value }))
                        }
                        placeholder="John Anderson"
                      />
                    </Field>

                    <Field label="Email Address" required>
                      <TextInput
                        type="email"
                        value={form.email}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, email: value }))
                        }
                        placeholder="john@example.com"
                      />
                    </Field>

                    <Field label="Mobile Number" required>
                      <TextInput
                        value={form.mobile}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, mobile: value }))
                        }
                        placeholder="+1(555) 123-4567"
                      />
                    </Field>

                    <Field label="Company Name" required>
                      <TextInput
                        value={form.companyName}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, companyName: value }))
                        }
                        placeholder="ABC Corporation"
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionTitle title="Referrer Information" />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Select Referrer" required>
                      <SelectMenu
                        value={form.referrerId}
                        onChange={handleReferrerChange}
                        options={referrerOptionsMapped}
                        placeholder="Choose a referrer"
                      />
                    </Field>

                    <Field label="Agreement Type" required>
                      <SelectMenu<AgreementType>
                        value={form.agreementType}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, agreementType: value }))
                        }
                        options={agreementOptions}
                        placeholder="Select agreement type"
                      />
                    </Field>

                    <Field label="Referrer Commission%" required>
                      <TextInput
                        value={form.referrerCommissionPercent}
                        onChange={(value) =>
                          setForm((prev) => ({
                            ...prev,
                            referrerCommissionPercent: value,
                          }))
                        }
                        placeholder="10"
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionTitle title="Loan Information" />

                  <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                    <Field label="Estimated Loan Amount" required>
                      <TextInput
                        value={form.estimatedLoanAmount}
                        onChange={(value) =>
                          setForm((prev) => ({
                            ...prev,
                            estimatedLoanAmount: value,
                          }))
                        }
                        placeholder="$ 450000"
                      />
                    </Field>

                    <Field label="Loan Type" required>
                      <SelectMenu<LoanType>
                        value={form.loanType}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, loanType: value }))
                        }
                        options={loanOptions}
                        placeholder="Select loan type"
                      />
                    </Field>

                    <Field label="Interest Rate (%)" required>
                      <TextInput
                        value={form.interestRate}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, interestRate: value }))
                        }
                        placeholder="6.25"
                      />
                    </Field>

                    <Field label="Expected Settlement Date" required>
                      <TextInput
                        type="date"
                        value={form.expectedSettlementDate}
                        onChange={(value) =>
                          setForm((prev) => ({
                            ...prev,
                            expectedSettlementDate: value,
                          }))
                        }
                        placeholder="mm/dd/yy"
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionTitle title="Pipeline Stage" />

                  <div className="grid grid-cols-1 gap-5">
                    <Field label="Initial stage" required>
                      <SelectMenu<CreateLeadStage>
                        value={form.leadStage}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, leadStage: value }))
                        }
                        options={stageOptionsMapped}
                        placeholder="Select stage"
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionTitle title="Assign Lead" />

                  <div className="grid grid-cols-1 gap-5">
                    <Field label="Assign to Team Member" required>
                      <SelectMenu<string>
                        value={form.assignTo}
                        onChange={(value) =>
                          setForm((prev) => ({ ...prev, assignTo: value }))
                        }
                        options={teamMemberOptions}
                        placeholder="Select team member"
                      />
                    </Field>
                  </div>
                </section>

                <section className="space-y-5">
                  <SectionTitle title="Commission Preview" />

                  <div className="rounded-[18px] bg-[#F2F7FF] p-5">
                    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#6B7280]">
                          <DollarSign className="h-4 w-4" />
                          <p className="text-[14px]">Broker Commission</p>
                        </div>
                        <p className="text-[18px] font-semibold text-[#111827]">
                          {formatMoney(commissionValues.brokerCommission)}
                        </p>
                        <p className="text-[14px] text-[#4B5563]">Estimated</p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#6B7280]">
                          <TrendingUp className="h-4 w-4" />
                          <p className="text-[14px]">Referrer Commission</p>
                        </div>
                        <p className="text-[18px] font-semibold text-[#2563EB]">
                          {commissionPercent || 0}%
                        </p>
                        <p className="text-[14px] text-[#4B5563]">
                          Of broker commission
                        </p>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-[#6B7280]">
                          <DollarSign className="h-4 w-4" />
                          <p className="text-[14px]">Referrer Earnings</p>
                        </div>
                        <p className="text-[18px] font-semibold text-[#16A34A]">
                          {formatMoney(commissionValues.referrerFeeExpected)}
                        </p>
                        <p className="text-[14px] text-[#4B5563]">
                          Expected payout
                        </p>
                      </div>
                    </div>
                  </div>
                </section>

                <div className="flex justify-between gap-3 pt-2 md:flex-row md:justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#D1D5DB] px-6 text-[14px] font-medium text-[#222] transition hover:bg-[#FAFAFA]"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={disabled}
                    className={cn(
                      "inline-flex h-11 items-center justify-center rounded-xl px-6 text-[14px] font-medium text-white transition",
                      disabled
                        ? "cursor-not-allowed bg-[#93C5FD]"
                        : "bg-[#1BAEF5] hover:bg-[#129fe2]",
                    )}
                  >
                    Create Referral
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
