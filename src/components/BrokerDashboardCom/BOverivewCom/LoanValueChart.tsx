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
    { label: "Jan", value: 2.2 },
    { label: "Feb", value: 3.8 },
    { label: "Mar", value: 2.0 },
    { label: "Apr", value: 2.9 },
    { label: "May", value: 1.3 },
    { label: "Jun", value: 2.1 },
    { label: "Jul", value: 1.6 },
  ],
  mtd: [
    { label: "Jan", value: 1.8 },
    { label: "Feb", value: 2.3 },
    { label: "Mar", value: 2.0 },
    { label: "Apr", value: 2.5 },
    { label: "May", value: 2.2 },
    { label: "Jun", value: 2.9 },
    { label: "Jul", value: 2.4 },
  ],
  fytd: [
    { label: "Jan", value: 2.5 },
    { label: "Feb", value: 4.1 },
    { label: "Mar", value: 3.2 },
    { label: "Apr", value: 4.5 },
    { label: "May", value: 3.6 },
    { label: "Jun", value: 4.2 },
    { label: "Jul", value: 4.8 },
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
    <section className="rounded-2xl border border-[#D9E7F2] bg-white p-4 sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-[18px] font-medium text-[#3A3A3A]">
          Weekly Loan Value
        </h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => setMonthsOpen((prev) => !prev)}
            className="inline-flex h-10 items-center gap-2 rounded-md bg-[#A9C6D7] px-4 text-[13px] font-medium text-[#202020]"
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

      <div className="mt-5 h-55 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartDataByRange[range].slice(-monthLength)}
            margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
          >
            <CartesianGrid stroke="#EEEEEE" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 11, fill: "#8C8C8C" }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              domain={[0, 5]}
              ticks={[0, 1, 2, 3, 4, 5]}
              tickFormatter={(value) => `$${value}M`}
              tick={{ fontSize: 11, fill: "#B4B4B4" }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip formatter={(value) => [`$${value}M`, "Loan Value"]} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#77CFFD"
              strokeWidth={2}
              dot={{ r: 3, fill: "#77CFFD" }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
