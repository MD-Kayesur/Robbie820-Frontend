// src/pages/SuperAdminDashboard/SuperAdminSettings/SuperAdminSettings.tsx

import { useMemo, useState } from "react";
import { Clock, Save } from "lucide-react";
import { SettingsTab } from "./types";
import CommissionDefaultsTab from "@/components/SuperAdminDashboardCom/SASettingsCom/CommissionDefaultsTab";
import SeatPricingTab from "@/components/SuperAdminDashboardCom/SASettingsCom/SeatPricingTab";
import FeatureFlagsTab from "@/components/SuperAdminDashboardCom/SASettingsCom/FeatureFlagsTab";
import SystemBehaviorTab from "@/components/SuperAdminDashboardCom/SASettingsCom/SystemBehaviorTab";
import DefaultTemplatesTab from "@/components/SuperAdminDashboardCom/SASettingsCom/DefaultTemplatesTab";
import { cn } from "@/hooks/useCn";

const tabs: SettingsTab[] = [
  "Commission Defaults",
  "Seat Pricing",
  "Feature Flags",
  "System Behavior",
  "Default Templates",
];

export default function SuperAdminSettings() {
  const [activeTab, setActiveTab] = useState<SettingsTab>(
    "Commission Defaults",
  );
  const [lastUpdatedText, setLastUpdatedText] = useState("Just now");

  const Active = useMemo(() => {
    switch (activeTab) {
      case "Commission Defaults":
        return <CommissionDefaultsTab />;
      case "Seat Pricing":
        return <SeatPricingTab />;
      case "Feature Flags":
        return <FeatureFlagsTab />;
      case "System Behavior":
        return <SystemBehaviorTab />;
      case "Default Templates":
        return <DefaultTemplatesTab />;
      default:
        return null;
    }
  }, [activeTab]);

  return (
    <div className="bg-white p-4 md:p-6 lg:p-10">
      {/* Header row */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl font-black tracking-tight text-[#101828] md:text-2xl">
            Platform Configuration
          </h1>
          <p className="mt-1 text-sm text-[#4A5565]">
            Global system settings and defaults
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:flex-row md:items-center md:justify-between lg:w-auto lg:gap-6">
          <div className="flex items-center gap-2 text-sm text-[#4A5565]">
            <Clock className="mb-[1.5px] h-4 w-4 shrink-0" />
            <span className="leading-none">
              Last updated:{" "}
              <span className="font-semibold">{lastUpdatedText}</span>
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              setLastUpdatedText("Just now");
              console.log("Save changes clicked");
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-3 rounded-lg bg-[#101828] px-4 text-sm font-medium text-white shadow-sm hover:opacity-95 md:w-auto md:h-10"
          >
            <Save className="h-4 w-4" />
            <span className="mt-px">Save changes</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-6 overflow-x-auto">
        <div className="inline-flex min-w-max rounded-2xl bg-[#ECECF0] p-1 md:rounded-full">
          {tabs.map((t) => {
            const active = t === activeTab;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setActiveTab(t)}
                className={cn(
                  "h-9 whitespace-nowrap rounded-xl px-4 text-sm font-medium text-[#0A0A0A] transition md:rounded-full",
                  active ? "bg-white shadow-sm" : "hover:text-[#4A5565]",
                )}
              >
                {t}
              </button>
            );
          })}
        </div>
      </div>

      {/* Body */}
      <div className="mt-6 md:mt-8.5">{Active}</div>
    </div>
  );
}
