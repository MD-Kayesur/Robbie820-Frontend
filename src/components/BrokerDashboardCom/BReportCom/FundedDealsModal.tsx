import { FundedDealRow } from "@/pages/BrokerDashboard/BrokerReport/types";
import { formatMoney } from "@/pages/BrokerDashboard/BrokerReport/utils";
import { Download, MoreHorizontal, X } from "lucide-react";

type FundedDealsModalProps = {
  title: string;
  partnerLabel: string;
  dateLabel: string;
  rows: FundedDealRow[];
  onClose: () => void;
  onExport: () => void;
};

const FundedDealsModal = ({
  title,
  partnerLabel,
  dateLabel,
  rows,
  onClose,
  onExport,
}: FundedDealsModalProps) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3 md:p-6">
      <div className="relative max-h-[90vh] w-full max-w-512 overflow-hidden rounded-[22px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.22)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between gap-4 pr-12">
            <div>
              <h3 className="text-[20px] font-semibold tracking-[-0.03em] text-[#111827] md:text-[24px]">
                {title}
              </h3>
              <p className="mt-1 text-sm text-[#6B7280] md:text-[16px]">
                Partner: {partnerLabel} {dateLabel}
              </p>
            </div>
            <button
              type="button"
              onClick={onExport}
              className="inline-flex items-center gap-2 rounded-lg border border-[#BEE3F8] bg-[#DFF4FF] px-4 py-2 text-xs font-medium text-[#355268] transition hover:bg-[#d3effd]"
            >
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">EXPORT CSV</span>
            </button>
          </div>

          <div className="mt-6 space-y-4 lg:hidden">
            {rows.length ? (
              rows.map((row) => (
                <div
                  key={row.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-white p-4"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-base font-medium tracking-[-0.02em] text-[#111827]">
                        {row.borrower}
                      </p>
                      <p className="mt-1 text-sm lowercase text-[#6B7280]">
                        ref: {row.referrerLabel}
                      </p>
                    </div>

                    <button
                      type="button"
                      className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[#111827] transition hover:bg-slate-100"
                    >
                      <MoreHorizontal className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[11px] text-[#6B7280]">Amount</p>
                      <p className="mt-1 font-medium text-[#111827]">
                        {formatMoney(row.amount)}
                      </p>
                    </div>



                    <div>
                      <p className="text-[11px] text-[#6B7280]">Last Updated</p>
                      <p className="mt-1 font-medium text-[#111827]">
                        {row.lastUpdated}
                      </p>
                    </div>

                    <div>
                      <p className="text-[11px] text-[#6B7280]">Status</p>
                      <p className="mt-1 font-medium text-[#23803D]">
                        {row.status}
                      </p>
                    </div>

                    <div className="col-span-2">
                      <p className="text-[11px] text-[#6B7280]">Commission</p>
                      <p className="mt-1 font-medium text-[#23803D]">
                        {formatMoney(row.commission)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="px-5 py-10 text-center text-sm text-[#6B7280]">
                No funded deals found.
              </div>
            )}
          </div>

          <div className="mt-8 hidden overflow-x-auto lg:block">
            <table className="w-full min-w-337.5 border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-[14px] uppercase tracking-[0.01em] text-[#111827]">
                  <th className="border-b border-[#DCDCDC] px-5 py-5 font-medium">
                    Borrower
                  </th>
                  <th className="border-b border-[#DCDCDC] px-5 py-5 font-medium">
                    Amount
                  </th>
                  <th className="border-b border-[#DCDCDC] px-5 py-5 font-medium">
                    Last Updated
                  </th>
                  <th className="border-b border-[#DCDCDC] px-5 py-5 font-medium">
                    Status
                  </th>
                  <th className="border-b border-[#DCDCDC] px-5 py-5 font-medium">
                    Commission
                  </th>
                  <th className="border-b border-[#DCDCDC] px-5 py-5 font-medium">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="text-[14px] text-[#374151]">
                    <td className="border-b border-[#E5E7EB] px-5 py-6">
                      <div>
                        <p className="text-[18px] font-medium tracking-[-0.02em] text-[#111827]">
                          {row.borrower}
                        </p>
                        <p className="mt-1 text-[14px] lowercase text-[#6B7280]">
                          ref: {row.referrerLabel}
                        </p>
                      </div>
                    </td>
                    <td className="border-b border-[#E5E7EB] px-5 py-6 text-[18px]">
                      {formatMoney(row.amount)}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-5 py-6 text-[18px]">
                      {row.lastUpdated}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-5 py-6">
                      <span className="text-[18px] font-medium text-[#23803D]">
                        {row.status}
                      </span>
                    </td>

                    <td className="border-b border-[#E5E7EB] px-5 py-6 text-[18px] font-medium text-[#23803D]">
                      {formatMoney(row.commission)}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-5 py-6">
                      <button
                        type="button"
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-[#111827] transition hover:bg-slate-100"
                      >
                        <MoreHorizontal className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))}

                {!rows.length ? (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-10 text-center text-sm text-[#6B7280]"
                    >
                      No funded deals found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundedDealsModal;
