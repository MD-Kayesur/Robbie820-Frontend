import { ChevronDown } from "lucide-react";
import type React from "react";

import { cn } from "@/hooks/useCn";
import {
  AuditBarDatum,
  ForecastDatum,
  ReferrerKey,
} from "@/pages/BrokerDashboard/BrokerReport/types";

export function PanelRangeButton({
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

export function PanelMenu({ children }: { children: React.ReactNode }) {
  return (
    <div className="absolute right-0 top-[calc(100%+8px)] z-20 min-w-45 overflow-hidden rounded-xl border border-[#D1D5DB] bg-white shadow-[0_20px_40px_rgba(15,23,42,0.14)] md:min-w-55">
      <div className="max-h-80 overflow-auto">{children}</div>
    </div>
  );
}

export function SmallMenuRow({
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

export function AuditChart({
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
      <div className="relative h-57.5 md:h-62.5">
        <div className="absolute left-0 top-0 flex h-full w-8 flex-col justify-between pb-8 text-[10px] text-[#9CA3AF] md:w-10 md:text-[11px]">
          {ticks
            .slice()
            .reverse()
            .map((tick) => (
              <span key={tick} className="translate-y-2">
                {tick}
              </span>
            ))}
        </div>

        <div className="ml-8 h-full md:ml-10">
          <div className="relative flex h-47.5 items-end justify-between gap-2 border-b border-[#E5E7EB] md:h-52.5 md:gap-4">
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
                    <div className="absolute bottom-[calc(100%+12px)] left-1/2 z-10 hidden w-30.5 -translate-x-1/2 rounded-lg border border-[#D8EAF7] bg-white px-3 py-2 text-left shadow-[0_12px_30px_rgba(15,23,42,0.10)] md:block">
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

                  <div className="flex h-45 items-end gap-1 md:h-50 md:gap-2">
                    <div
                      className="w-4 rounded-t-sm bg-[#D9DDE3] md:w-7"
                      style={{ height: `${leadsHeight}%` }}
                    />
                    <button
                      type="button"
                      className="w-4 rounded-t-sm bg-[#17A8F5] transition hover:opacity-90 md:w-7"
                      style={{ height: `${fundedHeight}%` }}
                      onClick={() => onFundedClick(item.referrer)}
                      title="Open funded deals"
                    />
                  </div>

                  <p className="mt-3 text-center text-[9px] text-[#6B7280] md:text-[10px]">
                    {item.label}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[10px] text-[#9CA3AF] md:gap-4">
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

export function ForecastChart({ data }: { data: ForecastDatum[] }) {
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

  const areaPath = `${linePath} L ${points[points.length - 1].x} ${
    padding.top + usableHeight
  } L ${points[0].x} ${padding.top + usableHeight} Z`;

  const yTicks = [0, 1.5, 3, 4.5, 6];

  return (
    <div className="h-60 w-full md:h-72">
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
            key={`${point.label}-${point.x}`}
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
