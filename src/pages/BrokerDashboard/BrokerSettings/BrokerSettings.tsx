// src/pages/BrokerDashboard/BrokerSettings/BrokerSettings.tsx
import { Save } from "lucide-react";
import { useState } from "react";

import { cn } from "@/hooks/useCn";
import {
  appPreferencesMock,
  brokerProfileMock,
  currencyOptions,
  passwordFormMock,
  settingsTabs,
  stagnationOptions,
  timezoneOptions,
  twoFactorMock,
} from "./mock";
import AccountProfileTab from "./components/AccountProfileTab";
import AppPreferencesTab from "./components/AppPreferencesTab";
import SecuritySuiteTab from "./components/SecuritySuiteTab";
import type {
  AppPreferencesState,
  BrokerProfile,
  PasswordForm,
  SettingsTabKey,
  TwoFactorState,
} from "./types";

const BrokerSettings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>("account_profile");
  const [profile, setProfile] = useState<BrokerProfile>(brokerProfileMock);
  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(passwordFormMock);
  const [twoFactor, setTwoFactor] = useState<TwoFactorState>(twoFactorMock);
  const [appPreferences, setAppPreferences] =
    useState<AppPreferencesState>(appPreferencesMock);

  return (
    <div className="space-y-5 bg-[#F8FAFC] p-3 sm:space-y-6 sm:p-4 lg:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="text-[24px] font-semibold tracking-[-0.03em] text-[#111827] sm:text-[28px]">
            System Settings
          </h1>
          <p className="mt-1 text-[14px] leading-6 text-[#6B7280] sm:text-[16px]">
            configure your professional profile and workspace security.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] bg-[#0EA5E9] px-5 text-[15px] font-medium text-white transition hover:bg-sky-600 sm:h-12 sm:w-auto sm:text-[18px]"
        >
          <Save className="h-4 w-4 sm:h-5 sm:w-5" />
          Save Changes
        </button>
      </div>

      <div className="border-t border-[#E5E7EB] pt-4">
        <div className="grid grid-cols-1 gap-2 rounded-xl border border-[#63C8FF] bg-[#EEF8FF] p-2 sm:grid-cols-2 xl:inline-flex xl:flex-wrap">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-center text-[14px] font-medium transition sm:text-[15px] xl:justify-start xl:text-[16px]",
                  isActive
                    ? "bg-black text-white"
                    : "text-[#111827] hover:bg-white",
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {activeTab === "account_profile" ? (
        <AccountProfileTab profile={profile} onChange={setProfile} />
      ) : null}

      {activeTab === "security_suite" ? (
        <SecuritySuiteTab
          passwordForm={passwordForm}
          twoFactor={twoFactor}
          onPasswordChange={setPasswordForm}
          onToggle2FA={() =>
            setTwoFactor((prev) => ({
              ...prev,
              enabled: !prev.enabled,
            }))
          }
        />
      ) : null}

      {activeTab === "app_preferences" ? (
        <AppPreferencesTab
          value={appPreferences}
          timezoneOptions={timezoneOptions}
          currencyOptions={currencyOptions}
          stagnationOptions={stagnationOptions}
          onChange={setAppPreferences}
        />
      ) : null}
    </div>
  );
};

export default BrokerSettings;
