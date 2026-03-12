// src/components/ReferrerDashboardCom/RSettingsCom/MyProfileTab.tsx

import React, { useEffect, useState } from "react";
import { Save, Trash } from "lucide-react";
import { ProfileForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";
import { Toggle } from "@/hooks/useToggle2";

function Field({
  label,
  children,
  className,
  noBorder,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <div className={cn("relative pt-3", className)}>
      <div
        className={cn(
          "relative rounded-lg bg-white px-5 pt-3 pb-4",
          !noBorder && "border border-[#AFAFAF]",
        )}
      >
        <span className="absolute -top-2 left-8 bg-white px-3.5 text-sm leading-none text-black">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

const inputBase =
  "w-full border-0 bg-transparent p-0 placeholder:text-[#CDCDCD] text-xs";

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
    <div className="space-y-8 md:space-y-6 max-w-3xl mx-auto border border-[#CDCDCD] rounded-2xl px-6 py-8">
      {/* main section */}
      <div className="bg-white">
        {/* header */}
        <div className="px-0 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p className="font-medium text-black md:text-base">
              Personal Information
            </p>
            <p className="text-sm leading-8 text-[#666666]">
              Update your account details and contact information.
            </p>
          </div>

          {/* save button */}
          <button
            type="button"
            onClick={() => onSave(form)}
            className={cn(
              "inline-flex w-full items-center justify-center gap-2.5 rounded-sm bg-[#00B4FE] p-2.5 text-sm font-medium text-white transition hover:opacity-95 md:w-auto md:px-5",
            )}
          >
            <Save className="h-6 w-6 md:h-5 md:w-5" />
            Save Change
          </button>
        </div>

        {/* form */}
        <div className="mt-9 grid gap-7 md:grid-cols-2">
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
            <div className="flex min-h-6 items-center">
              <span className="text-xs text-[#1B7231]">
                {form.verificationStatus}
              </span>
            </div>
          </Field>

          <Field label="Account Status" noBorder>
            <div className="flex min-h-6 items-center">
              <span className="inline-flex items-center rounded-full border border-[#4ADE80] bg-[#15D9461A] ml-6 px-6 py-2 text-xs leading-none text-[#15D946]">
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
            <div className="flex min-h-6 items-center justify-between gap-4">
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
      </div>

      {/* delete card */}
      <div className="rounded-2xl border border-[#D76C6C] bg-[#D76C6C1A] p-6">
        <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
          <div>
            <p className="text-base font-medium text-black">
              Personal Information
            </p>
            <p className="max-w-105 text-sm mt-1 leading-4 text-[#666666]">
              Update your account details and contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              alert("Delete account (mock).");
            }}
            className="inline-flex w-full items-center justify-center gap-2.5 rounded-sm border border-[#D76C6C] bg-white px-5 py-2.5 text-sm font-medium text-[#D76C6C] transition hover:bg-red-50 md:w-auto"
          >
            <Trash className="h-5 w-5" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
