// src/components/ReferrerDashboardCom/RSettingsCom/MyProfileTab.tsx

import React, { useEffect, useMemo, useState } from "react";
import { Save, Trash2 } from "lucide-react";
import { ProfileForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full transition",
        value ? "bg-sky-500" : "bg-slate-200",
      )}
      aria-pressed={value}
    >
      <span
        className={cn(
          "inline-block h-6 w-6 rounded-full bg-white transition",
          value ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold text-slate-700">{label}</p>
      {children}
    </div>
  );
}

const inputBase =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-200";

export default function MyProfileTab({
  value,
  onSave,
}: {
  value: ProfileForm;
  onSave: (next: ProfileForm) => void;
}) {
  const [form, setForm] = useState<ProfileForm>(value);

  useEffect(() => setForm(value), [value]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(value),
    [form, value],
  );

  return (
    <div className="space-y-6">
      {/* main card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-sm font-semibold text-slate-900">
              Personal Information
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Update your account details and contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={!dirty}
            className={cn(
              "inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-semibold transition",
              dirty
                ? "bg-sky-500 text-white hover:opacity-95"
                : "cursor-not-allowed bg-slate-100 text-slate-400",
            )}
          >
            <Save className="h-4 w-4" />
            Save Change
          </button>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          <Field label="Full Name">
            <input
              className={inputBase}
              value={form.fullName}
              onChange={(e) =>
                setForm((p) => ({ ...p, fullName: e.target.value }))
              }
              placeholder="Full name"
            />
          </Field>

          <Field label="E-mail">
            <input
              className={inputBase}
              value={form.email}
              onChange={(e) =>
                setForm((p) => ({ ...p, email: e.target.value }))
              }
              placeholder="email@example.com"
            />
          </Field>

          <Field label="Business Name">
            <input
              className={inputBase}
              value={form.businessName}
              onChange={(e) =>
                setForm((p) => ({ ...p, businessName: e.target.value }))
              }
              placeholder="Business"
            />
          </Field>

          <Field label="Verification Status">
            <div className={cn(inputBase, "flex items-center")}>
              <span className="text-emerald-600 text-sm font-semibold">
                {form.verificationStatus}
              </span>
            </div>
          </Field>

          <Field label="Account Status">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-9 items-center rounded-full bg-emerald-100 px-4 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                {form.accountStatus}
              </span>
            </div>
          </Field>

          <Field label="Mobile Number">
            <input
              className={inputBase}
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
                className={inputBase}
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
            <p className="text-sm font-semibold text-slate-900">
              Personal Information
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Update your account details and contact information.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              // eslint-disable-next-line no-alert
              alert("Delete account (mock).");
            }}
            className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-300 bg-white px-4 text-sm font-semibold text-red-500 hover:bg-red-50"
          >
            <Trash2 className="h-4 w-4" />
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
