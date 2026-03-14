import { useState } from "react";
import { Calendar, Download, X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

function ExportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [exportScope, setExportScope] = useState("Filtered Results");
  const [fields, setFields] = useState({
    borrowerName: true,
    referrer: true,
    loanAmount: true,
    stage: true,
    expectedCommission: true,
    commissionStatus: true,
    dateSubmitted: true,
    settlementDate: true,
  });

  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  if (!open) return null;

  const dateOptions = ["Last 30 Days", "MTD", "FYTD", "Custom"] as const;
  const scopeOptions = ["All Referrals", "Filtered Results"] as const;

  const includeRows = [
    ["Borrower Name", "borrowerName"],
    ["Referrer", "referrer"],
    ["Loan Amount", "loanAmount"],
    ["Stage", "stage"],
    ["Expected Commission", "expectedCommission"],
    ["Commission Status", "commissionStatus"],
    ["Date Submitted", "dateSubmitted"],
    ["Settlement Date", "settlementDate"],
  ] as const;

  const toggleField = (key: keyof typeof fields) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <div
        ref={modalRef}
        className="max-h-[95vh] w-full max-w-120 overflow-y-auto rounded-xl bg-white p-5 shadow-[0_28px_80px_rgba(0,0,0,0.28)] md:p-6"
      >
        <div className="flex items-start gap-3 border-b border-[#E5E7EB] pb-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-[#D8EEF9] md:h-16 md:w-16">
            <Download
              className="h-6 w-6 text-[#0EA5E9] md:h-7 md:w-7"
              strokeWidth={1.8}
            />
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <h2 className="text-[20px] font-semibold leading-none text-black md:text-[24px]">
              Export Referrals
            </h2>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              Generate a detailed CSV report
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-9 w-9 items-center justify-center rounded-full text-black transition hover:bg-[#F3F4F6]"
          >
            <X className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-6 space-y-7">
          <section>
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-black" strokeWidth={1.8} />
              <h3 className="text-[18px] font-medium text-black">Date Range</h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {dateOptions.map((option) => {
                const active = dateRange === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDateRange(option)}
                    className={cn(
                      "h-11 rounded-xl border px-3 text-[14px] transition",
                      active
                        ? "border-[#11A9F3] bg-[#EDF7FC] text-[#11A9F3]"
                        : "border-[#11A9F3] bg-white text-[#11A9F3]",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-black" strokeWidth={1.8} />
              <h3 className="text-[18px] font-medium text-black">
                Export Scope
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {scopeOptions.map((option) => {
                const active = exportScope === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setExportScope(option)}
                    className={cn(
                      "h-11 rounded-xl border px-3 text-[14px] transition",
                      active
                        ? "border-[#11A9F3] bg-[#EDF7FC] text-[#11A9F3]"
                        : "border-[#11A9F3] bg-white text-[#11A9F3]",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-5 w-5 text-black" strokeWidth={1.8} />
              <h3 className="text-[18px] font-medium text-black">
                Include Fields
              </h3>
            </div>

            <div className="rounded-lg border border-[#D1D5DB] bg-[#F5F5F5] px-4 py-4 md:px-5">
              <div className="space-y-3">
                {includeRows.map(([label, key]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleField(key)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="text-[14px] text-black">{label}</span>

                    <span
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded border",
                        fields[key]
                          ? "border-[#11A9F3] text-[#11A9F3]"
                          : "border-[#CBD5E1] text-transparent",
                      )}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-3 w-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4.5 10.5l3.5 3.5 7-8" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="h-11 rounded-xl bg-[#CDE8F4] px-5 text-[15px] font-medium text-black transition hover:opacity-90"
          >
            Cancel
          </button>

          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#11A9F3] px-5 text-[15px] font-medium text-white transition hover:opacity-90"
          >
            <Download className="h-4 w-4" strokeWidth={1.9} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExportModal;
