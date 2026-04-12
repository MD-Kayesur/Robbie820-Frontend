import { useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";

import {
  datePresetOptions,
  fundedDealsRows,
  partnerAuditData,
  performanceRows,
  rangeOptions,
  referrerOptions,
  summaryMetrics,
} from "./mock";
import type { ReferrerKey, ReportRangeKey } from "./types";
import { downloadBlob, formatMoney } from "./utils";

import {
  AuditChart,
  PanelMenu,
  PanelRangeButton,
  SmallMenuRow,
} from "@/components/BrokerDashboardCom/BReportCom/ReportCharts";
import PerformanceTable from "@/components/BrokerDashboardCom/BReportCom/PerformanceTable";
import ReportMetricCard from "@/components/BrokerDashboardCom/BReportCom/ReportMetricCard";
import ReportFilters from "@/components/BrokerDashboardCom/BReportCom/ReportFilters";

const BrokerReport = () => {
  const [range, setRange] = useState<ReportRangeKey>("MTD");
  const [datePreset, setDatePreset] = useState("NOV_2025_JAN_2026");
  const [referrer, setReferrer] = useState<ReferrerKey>("ALL");
  const [openMenu, setOpenMenu] = useState<
    null | "range" | "date" | "referrer"
  >(null);

  const [auditRange, setAuditRange] = useState<ReportRangeKey>("LAST_6_MONTHS");
  const [tableRange, setTableRange] = useState<ReportRangeKey>("LAST_6_MONTHS");

  const [auditMenuOpen, setAuditMenuOpen] = useState(false);
  const [tableMenuOpen, setTableMenuOpen] = useState(false);

  const [auditHoverIndex, setAuditHoverIndex] = useState<number | null>(0);
  const [modalReferrer, setModalReferrer] = useState<ReferrerKey | null>(null);
  const [modalType, setModalType] = useState<"LEADS" | "FUNDED">("FUNDED");

  const topFiltersRef = useRef<HTMLDivElement | null>(null);
  const auditMenuRef = useRef<HTMLDivElement | null>(null);
  const tableMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as Node;

      if (topFiltersRef.current && !topFiltersRef.current.contains(target)) {
        setOpenMenu(null);
      }

      if (auditMenuRef.current && !auditMenuRef.current.contains(target)) {
        setAuditMenuOpen(false);
      }

      if (tableMenuRef.current && !tableMenuRef.current.contains(target)) {
        setTableMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const selectedRangeLabel =
    rangeOptions.find((item) => item.value === range)?.label ?? "Last 6 Month";

  const selectedDateLabel =
    datePresetOptions.find((item) => item.value === datePreset)?.label ??
    "Nov 2025 - Jan 2026";

  const selectedReferrerLabel =
    referrerOptions.find((item) => item.value === referrer)?.label ??
    "All Referrers";

  const modalDeals = useMemo(() => {
    if (!modalReferrer) return [];
    return fundedDealsRows.filter((row) => row.referrer === modalReferrer);
  }, [modalReferrer]);

  const modalReferrerLabel =
    referrerOptions.find((item) => item.value === modalReferrer)?.label ??
    "Partner";

  const exportCSV = () => {
    const headers = [
      "Referrer Name",
      "Leads",
      "Funded Deals",
      "Conversion %",
      "Volume Funded",
      "Total Commission",
      "Avg Deal Size",
    ];

    const rows = performanceRows.map((row) => [
      row.referrerName,
      row.leads,
      row.fundedDeals,
      `${row.conversion}%`,
      `$${row.volumeFunded.toFixed(1)}M`,
      formatMoney(row.totalCommission),
      formatMoney(row.avgDealSize),
    ]);

    const csvContent = [headers, ...rows]
      .map((line) => line.map((item) => `"${String(item)}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadBlob(blob, "broker-report.csv");
  };

  const exportModalCSV = () => {
    const headers = [
      "Borrower",
      "Referrer Label",
      "Amount",
      "Last Updated",
      "Status",
      "Commission",
    ];

    const rows = modalDeals.map((row) => [
      row.borrower,
      row.referrerLabel,
      row.amount,
      row.lastUpdated,
      row.status,
      row.commission,
    ]);

    const csvContent = [headers, ...rows]
      .map((line) => line.map((item) => `"${String(item)}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    downloadBlob(
      blob,
      `${modalType.toLowerCase()}-deals-${modalReferrer?.toLowerCase()}.csv`,
    );
  };

  const exportPDF = () => {
    window.print();
  };

  return (
    <div className="report-print-content">
      <div className="space-y-5 md:space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-medium tracking-[-0.02em] text-[#111827] md:text-xl">
              Performance Analytics
            </h1>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">
              financial forecasting and referrer conversion audit.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 md:w-auto md:grid-cols-2 print:hidden">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BEE3F8] bg-[#DFF4FF] px-4 text-xs font-medium tracking-[0.01em] text-[#355268] transition hover:bg-[#d3effd] md:w-auto"
            >
              <Download className="h-4 w-4" />
              EXPORT CSV
            </button>

            <button
              type="button"
              onClick={exportPDF}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0EA5E9] px-4 text-xs font-medium tracking-[0.01em] text-white transition hover:bg-sky-600 md:w-auto"
            >
              <Download className="h-4 w-4" />
              EXPORT PDF
            </button>
          </div>
        </div>

        <div className="print:hidden">
          <ReportFilters
            containerRef={topFiltersRef}
            openMenu={openMenu}
            onOpenMenuChange={setOpenMenu}
            range={range}
            datePreset={datePreset}
            referrer={referrer}
            selectedRangeLabel={selectedRangeLabel}
            selectedDateLabel={selectedDateLabel}
            selectedReferrerLabel={selectedReferrerLabel}
            onRangeChange={setRange}
            onDatePresetChange={setDatePreset}
            onReferrerChange={setReferrer}
          />
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 report-metrics-grid">
          {summaryMetrics.map((item) => (
            <ReportMetricCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2 report-charts-grid">
          <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] md:text-[18px]">
                  Partner Conversion Audit
                </h2>
                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Leads vs. Converted deals by primary referrer
                </p>
              </div>

              <div className="relative shrink-0" ref={auditMenuRef}>
                <PanelRangeButton
                  label={
                    rangeOptions.find((item) => item.value === auditRange)
                      ?.label ?? "Last 6 Month"
                  }
                  open={auditMenuOpen}
                  onClick={() => setAuditMenuOpen((prev) => !prev)}
                />
                {auditMenuOpen ? (
                  <PanelMenu>
                    {rangeOptions.map((option) => (
                      <SmallMenuRow
                        key={option.value}
                        label={option.label}
                        active={auditRange === option.value}
                        onClick={() => {
                          setAuditRange(option.value);
                          setAuditMenuOpen(false);
                        }}
                      />
                    ))}
                  </PanelMenu>
                ) : null}
              </div>
            </div>

            <AuditChart
              data={partnerAuditData}
              hoverIndex={auditHoverIndex}
              onHoverIndex={setAuditHoverIndex}
              onLeadsClick={(refKey) => {
                setModalType("LEADS");
                setModalReferrer(refKey);
              }}
              onFundedClick={(refKey) => {
                setModalType("FUNDED");
                setModalReferrer(refKey);
              }}
            />
          </section>

          <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 md:p-5 overflow-hidden">
            {modalReferrer ? (
              <div className="flex flex-col h-full">
                <div className="mb-6 flex items-center justify-between gap-4 pr-2">
                  <div>
                    <h3 className="text-[18px] font-semibold tracking-[-0.03em] text-[#111827]">
                      {modalType === "LEADS" ? "Lead Details" : "Funded Deals"}
                    </h3>
                    <p className="mt-1 text-sm text-[#6B7280]">
                      Partner: {modalReferrerLabel}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={exportModalCSV}
                    className="inline-flex items-center gap-2 rounded-lg border border-[#BEE3F8] bg-[#DFF4FF] px-4 py-2 text-xs font-medium text-[#355268] transition hover:bg-[#d3effd] print:hidden"
                  >
                    <Download className="h-4 w-4" />
                    <span>EXPORT LIST</span>
                  </button>
                </div>

                <div className="flex-1 overflow-auto -mx-4 md:-mx-5 px-4 md:px-5">
                  {modalDeals.length ? (
                    <table className="w-full min-w-100 border-separate border-spacing-0">
                      <thead>
                        <tr className="text-left text-[11px] uppercase tracking-[0.01em] text-[#9CA3AF]">
                          <th className="border-b border-[#E5E7EB] pb-3 pr-4 font-medium">Borrower</th>
                          <th className="border-b border-[#E5E7EB] pb-3 pr-4 font-medium text-right">Amount</th>
                          <th className="border-b border-[#E5E7EB] pb-3 font-medium text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {modalDeals.map((row) => (
                          <tr key={row.id} className="text-[13px] text-[#374151]">
                            <td className="border-b border-[#F3F4F6] py-3 pr-4">
                              <p className="font-medium text-[#111827]">{row.borrower}</p>
                            </td>
                            <td className="border-b border-[#F3F4F6] py-3 pr-4 text-right">
                              {formatMoney(row.amount)}
                            </td>
                            <td className="border-b border-[#F3F4F6] py-3 text-right">
                              <span className="inline-flex items-center rounded-full bg-[#E8F8EA] px-2 py-0.5 text-[10px] font-medium text-[#23803D]">
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full py-10 text-center">
                      <p className="text-sm text-[#6B7280]">No records found for this partner.</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full py-10 text-center border-2 border-dashed border-[#EEF2F7] rounded-xl">
                <div className="h-12 w-12 rounded-full bg-[#F8FAFC] flex items-center justify-center mb-3">
                  <Download className="h-6 w-6 text-[#9CA3AF]" />
                </div>
                <h3 className="text-sm font-medium text-[#374151]">Partner Insights</h3>
                <p className="mt-1 text-xs text-[#9CA3AF] max-w-40 mx-auto">
                  Select a grey (Leads) or blue (Funded) bar to view details.
                </p>
              </div>
            )}
          </section>
        </div>

        <div ref={tableMenuRef}>
          <PerformanceTable
            rows={performanceRows}
            rangeLabel={
              rangeOptions.find((item) => item.value === tableRange)?.label ??
              "Last 6 Month"
            }
            menuOpen={tableMenuOpen}
            onToggleMenu={() => setTableMenuOpen((prev) => !prev)}
            onSelectRange={(value) => {
              setTableRange(value);
              setTableMenuOpen(false);
            }}
            onOpenFunded={(referrerKey) => {
              setModalType("FUNDED");
              setModalReferrer(referrerKey);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BrokerReport;
