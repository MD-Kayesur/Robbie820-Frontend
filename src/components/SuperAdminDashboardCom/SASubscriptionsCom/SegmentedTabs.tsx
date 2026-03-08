// src/pages/SuperAdmin/SubscriptionsCom/SegmentedTabs.tsx
import { cn } from "@/hooks/useCn";
import type { Tab } from "../../../pages/SuperAdminDashboard/SuperAdminSubscriptions/types";

export function SegmentedTabs({
  tab,
  onChange,
}: {
  tab: Tab;
  onChange: (t: Tab) => void;
}) {
  const items: Tab[] = [
    "Subscription Accounts",
    "Plans & Pricing",
    "Revenue Analytics",
  ];

  return (
    <div className="inline-flex w-full flex-col rounded-2xl bg-slate-100 p-1 sm:w-auto sm:flex-row sm:items-center sm:rounded-full">
      {items.map((t) => {
        const active = tab === t;

        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={cn(
              "rounded-xl px-4 py-2.5 text-sm font-semibold transition sm:rounded-full sm:px-5 sm:py-2",
              active ? "bg-white text-slate-900 shadow-sm" : "text-slate-600",
            )}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
}
