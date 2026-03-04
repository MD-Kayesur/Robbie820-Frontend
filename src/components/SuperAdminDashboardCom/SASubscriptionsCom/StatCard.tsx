// src/pages/SuperAdmin/SubscriptionsCom/StatCard.tsx
import React from "react";

type StatCardProps = {
  title: string;
  value: string;
  change: string;
  info: React.ElementType;
  icon: React.ElementType;
};

export function StatCard({
  title,
  value,
  change,
  info: Info,
  icon: Icon,
}: StatCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-1">
            <div className="truncate text-xs font-semibold text-slate-500">
              {title}
            </div>
            <button
              type="button"
              className="inline-flex h-5 w-5 items-center justify-center rounded-md text-slate-400 hover:bg-slate-100 hover:text-slate-600"
              aria-label={`Info: ${title}`}
            >
              <Info className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-[#EFF6FF] text-[#155DFC]">
          <Icon className="h-4 w-4" aria-hidden="true" />
        </div>
      </div>

      <div className="flex items-end justify-between">
        <div className="mt-3 text-2xl font-extrabold text-slate-900">
          {value}
        </div>

        <div className="mt-2 text-xs font-medium text-emerald-600">
          {change}
        </div>
      </div>
    </div>
  );
}
