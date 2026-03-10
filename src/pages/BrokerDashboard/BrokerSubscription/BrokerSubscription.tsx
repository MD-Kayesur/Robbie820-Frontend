import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Building2,
  Check,
  CircleAlert,
  CreditCard,
  Download,
  ShieldCheck,
} from "lucide-react";

import {
  currentPlanMock,
  invoiceDetailsMock,
  invoicesMock,
  paymentMethodsMock,
  planConfigsMock,
  seatUsageMock,
} from "./mock";
import type {
  BillingCycle,
  CurrentPlanSummary,
  InvoiceDetails,
  InvoiceRow,
  PaymentMethod,
  PaymentMethodForm,
  SeatUsageSummary,
  SubscriptionPlanKey,
} from "./types";
import { capitalize, ensureOneDefault, formatMoney } from "./utils";
import InvoiceMobileCard from "@/components/BrokerDashboardCom/BSubscription/InvoiceMobileCard";
import UpdatePaymentMethodModal from "@/components/BrokerDashboardCom/BSubscription/UpdatePaymentMethodModal";
import InvoicePreviewModal from "@/components/BrokerDashboardCom/BSubscription/InvoicePreviewModal";

type ChangePlanRouteState = {
  selectedPlanId?: SubscriptionPlanKey;
  selectedCycle?: BillingCycle;
};

const BrokerSubscription = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [autoRenewal, setAutoRenewal] = useState(true);
  const [paymentMethods, setPaymentMethods] =
    useState<PaymentMethod[]>(paymentMethodsMock);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [paymentForm, setPaymentForm] = useState<PaymentMethodForm>({
    type: "card",
    cardholderName: "Cameron Williamson",
    cardNumber: "4242424242424242",
    expiryDate: "12/28",
    cvv: "123",
    isDefault: true,
  });

  const [currentPlan, setCurrentPlan] =
    useState<CurrentPlanSummary>(currentPlanMock);
  const [seatUsage, setSeatUsage] = useState<SeatUsageSummary>(seatUsageMock);
  const [invoiceRows, setInvoiceRows] = useState<InvoiceRow[]>(invoicesMock);
  const [showAllInvoices, setShowAllInvoices] = useState(false);

  const [invoicePreviewOpen, setInvoicePreviewOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<InvoiceRow | null>(
    null,
  );

  useEffect(() => {
    const state = location.state as ChangePlanRouteState | null;

    if (!state?.selectedPlanId || !state?.selectedCycle) return;

    const config = planConfigsMock[state.selectedPlanId];
    const price =
      state.selectedCycle === "monthly"
        ? config.monthlyPrice
        : config.yearlyPrice;

    setCurrentPlan({
      planId: config.id,
      planName: config.name,
      price: price ?? 0,
      priceSuffix:
        state.selectedCycle === "monthly"
          ? config.priceSuffixMonthly
          : config.priceSuffixYearly,
      features: config.features,
      nextBillingDate:
        state.selectedCycle === "monthly" ? "Jan 01, 2026" : "Dec 01, 2026",
      billingCycle: state.selectedCycle,
      billingCycleLabel: capitalize(state.selectedCycle),
      activeDealsLimit: config.activeDealsLimit,
      referralPartnersLimit: config.referralPartnersLimit,
      brokerSeatsIncluded: config.brokerSeatsIncluded,
    });

    setSeatUsage((prev) => ({
      ...prev,
      totalSeats:
        typeof config.brokerSeatsIncluded === "number"
          ? Math.max(prev.usedSeats, config.brokerSeatsIncluded)
          : prev.totalSeats,
    }));

    const extraSeats =
      typeof config.brokerSeatsIncluded === "number"
        ? Math.max(0, seatUsage.usedSeats - config.brokerSeatsIncluded)
        : 0;

    const displayAmount =
      (price ?? 0) + extraSeats * seatUsage.additionalSeatMonthlyCost;

    const newInvoice: InvoiceRow = {
      id: `inv-${Date.now()}`,
      invoiceDate:
        state.selectedCycle === "monthly" ? "Jan 01, 2026" : "Dec 01, 2025",
      planName: `${config.name} Plan`,
      invoiceRef: `INV-${Math.floor(1000 + Math.random() * 9000)}`,
      amount: displayAmount,
      status: "Paid",
    };

    setInvoiceRows((prev) => {
      const exists = prev.some(
        (item) =>
          item.planName === newInvoice.planName &&
          item.invoiceDate === newInvoice.invoiceDate &&
          item.amount === newInvoice.amount,
      );

      return exists ? prev : [newInvoice, ...prev];
    });

    navigate(location.pathname, { replace: true, state: null });
  }, [
    location.pathname,
    location.state,
    navigate,
    seatUsage.additionalSeatMonthlyCost,
    seatUsage.usedSeats,
  ]);

  useEffect(() => {
    document.body.style.overflow =
      paymentModalOpen || invoicePreviewOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [paymentModalOpen, invoicePreviewOpen]);

  const activePaymentMethod = useMemo(() => {
    return (
      paymentMethods.find((item) => item.isDefault) ?? paymentMethods[0] ?? null
    );
  }, [paymentMethods]);

  const seatUsagePercent = Math.min(
    100,
    (seatUsage.usedSeats / seatUsage.totalSeats) * 100,
  );

  const visibleInvoices = showAllInvoices
    ? invoiceRows
    : invoiceRows.slice(0, 3);

  const invoiceDetails = useMemo(() => {
    const ref = selectedInvoice?.invoiceRef ?? invoiceDetailsMock.invoiceId;
    const amount =
      selectedInvoice?.amount ?? invoiceDetailsMock.items[0]?.amount ?? 0;
    const planName = selectedInvoice?.planName ?? currentPlan.planName;

    const extraSeatQty =
      seatUsage.usedSeats >
      (typeof currentPlan.brokerSeatsIncluded === "number"
        ? currentPlan.brokerSeatsIncluded
        : seatUsage.usedSeats)
        ? seatUsage.usedSeats -
          (typeof currentPlan.brokerSeatsIncluded === "number"
            ? currentPlan.brokerSeatsIncluded
            : seatUsage.usedSeats)
        : 0;

    const planLineAmount =
      amount > 29 && currentPlan.planId !== "enterprise"
        ? amount - extraSeatQty * seatUsage.additionalSeatMonthlyCost
        : amount;

    const items =
      currentPlan.planId === "enterprise"
        ? [
            {
              id: "line-1",
              description: `${planName} (${capitalize(currentPlan.billingCycle)})`,
              quantity: 1,
              unitPrice: amount,
              amount,
            },
          ]
        : [
            {
              id: "line-1",
              description: `${planName} (${capitalize(currentPlan.billingCycle)})`,
              quantity: 1,
              unitPrice: Math.max(planLineAmount, 0),
              amount: Math.max(planLineAmount, 0),
            },
            ...(extraSeatQty > 0
              ? [
                  {
                    id: "line-2",
                    description: "Additional Broker Seat",
                    quantity: extraSeatQty,
                    unitPrice: seatUsage.additionalSeatMonthlyCost,
                    amount: extraSeatQty * seatUsage.additionalSeatMonthlyCost,
                  },
                ]
              : []),
          ];

    const subtotal = items.reduce((sum, item) => sum + item.amount, 0);
    const taxAmount = Number((subtotal * 0.1).toFixed(2));
    const totalPaid = Number((subtotal + taxAmount).toFixed(2));

    return {
      ...invoiceDetailsMock,
      invoiceId: ref,
      issueDate: selectedInvoice?.invoiceDate ?? invoiceDetailsMock.issueDate,
      status: selectedInvoice?.status ?? invoiceDetailsMock.status,
      items,
      subtotal,
      taxAmount,
      totalPaid,
      paymentMethodValue: activePaymentMethod?.label ?? "N/A",
      paidOnValue:
        selectedInvoice?.invoiceDate ?? invoiceDetailsMock.paidOnValue,
    } satisfies InvoiceDetails;
  }, [selectedInvoice, currentPlan, seatUsage, activePaymentMethod]);

  const openInvoicePreview = (invoice: InvoiceRow) => {
    setSelectedInvoice(invoice);
    setInvoicePreviewOpen(true);
  };

  const savePaymentMethod = () => {
    const newMethod: PaymentMethod =
      paymentForm.type === "card"
        ? {
            id: `pm-${Date.now()}`,
            type: "card",
            label: `Visa ending in ${paymentForm.cardNumber.slice(-4) || "4242"}`,
            subLabel: `Expires ${paymentForm.expiryDate}`,
            isDefault: paymentForm.isDefault,
          }
        : {
            id: `pm-${Date.now()}`,
            type: "bank",
            label: "Bank Direct Debit",
            subLabel: `BSB: ${paymentForm.bsb} • Account: ••• ${paymentForm.accountNumber.slice(-4) || "5678"}`,
            isDefault: paymentForm.isDefault,
          };

    setPaymentMethods((prev) => {
      const normalized = prev.map((item) => ({
        ...item,
        isDefault: paymentForm.isDefault ? false : item.isDefault,
      }));

      const sameTypeIndex = normalized.findIndex(
        (item) => item.type === newMethod.type,
      );

      if (sameTypeIndex >= 0) {
        const next = [...normalized];
        next[sameTypeIndex] = newMethod;
        return ensureOneDefault(next);
      }

      return ensureOneDefault([newMethod, ...normalized]);
    });

    setPaymentModalOpen(false);
  };

  const addBrokerSeat = () => {
    setSeatUsage((prev) => ({
      ...prev,
      totalSeats: prev.totalSeats + 1,
    }));
  };

  const printInvoice = () => {
    window.print();
  };

  const downloadInvoicePdf = () => {
    window.print();
  };

  return (
    <>
      <div className="space-y-5">
        <div className="min-w-0">
          <h1 className="text-lg font-medium text-[#111827]">
            Subscription & Billing
          </h1>
          <p className="mt-1 text-sm leading-6 text-[#6B7280]">
            Manage your plan, seats, billing details, and invoices.
          </p>
        </div>

        <div className="flex items-start gap-2 rounded-xl border border-[#D8EAF7] bg-[#EEF8FF] px-4 py-3 text-[12px] text-[#1D9BF0]">
          <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          <p className="leading-5">
            Your subscription controls the number of active deals, referral
            partners, and broker seats available in your account.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
          <div className="space-y-4">
            <section className="rounded-2xl border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
              <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">
                <div className="min-w-0">
                  <p className="text-xs text-[#6B7280]">Active Plan</p>
                  <h2 className="mt-1 wrap-break-word text-[24px] font-medium tracking-[-0.03em] text-[#111827] sm:text-[28px]">
                    {currentPlan.planName}
                  </h2>

                  <div className="mt-5">
                    <p className="text-xs font-medium text-[#374151]">
                      Plan Features
                    </p>

                    <div className="mt-3 space-y-2">
                      {currentPlan.features.map((feature) => (
                        <div
                          key={feature.id}
                          className="flex items-start gap-2 text-[13px] leading-5 text-[#6B7280]"
                        >
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#22C55E]" />
                          <span>{feature.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="shrink-0 text-left lg:text-right">
                  <p className="text-[32px] font-semibold tracking-[-0.04em] text-[#111827] sm:text-[40px]">
                    {currentPlan.planId === "enterprise"
                      ? "Custom"
                      : `$${currentPlan.price}`}
                  </p>
                  <p className="-mt-1 text-xs text-[#9CA3AF]">
                    {currentPlan.priceSuffix}
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-4">
                <div className="grid grid-cols-1 gap-4 text-sm sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Next billing date</p>
                    <p className="mt-1 font-medium text-[#111827]">
                      {currentPlan.nextBillingDate}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9CA3AF]">Billing cycle</p>
                    <p className="mt-1 font-medium text-[#111827]">
                      {currentPlan.billingCycleLabel}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    navigate("change-plan", {
                      state: {
                        selectedPlanId: currentPlan.planId,
                        selectedCycle: currentPlan.billingCycle,
                      } satisfies ChangePlanRouteState,
                    })
                  }
                  className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0EA5E9] px-4 text-sm font-medium text-[#111827] transition hover:bg-sky-600 hover:text-white"
                >
                  Change Plan
                </button>
              </div>
            </section>

            <section className="rounded-2xl border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
              <h3 className="text-[16px] font-medium text-[#111827]">
                Team Seat Usage
              </h3>

              <div className="mt-4 flex items-center justify-between gap-3 text-[12px] text-[#6B7280]">
                <span>
                  {seatUsage.usedSeats} of {seatUsage.totalSeats} broker seats
                  used
                </span>
                <span>{Math.round(seatUsagePercent)}%</span>
              </div>

              <div className="mt-2 h-2 overflow-hidden rounded-full bg-[#D1D5DB]">
                <div
                  className="h-full rounded-full bg-[#0EA5E9]"
                  style={{ width: `${seatUsagePercent}%` }}
                />
              </div>

              <p className="mt-3 text-[12px] leading-5 text-[#9CA3AF]">
                Each additional broker seat adds $
                {seatUsage.additionalSeatMonthlyCost}/month.
              </p>

              <button
                type="button"
                onClick={addBrokerSeat}
                className="mt-4 inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#0EA5E9] px-4 text-sm font-medium text-[#111827] transition hover:bg-sky-600 hover:text-white"
              >
                Add Broker Seat
              </button>
            </section>

            <section className="rounded-2xl border border-[#DADDE3] bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] sm:p-5">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-[16px] font-medium text-[#111827]">
                  Invoice History
                </h3>
                <button
                  type="button"
                  onClick={() => setShowAllInvoices((prev) => !prev)}
                  className="text-left text-[12px] text-[#111827] transition hover:text-sky-600 sm:text-right"
                >
                  {showAllInvoices ? "Show Less" : "View All Invoices"}
                </button>
              </div>

              <div className="mt-4 space-y-4 lg:hidden">
                {visibleInvoices.map((invoice) => (
                  <InvoiceMobileCard
                    key={invoice.id}
                    invoice={invoice}
                    onOpen={() => openInvoicePreview(invoice)}
                  />
                ))}
              </div>

              <div className="mt-4 hidden overflow-x-auto lg:block">
                <table className="w-full min-w-190 border-separate border-spacing-0">
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
                    {visibleInvoices.map((invoice) => (
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

              {activePaymentMethod ? (
                <div className="mt-4 space-y-3">
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="rounded-xl border border-[#D8EAF7] bg-white px-3 py-3 text-[#111827]"
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#EAF2FF] text-[#4F7CFF]">
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
                          <p className="mt-1 wrap-break-word text-[11px] text-[#9CA3AF]">
                            {method.subLabel}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : null}

              <button
                type="button"
                onClick={() => setPaymentModalOpen(true)}
                className="mt-4 inline-flex h-10 w-full items-center justify-center rounded-md bg-black px-4 text-[13px] font-medium text-white transition hover:bg-slate-900"
              >
                Update Payment Method
              </button>

              <div className="mt-4 flex items-center gap-2 text-[10px] text-[#DFF6FF]">
                <ShieldCheck className="h-3.5 w-3.5 shrink-0" />
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
                Cancellation requires 30 days&apos; notice.
              </p>
            </section>
          </div>
        </div>
      </div>

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
          invoiceRef={selectedInvoice?.invoiceRef ?? invoiceDetails.invoiceId}
          invoice={invoiceDetails}
          onClose={() => setInvoicePreviewOpen(false)}
          onPrint={printInvoice}
          onDownload={downloadInvoicePdf}
        />
      ) : null}
    </>
  );
};

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
      className={`relative inline-flex h-5 w-9 items-center rounded-full transition ${
        checked ? "bg-[#020617]" : "bg-[#CBD5E1]"
      }`}
    >
      <span
        className={`inline-block h-4 w-4 rounded-full bg-white transition ${
          checked ? "translate-x-5" : "translate-x-0.5"
        }`}
      />
    </button>
  );
}

export default BrokerSubscription;
