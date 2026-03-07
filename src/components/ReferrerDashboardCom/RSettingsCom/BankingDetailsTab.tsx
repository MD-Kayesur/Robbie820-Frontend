// src/components/ReferrerDashboardCom/RSettingsCom/BankingDetailsTab.tsx

import React, { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { BankingForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";

const inputBase =
  "h-17 w-full rounded-[18px] border border-[#D9DDE3] bg-white px-7 text-[16px] text-[#C9CED6] outline-none placeholder:text-[#C9CED6] focus:ring-2 focus:ring-sky-200 md:h-11 md:rounded-xl md:px-4 md:text-sm";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 md:space-y-2.5">
      <p className="text-[16px] font-bold uppercase leading-none text-[#666666] md:text-xs md:leading-4 md:tracking-wide">
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
    <div className="mx-auto max-w-190">
      <div className="space-y-8 rounded-[30px] border border-[#BEEAFF] bg-white px-6 py-8 md:space-y-10 md:rounded-2xl md:p-10">
        {/* header */}
        <div className="flex items-center gap-5 md:gap-4">
          <div className="grid h-22 w-22 shrink-0 place-items-center rounded-3xl bg-emerald-100 text-emerald-700 md:h-12 md:w-12 md:rounded-2xl">
            <CreditCard className="h-10 w-10 md:h-6 md:w-6" />
          </div>
          <p className="text-[28px] font-bold leading-none text-black md:text-2xl md:text-slate-900">
            Banking Details
          </p>
        </div>

        {/* form */}
        <div className="grid gap-7 md:grid-cols-2 md:gap-5">
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

          <Field label="BSB NUMBER">
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

        {/* note */}
        <p className="text-[16px] leading-8 text-[#666666] md:text-sm md:leading-6">
          <span className="font-bold text-emerald-600">Note:</span> Changing
          banking details will notify your broker to update payment
          instructions.
        </p>

        {/* button */}
        <button
          type="button"
          onClick={() => onSave(form)}
          disabled={!dirty}
          className={cn(
            "inline-flex h-17 w-full items-center justify-center rounded-2xl bg-[#00B4FE] px-6 text-[18px] font-medium text-white transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-60",
            "md:h-12 md:w-auto md:rounded-xl md:px-7 md:text-sm",
          )}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
