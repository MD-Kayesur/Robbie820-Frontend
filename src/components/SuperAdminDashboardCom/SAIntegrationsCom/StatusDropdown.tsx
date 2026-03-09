// src/components/SuperAdminDashboardCom/SAIntegrationsCom/StatusDropdown.tsx
import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { filterOptions } from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/mock";
import { Filter } from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/types";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

export function StatusDropdown({
  value,
  onChange,
}: {
  value: Filter;
  onChange: (v: Filter) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={wrapRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm font-semibold text-slate-800 hover:bg-slate-100 sm:h-10 sm:min-w-35 sm:w-auto"
      >
        <span className="truncate">{value}</span>
        {open ? (
          <ChevronUp className="h-4 w-4 shrink-0 text-slate-500" />
        ) : (
          <ChevronDown className="h-4 w-4 shrink-0 text-slate-500" />
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl sm:w-55">
          {filterOptions.map((opt) => {
            const active = opt === value;

            return (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={cn(
                  "flex w-full items-center justify-between px-4 py-3 text-left text-base font-medium hover:bg-slate-50",
                  active && "bg-slate-100",
                )}
              >
                <span className="text-slate-800">{opt}</span>
                {active ? (
                  <Check className="h-5 w-5 text-[#666666]" />
                ) : (
                  <span className="h-5 w-5" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
