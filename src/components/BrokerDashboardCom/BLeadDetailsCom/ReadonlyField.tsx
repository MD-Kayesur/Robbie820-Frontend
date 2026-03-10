import type { ReactNode } from "react";
import { cn } from "@/hooks/useCn";

type ReadonlyFieldProps = {
  label: string;
  value: ReactNode;
  valueClassName?: string;
};

export default function ReadonlyField({
  label,
  value,
  valueClassName,
}: ReadonlyFieldProps) {
  return (
    <div className="min-w-0">
      <p className="text-[12px] text-[#9CA3AF]">{label}</p>
      <div
        className={cn(
          "mt-1.5 wrap-break-word text-[14px] font-medium text-[#111827]",
          valueClassName,
        )}
      >
        {value}
      </div>
    </div>
  );
}
