// src/components/ReferrerDashboardCom/RSettingsCom/MyProfileTab.tsx

import React, { useEffect, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { ProfileForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";
import { Toggle } from "@/hooks/useToggle2";

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative pt-3", className)}>
      <div className="relative min-h-21 rounded-[18px] border border-[#AFAFAF] bg-white px-7 pb-5 pt-7 md:min-h-18 md:rounded-lg md:px-5 md:pb-3 md:pt-4">
        <span className="absolute -top-3 left-8 bg-white px-3 text-[15px] leading-none text-black md:-top-2 md:left-6 md:text-sm md:leading-3.5">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

const inputBase =
  "w-full border-0 bg-transparent p-0 text-[17px] outline-none ring-0 placeholder:text-[#D0D0D0] focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 md:text-sm";

export default function MyProfileTab({
  value,
  onSave,
}: {
  value: ProfileForm;
  onSave: (next: ProfileForm) => void;
}) {
  const [form, setForm] = useState<ProfileForm>(value);

  useEffect(() => setForm(value), [value]);

  return (
    <div className="space-y-8 md:space-y-6">
      {/* main section */}
      <div className="bg-white">
        {/* header */}
        <div className="px-0">
          <p className="text-[18px] font-medium text-black md:text-base">
            Personal Information
          </p>
          <p className="mt-3 max-w-155 text-[16px] leading-8 text-[#666666] md:mt-2 md:text-sm md:leading-6">
            Update your account details and contact information.
          </p>
        </div>

        {/* form */}
        <div className="mt-8 grid gap-7 md:mt-7 md:grid-cols-2 md:gap-6">
          <Field label="Full Name">
            <input
              className={cn(inputBase, "text-[#CDCDCD]")}
              value={form.fullName}
              onChange={(e) =>
                setForm((p) => ({ ...p, fullName: e.target.value }))
              }
              placeholder="Cameron Williamson"
            />
          </Field>

          <Field label="E-mail">
            <input
              className={cn(inputBase, "text-[#CDCDCD]")}
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="debra.holt@example.com"
            />
          </Field>

          <Field label="Business Name">
            <input
              className={cn(inputBase, "uppercase text-[#CDCDCD]")}
              value={form.businessName}
              onChange={(e) =>
                setForm((p) => ({ ...p, businessName: e.target.value }))
              }
              placeholder="TECHFLOW SOLUTIONS"
            />
          </Field>

          <Field label="Verification Status">
            <div className="flex min-h-8 items-center">
              <span className="text-[17px] text-[#1B7231] md:text-sm">
                {form.verificationStatus}
              </span>
            </div>
          </Field>

          <Field label="Account Status">
            <div className="flex min-h-8 items-center">
              <span className="inline-flex items-center rounded-full border border-[#4ADE80] bg-[#15D9461A] px-6 py-2 text-[16px] leading-none text-[#15D946] md:px-5 md:py-1.5 md:text-sm">
                {form.accountStatus}
              </span>
            </div>
          </Field>

          <Field label="Mobile Number">
            <input
              className={cn(inputBase, "text-[#1B7231]")}
              value={form.mobileNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, mobileNumber: e.target.value }))
              }
              placeholder="+61400000000"
            />
          </Field>

          <Field label="GST Registered" className="md:col-span-1">
            <div className="flex min-h-8 items-center justify-between gap-4">
              <span className="text-[17px] lowercase text-black md:text-sm">
                {form.gstRegistered ? "yes" : "no"}
              </span>

              <Toggle
                value={form.gstRegistered}
                onChange={(v) => setForm((p) => ({ ...p, gstRegistered: v }))}
              />
            </div>
          </Field>

          <Field label="ABN Number">
            <input
              className={cn(
                inputBase,
                "tracking-[0.18em] text-black md:tracking-[0.12em]",
              )}
              value={form.abnNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, abnNumber: e.target.value }))
              }
              placeholder="xxxxxxxxxxxxxxxx"
            />
          </Field>
        </div>

        {/* save button */}
        <button
          type="button"
          onClick={() => onSave(form)}
          className={cn(
            "mt-8 inline-flex h-17 w-full items-center justify-center gap-3 rounded-lg bg-[#00B4FE] px-6 text-[18px] font-medium text-white transition hover:opacity-95 md:mt-7 md:h-12 md:w-auto md:rounded-sm md:px-5 md:text-sm",
          )}
        >
          <Save className="h-6 w-6 md:h-5 md:w-5" />
          Save Change
        </button>
      </div>

      {/* delete card */}
      <div className="rounded-3xl border border-[#F0A4A4] bg-[#FFF6F6] px-6 py-8 md:rounded-2xl md:px-6 md:py-6">
        <div className="flex flex-col gap-6">
          <div>
            <p className="text-[18px] font-medium text-black md:text-base">
              Personal Information
            </p>
            <p className="mt-3 max-w-105 text-[16px] leading-8 text-[#666666] md:mt-2 md:text-sm md:leading-6">
              Update your account details and contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              alert("Delete account (mock).");
            }}
            className="inline-flex h-17 w-full items-center justify-center gap-3 rounded-[10px] border border-[#F0A4A4] bg-white px-6 text-[18px] font-medium text-[#E57373] transition hover:bg-red-50 md:h-11 md:w-auto md:rounded-xl md:px-5 md:text-sm"
          >
            <Trash2 className="h-6 w-6 md:h-4 md:w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
