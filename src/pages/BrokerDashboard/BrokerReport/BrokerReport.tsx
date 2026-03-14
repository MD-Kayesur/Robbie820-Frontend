import { useEffect, useMemo, useRef, useState } from "react";
import { Download } from "lucide-react";

import {
  datePresetOptions,
  fundedDealsRows,
  partnerAuditData,
  performanceRows,
  rangeOptions,
  referrerOptions,
  settlementForecastData,
  summaryMetrics,
} from "./mock";
import type { ReferrerKey, ReportRangeKey } from "./types";
import { downloadBlob, formatMoney } from "./utils";

import ReportMetricCard from "@/components/BrokerDashboardCom/BReportCom/ReportMetricCard";
import {
  AuditChart,
  ForecastChart,
  PanelMenu,
  PanelRangeButton,
  SmallMenuRow,
} from "@/components/BrokerDashboardCom/BReportCom/ReportCharts";
import PerformanceTable from "@/components/BrokerDashboardCom/BReportCom/PerformanceTable";
import FundedDealsModal from "@/components/BrokerDashboardCom/BReportCom/FundedDealsModal";
import ReportFilters from "@/components/BrokerDashboardCom/BReportCom/ReportFilters";

const BrokerReport = () => {
  const [range, setRange] = useState<ReportRangeKey>("MTD");
  const [datePreset, setDatePreset] = useState("NOV_2025_JAN_2026");
  const [referrer, setReferrer] = useState<ReferrerKey>("ALL");
  const [openMenu, setOpenMenu] = useState<
    null | "range" | "date" | "referrer"
  >(null);

  const [auditRange, setAuditRange] = useState<ReportRangeKey>("LAST_6_MONTHS");
  const [forecastRange, setForecastRange] =
    useState<ReportRangeKey>("LAST_6_MONTHS");
  const [tableRange, setTableRange] = useState<ReportRangeKey>("LAST_6_MONTHS");

  const [auditMenuOpen, setAuditMenuOpen] = useState(false);
  const [forecastMenuOpen, setForecastMenuOpen] = useState(false);
  const [tableMenuOpen, setTableMenuOpen] = useState(false);

  const [auditHoverIndex, setAuditHoverIndex] = useState<number | null>(0);
  const [modalReferrer, setModalReferrer] = useState<ReferrerKey | null>(null);

  const topFiltersRef = useRef<HTMLDivElement | null>(null);
  const auditMenuRef = useRef<HTMLDivElement | null>(null);
  const forecastMenuRef = useRef<HTMLDivElement | null>(null);
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

      if (
        forecastMenuRef.current &&
        !forecastMenuRef.current.contains(target)
      ) {
        setForecastMenuOpen(false);
      }

      if (tableMenuRef.current && !tableMenuRef.current.contains(target)) {
        setTableMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    document.body.style.overflow = modalReferrer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modalReferrer]);

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

  const exportPDF = () => {
    window.print();
  };

  return (
    <>
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

          <div className="grid w-full grid-cols-1 gap-2 md:w-auto md:grid-cols-2">
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

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((item) => (
            <ReportMetricCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
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
              onFundedClick={(refKey) => setModalReferrer(refKey)}
            />
          </section>

          <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 md:p-5">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
              <div className="min-w-0">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] md:text-[18px]">
                  Settlement Forecast
                </h2>
                <p className="mt-1 text-xs text-[#9CA3AF]">
                  Projected funding volume based on pipeline dates
                </p>
              </div>

              <div className="relative shrink-0" ref={forecastMenuRef}>
                <PanelRangeButton
                  label={
                    rangeOptions.find((item) => item.value === forecastRange)
                      ?.label ?? "Last 6 Month"
                  }
                  open={forecastMenuOpen}
                  onClick={() => setForecastMenuOpen((prev) => !prev)}
                />
                {forecastMenuOpen ? (
                  <PanelMenu>
                    {rangeOptions.map((option) => (
                      <SmallMenuRow
                        key={option.value}
                        label={option.label}
                        active={forecastRange === option.value}
                        onClick={() => {
                          setForecastRange(option.value);
                          setForecastMenuOpen(false);
                        }}
                      />
                    ))}
                  </PanelMenu>
                ) : null}
              </div>
            </div>

            <ForecastChart data={settlementForecastData} />
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
            onOpenFunded={(referrerKey) => setModalReferrer(referrerKey)}
          />
        </div>
      </div>

      {modalReferrer ? (
        <FundedDealsModal
          title="Funded Deals"
          partnerLabel={modalReferrerLabel}
          dateLabel="Oct 1, 2023 - Oct 31, 2023"
          rows={modalDeals}
          onClose={() => setModalReferrer(null)}
        />
      ) : null}
    </>
  );
};

export default BrokerReport;
