// src/components/ReferrerDashboardCom/RSettingsCom/MyProfileTab.tsx

import React, { useEffect, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { ProfileForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";
import { Toggle } from "@/hooks/useToggle2";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative pt-3">
      <div className="relative rounded-lg border border-gray-300 px-5 pb-3 pt-4">
        <span className="absolute -top-2 left-8 bg-white px-3 text-sm leading-3.5 text-black">
          {label}
        </span>
        {children}
      </div>
    </div>
  );
}

const inputBase =
  "w-full border-0 bg-transparent text-xs outline-none ring-0 focus:border-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0";

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
    <div className="space-y-8">
      {/* main card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:px-6 py-8">
        {/* header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="font-medium text-black">Personal Information</p>
            <p className="mt-2 text-sm text-[#666666]">
              Update your account details and contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSave(form)}
            className={cn(
              "inline-flex py-2.5 items-center gap-2.5 rounded-sm px-5 text-sm font-medium transition bg-[#00B4FE] text-white hover:opacity-95 leading-4",
            )}
          >
            <Save className="h-5 w-5" />
            Save Change
          </button>
        </div>

        {/* form */}
        <div className="mt-9 grid gap-7 sm:grid-cols-2">
          <Field label="Full Name">
            <input
              className={cn(inputBase, "text-[#CDCDCD]")}
              value={form.fullName}
              onChange={(e) =>
                setForm((p) => ({ ...p, fullName: e.target.value }))
              }
              placeholder="Full name"
            />
          </Field>

          <Field label="E-mail">
            <input
              className={cn(inputBase, "text-[#CDCDCD]")}
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="email@example.com"
            />
          </Field>

          <Field label="Business Name">
            <input
              className={cn(inputBase, "text-[#CDCDCD]")}
              value={form.businessName}
              onChange={(e) =>
                setForm((p) => ({ ...p, businessName: e.target.value }))
              }
              placeholder="Business"
            />
          </Field>

          <Field label="Verification Status">
            <div className={cn(inputBase, "flex items-center px-6")}>
              <span className="text-[#1B7231] text-xs">
                {form.verificationStatus}
              </span>
            </div>
          </Field>

          <div className="px-11.5">
            <h1 className="text-sm text-black py-1.5">Account Status</h1>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full bg-[#15D9461A] px-6 py-2 text-xs text-[#15D946] ring-1 ring-[#15D946]">
                {form.accountStatus}
              </span>
            </div>
          </div>

          <Field label="Mobile Number">
            <input
              className={cn(inputBase, "text-[#1B7231] px-6")}
              value={form.mobileNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, mobileNumber: e.target.value }))
              }
              placeholder="+61400000000"
            />
          </Field>

          <div className="sm:col-span-2 grid gap-5 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-slate-700">
                    GST Registered
                  </p>
                  <p className="mt-1 text-sm text-slate-700">
                    {form.gstRegistered ? "yes" : "no"}
                  </p>
                </div>
                <Toggle
                  value={form.gstRegistered}
                  onChange={(v) => setForm((p) => ({ ...p, gstRegistered: v }))}
                />
              </div>
            </div>

            <Field label="ABN Number">
              <input
                className={cn(inputBase, "text-black")}
                value={form.abnNumber}
                onChange={(e) =>
                  setForm((p) => ({ ...p, abnNumber: e.target.value }))
                }
                placeholder="ABN"
              />
            </Field>
          </div>
        </div>
      </div>

      {/* delete card */}
      <div className="rounded-2xl border border-red-200 bg-red-50 p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-black">Personal Information</p>
            <p className="mt-2 text-sm text-[#666666]">
              Update your account details and contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert("Delete account (mock).");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-[#D76C6C] bg-white px-4 text-sm font-medium text-[#D76C6C] leading-4 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
