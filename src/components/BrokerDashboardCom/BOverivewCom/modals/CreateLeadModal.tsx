import { useMemo, useState } from "react";
import { Check, ChevronDown, Percent, X } from "lucide-react";
import { cn } from "@/hooks/useCn";
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

function SelectMenu<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T | "";
  onChange: (value: T) => void;
  options: readonly T[];
  placeholder: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-[10px] bg-[#F3F3F5] px-4 text-left text-[14px] text-[#2A2A2A]"
      >
        <span className={cn(!value && "text-[#A2A2A2]")}>
          {value || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-[#8A8FA3]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-110"
          />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-120 overflow-hidden rounded-[18px] border border-[#ECECEC] bg-white shadow-[0_16px_40px_rgba(15,23,42,0.12)]">
            <div className="py-1">
              {options.map((option) => {
                const active = value === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => {
                      onChange(option);
                      setOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between px-5 py-4 text-left text-[16px] transition",
                      active
                        ? "bg-[#F3F3F5] text-[#222]"
                        : "hover:bg-[#FAFAFA]",
                    )}
                  >
                    <span>{option}</span>
                    {active ? (
                      <Check className="h-4 w-4 text-[#8A8FA3]" />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </div>
        </>
      ) : null}
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
      <label className="block text-[14px] text-[#6F6F6F]">
        {label}
        {required ? <span className="ml-1 text-[#F15B5B]">*</span> : null}
      </label>
      {children}
      {hint ? <p className="text-[12px] text-[#8A8A8A]">{hint}</p> : null}
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
      className="h-11 w-full rounded-[10px] bg-[#F3F3F5] px-4 text-[14px] text-[#222] outline-none placeholder:text-[#9B9B9B]"
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

  const estimatedCommission = useMemo(() => {
    const amount = parseMoneyInput(form.estimatedLoanAmount);
    return Number((amount * 0.0045333333).toFixed(2));
  }, [form.estimatedLoanAmount]);

  const disabled =
    !form.fullName.trim() ||
    !form.email.trim() ||
    !form.mobile.trim() ||
    !form.assignTo;

  if (!open) return null;

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

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/35 px-4 py-6">
      <div className="w-full max-w-135 rounded-3xl bg-white shadow-[0_24px_80px_rgba(0,0,0,0.25)]">
        <div className="flex items-start justify-between border-b border-[#E7E7E7] px-8 py-7">
          <div>
            <h3 className="text-[22px] font-semibold leading-none text-[#202020]">
              Create New Lead
            </h3>
            <p className="mt-3 text-[14px] text-[#808080]">
              Capture basic client details to start the referral process.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl text-[#7A8395] transition hover:bg-[#F5F5F5]"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-8 py-7">
          <div className="space-y-8">
            <div className="space-y-5">
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
                  onChange={(value) => setForm((p) => ({ ...p, email: value }))}
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
            </div>

            <div className="space-y-5">
              <h4 className="text-[15px] font-semibold text-[#222]">
                Lead Information
              </h4>

              <Field label="Estimated Loan Amount">
                <TextInput
                  value={form.estimatedLoanAmount}
                  onChange={(value) =>
                    setForm((p) => ({ ...p, estimatedLoanAmount: value }))
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
                  options={stageOptions}
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
                  options={teamMembers.map((member) => member.id)}
                  placeholder="Select team member"
                />
              </Field>

              {form.assignTo ? (
                <p className="text-[12px] text-[#666]">
                  Assigned to:{" "}
                  <span className="font-medium">
                    {teamMembers.find((m) => m.id === form.assignTo)?.name}
                  </span>
                </p>
              ) : null}
            </div>

            <div className="rounded-[14px] border border-[#A7E7B4] bg-[#EEF8F0] p-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D5F1DB] text-[#0A9B49]">
                  <Percent className="h-5 w-5" strokeWidth={2.2} />
                </div>

                <div>
                  <p className="text-[14px] font-semibold text-[#1E1E1E]">
                    Estimated Referrer Commission
                  </p>
                  <h5 className="mt-1 text-[18px] font-semibold text-[#059647]">
                    {formatMoney(estimatedCommission)}
                  </h5>
                  <p className="mt-2 max-w-[320px] text-[13px] leading-6 text-[#6E6E6E]">
                    Automatically calculated based on the partner agreement and
                    updated as details are entered.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-4 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-11 items-center justify-center rounded-md border border-black px-7 text-[14px] font-medium text-[#222]"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreate}
                disabled={disabled}
                className={cn(
                  "inline-flex h-11 items-center justify-center rounded-md px-7 text-[14px] font-medium text-white",
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
  );
}
