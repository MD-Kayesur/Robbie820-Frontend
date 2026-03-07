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
        "flex items-center justify-between gap-4 rounded-3xl border border-sky-200 bg-white",
        "px-6 py-8 md:rounded-2xl md:p-6",
      )}
    >
      <div className="flex min-w-0 items-center gap-5 md:items-start md:gap-4">
        <div
          className={cn(
            "grid h-14 w-14 shrink-0 place-items-center rounded-[10px] border border-sky-300 bg-[#00B4FE26] text-black",
            "md:h-12 md:w-12 md:rounded-lg",
          )}
        >
          {icon}
        </div>

        <div className="min-w-0">
          <p className="text-[16px] font-medium leading-none text-black md:text-base">
            {title}
          </p>
          <p className="mt-2 text-[14px] leading-6 text-[#666666] md:mt-1 md:text-sm md:leading-5">
            {subtitle}
          </p>
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
        "flex items-center justify-between gap-4 rounded-3xl border border-sky-200 bg-white",
        "px-6 py-10 md:rounded-2xl md:p-6",
      )}
    >
      <p className="text-[16px] font-medium leading-none text-black md:text-sm">
        {label}
      </p>
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
    <div className="space-y-8 md:space-y-6">
      {/* header */}
      <div>
        <p className="text-[18px] font-medium text-black md:text-lg">
          Notification Preferences
        </p>
        <p className="mt-3 max-w-140 text-[16px] leading-8 text-[#666666] md:mt-1 md:text-sm md:leading-6">
          Manage how and when you receive alerts regarding your referrals.
        </p>
      </div>

      {/* prefs */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-4">
        <PrefCard
          icon={<Mail className="h-7 w-7 md:h-5 md:w-5" />}
          title="Email Notifications"
          subtitle="Daily summary and instant status alerts."
          value={prefs.emailNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, emailNotifications: v })}
        />

        <PrefCard
          icon={<Smartphone className="h-7 w-7 md:h-5 md:w-5" />}
          title="SMS Notifications"
          subtitle="Critical payment and settlement alerts."
          value={prefs.smsNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, smsNotifications: v })}
        />
      </div>

      {/* divider */}
      <div className="h-px w-full bg-[#D9D9D9]" />

      {/* stages header */}
      <div>
        <p className="text-[18px] font-medium uppercase text-black md:text-lg">
          Referral Stages to Trigger Alerts
        </p>
      </div>

      {/* stages */}
      <div className="grid gap-6 md:grid-cols-2 md:gap-5">
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
  );
}
