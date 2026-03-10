import { useMemo, useState } from "react";
import { Building2, Check, ChevronDown, Info, User, X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import {
  AgreementStatus,
  OnboardPartnerForm,
  PartnerType,
} from "@/pages/BrokerDashboard/BrokerPartnerProfiles/types";
import {
  agreementStatusOptions,
  defaultOnboardPartnerForm,
  partnerProfileStepLabels,
  portalAccessRoleOptions,
} from "@/pages/BrokerDashboard/BrokerPartnerProfiles/mock";

type OnboardPartnerModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (values: OnboardPartnerForm) => void;
};

type StepKey =
  | "partner-profile"
  | "account-setup"
  | "commission-agreement"
  | "banking-details"
  | "review-activate";

const steps: StepKey[] = [
  "partner-profile",
  "account-setup",
  "commission-agreement",
  "banking-details",
  "review-activate",
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

function ModalField({
  label,
  optional,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-2 text-sm font-medium text-[#111827]">
        {label}{" "}
        {optional ? (
          <span className="font-normal text-[#6B7280]">(optional)</span>
        ) : null}
      </div>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="h-12 w-full rounded-2xl border border-[#D1D5DB] bg-white px-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#94A3B8]"
    />
  );
}

function TextArea({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      rows={4}
      className="w-full resize-none rounded-2xl border border-[#D1D5DB] bg-white px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#94A3B8]"
    />
  );
}

function PercentInput({
  value,
  onChange,
  placeholder,
}: {
  value: number | "";
  onChange: (value: number | "") => void;
  placeholder?: string;
}) {
  return (
    <div className="relative">
      <input
        type="number"
        min="0"
        step="0.1"
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          onChange(next === "" ? "" : Number(next));
        }}
        placeholder={placeholder}
        className="h-12 w-full rounded-2xl border border-[#D1D5DB] bg-white pl-4 pr-10 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#94A3B8]"
      />
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7280]">
        %
      </span>
    </div>
  );
}

function SelectMenu<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T | "";
  onChange: (value: T) => void;
  options: readonly T[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-12 w-full items-center justify-between rounded-2xl border border-[#D1D5DB] bg-white px-4 text-left text-sm text-[#111827]"
      >
        <span className={cn(!value && "text-[#9CA3AF]")}>
          {value || placeholder || "Select"}
        </span>
        <ChevronDown className="h-4 w-4 text-[#6B7280]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            aria-label="close select"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white py-1 shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="flex w-full items-center px-4 py-3 text-left text-sm text-[#111827] transition hover:bg-slate-50"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="border-b border-[#E5E7EB] px-4 py-6 sm:px-8">
      <div className="overflow-x-auto">
        <div className="flex min-w-150 items-start justify-between gap-3">
          {partnerProfileStepLabels.map((label, index) => {
            const isActive = index === currentStep;
            const isDone = index < currentStep;

            return (
              <div key={label} className="flex flex-1 items-start gap-3">
                <div className="flex min-w-24 flex-col items-center text-center">
                  <div
                    className={cn(
                      "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold",
                      isActive || isDone
                        ? "bg-[#2563EB] text-white"
                        : "bg-[#E5E7EB] text-[#4B5563]",
                    )}
                  >
                    {isDone ? <Check className="h-5 w-5" /> : index + 1}
                  </div>
                  <p className="mt-3 text-sm leading-5 text-[#4B5563]">
                    {label}
                  </p>
                </div>

                {index !== partnerProfileStepLabels.length - 1 ? (
                  <div
                    className={cn(
                      "mt-5 h-0.5 flex-1",
                      index < currentStep ? "bg-[#2563EB]" : "bg-[#E5E7EB]",
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

function PartnerTypeToggle({
  value,
  onChange,
}: {
  value: PartnerType;
  onChange: (value: PartnerType) => void;
}) {
  return (
    <div className="inline-flex rounded-2xl border border-[#D1D5DB] bg-white p-1">
      <button
        type="button"
        onClick={() => onChange("Company")}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-medium transition",
          value === "Company"
            ? "bg-[#F3F4F6] text-[#111827]"
            : "text-[#4B5563] hover:bg-slate-50",
        )}
      >
        <Building2 className="h-4 w-4" />
        Company
      </button>

      <button
        type="button"
        onClick={() => onChange("Individual")}
        className={cn(
          "inline-flex h-10 items-center gap-2 rounded-xl px-5 text-sm font-medium transition",
          value === "Individual"
            ? "bg-[#F3F4F6] text-[#111827]"
            : "text-[#4B5563] hover:bg-slate-50",
        )}
      >
        <User className="h-4 w-4" />
        Individual
      </button>
    </div>
  );
}

function RadioOption({
  checked,
  title,
  description,
  onClick,
}: {
  checked: boolean;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-start gap-3 text-left"
    >
      <span
        className={cn(
          "mt-1 flex h-5 w-5 shrink-0 rounded-full border-2",
          checked ? "border-[#2563EB]" : "border-[#D1D5DB]",
        )}
      >
        <span
          className={cn(
            "m-auto h-2.5 w-2.5 rounded-full",
            checked ? "bg-[#2563EB]" : "bg-transparent",
          )}
        />
      </span>

      <span>
        <span className="block text-sm font-medium text-[#111827]">
          {title}
        </span>
        <span className="mt-1 block text-sm text-[#6B7280]">{description}</span>
      </span>
    </button>
  );
}

function ReviewCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-3xl bg-[#F9FAFB] p-5">
      <h4 className="text-lg font-semibold text-[#111827]">{title}</h4>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function ReviewRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4 py-1.5">
      <span className="text-sm text-[#6B7280]">{label}</span>
      <span className="text-right text-sm font-medium text-[#111827]">
        {value}
      </span>
    </div>
  );
}

const OnboardPartnerModal = ({
  open,
  onClose,
  onSubmit,
}: OnboardPartnerModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [form, setForm] = useState<OnboardPartnerForm>(
    defaultOnboardPartnerForm,
  );

  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  const exampleLoanAmount = 500000;

  const referrerCommissionValue =
    form.referrerCommissionPercent === ""
      ? 0
      : (exampleLoanAmount * form.referrerCommissionPercent) / 100;

  const aggregatorFeeValue =
    form.aggregatorFeePercent === ""
      ? 0
      : (exampleLoanAmount * form.aggregatorFeePercent) / 100;

  const canGoNext = useMemo(() => {
    switch (currentStep) {
      case 0:
        return Boolean(
          form.partnerName.trim() &&
          form.primaryContactName.trim() &&
          form.email.trim() &&
          form.phoneNumber.trim() &&
          (form.partnerType === "Individual" || form.abn.trim()),
        );
      case 1:
        return Boolean(form.loginEmail.trim() && form.portalAccessRole);
      case 2:
        return Boolean(
          form.agreementName.trim() &&
          form.effectiveStartDate.trim() &&
          form.agreementStatus &&
          form.referrerCommissionPercent !== "" &&
          form.aggregatorFeePercent !== "",
        );
      case 3:
        return Boolean(
          form.bankName.trim() &&
          form.bsb.trim() &&
          form.accountNumber.trim() &&
          form.accountHolder.trim(),
        );
      case 4:
        return form.confirmAgreement;
      default:
        return false;
    }
  }, [currentStep, form]);

  const updateForm = <K extends keyof OnboardPartnerForm>(
    key: K,
    value: OnboardPartnerForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleBack = () => {
    if (currentStep === 0) return;
    setCurrentStep((prev) => prev - 1);
  };

  const handleNext = () => {
    if (!canGoNext) return;

    if (currentStep === steps.length - 1) {
      onSubmit?.(form);
      onClose();
      return;
    }

    setCurrentStep((prev) => prev + 1);
  };

  const handleClose = () => {
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 p-3 sm:p-6">
      <div
        ref={modalRef}
        className="mx-auto flex max-h-[96vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] bg-white shadow-[0_30px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-5 sm:px-8">
          <h2 className="text-xl font-semibold text-[#111827] sm:text-[24px]">
            Onboard New Referral Partner
          </h2>

          <button
            type="button"
            onClick={handleClose}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#94A3B8] transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <Stepper currentStep={currentStep} />

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          {currentStep === 0 ? (
            <div className="mx-auto max-w-270 space-y-6">
              <div>
                <div className="mb-2 text-sm font-medium text-[#111827]">
                  Partner Type
                </div>
                <PartnerTypeToggle
                  value={form.partnerType}
                  onChange={(value) => updateForm("partnerType", value)}
                />
              </div>

              <ModalField label="Partner Name">
                <TextInput
                  value={form.partnerName}
                  onChange={(value) => updateForm("partnerName", value)}
                  placeholder="Enter partner name"
                />
              </ModalField>

              <ModalField label="Primary Contact Name">
                <TextInput
                  value={form.primaryContactName}
                  onChange={(value) => updateForm("primaryContactName", value)}
                  placeholder="Enter contact name"
                />
              </ModalField>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ModalField label="Email Address">
                  <TextInput
                    type="email"
                    value={form.email}
                    onChange={(value) => updateForm("email", value)}
                    placeholder="partner@example.com"
                  />
                </ModalField>

                <ModalField label="Phone Number">
                  <TextInput
                    value={form.phoneNumber}
                    onChange={(value) => updateForm("phoneNumber", value)}
                    placeholder="+61 400 000 000"
                  />
                </ModalField>
              </div>

              {form.partnerType === "Company" ? (
                <ModalField label="Company Registration Number (ABN)">
                  <TextInput
                    value={form.abn}
                    onChange={(value) => updateForm("abn", value)}
                    placeholder="XX XXX XXX XXX"
                  />
                </ModalField>
              ) : null}

              <ModalField label="Business Address" optional>
                <TextArea
                  value={form.businessAddress}
                  onChange={(value) => updateForm("businessAddress", value)}
                  placeholder="Enter business address"
                />
              </ModalField>
            </div>
          ) : null}

          {currentStep === 1 ? (
            <div className="mx-auto max-w-270 space-y-6">
              <ModalField label="Login Email">
                <TextInput
                  type="email"
                  value={form.loginEmail}
                  onChange={(value) => updateForm("loginEmail", value)}
                  placeholder="login@example.com"
                />
              </ModalField>

              <label className="inline-flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.sendInvitationEmail}
                  onChange={(e) =>
                    updateForm("sendInvitationEmail", e.target.checked)
                  }
                  className="h-4 w-4 rounded border border-[#D1D5DB]"
                />
                <span className="text-sm text-[#111827]">
                  Send Invitation Email
                </span>
              </label>

              <div>
                <h3 className="text-sm font-medium text-[#111827]">
                  Partner Portal Access Role
                </h3>

                <div className="mt-4 space-y-4">
                  {portalAccessRoleOptions.map((role) => (
                    <RadioOption
                      key={role}
                      checked={form.portalAccessRole === role}
                      title={role}
                      description={
                        role === "Partner Admin"
                          ? "Full access to manage referrals and team"
                          : "Limited access to submit referrals only"
                      }
                      onClick={() => updateForm("portalAccessRole", role)}
                    />
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-[#EFF6FF] px-5 py-4 text-[#1D4ED8]">
                <div className="flex items-start gap-3">
                  <Info className="mt-0.5 h-5 w-5 shrink-0" />
                  <p className="text-sm leading-6">
                    Partner will receive an email invitation to create a
                    password and access their referral dashboard.
                  </p>
                </div>
              </div>
            </div>
          ) : null}

          {currentStep === 2 ? (
            <div className="mx-auto max-w-270 space-y-6">
              <ModalField label="Agreement Name">
                <TextInput
                  value={form.agreementName}
                  onChange={(value) => updateForm("agreementName", value)}
                  placeholder="e.g., Standard Referral Agreement 2026"
                />
              </ModalField>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ModalField label="Effective Start Date">
                  <TextInput
                    type="date"
                    value={form.effectiveStartDate}
                    onChange={(value) =>
                      updateForm("effectiveStartDate", value)
                    }
                  />
                </ModalField>

                <ModalField label="Agreement Status">
                  <SelectMenu<AgreementStatus>
                    value={form.agreementStatus}
                    onChange={(value) => updateForm("agreementStatus", value)}
                    options={agreementStatusOptions}
                    placeholder="Select status"
                  />
                </ModalField>
              </div>

              <div className="h-px bg-[#E5E7EB]" />

              <div>
                <h3 className="text-sm font-medium text-[#111827]">
                  Commission Rules
                </h3>

                <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-2">
                  <ModalField label="Referrer Commission %">
                    <PercentInput
                      value={form.referrerCommissionPercent}
                      onChange={(value) =>
                        updateForm("referrerCommissionPercent", value)
                      }
                      placeholder="1.0"
                    />
                  </ModalField>

                  <ModalField label="Aggregator Fee %">
                    <PercentInput
                      value={form.aggregatorFeePercent}
                      onChange={(value) =>
                        updateForm("aggregatorFeePercent", value)
                      }
                      placeholder="0.5"
                    />
                  </ModalField>
                </div>
              </div>

              <div className="rounded-3xl bg-[#F9FAFB] p-6">
                <h4 className="text-lg font-semibold text-[#111827]">
                  Commission Calculation Example
                </h4>

                <div className="mt-4 space-y-2 text-[15px] text-[#374151]">
                  <p>Loan Amount: {formatCurrency(exampleLoanAmount)}</p>
                  <p>
                    Referrer Commission (
                    {form.referrerCommissionPercent === ""
                      ? "0"
                      : form.referrerCommissionPercent}
                    %):{" "}
                    <span className="font-semibold">
                      {formatCurrency(referrerCommissionValue)}
                    </span>
                  </p>
                  <p>
                    Aggregator Fee (
                    {form.aggregatorFeePercent === ""
                      ? "0"
                      : form.aggregatorFeePercent}
                    %):{" "}
                    <span className="font-semibold">
                      {formatCurrency(aggregatorFeeValue)}
                    </span>
                  </p>
                </div>
              </div>

              <p className="text-sm font-medium text-[#374151]">
                Referrer only sees commission earned, not loan calculation
                formulas
              </p>
            </div>
          ) : null}

          {currentStep === 3 ? (
            <div className="mx-auto max-w-270 space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ModalField label="Bank Name">
                  <TextInput
                    value={form.bankName}
                    onChange={(value) => updateForm("bankName", value)}
                    placeholder="e.g. AB Bank"
                  />
                </ModalField>

                <ModalField label="BSB">
                  <TextInput
                    value={form.bsb}
                    onChange={(value) => updateForm("bsb", value)}
                    placeholder="333222"
                  />
                </ModalField>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <ModalField label="Account Number">
                  <TextInput
                    value={form.accountNumber}
                    onChange={(value) => updateForm("accountNumber", value)}
                    placeholder="987654321"
                  />
                </ModalField>

                <ModalField label="Account Holder">
                  <TextInput
                    value={form.accountHolder}
                    onChange={(value) => updateForm("accountHolder", value)}
                    placeholder="Account holder name"
                  />
                </ModalField>
              </div>
            </div>
          ) : null}

          {currentStep === 4 ? (
            <div className="mx-auto max-w-270 space-y-6">
              <ReviewCard title="Partner Profile">
                <div className="grid gap-2">
                  <ReviewRow label="Partner Type" value={form.partnerType} />
                  <ReviewRow
                    label="Partner Name"
                    value={form.partnerName || "-"}
                  />
                  <ReviewRow
                    label="Primary Contact"
                    value={form.primaryContactName || "-"}
                  />
                  <ReviewRow label="Email" value={form.email || "-"} />
                  <ReviewRow label="Phone" value={form.phoneNumber || "-"} />
                  {form.partnerType === "Company" ? (
                    <ReviewRow label="ABN" value={form.abn || "-"} />
                  ) : null}
                  <ReviewRow
                    label="Business Address"
                    value={form.businessAddress || "-"}
                  />
                </div>
              </ReviewCard>

              <ReviewCard title="Account Login Email">
                <div className="space-y-2">
                  <p className="text-lg font-medium text-[#111827]">
                    {form.loginEmail || "-"}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    Portal Access: {form.portalAccessRole}
                  </p>
                </div>
              </ReviewCard>

              <ReviewCard title="Commission Agreement">
                <div className="grid gap-2">
                  <ReviewRow
                    label="Agreement Name"
                    value={form.agreementName || "-"}
                  />
                  <ReviewRow
                    label="Effective Date"
                    value={form.effectiveStartDate || "-"}
                  />
                  <ReviewRow
                    label="Agreement Status"
                    value={form.agreementStatus || "-"}
                  />
                  <ReviewRow
                    label="Referrer Commission"
                    value={`${form.referrerCommissionPercent || 0}%`}
                  />
                  <ReviewRow
                    label="Aggregator Fee"
                    value={`${form.aggregatorFeePercent || 0}%`}
                  />
                </div>
              </ReviewCard>

              <ReviewCard title="Banking Details">
                <div className="grid gap-2">
                  <ReviewRow label="Bank Name" value={form.bankName || "-"} />
                  <ReviewRow label="BSB" value={form.bsb || "-"} />
                  <ReviewRow
                    label="Account Number"
                    value={form.accountNumber || "-"}
                  />
                  <ReviewRow
                    label="Account Holder"
                    value={form.accountHolder || "-"}
                  />
                </div>
              </ReviewCard>

              <label className="inline-flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={form.confirmAgreement}
                  onChange={(e) =>
                    updateForm("confirmAgreement", e.target.checked)
                  }
                  className="mt-1 h-5 w-5 rounded border border-[#D1D5DB]"
                />
                <span className="text-sm text-[#374151]">
                  I confirm that the referral partner agreement is correct.
                </span>
              </label>
            </div>
          ) : null}
        </div>

        <div className="flex flex-col gap-3 border-t border-[#E5E7EB] bg-[#F9FAFB] px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <button
            type="button"
            onClick={handleBack}
            disabled={currentStep === 0}
            className={cn(
              "inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-medium transition",
              currentStep === 0
                ? "cursor-not-allowed text-[#9CA3AF]"
                : "text-[#374151] hover:bg-slate-100",
            )}
          >
            Back
          </button>

          <div className="flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-medium text-[#374151] transition hover:bg-slate-100"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={!canGoNext}
              className={cn(
                "inline-flex h-12 items-center justify-center rounded-2xl px-6 text-sm font-medium text-white transition",
                canGoNext
                  ? "bg-[#2563EB] hover:bg-[#1D4ED8]"
                  : "cursor-not-allowed bg-[#93C5FD]",
              )}
            >
              {currentStep === steps.length - 1
                ? "Confirm & Activate Partner"
                : "Next"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnboardPartnerModal;
