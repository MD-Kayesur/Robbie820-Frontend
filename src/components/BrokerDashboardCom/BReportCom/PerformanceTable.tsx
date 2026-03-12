import {
  PerformanceRow,
  ReferrerKey,
  ReportRangeKey,
} from "@/pages/BrokerDashboard/BrokerReport/types";
import { PanelMenu, PanelRangeButton, SmallMenuRow } from "./ReportCharts";
import { rangeOptions } from "@/pages/BrokerDashboard/BrokerReport/mock";
import { formatMoney } from "@/pages/BrokerDashboard/BrokerReport/utils";

type PerformanceTableProps = {
  rows: PerformanceRow[];
  rangeLabel: string;
  menuOpen: boolean;
  onToggleMenu: () => void;
  onSelectRange: (value: ReportRangeKey) => void;
  onOpenFunded: (referrer: ReferrerKey) => void;
};

const PerformanceTable = ({
  rows,
  rangeLabel,
  menuOpen,
  onToggleMenu,
  onSelectRange,
  onOpenFunded,
}: PerformanceTableProps) => {
  return (
    <section className="rounded-2xl border border-[#8ED3FF] bg-white p-4 md:p-5">
      <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-semibold tracking-[-0.02em] text-[#111827] md:text-[18px]">
            Performance Analytics
          </h2>
          <p className="mt-1 text-xs text-[#9CA3AF]">
            financial forecasting and referrer conversion audit.
          </p>
        </div>

        <div className="relative shrink-0">
          <PanelRangeButton
            label={rangeLabel}
            open={menuOpen}
            onClick={onToggleMenu}
          />

          {menuOpen ? (
            <PanelMenu>
              {rangeOptions.map((option) => (
                <SmallMenuRow
                  key={option.value}
                  label={option.label}
                  active={rangeLabel === option.label}
                  onClick={() => onSelectRange(option.value)}
                />
              ))}
            </PanelMenu>
          ) : null}
        </div>
      </div>

      <div className="space-y-4 lg:hidden">
        {rows.map((row) => (
          <PerformanceMobileCard
            key={row.referrerName}
            row={row}
            onOpenFunded={() => onOpenFunded(row.referrer)}
          />
        ))}
      </div>

      <div className="hidden overflow-x-auto lg:block">
        <table className="w-full min-w-230 border-separate border-spacing-0">
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
            {rows.map((row) => (
              <tr key={row.referrerName} className="text-[14px] text-[#4B5563]">
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
                    onClick={() => onOpenFunded(row.referrer)}
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
  );
};

function PerformanceMobileCard({
  row,
  onOpenFunded,
}: {
  row: PerformanceRow;
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

export default PerformanceTable;
