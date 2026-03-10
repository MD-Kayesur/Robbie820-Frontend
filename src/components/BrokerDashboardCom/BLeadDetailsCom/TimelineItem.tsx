import { Circle } from "lucide-react";
import { cn } from "@/hooks/useCn";

type TimelineTone = "neutral" | "info" | "warning" | "success" | "pending";

type TimelineItemProps = {
  title: string;
  date: string;
  time?: string;
  tone?: TimelineTone;
};

export default function TimelineItem({
  title,
  date,
  time,
  tone = "neutral",
}: TimelineItemProps) {
  const toneMap = {
    neutral: "border-slate-300 bg-white text-slate-400",
    info: "border-blue-200 bg-blue-50 text-blue-600",
    warning: "border-amber-200 bg-amber-50 text-amber-600",
    success: "border-emerald-200 bg-emerald-50 text-emerald-600",
    pending: "border-violet-200 bg-violet-50 text-violet-600",
  } as const;

  return (
    <div className="flex gap-3">
      <div
        className={cn(
          "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border",
          toneMap[tone],
        )}
      >
        <Circle className="h-3.5 w-3.5 fill-current" />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <p className="text-[14px] font-medium text-[#111827]">{title}</p>
          {time ? (
            <p className="shrink-0 text-[11px] text-[#9CA3AF]">{time}</p>
          ) : null}
        </div>

        <p className="mt-1 text-[12px] text-[#9CA3AF]">{date}</p>
      </div>
    </div>
  );
}
