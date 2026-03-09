// src/components/BrokerDashboardCom/BOverivewCom/LoanValueChart.tsx
import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { cn } from "@/hooks/useCn";
import type { RangeKey } from "../../../pages/BrokerDashboard/BrokerOverview/types";

const chartDataByRange = {
  monthly: [
    { label: "Sep", value: 170000 },
    { label: "Oct", value: 195000 },
    { label: "Nov", value: 175000 },
    { label: "Dec", value: 220000 },
    { label: "Jan", value: 255000 },
    { label: "Feb", value: 270000 },
    { label: "Mar", value: 305000 },
  ],
  mtd: [
    { label: "Sep", value: 170000 },
    { label: "Oct", value: 195000 },
    { label: "Nov", value: 175000 },
    { label: "Dec", value: 220000 },
    { label: "Jan", value: 255000 },
    { label: "Feb", value: 270000 },
    { label: "Mar", value: 305000 },
  ],
  fytd: [
    { label: "Sep", value: 120000 },
    { label: "Oct", value: 165000 },
    { label: "Nov", value: 210000 },
    { label: "Dec", value: 235000 },
    { label: "Jan", value: 260000 },
    { label: "Feb", value: 290000 },
    { label: "Mar", value: 340000 },
  ],
} satisfies Record<RangeKey, { label: string; value: number }[]>;

type LoanValueChartProps = {
  range: RangeKey;
};

const monthLengthLabelMap = {
  3: "Last 3 Months",
  6: "Last 6 Months",
  12: "Last 12 Months",
} as const;

export default function LoanValueChart({ range }: LoanValueChartProps) {
  const [monthsOpen, setMonthsOpen] = useState(false);
  const [monthLength, setMonthLength] = useState<3 | 6 | 12>(6);

  return (
    <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h2 className="text-[18px] font-semibold text-[#111827]">
            Loan Value Trend
          </h2>
          <p className="mt-1 text-[12px] text-[#9CA3AF]">
            Monthly loan value generated
          </p>
        </div>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMonthsOpen((prev) => !prev)}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#C8D8E3] px-4 text-[12px] font-medium text-[#334155]"
          >
            {monthLengthLabelMap[monthLength]}
            <ChevronDown className="h-4 w-4" />
          </button>

          {monthsOpen && (
            <>
              <button
                type="button"
                className="fixed inset-0 z-20"
                onClick={() => setMonthsOpen(false)}
              />

              <div className="absolute right-0 top-[calc(100%+8px)] z-30 w-44 rounded-2xl border border-[#E7E7E7] bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.10)]">
                {[3, 6, 12].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      setMonthLength(value as 3 | 6 | 12);
                      setMonthsOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[14px] transition",
                      monthLength === value
                        ? "bg-[#EFF6FB] text-[#1BAEF5]"
                        : "text-[#2A2A2A] hover:bg-[#F7F7F7]",
                    )}
                  >
                    <span>Last {value} Months</span>
                    {monthLength === value ? (
                      <Check className="h-4 w-4" />
                    ) : null}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="mt-5 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartDataByRange[range].slice(-Math.min(monthLength, 7))}
            margin={{ top: 8, right: 8, left: 8, bottom: 0 }}
          >
            <CartesianGrid stroke="#E5E7EB" strokeDasharray="3 3" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tickFormatter={(value) => `$${Math.round(value / 1000)}k`}
              tick={{ fontSize: 11, fill: "#9CA3AF" }}
              tickLine={false}
              axisLine={false}
              width={45}
            />
            <Tooltip
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Loan Value",
              ]}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563EB"
              strokeWidth={2.5}
              dot={{ r: 3, fill: "#2563EB" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
