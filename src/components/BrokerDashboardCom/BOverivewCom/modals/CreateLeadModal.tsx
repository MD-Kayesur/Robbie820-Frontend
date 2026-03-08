import { useEffect, useMemo, useRef, useState } from "react";
import { Check, ChevronDown, Percent, X } from "lucide-react";
import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import type {
  CreateLeadForm,
  CreateLeadStage,
  Lead,
  RangeKey,
  TeamMember,
} from "../../../../pages/BrokerDashboard/BrokerOverview/types";
import {
  buildLeadFromCreateForm,
  formatMoney,
  parseMoneyInput,
} from "../../../../pages/BrokerDashboard/BrokerOverview/utils";

const stageOptions: CreateLeadStage[] = [
  "New Lead",
  "Contacted",
  "Application in Progress",
  "Submitted to Lender",
  "Settled",
];

const defaultForm: CreateLeadForm = {
  fullName: "",
  email: "",
  mobile: "",
  companyName: "",
  estimatedLoanAmount: "",
  leadStage: "New Lead",
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
          "flex h-11 w-full items-center justify-between rounded-[10px] border border-transparent bg-[#F3F3F5] px-4 text-left text-[14px] text-[#2A2A2A] outline-none transition",
          "hover:border-[#DADCE3] focus:border-[#111] focus:bg-white",
        )}
      >
        <span className={cn(!value && "text-[#A2A2A2]")}>
          {selectedLabel || placeholder}
        </span>

        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#8A8FA3] transition-transform",
            open && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "absolute left-0 right-0 top-[calc(100%+8px)] z-130 overflow-hidden rounded-[18px] border border-[#ECECEC] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)] transition",
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0",
        )}
      >
        <div className="max-h-64 overflow-y-auto py-1">
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
                  "flex w-full items-center justify-between px-4 py-3 text-left text-[14px] transition sm:px-5 sm:py-4 sm:text-[15px]",
                  active
                    ? "bg-[#F3F3F5] text-[#222]"
                    : "text-[#2A2A2A] hover:bg-[#FAFAFA]",
                )}
              >
                <span className="pr-4">{option.label}</span>
                {active ? (
                  <Check className="h-4 w-4 shrink-0 text-[#8A8FA3]" />
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
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2.5">
      <label className="block text-[13px] text-[#6F6F6F] sm:text-[14px]">
        {label}
        {required ? <span className="ml-1 text-[#F15B5B]">*</span> : null}
      </label>
      {children}
      {hint ? (
        <p className="text-[12px] leading-5 text-[#8A8A8A]">{hint}</p>
      ) : null}
    </div>
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
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={cn(
        "h-11 w-full rounded-[10px] border border-transparent bg-[#F3F3F5] px-4 text-[14px] text-[#222] outline-none transition",
        "placeholder:text-[#9B9B9B] hover:border-[#DADCE3] focus:border-[#111] focus:bg-white",
      )}
    />
  );
}

type Props = {
  open: boolean;
  onClose: () => void;
  onCreate: (lead: Lead) => void;
  timeline: RangeKey;
  teamMembers: TeamMember[];
};

export default function CreateLeadModal({
  open,
  onClose,
  onCreate,
  timeline,
  teamMembers,
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

  const estimatedCommission = useMemo(() => {
    const amount = parseMoneyInput(form.estimatedLoanAmount);
    return Number((amount * 0.0045333333).toFixed(2));
  }, [form.estimatedLoanAmount]);

  const teamMemberOptions = useMemo(
    () =>
      teamMembers.map((member) => ({
        value: member.id,
        label: member.name,
      })),
    [teamMembers],
  );

  const disabled =
    !form.fullName.trim() ||
    !form.email.trim() ||
    !form.mobile.trim() ||
    !form.assignTo;

  const handleClose = () => {
    onClose();
  };

  const handleCreate = () => {
    if (disabled) return;

    const newLead = buildLeadFromCreateForm({
      form,
      timeline,
      teamMembers,
    });

    onCreate(newLead);
    setForm(defaultForm);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-120">
      <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />

      <div className="absolute inset-0 overflow-y-auto">
        <div className="flex min-h-full items-end justify-center p-0 sm:items-center sm:p-4 lg:p-6">
          <div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="create-lead-modal-title"
            className={cn(
              "relative w-full bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]",
              "max-h-dvh overflow-hidden rounded-t-[28px]",
              "sm:max-h-[calc(100dvh-32px)] sm:max-w-2xl sm:rounded-[28px]",
              "lg:max-w-4xl",
            )}
          >
            <div className="flex items-start justify-between gap-4 border-b border-[#E7E7E7] px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
              <div className="min-w-0">
                <h3
                  id="create-lead-modal-title"
                  className="text-[20px] font-semibold leading-tight text-[#202020] sm:text-[22px]"
                >
                  Create New Lead
                </h3>
                <p className="mt-2 text-[13px] leading-6 text-[#808080] sm:mt-3 sm:text-[14px]">
                  Capture basic client details to start the referral process.
                </p>
              </div>

              <button
                ref={closeButtonRef}
                type="button"
                onClick={handleClose}
                aria-label="Close modal"
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#7A8395] transition hover:bg-[#F5F5F5] focus:outline-none focus:ring-2 focus:ring-black/10"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="max-h-[calc(100dvh-88px)] overflow-y-auto px-4 py-5 sm:max-h-[calc(100dvh-170px)] sm:px-6 sm:py-6 lg:px-8 lg:py-7">
              <div className="space-y-6 sm:space-y-7 lg:space-y-8">
                <div className="grid grid-cols-1 lg:gap-8">
                  <section className="space-y-5">
                    <h4 className="text-[15px] font-semibold text-[#222]">
                      Client Details
                    </h4>

                    <Field label="Full Name" required>
                      <TextInput
                        value={form.fullName}
                        onChange={(value) =>
                          setForm((p) => ({ ...p, fullName: value }))
                        }
                        placeholder="e.g. Jonathan Smith"
                      />
                    </Field>

                    <Field label="Email Address" required>
                      <TextInput
                        type="email"
                        value={form.email}
                        onChange={(value) =>
                          setForm((p) => ({ ...p, email: value }))
                        }
                        placeholder="jonathan@email.com"
                      />
                    </Field>

                    <Field label="Mobile Number" required>
                      <TextInput
                        value={form.mobile}
                        onChange={(value) =>
                          setForm((p) => ({ ...p, mobile: value }))
                        }
                        placeholder="+61 XXX XXX XXX"
                      />
                    </Field>

                    <Field label="Company Name">
                      <TextInput
                        value={form.companyName}
                        onChange={(value) =>
                          setForm((p) => ({ ...p, companyName: value }))
                        }
                        placeholder="e.g. TechFlow Solutions"
                      />
                    </Field>
                  </section>

                  <section className="space-y-5">
                    <div className="space-y-5">
                      <h4 className="text-[15px] font-semibold text-[#222]">
                        Lead Information
                      </h4>

                      <Field label="Estimated Loan Amount">
                        <TextInput
                          value={form.estimatedLoanAmount}
                          onChange={(value) =>
                            setForm((p) => ({
                              ...p,
                              estimatedLoanAmount: value,
                            }))
                          }
                          placeholder="$350,000"
                        />
                      </Field>

                      <Field label="Lead Stage" required>
                        <SelectMenu<CreateLeadStage>
                          value={form.leadStage}
                          onChange={(value) =>
                            setForm((p) => ({ ...p, leadStage: value }))
                          }
                          options={stageOptions.map((stage) => ({
                            label: stage,
                            value: stage,
                          }))}
                          placeholder="Select lead stage"
                        />
                      </Field>
                    </div>

                    <div className="space-y-5">
                      <h4 className="text-[15px] font-semibold text-[#222]">
                        Assign to Team Member
                      </h4>

                      <Field
                        label="Allocate Lead To"
                        required
                        hint="Select which team member will manage this lead."
                      >
                        <SelectMenu<string>
                          value={form.assignTo}
                          onChange={(value) =>
                            setForm((p) => ({ ...p, assignTo: value }))
                          }
                          options={teamMemberOptions}
                          placeholder="Select team member"
                        />
                      </Field>

                      {form.assignTo ? (
                        <p className="text-[12px] leading-5 text-[#666]">
                          Assigned to:{" "}
                          <span className="font-medium">
                            {teamMembers.find((m) => m.id === form.assignTo)
                              ?.name || "-"}
                          </span>
                        </p>
                      ) : null}
                    </div>
                  </section>
                </div>

                <div className="rounded-[14px] border border-[#A7E7B4] bg-[#EEF8F0] p-4 sm:p-5">
                  <div className="flex flex-col gap-4 sm:flex-row">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D5F1DB] text-[#0A9B49]">
                      <Percent className="h-5 w-5" strokeWidth={2.2} />
                    </div>

                    <div className="min-w-0">
                      <p className="text-[14px] font-semibold text-[#1E1E1E]">
                        Estimated Referrer Commission
                      </p>
                      <h5 className="mt-1 wrap-break-word text-[18px] font-semibold text-[#059647] sm:text-[20px]">
                        {formatMoney(estimatedCommission)}
                      </h5>
                      <p className="mt-2 max-w-105 text-[13px] leading-6 text-[#6E6E6E]">
                        Automatically calculated based on the partner agreement
                        and updated as details are entered.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col-reverse gap-3 border-t border-[#EFEFEF] pt-4 sm:flex-row sm:items-center sm:justify-end sm:gap-4 sm:pt-5">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="inline-flex h-11 w-full items-center justify-center rounded-md border border-black px-6 text-[14px] font-medium text-[#222] transition hover:bg-[#FAFAFA] sm:w-auto sm:px-7"
                  >
                    Cancel
                  </button>

                  <button
                    type="button"
                    onClick={handleCreate}
                    disabled={disabled}
                    className={cn(
                      "inline-flex h-11 w-full items-center justify-center rounded-md px-6 text-[14px] font-medium text-white transition sm:w-auto sm:px-7",
                      disabled
                        ? "cursor-not-allowed bg-black/40"
                        : "bg-black hover:bg-[#111]",
                    )}
                  >
                    Create Lead
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
