import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  Building2,
  Check,
  CircleAlert,
  CreditCard,
  Download,
  Printer,
  ShieldCheck,
  X,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  currentPlanMock,
  invoiceDetailsMock,
  invoicesMock,
  paymentMethodsMock,
  pricingPlansMock,
  seatUsageMock,
} from "./mock";
import type {
  BillingCycle,
  InvoiceRow,
  PaymentMethodForm,
  PaymentMethodType,
  PricingPlan,
} from "./types";

const BrokerSubscription = () => {
  const [autoRenewal, setAutoRenewal] = useState(true);
  const [paymentMethods, setPaymentMethods] = useState(paymentMethodsMock);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentMethodForm>({
    type: "card",
    cardholderName: "Cameron Williamson",
    cardNumber: "0000000000000000",
    expiryDate: "mm/yy",
    cvv: "123",
    isDefault: true,
  });

  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [pricingCycle, setPricingCycle] = useState<BillingCycle>("monthly");
  const [invoicePreviewOpen, setInvoicePreviewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(
    null,
  );

  useEffect(() => {
    document.body.style.overflow =
      paymentModalOpen || pricingModalOpen || invoicePreviewOpen
        ? "hidden"
        : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [paymentModalOpen, pricingModalOpen, invoicePreviewOpen]);

  const activePaymentMethod = useMemo(() => {
    return (
      paymentMethods.find((item) => item.isDefault) ?? paymentMethods[0] ?? null
    );
  }, [paymentMethods]);

  const seatUsagePercent = Math.min(
    100,
    (seatUsageMock.usedSeats / seatUsageMock.totalSeats) * 100,
  );

  const openInvoicePreview = (invoice: InvoiceRow) => {
    setSelectedInvoice(invoice);
    setInvoicePreviewOpen(true);
  };

  const savePaymentMethod = () => {
    if (paymentForm.type === "card") {
      const last4 = paymentForm.cardNumber.slice(-4) || "4242";

      setPaymentMethods((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: paymentForm.isDefault ? false : item.isDefault,
        })),
      );

      setPaymentMethods((prev) => {
        const next = [...prev];
        next[0] = {
          id: "pm-card-updated",
          type: "card",
          label: `Visa ending in ${last4}`,
          subLabel: `Expires ${paymentForm.expiryDate}`,
          isDefault: paymentForm.isDefault,
        };
        return next;
      });
    } else {
      const accountLast4 = paymentForm.accountNumber.slice(-4) || "5678";

      setPaymentMethods((prev) =>
        prev.map((item) => ({
          ...item,
          isDefault: paymentForm.isDefault ? false : item.isDefault,
        })),
      );

      setPaymentMethods((prev) => {
        const next = [...prev];
        next[1] = {
          id: "pm-bank-updated",
          type: "bank",
          label: "Bank Direct Debit",
          subLabel: `BSB: ${paymentForm.bsb} • Account: ••• ${accountLast4}`,
          isDefault: paymentForm.isDefault,
        };
        return next;
      });
    }

    setPaymentModalOpen(false);
  };

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoicePdf = () => {
    window.print();
  };

  return (
    <>
      <div className="space-y-5 bg-[#F8FAFC] p-3 sm:p-4 lg:p-6">
        <div>
          <h1 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111827]">
            Subscription & Billing
          </h1>
          <p className="mt-1 text-sm text-[#6B7280]">
            Manage your plan, seats, billing details, and invoices.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-[#D8EAF7] bg-[#EEF8FF] px-4 py-3 text-[12px] text-[#1D9BF0]">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <p>
            Your subscription controls the number of active deals, referral
            partners, and broker seats available in your account.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_230px]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <div className="min-w-0">
                  <p className="text-xs text-[#6B7280]">Active Plan</p>
                  <h2 className="mt-1 text-[28px] font-medium tracking-[-0.03em] text-[#111827]">
                    {currentPlanMock.planName}
                  </h2>

                  <div className="mt-5">
                    <p className="text-xs font-medium text-[#374151]">
                      Plan Features
                    </p>

                    <div className="mt-3 space-y-2">
                      {currentPlanMock.features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-start gap-2 text-[13px] text-[#6B7280]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                          <span>{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-left lg:text-right">
                  <p className="text-[40px] font-semibold tracking-[-0.04em] text-[#111827]">
                    ${currentPlanMock.price}
                  </p>
                  <p className="-mt-1 text-xs text-[#9CA3AF]">
                    {currentPlanMock.priceSuffix}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Next billing date</p>
                    <p className="mt-1 font-medium text-[#111827]">
                      {currentPlanMock.nextBillingDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Billing cycle</p>
                    <p className="mt-1 font-medium text-[#111827]">
                      {currentPlanMock.billingCycleLabel}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setPricingModalOpen(true)}
                  className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0EA5E9] px-4 text-sm font-medium text-white transition hover:bg-sky-600"
                >
                  Change Plan
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
              <h3 className="text-[16px] font-medium text-[#111827]">
                Team Seat Usage
              </h3>

              <div className="mt-4 flex items-center justify-between text-[12px] text-[#6B7280]">
                <span>
                  {seatUsageMock.usedSeats} of {seatUsageMock.totalSeats} broker
                  seats used
                </span>
                <span>{Math.round(seatUsagePercent)}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#D1D5DB]">
                <div
                  className="h-full rounded-full bg-[#0EA5E9]"
                  style={{ width: `${seatUsagePercent}%` }}
                />
              </div>

              <p className="mt-3 text-[12px] text-[#9CA3AF]">
                Each additional broker seat adds $
                {seatUsageMock.additionalSeatMonthlyCost}/month.
              </p>

              <button
                type="button"
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0EA5E9] px-4 text-sm font-medium text-[#111827] transition hover:bg-sky-600 hover:text-white"
              >
                Add Broker Seat
              </button>
            </section>

            <section className="rounded-2xl border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-[16px] font-medium text-[#111827]">
                  Invoice History
                </h3>
                <button
                  type="button"
                  className="text-[12px] text-[#111827] transition hover:text-sky-600"
                >
                  View All Invoices
                </button>
              </div>

              <div className="mt-4 overflow-x-auto">
                <table className="min-w-[760px] w-full border-separate border-spacing-0">
                  <thead>
                    <tr className="text-left text-[12px] text-[#6B7280]">
                      <th className="px-4 py-3 font-medium">Invoice Date</th>
                      <th className="px-4 py-3 font-medium">
                        Plan & Reference
                      </th>
                      <th className="px-4 py-3 font-medium">Amount</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium text-right">
                        Receipt
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {invoicesMock.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="text-[13px] text-[#111827]"
                      >
                        <td className="px-4 py-3">{invoice.invoiceDate}</td>
                        <td className="px-4 py-3">
                          <div>
                            <p>{invoice.planName}</p>
                            <p className="mt-0.5 text-[12px] text-[#9CA3AF]">
                              {invoice.invoiceRef}
                            </p>
                          </div>
                        </td>
                        <td className="px-4 py-3 font-semibold">
                          {formatMoney(invoice.amount)}
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-flex h-6 items-center rounded-full bg-[#DCFCE7] px-2.5 text-[11px] font-medium text-[#22C55E]">
                            {invoice.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            type="button"
                            onClick={() => openInvoicePreview(invoice)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-[#111827] transition hover:bg-slate-100"
                          >
                            <Download className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          <div className="space-y-4">
            <section className="rounded-2xl bg-[#0EA5E9] p-4 text-white shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <h3 className="text-[16px] font-medium">Payment Method</h3>

              <div className="mt-4 space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className={cn(
                      "rounded-xl border px-3 py-3",
                      method.type === "card"
                        ? "border-[#D8EAF7] bg-white text-[#111827]"
                        : "border-[#D8EAF7] bg-white text-[#111827]",
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 flex h-7 w-7 items-center justify-center rounded-md bg-[#EAF2FF] text-[#4F7CFF]">
                        {method.type === "card" ? (
                          <CreditCard className="h-4 w-4" />
                        ) : (
                          <Building2 className="h-4 w-4" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[13px] font-medium">
                            {method.label}
                          </p>
                          {method.isDefault ? (
                            <span className="inline-flex rounded-full border border-[#D8EAF7] bg-[#EEF8FF] px-2 py-0.5 text-[10px] text-[#60A5FA]">
                              Default
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-[11px] text-[#9CA3AF]">
                          {method.subLabel}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setPaymentModalOpen(true)}
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-4 text-[13px] font-medium text-white transition hover:bg-slate-900"
              >
                Update Payment Method
              </button>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#DFF6FF]">
                <ShieldCheck className="h-3.5 w-3.5" />
                <span>256-bit SSL encrypted payments</span>
              </div>
            </section>

            <section className="rounded-2xl border border-[#DADDE3] bg-[#F3FAFF] p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
              <h3 className="text-[16px] font-medium text-[#111827]">
                Auto-Renewal
              </h3>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-[#374151]">Status</span>
                <TinyToggle
                  checked={autoRenewal}
                  onChange={() => setAutoRenewal((prev) => !prev)}
                />
              </div>

              <p className="mt-4 text-[12px] leading-5 text-[#6B7280]">
                Your plan renews automatically each billing cycle. Changes take
                effect after the current billing period ends.
              </p>
              <p className="mt-3 text-[12px] leading-5 text-[#6B7280]">
                Cancellation requires 30 days' notice.
              </p>
            </section>
          </div>
        </div>
      </div>

      {pricingModalOpen ? (
        <PlanSelectionModal
          cycle={pricingCycle}
          onCycleChange={setPricingCycle}
          plans={pricingPlansMock}
          onClose={() => setPricingModalOpen(false)}
        />
      ) : null}

      {paymentModalOpen ? (
        <UpdatePaymentMethodModal
          form={paymentForm}
          onChange={setPaymentForm}
          onClose={() => setPaymentModalOpen(false)}
          onSave={savePaymentMethod}
        />
      ) : null}

      {invoicePreviewOpen ? (
        <InvoicePreviewModal
          invoiceRef={
            selectedInvoice?.invoiceRef ?? invoiceDetailsMock.invoiceId
          }
          onClose={() => setInvoicePreviewOpen(false)}
          onPrint={printInvoice}
          onDownload={downloadInvoicePdf}
        />
      ) : null}
    </>
  );
};

function PlanSelectionModal({
  cycle,
  onCycleChange,
  plans,
  onClose,
}: {
  cycle: BillingCycle;
  onCycleChange: (value: BillingCycle) => void;
  plans: PricingPlan[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 p-3 sm:p-6">
      <div className="mx-auto w-full max-w-[900px] rounded-[24px] border border-[#D1D5DB] bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.18)] sm:p-7">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#D1D5DB] text-[#6B7280] transition hover:bg-slate-50"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <span className="text-sm text-[#374151]">
            Back Subscription & Billing
          </span>
        </div>

        <div className="mt-4 text-center">
          <h2 className="text-[24px] font-semibold tracking-[-0.03em] text-[#0EA5E9]">
            How ReferNow Works
          </h2>
          <p className="mt-2 text-[16px] text-[#111827]">
            Choose The Plan That Fits Your Business. No Hidden Fees.
          </p>

          <div className="mt-4 inline-flex rounded-full bg-[#F3F4F6] p-1">
            <button
              type="button"
              onClick={() => onCycleChange("monthly")}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-medium transition",
                cycle === "monthly"
                  ? "bg-[#0EA5E9] text-white shadow-sm"
                  : "text-[#6B7280]",
              )}
            >
              Monthly
            </button>
            <button
              type="button"
              onClick={() => onCycleChange("yearly")}
              className={cn(
                "rounded-full px-6 py-3 text-sm font-medium transition",
                cycle === "yearly"
                  ? "bg-[#0EA5E9] text-white shadow-sm"
                  : "text-[#6B7280]",
              )}
            >
              Yearly
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-5 lg:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                "relative rounded-2xl border bg-white p-4",
                plan.isPopular
                  ? "border-[#0EA5E9] shadow-[0_0_0_1px_#0EA5E9]"
                  : "border-[#D8EAF7]",
              )}
            >
              {plan.isPopular ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#F97316] px-3 py-1 text-[11px] font-medium text-white">
                  MOST POPULAR
                </div>
              ) : null}

              <p className="text-[18px] text-[#8B5CF6]">{plan.name}</p>
              <p className="mt-3 text-[16px] text-[#111827]">{plan.tagline}</p>

              <div className="mt-5 flex items-end gap-1">
                <span className="text-[44px] font-semibold tracking-[-0.04em] text-[#111827]">
                  {plan.priceLabel}
                </span>
                {plan.priceSuffix ? (
                  <span className="mb-2 text-[12px] text-[#6B7280]">
                    {plan.priceSuffix}
                  </span>
                ) : null}
              </div>

              <div className="mt-5 space-y-3">
                {plan.features.map((feature, index) => (
                  <div
                    key={`${plan.id}-${index}`}
                    className="flex items-start gap-2 text-[14px] text-[#6B7280]"
                  >
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="mt-8 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0EA5E9] px-4 text-sm font-medium text-white transition hover:bg-sky-600"
              >
                {plan.ctaLabel}
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-[14px] text-[#111827]">
          2025 ReferNow Mortgage Solutions. All Rights Reserved.
        </p>
      </div>
    </div>
  );
}

function UpdatePaymentMethodModal({
  form,
  onChange,
  onClose,
  onSave,
}: {
  form: PaymentMethodForm;
  onChange: (value: PaymentMethodForm) => void;
  onClose: () => void;
  onSave: () => void;
}) {
  const switchType = (type: PaymentMethodType) => {
    if (type === "card") {
      onChange({
        type: "card",
        cardholderName: "Cameron Williamson",
        cardNumber: "0000000000000000",
        expiryDate: "mm/yy",
        cvv: "123",
        isDefault: true,
      });
      return;
    }

    onChange({
      type: "bank",
      accountName: "Cameron Williamson",
      bsb: "000-000",
      accountNumber: "0000000000",
      isDefault: true,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-3 sm:p-6">
      <div className="w-full max-w-[470px] rounded-[20px] bg-white p-5 shadow-[0_30px_90px_rgba(0,0,0,0.28)] sm:max-w-[520px]">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#111827]">
              Update Payment Method
            </h2>
            <p className="mt-1 text-[14px] text-[#374151]">
              Add Or Change Your Billing Method.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111827] transition hover:bg-slate-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 rounded-xl bg-[#DDF4FF] p-2">
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => switchType("card")}
              className={cn(
                "flex h-11 items-center justify-center gap-2 rounded-md border text-[14px] font-medium transition",
                form.type === "card"
                  ? "border-[#A7D8F5] bg-white text-[#111827]"
                  : "border-transparent bg-transparent text-[#111827]",
              )}
            >
              <CreditCard className="h-4 w-4" />
              Credit/Debit Card
            </button>

            <button
              type="button"
              onClick={() => switchType("bank")}
              className={cn(
                "flex h-11 items-center justify-center gap-2 rounded-md border text-[14px] font-medium transition",
                form.type === "bank"
                  ? "border-[#A7D8F5] bg-white text-[#111827]"
                  : "border-transparent bg-transparent text-[#111827]",
              )}
            >
              <Building2 className="h-4 w-4" />
              Bank Direct Debit
            </button>
          </div>
        </div>

        {form.type === "card" ? (
          <div className="mt-6 space-y-4">
            <Field
              label="CARDHOLDER NAME"
              value={form.cardholderName}
              onChange={(value) => onChange({ ...form, cardholderName: value })}
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
          <div className="mt-6 space-y-4">
            <Field
              label="CARDHOLDER NAME"
              value={form.accountName}
              onChange={(value) => onChange({ ...form, accountName: value })}
            />
            <Field label="CARD NUMBER" value="ABC" onChange={() => undefined} />
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

        <div className="mt-6">
          <label className="flex items-center gap-3 text-[14px] text-[#374151]">
            <input
              type="checkbox"
              checked={form.isDefault}
              onChange={(e) =>
                onChange({ ...form, isDefault: e.target.checked })
              }
              className="h-4 w-4 rounded border-[#D1D5DB] accent-[#0EA5E9]"
            />
            Set as default payment method
          </label>

          <div className="mt-4 flex items-center gap-3 text-[13px] text-[#9CA3AF]">
            <ShieldCheck className="h-5 w-5 text-[#22C55E]" />
            <span>Your payment is secured with 256-bit SSL encryption.</span>
          </div>
        </div>

        <div className="mt-8 border-t border-[#E5E7EB] pt-6">
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-11 items-center justify-center rounded-md border border-[#D1D5DB] bg-white px-5 text-[14px] font-medium text-[#111827] transition hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={onSave}
              className="inline-flex h-11 items-center justify-center rounded-md bg-black px-5 text-[14px] font-medium text-white transition hover:bg-slate-900"
            >
              Save Payment Method
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InvoicePreviewModal({
  invoiceRef,
  onClose,
  onPrint,
  onDownload,
}: {
  invoiceRef: string;
  onClose: () => void;
  onPrint: () => void;
  onDownload: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/45 p-3 sm:p-6">
      <div className="mx-auto w-full max-w-[640px] rounded-[22px] border border-[#CBD5E1] bg-[#F3FAFF] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.22)] sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#6B7280] transition hover:bg-slate-50"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-[#374151]">
              Back Subscription & Billing
            </span>
          </div>

          <button
            type="button"
            onClick={onDownload}
            className="inline-flex h-9 items-center justify-center gap-2 rounded-md bg-[#020617] px-3 text-[12px] font-medium text-white transition hover:bg-slate-900"
          >
            <Download className="h-3.5 w-3.5" />
            Download PDF
          </button>
        </div>

        <div className="mt-5 rounded-xl border border-[#D8EAF7] bg-white p-5 sm:p-7">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[28px] font-semibold tracking-[-0.03em] text-[#111827]">
                {invoiceDetailsMock.fromName}
              </h2>
              <p className="mt-1 text-[14px] text-[#6B7280]">
                {invoiceDetailsMock.fromDepartment}
              </p>
              <p className="mt-1 text-[14px] text-[#6B7280]">
                {invoiceDetailsMock.fromEmail}
              </p>
            </div>

            <div className="text-left sm:text-right">
              <h3 className="text-[22px] font-semibold text-[#111827]">
                Invoice #{invoiceRef}
              </h3>
              <p className="mt-1 text-[12px] text-[#9CA3AF]">
                Issue Date: {invoiceDetailsMock.issueDate}
              </p>
              <span className="mt-2 inline-flex rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-medium text-[#22C55E]">
                {invoiceDetailsMock.status}
              </span>
            </div>
          </div>

          <div className="mt-5 border-t border-[#E5E7EB] pt-5">
            <p className="text-[14px] font-medium text-[#374151]">BILL TO</p>
            <p className="mt-1 text-[22px] font-semibold text-[#111827]">
              {invoiceDetailsMock.billToName}
            </p>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              {invoiceDetailsMock.billToContact}
            </p>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              {invoiceDetailsMock.billToEmail}
            </p>
          </div>

          <div className="mt-5 overflow-x-auto">
            <table className="min-w-[520px] w-full border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-[14px] text-[#374151]">
                  <th className="border-b border-[#E5E7EB] px-1 py-2 font-medium">
                    Description
                  </th>
                  <th className="border-b border-[#E5E7EB] px-1 py-2 font-medium">
                    Quantity
                  </th>
                  <th className="border-b border-[#E5E7EB] px-1 py-2 font-medium">
                    Unit Price
                  </th>
                  <th className="border-b border-[#E5E7EB] px-1 py-2 font-medium text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
                {invoiceDetailsMock.items.map((item) => (
                  <tr key={item.id} className="text-[14px] text-[#111827]">
                    <td className="px-1 py-2">{item.description}</td>
                    <td className="px-1 py-2">{item.quantity}</td>
                    <td className="px-1 py-2">
                      {formatMoney2(item.unitPrice)}
                    </td>
                    <td className="px-1 py-2 text-right font-semibold">
                      {formatMoney2(item.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="w-full max-w-[210px] space-y-2 text-[14px] text-[#6B7280]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-[#111827]">
                  {formatMoney2(invoiceDetailsMock.subtotal)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span>{invoiceDetailsMock.taxLabel}</span>
                <span className="font-medium text-[#111827]">
                  {formatMoney2(invoiceDetailsMock.taxAmount)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-md bg-[#F3F4F6] px-3 py-2">
                <span className="font-medium text-[#111827]">Total Paid</span>
                <span className="font-medium text-[#111827]">
                  {formatMoney2(invoiceDetailsMock.totalPaid)}
                </span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl bg-[#EAF8EF] px-4 py-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="text-[14px] font-semibold text-[#16A34A]">
                  {invoiceDetailsMock.paymentMethodLabel}
                </p>
                <p className="text-[13px] text-[#22C55E]">
                  {invoiceDetailsMock.paymentMethodValue}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-[14px] font-semibold text-[#16A34A]">
                  {invoiceDetailsMock.paidOnLabel}
                </p>
                <p className="text-[13px] text-[#22C55E]">
                  {invoiceDetailsMock.paidOnValue}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 border-t border-[#E5E7EB] pt-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={onPrint}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-[#D1D5DB] bg-white px-4 text-[14px] font-medium text-[#111827] transition hover:bg-slate-50"
              >
                <Printer className="h-4 w-4" />
                Print Invoice
              </button>
              <button
                type="button"
                onClick={onDownload}
                className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#020617] px-4 text-[14px] font-medium text-white transition hover:bg-slate-900"
              >
                <Download className="h-4 w-4" />
                Download PDF
              </button>
            </div>
          </div>
        </div>

        <p className="mt-4 text-center text-[13px] text-[#9CA3AF]">
          {invoiceDetailsMock.footerNote}
        </p>
      </div>
    </div>
  );
}

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
      <span className="mb-2 block text-[14px] font-medium text-[#111827]">
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

function TinyToggle({
  checked,
  onChange,
}: {
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <button
      type="button"
      aria-pressed={checked}
      onClick={onChange}
      className={cn(
        "relative inline-flex h-5 w-9 items-center rounded-full transition",
        checked ? "bg-[#020617]" : "bg-[#CBD5E1]",
      )}
    >
      <span
        className={cn(
          "inline-block h-4 w-4 rounded-full bg-white transition",
          checked ? "translate-x-5" : "translate-x-0.5",
        )}
      />
    </button>
  );
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMoney2(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

export default BrokerSubscription;
