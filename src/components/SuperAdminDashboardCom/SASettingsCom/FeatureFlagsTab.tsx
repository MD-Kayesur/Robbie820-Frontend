// src/components/SuperAdminDashboardCom/SASettingsCom/FeatureFlagsTab.tsx

import { cn } from "@/hooks/useCn";
import { Toggle } from "@/hooks/useToggle";
import { featureFlagsMock } from "@/pages/SuperAdminDashboard/SuperAdminSettings/mock";
import { FeatureFlag } from "@/pages/SuperAdminDashboard/SuperAdminSettings/types";
import { useState } from "react";

export default function FeatureFlagsTab() {
  const [flags, setFlags] = useState<FeatureFlag[]>(featureFlagsMock);

  return (
    <div className="space-y-5 inter">
      <div className="rounded-2xl border border-slate-200 bg-white">
        <div className="px-4 pt-4 md:px-5.5 md:pt-5.5">
          <h2 className="text-base font-semibold text-black inter">
            Platform Feature Controls
          </h2>
        </div>

        <div className="px-4 md:px-6 inter">
          {flags.map((f, idx) => (
            <div
              key={f.key}
              className={cn(
                "flex flex-col gap-3 py-4 md:flex-row md:items-start md:justify-between",
                idx === 0 ? "" : "border-t border-slate-100",
              )}
            >
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-900">{f.title}</p>
                <p className="mt-1 text-xs text-[#4A5565]">{f.description}</p>
              </div>

              <div className="shrink-0 pt-1">
                <Toggle
                  value={f.enabled}
                  onChange={(v) =>
                    setFlags((prev) =>
                      prev.map((x) =>
                        x.key === f.key ? { ...x, enabled: v } : x,
                      ),
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 inter">
        <p className="text-xs text-[#7B3306]">
          <span className="font-bold">Note:</span> Disabling features may affect
          existing broker workflows and should be done with caution.
        </p>
      </div>
    </div>
  );
}
