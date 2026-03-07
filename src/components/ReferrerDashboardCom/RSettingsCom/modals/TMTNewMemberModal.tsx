import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  CircleX,
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import { TeamRole } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { useEscClose } from "@/hooks/useEscClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

type PermissionKey =
  | "submitReferrals"
  | "viewOwnReferralsOnly"
  | "viewCommission";

type PermissionState = Record<PermissionKey, boolean>;

type TeamMemberInvitePayload = {
  fullName: string;
  email: string;
  role: TeamRole;
  permissions: PermissionState;
  additionalSeatCost: number;
  newMonthlyTotal: number;
};

type Props = {
  open: boolean;
  onClose: () => void;
  onSubmit?: (payload: TeamMemberInvitePayload) => void;
  baseMonthlyTotal?: number;
  seatCost?: number;
};

type StepOneErrors = {
  fullName: string;
  email: string;
  role: string;
};

const inputClass =
  "h-10 w-full border-0 bg-transparent px-0 text-[18px] text-black outline-none ring-0 placeholder:text-[#C8C8C8] focus:border-0 focus:outline-none focus:ring-0";

const cardClass = "rounded-lg border border-[#CDEEFF] bg-white p-6 transition";

function StepTitle({
  title,
  subtitle,
  onClose,
}: {
  title: string;
  subtitle: string;
  onClose: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div>
        <h2 className="font-medium leading-4 text-[#000000]">{title}</h2>
        <p className="mt-1 text-sm leading-4 text-[#666666]">{subtitle}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        className="text-[#2B2B2B] transition hover:bg-slate-50"
        aria-label="Close modal"
      >
        <CircleX size={24} />
      </button>
    </div>
  );
}

function Field({
  label,
  children,
  error,
}: {
  label: string;
  children: React.ReactNode;
  error?: string;
}) {
  return (
    <div className="relative pt-3">
      <div
        className={cn(
          "relative rounded-[20px] bg-white px-5 pb-4 pt-5 transition",
          error ? "border border-red-500" : "border border-[#737373]",
        )}
      >
        <span className="absolute -top-3 left-10 bg-white px-4 text-[18px] font-medium text-black">
          {label}
        </span>

        {children}

        {error && (
          <p className="mt-2 text-sm font-medium text-red-500">{error}</p>
        )}
      </div>
    </div>
  );
}

function ToggleRow({
  title,
  desc,
  checked,
  onChange,
}: {
  title: string;
  desc: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <div className={cardClass}>
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#222222]">{title}</p>
          <p className="text-xs text-[#8B8B8B]">{desc}</p>
        </div>

        <button
          type="button"
          aria-pressed={checked}
          onClick={() => onChange(!checked)}
          className={cn(
            "relative h-7 w-17 shrink-0 rounded-full border transition",
            checked
              ? "border-[#79D5FF] bg-[#BEEBFF]"
              : "border-slate-300 bg-slate-200",
          )}
        >
          <span
            className={cn(
              "absolute top-1/2 h-5 w-5 -translate-y-1/2 rounded-full shadow-sm transition",
              checked ? "right-1 bg-[#00B4FE]" : "left-1 bg-white",
            )}
          />
        </button>
      </div>
    </div>
  );
}

function FooterButtons({
  backText = "Back",
  nextText = "Next",
  onBack,
  onNext,
  disableNext,
  nextVariant = "primary",
}: {
  backText?: string;
  nextText?: string;
  onBack: () => void;
  onNext: () => void;
  disableNext?: boolean;
  nextVariant?: "primary" | "secondary";
}) {
  return (
    <div className="mt-6 grid grid-cols-2 gap-4">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#00B4FE33] px-4 text-sm leading-4 font-medium text-[#222222] transition hover:bg-[#cbedff]"
      >
        <ChevronLeft className="h-4 w-4" />
        {backText}
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disableNext}
        className={cn(
          "inline-flex h-11 items-center justify-center gap-2 rounded-xl px-4 text-sm font-medium text-white transition",
          nextVariant === "primary"
            ? "bg-[#00B4FE] hover:bg-[#00a3e5]"
            : "bg-emerald-600 hover:bg-emerald-700",
          disableNext && "cursor-not-allowed opacity-50 hover:bg-[#00B4FE]",
        )}
      >
        {nextText}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

const initialPermissions: PermissionState = {
  submitReferrals: true,
  viewOwnReferralsOnly: true,
  viewCommission: true,
};

const initialForm: {
  fullName: string;
  email: string;
  role: TeamRole;
} = {
  fullName: "",
  email: "",
  role: "Staff Member",
};

const initialErrors: StepOneErrors = {
  fullName: "",
  email: "",
  role: "",
};

const TMTNewMemberModal: React.FC<Props> = ({
  open,
  onClose,
  onSubmit,
  baseMonthlyTotal = 150,
  seatCost = 25,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [form, setForm] = useState(initialForm);
  const [permissions, setPermissions] =
    useState<PermissionState>(initialPermissions);
  const [costConfirmed, setCostConfirmed] = useState(false);
  const [errors, setErrors] = useState<StepOneErrors>(initialErrors);
  const [attemptedNext, setAttemptedNext] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);

  useEscClose(open, onClose);
  useLockBodyScroll(open);

  useEffect(() => {
    if (!open) {
      setStep(1);
      setForm(initialForm);
      setPermissions(initialPermissions);
      setCostConfirmed(false);
      setErrors(initialErrors);
      setAttemptedNext(false);
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const onMouseDown = (e: MouseEvent) => {
      if (!panelRef.current) return;
      if (!panelRef.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, [open, onClose]);

  useEffect(() => {
    if (!open || step !== 4) return;

    const timer = setTimeout(() => {
      onClose();
    }, 1800);

    return () => clearTimeout(timer);
  }, [step, open, onClose]);

  const validateStepOne = () => {
    const nextErrors: StepOneErrors = {
      fullName: "",
      email: "",
      role: "",
    };

    if (!form.fullName.trim()) {
      nextErrors.fullName = "Full name is required";
    } else if (form.fullName.trim().length < 2) {
      nextErrors.fullName = "Enter at least 2 characters";
    }

    if (!form.email.trim()) {
      nextErrors.email = "E-mail is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email.trim())) {
      nextErrors.email = "Enter a valid e-mail address";
    }

    if (!form.role.trim()) {
      nextErrors.role = "Role is required";
    }

    setErrors(nextErrors);

    return !nextErrors.fullName && !nextErrors.email && !nextErrors.role;
  };

  const isStepOneValid = useMemo(() => {
    return (
      form.fullName.trim().length > 1 &&
      /\S+@\S+\.\S+/.test(form.email.trim()) &&
      form.role.trim().length > 0
    );
  }, [form]);

  useEffect(() => {
    if (!attemptedNext || step !== 1) return;
    validateStepOne();
  }, [form, attemptedNext, step]);

  const newMonthlyTotal = baseMonthlyTotal + seatCost;

  const handleBack = () => {
    if (step === 1) {
      onClose();
      return;
    }

    if (step === 4) {
      onClose();
      return;
    }

    setStep((prev) => (prev > 1 ? ((prev - 1) as 1 | 2 | 3 | 4) : prev));
  };

  const handleNext = () => {
    if (step === 1) {
      setAttemptedNext(true);
      if (validateStepOne()) {
        setStep(2);
      }
      return;
    }

    if (step === 2) {
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!costConfirmed) return;

      const payload: TeamMemberInvitePayload = {
        fullName: form.fullName.trim(),
        email: form.email.trim(),
        role: form.role,
        permissions,
        additionalSeatCost: seatCost,
        newMonthlyTotal,
      };

      onSubmit?.(payload);
      setStep(4);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/25 p-4">
      <div
        ref={panelRef}
        className="w-full max-w-lg rounded-2xl bg-white p-5 shadow-2xl sm:p-6"
      >
        {step === 1 && (
          <>
            <StepTitle
              title="Add Team Member"
              subtitle="Invite employees to submit referrals"
              onClose={onClose}
            />

            <div className="mt-6 space-y-6">
              <Field label="Full Name" error={errors.fullName}>
                <input
                  type="text"
                  className={inputClass}
                  placeholder="Cameron Williamson"
                  value={form.fullName}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      fullName: e.target.value,
                    }))
                  }
                />
              </Field>

              <Field label="E-mail" error={errors.email}>
                <input
                  type="email"
                  className={inputClass}
                  placeholder="debra.holt@example.com"
                  value={form.email}
                  onChange={(e) =>
                    setForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                />
              </Field>

              <Field label="Role" error={errors.role}>
                <div className="relative">
                  <select
                    className={cn(
                      inputClass,
                      "h-11 appearance-none pr-12 text-black",
                    )}
                    value={form.role}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        role: e.target.value as TeamRole,
                      }))
                    }
                  >
                    <option value="Staff Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>

                  <ChevronDown className="pointer-events-none absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-black" />
                </div>
              </Field>
            </div>

            {attemptedNext && !isStepOneValid && (
              <div className="mt-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                <p className="text-sm font-medium text-red-600">
                  Please fill in all required fields correctly before
                  continuing.
                </p>
              </div>
            )}

            <FooterButtons
              onBack={handleBack}
              onNext={handleNext}
              disableNext={false}
            />
          </>
        )}

        {step === 2 && (
          <>
            <StepTitle
              title="Permission & Access"
              subtitle={`Configure what "${form.fullName || "Name"}" can do`}
              onClose={onClose}
            />

            <div className="mt-6 space-y-5">
              <ToggleRow
                title="Submit Referrals"
                desc="Allow entry of new leads"
                checked={permissions.submitReferrals}
                onChange={(value) =>
                  setPermissions((prev) => ({
                    ...prev,
                    submitReferrals: value,
                  }))
                }
              />

              <ToggleRow
                title="View own referrals only"
                desc="Agent private mode"
                checked={permissions.viewOwnReferralsOnly}
                onChange={(value) =>
                  setPermissions((prev) => ({
                    ...prev,
                    viewOwnReferralsOnly: value,
                  }))
                }
              />

              <ToggleRow
                title="View Commission"
                desc="Take earning history"
                checked={permissions.viewCommission}
                onChange={(value) =>
                  setPermissions((prev) => ({
                    ...prev,
                    viewCommission: value,
                  }))
                }
              />
            </div>

            <FooterButtons onBack={handleBack} onNext={handleNext} />
          </>
        )}

        {step === 3 && (
          <>
            <StepTitle
              title="Add Team Member"
              subtitle="Invite employees to submit referrals"
              onClose={onClose}
            />

            <div className="mt-6 space-y-4">
              <div className="rounded-[14px] bg-[#F5F5F5] text-sm text-black">
                <div className="flex items-center justify-between gap-4 border-b border-[#E5E5E5] py-5 px-2.5">
                  <p className="font-medium">Additional User Seat</p>
                  <p className="font-semibold">${seatCost}/mo</p>
                </div>

                <div className="flex items-center justify-between gap-4 py-5 px-2.5">
                  <p className="font-medium">New Monthly Total</p>
                  <p className="font-semibold">${newMonthlyTotal.toFixed(2)}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setCostConfirmed((v) => !v)}
                className="flex w-full items-start gap-3 rounded-[14px] bg-[#F5F5F5] px-4 py-4 text-left"
              >
                <span
                  className={cn(
                    "mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-sm border transition",
                    costConfirmed
                      ? "border-[#00B4FE] bg-[#00B4FE] text-white"
                      : "border-[#D8D8D8] bg-white text-transparent",
                  )}
                >
                  <Check className="h-3.5 w-3.5" />
                </span>

                <span className="min-w-0">
                  <span className="block text-sm font-semibold text-[#222222]">
                    I understand the additional cost
                  </span>
                  <span className="mt-1 block text-sm text-[#8B8B8B]">
                    Subscription increases by ${seatCost} per month.
                  </span>
                </span>
              </button>

              {!costConfirmed && (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3">
                  <p className="text-sm font-medium text-red-600">
                    Please confirm the additional monthly cost to continue.
                  </p>
                </div>
              )}
            </div>

            <FooterButtons
              nextText="Invite Team Member"
              onBack={handleBack}
              onNext={handleNext}
              disableNext={false}
            />
          </>
        )}

        {step === 4 && (
          <div className="flex min-h-92.5 flex-col items-center justify-center px-4 text-center">
            <div className="rounded-full bg-[#1E7B31] p-6.5">
              <div className="rounded-full border border-white p-3 text-white">
                <Check size={24} />
              </div>
            </div>

            <h3 className="mt-6 text-[34px] font-semibold leading-tight text-[#222222]">
              Invitation Sent!
            </h3>
            <p className="mt-3 max-w-[320px] text-base leading-6 text-[#8B8B8B]">
              Great! {form.fullName || "This user"} will receive an email
              shortly to activate their account.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TMTNewMemberModal;
