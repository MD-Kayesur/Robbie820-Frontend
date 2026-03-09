import { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  TrendingUp,
  Waves,
  ArrowUpRight,
  DollarSign,
  FileText,
  X,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
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
import type {
  AuditBarDatum,
  ForecastDatum,
  FundedDealRow,
  ReferrerKey,
  ReportRangeKey,
  SummaryMetric,
} from "./types";

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
      <div className="space-y-5 sm:space-y-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <h1 className="text-lg font-semibold tracking-[-0.02em] text-[#111827] sm:text-xl">
              Performance Analytics
            </h1>
            <p className="mt-1 text-sm leading-6 text-[#6B7280]">
              financial forecasting and referrer conversion audit.
            </p>
          </div>

          <div className="grid w-full grid-cols-1 gap-2 sm:w-auto sm:grid-cols-2">
            <button
              type="button"
              onClick={exportCSV}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#BEE3F8] bg-[#DFF4FF] px-4 text-xs font-medium tracking-[0.01em] text-[#355268] transition hover:bg-[#d3effd] sm:w-auto"
            >
              <Download className="h-4 w-4" />
              EXPORT CSV
            </button>

            <button
              type="button"
              onClick={exportPDF}
              className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg bg-[#0EA5E9] px-4 text-xs font-medium tracking-[0.01em] text-white transition hover:bg-sky-600 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              EXPORT PDF
            </button>
          </div>
        </div>

        <div
          ref={topFiltersRef}
          className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:flex xl:flex-wrap xl:items-center"
        >
          <div className="relative min-w-0">
            <TopFilterButton
              icon={<CalendarDays className="h-4 w-4" />}
              label={selectedRangeLabel}
              open={openMenu === "range"}
              onClick={() =>
                setOpenMenu((prev) => (prev === "range" ? null : "range"))
              }
            />
            {openMenu === "range" ? (
              <DropdownCard className="w-full min-w-0 sm:w-[240px]">
                {rangeOptions.map((option) => (
                  <CompactMenuRow
                    key={option.value}
                    label={option.label}
                    active={range === option.value}
                    onClick={() => {
                      setRange(option.value);
                      setOpenMenu(null);
                    }}
                  />
                ))}
              </DropdownCard>
            ) : null}
          </div>

          <div className="relative min-w-0">
            <TopFilterButton
              icon={<CalendarDays className="h-4 w-4" />}
              label={selectedDateLabel}
              open={openMenu === "date"}
              onClick={() =>
                setOpenMenu((prev) => (prev === "date" ? null : "date"))
              }
            />
            {openMenu === "date" ? (
              <DropdownCard className="w-full min-w-0 sm:w-[320px]">
                {datePresetOptions.map((option) => (
                  <CompactMenuRow
                    key={option.value}
                    label={option.label}
                    icon={
                      option.withCalendar ? (
                        <CalendarDays className="h-4 w-4" />
                      ) : undefined
                    }
                    active={datePreset === option.value}
                    onClick={() => {
                      setDatePreset(option.value);
                      setOpenMenu(null);
                    }}
                  />
                ))}
              </DropdownCard>
            ) : null}
          </div>

          <div className="relative min-w-0 md:col-span-2 xl:col-span-1">
            <TopFilterButton
              icon={<Filter className="h-4 w-4" />}
              label={selectedReferrerLabel}
              open={openMenu === "referrer"}
              onClick={() =>
                setOpenMenu((prev) => (prev === "referrer" ? null : "referrer"))
              }
            />
            {openMenu === "referrer" ? (
              <DropdownCard className="w-full min-w-0 sm:w-[320px]">
                {referrerOptions.map((option) => (
                  <CompactMenuRow
                    key={option.value}
                    label={option.label}
                    active={referrer === option.value}
                    onClick={() => {
                      setReferrer(option.value);
                      setOpenMenu(null);
                    }}
                  />
                ))}
              </DropdownCard>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {summaryMetrics.map((item) => (
            <MetricCard key={item.id} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
          <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] sm:text-[18px]">
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

          <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 sm:p-5">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] sm:text-[18px]">
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

        <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 sm:p-5">
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
            <div className="min-w-0">
              <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] sm:text-[18px]">
                Performance Analytics
              </h2>
              <p className="mt-1 text-xs text-[#9CA3AF]">
                financial forecasting and referrer conversion audit.
              </p>
            </div>

            <div className="relative shrink-0" ref={tableMenuRef}>
              <PanelRangeButton
                label={
                  rangeOptions.find((item) => item.value === tableRange)
                    ?.label ?? "Last 6 Month"
                }
                open={tableMenuOpen}
                onClick={() => setTableMenuOpen((prev) => !prev)}
              />
              {tableMenuOpen ? (
                <PanelMenu>
                  {rangeOptions.map((option) => (
                    <SmallMenuRow
                      key={option.value}
                      label={option.label}
                      active={tableRange === option.value}
                      onClick={() => {
                        setTableRange(option.value);
                        setTableMenuOpen(false);
                      }}
                    />
                  ))}
                </PanelMenu>
              ) : null}
            </div>
          </div>

          <div className="space-y-4 lg:hidden">
            {performanceRows.map((row) => (
              <PerformanceMobileCard
                key={row.referrerName}
                row={row}
                onOpenFunded={() => setModalReferrer(row.referrer)}
              />
            ))}
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-[920px] border-separate border-spacing-0">
              <thead>
                <tr className="text-left text-[12px] uppercase tracking-[0.01em] text-[#111827]">
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Referrer Name
                  </th>
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Leads
                  </th>
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Funded Deals
                  </th>
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Conversion %
                  </th>
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Volume Funded
                  </th>
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Total Comm...
                  </th>
                  <th className="border-b border-[#E5E7EB] px-4 py-4 font-medium">
                    Avg. Deal Size
                  </th>
                </tr>
              </thead>

              <tbody>
                {performanceRows.map((row) => (
                  <tr
                    key={row.referrerName}
                    className="text-[14px] text-[#4B5563]"
                  >
                    <td className="border-b border-[#E5E7EB] px-4 py-4">
                      {row.referrerName}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-4">
                      {row.leads}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-4 text-[#22C55E]">
                      <button
                        type="button"
                        className="font-medium hover:underline"
                        onClick={() => setModalReferrer(row.referrer)}
                      >
                        {row.fundedDeals}
                      </button>
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-4 text-[#0EA5E9]">
                      {row.conversion.toFixed(1)}%
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-4">
                      ${row.volumeFunded.toFixed(1)}M
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-4 text-[#8B5CF6]">
                      {formatMoney(row.totalCommission)}
                    </td>
                    <td className="border-b border-[#E5E7EB] px-4 py-4">
                      {formatMoney(row.avgDealSize)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
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

function TopFilterButton({
  icon,
  label,
  open,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex h-11 w-full min-w-0 items-center justify-between gap-3 rounded-lg border bg-white px-4 text-sm text-[#111827] transition xl:min-w-[160px] xl:w-auto",
        open ? "border-[#8ED3FF]" : "border-[#E5E7EB] hover:border-[#CBEAFE]",
      )}
    >
      <span className="flex min-w-0 items-center gap-3">
        <span className="shrink-0 text-[#111827]">{icon}</span>
        <span className="truncate">{label}</span>
      </span>
      <ChevronDown
        className={cn(
          "h-4 w-4 shrink-0 text-[#6B7280] transition",
          open && "rotate-180",
        )}
      />
    </button>
  );
}

function DropdownCard({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "absolute left-0 top-[calc(100%+8px)] z-30 overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-[0_20px_60px_rgba(15,23,42,0.12)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CompactMenuRow({
  label,
  active,
  onClick,
  icon,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex min-h-[52px] w-full items-center gap-3 border-b border-[#D1D5DB] px-4 py-3 text-left text-sm font-medium text-[#111827] transition last:border-b-0 hover:bg-[#F8FAFC] sm:min-h-[56px]",
        active && "bg-[#F8FAFC]",
      )}
    >
      {icon ? <span className="shrink-0">{icon}</span> : null}
      <span className="min-w-0 flex-1 wrap-break-word">{label}</span>
    </button>
  );
}

function SmallMenuRow({
  label,
  active,
  onClick,
}: {
  label: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "block w-full border-b border-[#E5E7EB] px-4 py-3 text-left text-sm text-[#111827] transition last:border-b-0 hover:bg-[#F8FAFC]",
        active && "bg-[#F8FAFC] font-medium",
      )}
    >
      {label}
    </button>
  );
}

function MetricCard({ item }: { item: SummaryMetric }) {
  const Icon = getMetricIcon(item.icon);

  return (
    <div className="rounded-xl border border-[#8ED3FF] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DDF4FF] text-[#19A7F6]">
          <Icon className="h-5 w-5" />
        </div>
        <span
          className={cn(
            "inline-flex h-6 shrink-0 items-center rounded-full border px-2.5 text-[11px] font-medium",
            item.trend === "up"
              ? "border-[#A7D7AE] bg-[#E8F8EA] text-[#5D9F68]"
              : "border-[#F1B5B5] bg-[#FDF0F0] text-[#D66B6B]",
          )}
        >
          {item.delta}
        </span>
      </div>

      <p className="mt-5 text-[12px] tracking-[0.01em] text-[#6B7280]">
        {item.label}
      </p>
      <p className="mt-1 wrap-break-word text-[15px] font-semibold text-[#111827] sm:text-[18px]">
        {item.value}
      </p>
    </div>
  );
}

function PanelRangeButton({
  label,
  open,
  onClick,
}: {
  label: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex h-9 items-center gap-2 rounded-md bg-[#C6D8E2] px-3 text-xs font-medium text-[#263846]"
    >
      <span>{label}</span>
      <ChevronDown className={cn("h-4 w-4 transition", open && "rotate-180")} />
    </button>
  );
}

function PanelMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-[180px] overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.14)] sm:min-w-[220px]">
      <div className="max-h-[320px] overflow-auto">{children}</div>
    </div>
  );
}

function AuditChart({
  data,
  hoverIndex,
  onHoverIndex,
  onFundedClick,
}: {
  data: AuditBarDatum[];
  hoverIndex: number | null;
  onHoverIndex: (index: number | null) => void;
  onFundedClick: (refKey: ReferrerKey) => void;
}) {
  const maxValue = Math.max(...data.map((item) => item.leads), 60);
  const ticks = [0, 15, 30, 45, 60];

  return (
    <div className="pt-3">
      <div className="relative h-[230px] sm:h-[250px]">
        <div className="absolute left-0 top-0 flex h-full w-8 flex-col justify-between pb-8 text-[10px] text-[#9CA3AF] sm:w-10 sm:text-[11px]">
          {ticks
            .slice()
            .reverse()
            .map((tick) => (
              <span key={tick} className="translate-y-2">
                {tick}
              </span>
            ))}
        </div>

        <div className="ml-8 h-full sm:ml-10">
          <div className="relative flex h-[190px] items-end justify-between gap-2 border-b border-[#E5E7EB] sm:h-[210px] sm:gap-4">
            {ticks.slice(1).map((tick) => {
              const percent = 100 - (tick / maxValue) * 100;
              return (
                <div
                  key={tick}
                  className="pointer-events-none absolute left-0 right-0 border-t border-[#EEF2F7]"
                  style={{ top: `${percent}%` }}
                />
              );
            })}

            {data.map((item, index) => {
              const leadsHeight = (item.leads / maxValue) * 100;
              const fundedHeight = (item.funded / maxValue) * 100;
              const isHover = hoverIndex === index;

              return (
                <div
                  key={item.label}
                  className="relative flex flex-1 flex-col items-center"
                  onMouseEnter={() => onHoverIndex(index)}
                  onMouseLeave={() => onHoverIndex(null)}
                >
                  {isHover ? (
                    <div className="absolute bottom-[calc(100%+12px)] left-1/2 z-10 hidden w-[122px] -translate-x-1/2 rounded-lg border border-[#D8EAF7] bg-white px-3 py-2 text-left shadow-[0_12px_30px_rgba(15,23,42,0.10)] sm:block">
                      <p className="text-[11px] font-medium lowercase text-[#374151]">
                        {item.label.toLowerCase()}
                      </p>
                      <p className="mt-1 text-[10px] text-[#9CA3AF]">
                        total leads: {item.leads}
                      </p>
                      <p className="mt-1 text-[10px] text-[#6B7280]">
                        oct 1,2000 - apr 30,2000
                      </p>
                    </div>
                  ) : null}

                  <div className="flex h-[180px] items-end gap-1 sm:h-[200px] sm:gap-2">
                    <div
                      className="w-4 rounded-t-[4px] bg-[#D9DDE3] sm:w-7"
                      style={{ height: `${leadsHeight}%` }}
                    />
                    <button
                      type="button"
                      className="w-4 rounded-t-[4px] bg-[#17A8F5] transition hover:opacity-90 sm:w-7"
                      style={{ height: `${fundedHeight}%` }}
                      onClick={() => onFundedClick(item.referrer)}
                      title="Open funded deals"
                    />
                  </div>

                  <p className="mt-3 text-center text-[9px] text-[#6B7280] sm:text-[10px]">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] text-[#9CA3AF] sm:gap-4">
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#D9DDE3]" />
              LEADS
            </span>
            <span className="inline-flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-[#17A8F5]" />
              FUNDED
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ForecastChart({ data }: { data: ForecastDatum[] }) {
  const width = 640;
  const height = 250;
  const padding = { top: 18, right: 24, bottom: 36, left: 48 };
  const maxY = 6;
  const usableWidth = width - padding.left - padding.right;
  const usableHeight = height - padding.top - padding.bottom;

  const points = data.map((item, index) => {
    const x = padding.left + (index / (data.length - 1)) * usableWidth;
    const y = padding.top + usableHeight - (item.value / maxY) * usableHeight;
    return { ...item, x, y };
  });

  const linePath = points
    .map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`)
    .join(" ");

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${padding.top + usableHeight} L ${points[0].x} ${padding.top + usableHeight} Z`;

  const yTicks = [0, 1.5, 3, 4.5, 6];

  return (
    <div className="h-[240px] w-full sm:h-[288px]">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="h-full w-full overflow-visible"
        preserveAspectRatio="none"
      >
        {yTicks.map((tick) => {
          const y = padding.top + usableHeight - (tick / maxY) * usableHeight;
          return (
            <g key={tick}>
              <line
                x1={padding.left}
                x2={width - padding.right}
                y1={y}
                y2={y}
                stroke="#E5E7EB"
              />
              <text x={18} y={y + 4} fontSize="11" fill="#9CA3AF">
                ${tick}M
              </text>
            </g>
          );
        })}

        <path d={areaPath} fill="rgba(14,165,233,0.08)" />
        <path
          d={linePath}
          fill="none"
          stroke="#1DAAF7"
          strokeWidth="3"
          strokeLinecap="round"
        />

        {points.map((point) => (
          <text
            key={point.label}
            x={point.x}
            y={height - 8}
            fontSize="11"
            fill="#9CA3AF"
            textAnchor="middle"
          >
            {point.label}
          </text>
        ))}
      </svg>
    </div>
  );
}

function PerformanceMobileCard({
  row,
  onOpenFunded,
}: {
  row: (typeof performanceRows)[number];
  onOpenFunded: () => void;
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#111827]">
            {row.referrerName}
          </p>
          <p className="mt-1 text-xs text-[#6B7280]">
            Conversion {row.conversion.toFixed(1)}%
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenFunded}
          className="rounded-full bg-[#E8F8EA] px-2.5 py-1 text-[11px] font-medium text-[#22C55E]"
        >
          {row.fundedDeals} funded
        </button>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
        <div>
          <p className="text-[11px] text-[#6B7280]">Leads</p>
          <p className="mt-1 font-medium text-[#111827]">{row.leads}</p>
        </div>

        <div>
          <p className="text-[11px] text-[#6B7280]">Volume Funded</p>
          <p className="mt-1 font-medium text-[#111827]">
            ${row.volumeFunded.toFixed(1)}M
          </p>
        </div>

        <div>
          <p className="text-[11px] text-[#6B7280]">Total Commission</p>
          <p className="mt-1 font-medium text-[#8B5CF6]">
            {formatMoney(row.totalCommission)}
          </p>
        </div>

        <div>
          <p className="text-[11px] text-[#6B7280]">Avg. Deal Size</p>
          <p className="mt-1 font-medium text-[#111827]">
            {formatMoney(row.avgDealSize)}
          </p>
        </div>
      </div>
    </div>
  );
}

function FundedDealsModal({
  title,
  partnerLabel,
  dateLabel,
  rows,
  onClose,
}: {
  title: string;
  partnerLabel: string;
  dateLabel: string;
  rows: FundedDealRow[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3 sm:p-6">
      <div className="relative max-h-[90vh] w-full max-w-[2048px] overflow-hidden rounded-[22px] bg-white shadow-[0_30px_100px_rgba(15,23,42,0.22)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-10 w-10 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-slate-100"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-4 sm:p-6 lg:p-8">
          <h3 className="pr-12 text-[20px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[24px]">
            {title}
          </h3>
          <p className="mt-1 text-sm text-[#6B7280] sm:text-[16px]">
            Partner: {partnerLabel} {dateLabel}
          </p>

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
                      <p className="text-[11px] text-[#6B7280]">Rate</p>
                      <p className="mt-1 font-medium text-[#111827]">
                        {row.rate}%
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
            <table className="w-full min-w-[1350px] border-separate border-spacing-0">
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
                    Rate
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
                    <td className="border-b border-[#E5E7EB] px-5 py-6 text-[18px]">
                      {row.rate}%
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
}

function getMetricIcon(icon: SummaryMetric["icon"]) {
  switch (icon) {
    case "conversion":
      return Waves;
    case "funded":
      return TrendingUp;
    case "settlement":
      return DollarSign;
    case "revenue":
      return ArrowUpRight;
    default:
      return FileText;
  }
}

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function downloadBlob(blob: Blob, fileName: string) {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}

export default BrokerReport;
