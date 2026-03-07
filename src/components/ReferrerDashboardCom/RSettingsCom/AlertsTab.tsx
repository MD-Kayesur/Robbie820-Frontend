// src/components/ReferrerDashboardCom/RSettingsCom/AlertsTab.tsx

import React from "react";
import { Mail, TabletSmartphone } from "lucide-react";
import {
  AlertPrefs,
  AlertStage,
} from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { Toggle } from "@/hooks/useToggle2";

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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-sky-200 bg-white p-6">
      <div className="flex items-start gap-6">
        <div className="grid p-2 place-items-center rounded-sn bg-[#00B4FE26] text-slate-900 ring-1 ring-sky-200">
          {icon}
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-500">{subtitle}</p>
        </div>
      </div>
      <Toggle value={value} onChange={onChange} />
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
    <div className="rounded-2xl border border-slate-200 bg-white px-8.5 py-10">
      {/* header */}
      <div>
        <p className="text-lg font-medium text-slate-900">
          Notification Preferences
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Manage how and when you receive alerts regarding your referrals.
        </p>
      </div>

      {/* prefs */}
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <PrefCard
          icon={<Mail className="h-5 w-5" />}
          title="Email Notifications"
          subtitle="Daily summary and instant status alerts."
          value={prefs.emailNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, emailNotifications: v })}
        />
        <PrefCard
          icon={<TabletSmartphone className="h-5 w-5" />}
          title="SMS Notifications"
          subtitle="Critical payment and settlement alerts."
          value={prefs.smsNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, smsNotifications: v })}
        />
      </div>

      {/* stages */}
      <p className="mt-10 text-lg font-medium text-slate-900">
        REFERRAL STAGES TO TRIGGER ALERTS
      </p>

      {/* stages */}
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        {stages.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-2xl border border-sky-200 bg-white p-6"
          >
            <p className="text-sm font-medium text-slate-900">{s.label}</p>
            <Toggle value={s.enabled} onChange={() => onToggleStage(s.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
