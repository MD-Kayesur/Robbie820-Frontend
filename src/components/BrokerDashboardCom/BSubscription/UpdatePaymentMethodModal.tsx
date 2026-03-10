import { Building2, CreditCard, ShieldCheck, X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  PaymentMethodForm,
  PaymentMethodType,
} from "@/pages/BrokerDashboard/BrokerSubscription/types";

type Props = {
  form: PaymentMethodForm;
  onChange: (value: PaymentMethodForm) => void;
  onClose: () => void;
  onSave: () => void;
};

const UpdatePaymentMethodModal = ({
  form,
  onChange,
  onClose,
  onSave,
}: Props) => {
  const switchType = (type: PaymentMethodType) => {
    if (type === "card") {
      onChange({
        type: "card",
        cardholderName: "Cameron Williamson",
        cardNumber: "4242424242424242",
        expiryDate: "12/28",
        cvv: "123",
        isDefault: true,
      });
      return;
    }

    onChange({
      type: "bank",
      accountName: "Cameron Williamson",
      bsb: "062-001",
      accountNumber: "12345678",
      isDefault: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 sm:p-6">
      <div className="flex max-h-[90vh] w-full max-w-117.5 flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:max-w-130 sm:rounded-[22px]">
        <div className="flex items-start justify-between gap-4 px-4 pb-0 pt-4 sm:px-5 sm:pt-5">
          <div className="min-w-0">
            <h2 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[22px]">
              Update Payment Method
            </h2>
            <p className="mt-1 text-[13px] leading-5 text-[#374151] sm:text-[14px]">
              Add or change your billing method.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#111827] transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5">
          <div className="rounded-xl bg-[#DDF4FF] p-2 sm:px-3 sm:py-2">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => switchType("card")}
                className={cn(
                  "flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-center text-[13px] font-medium transition sm:text-[14px]",
                  form.type === "card"
                    ? "border-[#A7D8F5] bg-white text-[#111827]"
                    : "border-transparent bg-transparent text-[#111827]",
                )}
              >
                <CreditCard className="h-4 w-4 shrink-0" />
                <span className="truncate">Credit/Debit Card</span>
              </button>

              <button
                type="button"
                onClick={() => switchType("bank")}
                className={cn(
                  "flex min-h-11 items-center justify-center gap-2 rounded-md border px-3 py-2 text-center text-[13px] font-medium transition sm:text-[14px]",
                  form.type === "bank"
                    ? "border-[#A7D8F5] bg-white text-[#111827]"
                    : "border-transparent bg-transparent text-[#111827]",
                )}
              >
                <Building2 className="h-4 w-4 shrink-0" />
                <span className="truncate">Bank Direct Debit</span>
              </button>
            </div>
          </div>

          {form.type === "card" ? (
            <div className="mt-5 space-y-4 sm:mt-6">
              <Field
                label="CARDHOLDER NAME"
                value={form.cardholderName}
                onChange={(value) =>
                  onChange({ ...form, cardholderName: value })
                }
              />
              <Field
                label="CARD NUMBER"
                value={form.cardNumber}
                onChange={(value) => onChange({ ...form, cardNumber: value })}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="EXPIRY DATE"
                  value={form.expiryDate}
                  onChange={(value) => onChange({ ...form, expiryDate: value })}
                />
                <Field
                  label="CVV"
                  value={form.cvv}
                  onChange={(value) => onChange({ ...form, cvv: value })}
                />
              </div>
            </div>
          ) : (
            <div className="mt-5 space-y-4 sm:mt-6">
              <Field
                label="ACCOUNT NAME"
                value={form.accountName}
                onChange={(value) => onChange({ ...form, accountName: value })}
              />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field
                  label="BSB NUMBER"
                  value={form.bsb}
                  onChange={(value) => onChange({ ...form, bsb: value })}
                />
                <Field
                  label="ACCOUNT NUMBER"
                  value={form.accountNumber}
                  onChange={(value) =>
                    onChange({ ...form, accountNumber: value })
                  }
                />
              </div>
            </div>
          )}

          <div className="mt-5 sm:mt-6">
            <label className="flex items-start gap-3 text-[13px] leading-5 text-[#374151] sm:text-[14px]">
              <input
                type="checkbox"
                checked={form.isDefault}
                onChange={(e) =>
                  onChange({ ...form, isDefault: e.target.checked })
                }
                className="mt-0.5 h-4 w-4 shrink-0 rounded border-[#D1D5DB] accent-[#0EA5E9]"
              />
              <span>Set as default payment method</span>
            </label>

            <div className="mt-4 flex items-start gap-3 text-[12px] leading-5 text-[#9CA3AF] sm:text-[13px]">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-[#22C55E]" />
              <span>Your payment is secured with 256-bit SSL encryption.</span>
            </div>
          </div>
        </div>

        <div className="border-t border-[#E5E7EB] px-4 py-4 sm:px-5 sm:pt-5 sm:pb-5">
          <div className="flex gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 w-full items-center justify-center rounded-md border border-[#D1D5DB] bg-white px-5 text-[14px] font-medium text-[#111827] transition hover:bg-slate-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              className="inline-flex h-11 w-full items-center justify-center rounded-md bg-black px-5 text-[14px] font-medium text-white transition hover:bg-slate-900 sm:w-auto"
            >
              Save Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Field({
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
      <span className="mb-2 block text-[12px] font-medium tracking-[0.02em] text-[#111827] sm:text-[14px]">
        {label}
      </span>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11 w-full rounded-md border border-[#CBEAFE] px-4 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-sky-400"
      />
    </label>
  );
}

export default UpdatePaymentMethodModal;
