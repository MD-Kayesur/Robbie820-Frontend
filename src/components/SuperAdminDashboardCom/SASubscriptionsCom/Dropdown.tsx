// src/pages/SuperAdmin/SubscriptionsCom/Dropdown.tsx
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { cn } from "@/hooks/useCn";

export function Dropdown<T extends string>({
  value,
  options,
  onChange,
  label,
  minW = 190,
}: {
  value: T;
  options: T[];
  onChange: (v: T) => void;
  label?: string;
  minW?: number;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative z-50 w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "inline-flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#F3F3F5] px-4 text-sm font-semibold text-slate-800 hover:bg-slate-50 sm:h-10 sm:w-auto",
        )}
        style={{ minWidth: minW }}
        aria-label={label ?? "Dropdown"}
      >
        <span className="truncate">{value}</span>
        <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:w-55">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={cn(
                "w-full px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50",
                opt === value ? "bg-slate-50 text-slate-900" : "text-slate-700",
              )}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
