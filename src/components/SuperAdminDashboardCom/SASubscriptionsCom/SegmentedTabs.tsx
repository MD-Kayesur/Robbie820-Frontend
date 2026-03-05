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
    <div className="inline-flex items-center rounded-full bg-slate-100 p-1">
      {items.map((t) => {
        const active = tab === t;
        return (
          <button
            key={t}
            type="button"
            onClick={() => onChange(t)}
            className={cn(
              "p-2 rounded-full px-5 text-sm font-semibold transition",
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
