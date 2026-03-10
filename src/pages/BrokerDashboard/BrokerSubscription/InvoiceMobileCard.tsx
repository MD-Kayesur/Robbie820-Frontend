import { Download } from "lucide-react";
import type { InvoiceRow } from "./types";
import { formatMoney } from "./utils";

type Props = {
  invoice: InvoiceRow;
  onOpen: () => void;
};

const InvoiceMobileCard = ({ invoice, onOpen }: Props) => {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#111827]">
            {invoice.planName}
          </p>
          <p className="mt-1 text-xs text-[#9CA3AF]">{invoice.invoiceRef}</p>
        </div>

        <button
          type="button"
          onClick={onOpen}
          className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-[#111827] transition hover:bg-slate-100"
        >
          <Download className="h-4 w-4" />
        </button>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-[13px]">
        <div>
          <p className="text-[11px] text-[#6B7280]">Invoice Date</p>
          <p className="mt-1 font-medium text-[#111827]">
            {invoice.invoiceDate}
          </p>
        </div>

        <div>
          <p className="text-[11px] text-[#6B7280]">Amount</p>
          <p className="mt-1 font-semibold text-[#111827]">
            {formatMoney(invoice.amount)}
          </p>
        </div>

        <div>
          <p className="text-[11px] text-[#6B7280]">Status</p>
          <span className="mt-1 rounded-full bg-[#DCFCE7] px-2 py-1 text-[11px] font-medium text-[#22C55E]">
            {invoice.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default InvoiceMobileCard;
