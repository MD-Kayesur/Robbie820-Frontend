import { InvoiceDetails } from "@/pages/BrokerDashboard/BrokerSubscription/types";
import { formatMoney2 } from "@/pages/BrokerDashboard/BrokerSubscription/utils";
import { ArrowLeft, Download, Printer } from "lucide-react";

type Props = {
  invoiceRef: string;
  invoice: InvoiceDetails;
  onClose: () => void;
  onPrint: () => void;
  onDownload: () => void;
};

const InvoicePreviewModal = ({
  invoiceRef,
  invoice,
  onClose,
  onPrint,
  onDownload,
}: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 md:p-6">
      <div className="flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[22px] border border-[#CBD5E1] bg-[#F3FAFF] shadow-[0_30px_80px_rgba(0,0,0,0.22)]">
        <div className="border-b border-[#D8EAF7] px-4 py-4 md:px-6 md:py-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#6B7280] transition hover:bg-slate-50"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>

              <span className="truncate text-[13px] text-[#374151] md:text-sm">
                Back Subscription & Billing
              </span>
            </div>

            <button
              type="button"
              onClick={onDownload}
              className="h-10 w-full items-center justify-center gap-2 rounded-md bg-[#020617] px-3 text-[13px] font-medium text-white transition hover:bg-slate-900 md:w-auto hidden md:inline-flex"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="rounded-xl border border-[#D8EAF7] bg-white p-4 md:p-7">
            <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-[#111827] md:text-[28px]">
                  {invoice.fromName}
                </h2>
                <p className="mt-1 text-[14px] text-[#6B7280]">
                  {invoice.fromDepartment}
                </p>
                <p className="mt-1 break-all text-[14px] text-[#6B7280]">
                  {invoice.fromEmail}
                </p>
              </div>

              <div className="text-left md:text-right">
                <h3 className="text-[18px] font-semibold text-[#111827] md:text-[22px]">
                  Invoice #{invoiceRef}
                </h3>
                <p className="mt-1 text-[12px] text-[#9CA3AF]">
                  Issue Date: {invoice.issueDate}
                </p>
                <span className="mt-2 inline-flex rounded-full bg-[#DCFCE7] px-2.5 py-1 text-[11px] font-medium text-[#22C55E]">
                  {invoice.status}
                </span>
              </div>
            </div>

            <div className="mt-5 border-t border-[#E5E7EB] pt-5">
              <p className="text-[14px] font-medium text-[#374151]">BILL TO</p>
              <p className="mt-1 text-[18px] font-semibold text-[#111827] md:text-[22px]">
                {invoice.billToName}
              </p>
              <p className="mt-1 text-[14px] text-[#6B7280]">
                {invoice.billToContact}
              </p>
              <p className="mt-1 break-all text-[14px] text-[#6B7280]">
                {invoice.billToEmail}
              </p>
            </div>

            <div className="mt-5 space-y-3 md:hidden">
              {invoice.items.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-[#E5E7EB] p-4 text-[14px]"
                >
                  <p className="font-medium text-[#111827]">
                    {item.description}
                  </p>

                  <div className="mt-3 grid grid-cols-2 gap-3 text-[#6B7280]">
                    <div>
                      <p className="text-[11px]">Quantity</p>
                      <p className="mt-1 font-medium text-[#111827]">
                        {item.quantity}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px]">Unit Price</p>
                      <p className="mt-1 font-medium text-[#111827]">
                        {formatMoney2(item.unitPrice)}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-[11px]">Amount</p>
                      <p className="mt-1 font-semibold text-[#111827]">
                        {formatMoney2(item.amount)}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 hidden md:block">
              <div className="overflow-x-auto">
                <table className="w-full min-w-160 border-separate border-spacing-0">
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
                      <th className="border-b border-[#E5E7EB] px-1 py-2 text-right font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoice.items.map((item) => (
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
            </div>

            <div className="mt-4 flex justify-end">
              <div className="w-full max-w-full space-y-2 text-[14px] text-[#6B7280] md:max-w-65">
                <div className="flex items-center justify-between">
                  <span>Subtotal</span>
                  <span className="font-medium text-[#111827]">
                    {formatMoney2(invoice.subtotal)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>{invoice.taxLabel}</span>
                  <span className="font-medium text-[#111827]">
                    {formatMoney2(invoice.taxAmount)}
                  </span>
                </div>
                <div className="flex items-center justify-between rounded-md bg-[#F3F4F6] px-3 py-2">
                  <span className="font-medium text-[#111827]">Total Paid</span>
                  <span className="font-medium text-[#111827]">
                    {formatMoney2(invoice.totalPaid)}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-xl bg-[#EAF8EF] px-4 py-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#16A34A]">
                    {invoice.paymentMethodLabel}
                  </p>
                  <p className="text-[13px] text-[#22C55E]">
                    {invoice.paymentMethodValue}
                  </p>
                </div>

                <div className="text-left md:text-right">
                  <p className="text-[14px] font-semibold text-[#16A34A]">
                    {invoice.paidOnLabel}
                  </p>
                  <p className="text-[13px] text-[#22C55E]">
                    {invoice.paidOnValue}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-[#E5E7EB] pt-4">
              <div className="flex flex-col gap-3 md:flex-row md:justify-end">
                <button
                  type="button"
                  onClick={onPrint}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md border border-[#D1D5DB] bg-white px-4 text-[14px] font-medium text-[#111827] transition hover:bg-slate-50 md:w-auto"
                >
                  <Printer className="h-4 w-4" />
                  Print Invoice
                </button>
                <button
                  type="button"
                  onClick={onDownload}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-md bg-[#020617] px-4 text-[14px] font-medium text-white transition hover:bg-slate-900 md:w-auto"
                >
                  <Download className="h-4 w-4" />
                  Download PDF
                </button>
              </div>
            </div>
          </div>

          <p className="mt-4 text-center text-[13px] leading-5 text-[#9CA3AF]">
            {invoice.footerNote}
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePreviewModal;
