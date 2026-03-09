import { useOutsideClose } from "@/hooks/useOutsideClose";
import { StatusFilter } from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/types";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

export function StatusDropdown({
  value,
  onChange,
}: {
  value: StatusFilter;
  onChange: (v: StatusFilter) => void;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={wrapRef} className="relative w-full sm:w-auto">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-11 w-full items-center justify-between gap-3 rounded-xl border border-slate-200 bg-[#F3F3F5] px-4 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 sm:h-10 sm:min-w-35 sm:w-auto"
      >
        <span>{value}</span>
        <ChevronDown className="h-4 w-4 text-slate-500" />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg sm:w-45">
          {(["Active", "Suspended"] as const).map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange(opt);
                setOpen(false);
              }}
              className={[
                "w-full px-4 py-3 text-left text-sm font-semibold hover:bg-slate-50",
                opt === value ? "bg-slate-50 text-slate-900" : "text-slate-700",
              ].join(" ")}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
