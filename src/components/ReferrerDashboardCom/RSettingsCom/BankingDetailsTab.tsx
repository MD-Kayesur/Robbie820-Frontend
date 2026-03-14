// src/components/ReferrerDashboardCom/RSettingsCom/BankingDetailsTab.tsx

import React, { useEffect, useMemo, useState } from "react";
import { CreditCard } from "lucide-react";
import { BankingForm } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";

const inputBase =
  "w-full border border-[#D9DDE3] bg-white text-base text-[#C9CED6] placeholder:text-[#C9CED6] rounded-xl px-4 py-2";

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 md:space-y-2.5">
      <p className="font-bold uppercase leading-none text-[#666666] text-xs md:leading-4 md:tracking-wide">
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
    <div className="mx-auto max-w-2xl">
      <div className="space-y-6 rounded-2xl border border-[#BEEAFF] bg-white p-4 md:space-y-10 md:p-10">
        {/* header */}
        <div className="flex items-center gap-4">
          <div className="grid shrink-0 place-items-center bg-emerald-100 text-emerald-700 p-2.5 rounded-2xl">
            <CreditCard className="h-6 w-6" />
          </div>
          <p className="font-bold leading-none text-black text-lg sm:text-2xl md:text-slate-900">
            Banking Details
          </p>
        </div>

        {/* form */}
        <div className="grid md:grid-cols-2 gap-5">
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

        <div className="flex flex-col md:flex-row justify-between gap-2 items-center">
          {/* note */}
          <p className="text-[#666666] max-w-sm text-sm leading-6">
            <span className="font-bold text-emerald-600">Note:</span> Changing
            banking details will notify your broker to update payment
            instructions.
          </p>

          {/* button */}
          <button
            type="button"
            onClick={() => {
              if (!dirty) return;
              onSave(form);
            }}
            aria-disabled={!dirty}
            className={cn(
              "flex items-center justify-center bg-[#00B4FE] text-white",
              "md:w-auto rounded-lg px-7 py-2.5 text-sm",
              "w-full",
              !dirty ? "cursor-not-allowed opacity-60" : "hover:opacity-95",
            )}
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
