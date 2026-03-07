// src/components/ReferrerDashboardCom/RSettingsCom/AlertsTab.tsx

import React from "react";
import { Mail, Smartphone } from "lucide-react";
import {
  AlertPrefs,
  AlertStage,
} from "@/pages/ReferrerDashboard/ReferrerSettings/types";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

function Toggle({
  value,
  onChange,
}: {
  value: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={cn(
        "relative inline-flex h-7 w-12 items-center rounded-full transition",
        value ? "bg-sky-500" : "bg-slate-200",
      )}
      aria-pressed={value}
    >
      <span
        className={cn(
          "inline-block h-6 w-6 rounded-full bg-white transition",
          value ? "translate-x-6" : "translate-x-1",
        )}
      />
    </button>
  );
}

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
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-sky-200 bg-white px-5 py-4">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-50 text-slate-900 ring-1 ring-sky-200">
          {icon}
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-900">{title}</p>
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
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <p className="text-base font-semibold text-slate-900">
          Notification Preferences
        </p>
        <p className="mt-1 text-sm text-slate-500">
          Manage how and when you receive alerts regarding your referrals.
        </p>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <PrefCard
          icon={<Mail className="h-5 w-5" />}
          title="Email Notifications"
          subtitle="Daily summary and instant status alerts."
          value={prefs.emailNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, emailNotifications: v })}
        />
        <PrefCard
          icon={<Smartphone className="h-5 w-5" />}
          title="SMS Notifications"
          subtitle="Critical payment and settlement alerts."
          value={prefs.smsNotifications}
          onChange={(v) => onChangePrefs({ ...prefs, smsNotifications: v })}
        />
      </div>

      <p className="mt-8 text-sm font-semibold text-slate-900">
        REFERRAL STAGES TO TRIGGER ALERTS
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {stages.map((s) => (
          <div
            key={s.id}
            className="flex items-center justify-between rounded-2xl border border-sky-200 bg-white px-5 py-4"
          >
            <p className="text-sm font-semibold text-slate-900">{s.label}</p>
            <Toggle value={s.enabled} onChange={() => onToggleStage(s.id)} />
          </div>
        ))}
      </div>
    </div>
  );
}
