import { cn } from "@/hooks/useCn";
import { SummaryMetric } from "@/pages/BrokerDashboard/BrokerReport/types";
import { getMetricIcon } from "@/pages/BrokerDashboard/BrokerReport/utils";

type Props = {
  item: SummaryMetric;
};

const ReportMetricCard = ({ item }: Props) => {
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
};

export default ReportMetricCard;
