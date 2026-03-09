import { Lock, ShieldCheck } from "lucide-react";

import { cn } from "@/hooks/useCn";
import type { PasswordForm, TwoFactorState } from "../types";

type SecuritySuiteTabProps = {
  passwordForm: PasswordForm;
  twoFactor: TwoFactorState;
  onPasswordChange: (value: PasswordForm) => void;
  onToggle2FA: () => void;
};

const SecuritySuiteTab = ({
  passwordForm,
  twoFactor,
  onPasswordChange,
  onToggle2FA,
}: SecuritySuiteTabProps) => {
  const updateField = <K extends keyof PasswordForm>(
    key: K,
    value: PasswordForm[K],
  ) => {
    onPasswordChange({
      ...passwordForm,
      [key]: value,
    });
  };

  return (
    <div className="space-y-5">
      <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex items-center gap-3">
          <Lock className="h-8 w-8 text-[#94A3B8]" />
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#111827]">
            Password Management
          </h2>
        </div>

        <div className="mt-6">
          <InputField
            label="CURRENT PASSWORD"
            value={passwordForm.currentPassword}
            onChange={(value) => updateField("currentPassword", value)}
          />
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-2">
          <InputField
            label="NEW PASSWORD"
            value={passwordForm.newPassword}
            onChange={(value) => updateField("newPassword", value)}
          />
          <InputField
            label="CONFIRM NEW PASSWORD"
            value={passwordForm.confirmNewPassword}
            onChange={(value) => updateField("confirmNewPassword", value)}
          />
        </div>

        <button
          type="button"
          className="mt-8 inline-flex h-[48px] items-center justify-center rounded-[10px] bg-[#0B1736] px-6 text-[16px] font-medium text-white transition hover:bg-[#0f1e47]"
        >
          Update Password
        </button>
      </section>

      <section className="rounded-[20px] border border-[#DADDE3] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#111827]">
            Two-Factor Authentication (2FA)
          </h2>

          <span
            className={cn(
              "inline-flex h-8 items-center rounded-md px-3 text-[14px] font-semibold",
              twoFactor.enabled
                ? "bg-[#DDF7E8] text-[#0F9F61]"
                : "bg-[#F3F4F6] text-[#6B7280]",
            )}
          >
            {twoFactor.enabled ? "ENABLED" : "DISABLED"}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row">
          <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-[18px] bg-[#E8F8EE]">
            <ShieldCheck className="h-8 w-8 text-[#08A46B]" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[18px] font-semibold text-[#111827]">
              {twoFactor.title}
            </h3>
            <p className="mt-2 max-w-[620px] text-[16px] leading-8 text-[#6B7280]">
              {twoFactor.description}
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-[48px] items-center justify-center rounded-[12px] border border-[#E5E7EB] bg-white px-6 text-[16px] font-medium text-[#6B7280] transition hover:bg-slate-50"
              >
                Manage MFA Methods
              </button>

              <button
                type="button"
                onClick={onToggle2FA}
                className="text-left text-[16px] font-medium text-[#FF3B30] transition hover:opacity-80"
              >
                {twoFactor.enabled ? "Disable 2FA" : "Enable 2FA"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

function InputField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-medium uppercase text-[#8B8F97]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-12 w-full rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-[16px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-300"
      />
    </label>
  );
}

export default SecuritySuiteTab;
