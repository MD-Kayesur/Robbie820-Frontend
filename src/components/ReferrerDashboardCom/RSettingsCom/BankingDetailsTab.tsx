// src/components/ReferrerDashboardCom/RSettingsCom/BankingDetailsTab.tsx

import React, { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { BankingForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

const inputBase =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-800 outline-none focus:ring-2 focus:ring-sky-200";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      {children}
    </div>
  );
}

export default function BankingDetailsTab({
  value,
  onSave,
}: {
  value: BankingForm;
  onSave: (next: BankingForm) => void;
}) {
  const [form, setForm] = useState<BankingForm>(value);

  useEffect(() => setForm(value), [value]);

  const dirty = useMemo(
    () => JSON.stringify(form) !== JSON.stringify(value),
    [form, value],
  );

  return (
    <div className="mx-auto max-w-155">
      <div className="rounded-2xl border border-sky-200 bg-white px-6 py-8 sm:px-8">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-items-center rounded-2xl bg-emerald-100 text-emerald-700">
            <CreditCard className="h-6 w-6" />
          </div>
          <p className="text-2xl font-semibold text-slate-900">
            Banking Details
          </p>
        </div>

        <div className="mt-7 grid gap-5 sm:grid-cols-2">
          <Field label="BANK NAME">
            <input
              className={inputBase}
              value={form.bankName}
              onChange={(e) =>
                setForm((p) => ({ ...p, bankName: e.target.value }))
              }
              placeholder="e.g. Chase Bank"
            />
          </Field>

          <Field label="ACCOUNT NAME">
            <input
              className={inputBase}
              value={form.accountName}
              onChange={(e) =>
                setForm((p) => ({ ...p, accountName: e.target.value }))
              }
              placeholder="e.g. John Doe"
            />
          </Field>

          <Field label="ACCOUNT NUMBER">
            <input
              className={inputBase}
              value={form.accountNumber}
              onChange={(e) =>
                setForm((p) => ({ ...p, accountNumber: e.target.value }))
              }
              placeholder="0000 0000 0000"
            />
          </Field>

          <Field label="ROUTING / BSB NUMBER">
            <input
              className={inputBase}
              value={form.routingBsb}
              onChange={(e) =>
                setForm((p) => ({ ...p, routingBsb: e.target.value }))
              }
              placeholder="000-000"
            />
          </Field>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            <span className="font-semibold text-emerald-600">Note:</span>{" "}
            Changing banking details will notify your broker to update payment
            instructions.
          </p>

          <button
            type="button"
            onClick={() => onSave(form)}
            disabled={!dirty}
            className={cn(
              "h-11 rounded-xl px-6 text-sm font-semibold transition",
              dirty
                ? "bg-sky-500 text-white hover:opacity-95"
                : "cursor-not-allowed bg-slate-100 text-slate-400",
            )}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
