// src/pages/BrokerDashboard/BrokerSettings/components/SecuritySuiteTab.tsx
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
      <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex items-center gap-3">
          <Lock className="h-6 w-6 text-[#94A3B8] sm:h-8 sm:w-8" />
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[22px]">
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
          className="mt-8 inline-flex h-[46px] w-full items-center justify-center rounded-[10px] bg-[#0B1736] px-6 text-[15px] font-medium text-white transition hover:bg-[#0f1e47] sm:h-[48px] sm:w-auto sm:text-[16px]"
        >
          Update Password
        </button>
      </section>

      <section className="rounded-[20px] border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[22px]">
            Two-Factor Authentication (2FA)
          </h2>

          <span
            className={cn(
              "inline-flex h-8 w-fit items-center rounded-md px-3 text-[13px] font-semibold sm:text-[14px]",
              twoFactor.enabled
                ? "bg-[#DDF7E8] text-[#0F9F61]"
                : "bg-[#F3F4F6] text-[#6B7280]",
            )}
          >
            {twoFactor.enabled ? "ENABLED" : "DISABLED"}
          </span>
        </div>

        <div className="mt-6 flex flex-col gap-5 sm:flex-row">
          <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[18px] bg-[#E8F8EE] sm:h-[60px] sm:w-[60px]">
            <ShieldCheck className="h-7 w-7 text-[#08A46B] sm:h-8 sm:w-8" />
          </div>

          <div className="min-w-0">
            <h3 className="text-[16px] font-semibold text-[#111827] sm:text-[18px]">
              {twoFactor.title}
            </h3>
            <p className="mt-2 max-w-[620px] text-[14px] leading-7 text-[#6B7280] sm:text-[16px] sm:leading-8">
              {twoFactor.description}
            </p>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center">
              <button
                type="button"
                className="inline-flex h-[46px] w-full items-center justify-center rounded-[12px] border border-[#E5E7EB] bg-white px-6 text-[15px] font-medium text-[#6B7280] transition hover:bg-slate-50 sm:h-[48px] sm:w-auto sm:text-[16px]"
              >
                Manage MFA Methods
              </button>

              <button
                type="button"
                onClick={onToggle2FA}
                className="text-left text-[15px] font-medium text-[#FF3B30] transition hover:opacity-80 sm:text-[16px]"
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
      <span className="mb-2 block text-[12px] font-medium uppercase text-[#8B8F97] sm:text-[13px]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-[12px] border border-[#EEF2F7] bg-[#F8FAFC] px-4 text-[15px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-300 sm:h-12 sm:text-[16px]"
      />
    </label>
  );
}

export default SecuritySuiteTab;
