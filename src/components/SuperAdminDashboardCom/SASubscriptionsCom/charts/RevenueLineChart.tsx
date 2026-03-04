// src/pages/SuperAdmin/SubscriptionsCom/charts/RevenueLineChart.tsx

import { RevenuePoint } from "../../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  DotProps,
} from "recharts";

function formatK(v: number) {
  return `$${Math.round(v / 1000)}K`;
}

function formatMoney(v: number) {
  return `$${v.toLocaleString()}`;
}

function CustomDot(props: DotProps) {
  const { cx, cy } = props;
  if (cx == null || cy == null) return null;

  return (
    <g>
      {/* white ring */}
      <circle cx={cx} cy={cy} r={7} fill="#FFFFFF" />
      {/* blue dot */}
      <circle cx={cx} cy={cy} r={5} fill="#3B82F6" />
    </g>
  );
}

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value?: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const v = Number(payload[0]?.value ?? 0);

  return (
    <div className="w-52 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-lg">
      <div className="text-base font-semibold text-slate-900">{label}</div>
      <div className="mt-1 text-sm font-semibold text-sky-600">
        Revenue : {formatMoney(v)}
      </div>
    </div>
  );
}

export function RevenueLineChart({ data }: { data: RevenuePoint[] }) {
  return (
    <div>
      <h1 className="text-xl font-bold text-slate-900">Revenue Trend</h1>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-6">
        <div className="h-85 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="4 6" stroke="#E5E7EB" />

              <XAxis
                dataKey="month"
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#6B7280", strokeWidth: 1.5 }}
                tickLine={false}
              />

              <YAxis
                domain={[0, 180000]}
                ticks={[0, 45000, 90000, 135000, 180000]}
                tickFormatter={formatK}
                tick={{ fill: "#6B7280", fontSize: 12 }}
                axisLine={{ stroke: "#6B7280", strokeWidth: 1.5 }}
                tickLine={false}
                width={56}
              />

              <Tooltip
                content={<CustomTooltip />}
                cursor={false}
                wrapperStyle={{ outline: "none" }}
              />

              <Line
                type="linear"
                dataKey="value"
                stroke="#0EA5FF"
                strokeWidth={2.5}
                dot={<CustomDot />}
                activeDot={{
                  r: 7,
                  fill: "#3B82F6",
                  stroke: "#FFFFFF",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
