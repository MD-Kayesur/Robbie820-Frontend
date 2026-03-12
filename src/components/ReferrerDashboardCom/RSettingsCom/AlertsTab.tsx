// src/components/ReferrerDashboardCom/RSettingsCom/AlertsTab.tsx

import React from "react";
import { Mail, Smartphone } from "lucide-react";
import {
  AlertPrefs,
  AlertStage,
} from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { Toggle } from "@/hooks/useToggle2";
import { cn } from "@/hooks/useCn";

function PrefCard({
  icon,
  title,
  subtitle,
  value,
  onChange,
}: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border border-sky-200 bg-white",
        "rounded-xl p-4 md:p-6",
      )}
    >
      <div className="flex flex-col md:flex-row min-w-0 items-start md:items-center gap-3 md:gap-5 md:items-start">
        <div
          className={cn(
            "grid shrink-0 p-1.5 place-items-center rounded-sm border border-sky-300 bg-[#00B4FE26] text-black",
          )}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-sm font-medium leading-4 text-black">{title}</p>
          <p className="text-xs leading-4 text-[#666666]">{subtitle}</p>
        </div>
      </div>

      <div className="shrink-0">
        <Toggle value={value} onChange={onChange} />
      </div>
    </div>
  );
}

function StageCard({
  label,
  enabled,
  onToggle,
}: {
  label: string;
  enabled: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 rounded-xl border border-sky-200 bg-white",
        "p-4 md:p-6",
      )}
    >
      <p className="text-sm font-medium leading-4 text-black">{label}</p>
      <div className="shrink-0">
        <Toggle value={enabled} onChange={onToggle} />
      </div>
    </div>
  );
}

export default function AlertsTab({
  prefs,
  stages,
  onChangePrefs,
  onToggleStage,
}: {
  prefs: AlertPrefs;
  stages: AlertStage[];
  onChangePrefs: (next: AlertPrefs) => void;
  onToggleStage: (id: string) => void;
}) {
  return (
    <div className="space-y-6 max-w-5xl mx-auto border border-slate-200 p-4 md:px-8 md:py-11 rounded-2xl">
      {/* header */}
      <div>
        <p className="text-lg font-medium text-black">
          Notification Preferences
        </p>
        <p className=" text-[#666666] mt-1 text-sm leading-4">
          Manage how and when you receive alerts regarding your referrals.
        </p>
      </div>

      {/* prefs */}
      <div className="grid gap-6 md:grid-cols-2">
        <PrefCard
          icon={<Mail className="h-6 w-6" />}
          title="Email Notifications"
          subtitle="Daily summary and instant status alerts."
          value={prefs.emailNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, emailNotifications: v })}
        />

        <PrefCard
          icon={<Smartphone className="h-6 w-6" />}
          title="SMS Notifications"
          subtitle="Critical payment and settlement alerts."
          value={prefs.smsNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, smsNotifications: v })}
        />
      </div>

      {/* stages header */}
      <div className="mt-10">
        <p className="text-base md:text-lg font-medium uppercase text-black mb-6">
          Referral Stages to Trigger Alerts
        </p>

        {/* stages */}
        <div className="grid gap-6 md:grid-cols-2">
          {stages.map((s) => (
            <StageCard
              key={s.id}
              label={s.label}
              enabled={s.enabled}
              onToggle={() => onToggleStage(s.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
