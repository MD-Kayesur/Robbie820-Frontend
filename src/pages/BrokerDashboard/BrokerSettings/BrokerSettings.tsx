import { Save } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

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

type SavedSettingsState = {
  profile: BrokerProfile;
  passwordForm: PasswordForm;
  twoFactor: TwoFactorState;
  appPreferences: AppPreferencesState;
};

const SAVE_MESSAGE_DURATION = 3000;

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean).slice(0, 2);

  if (!parts.length) return "MB";
  return parts.map((part) => part[0]?.toUpperCase() ?? "").join("");
};

const BrokerSettings = () => {
  const [activeTab, setActiveTab] = useState<SettingsTabKey>("account_profile");

  const [savedSettings, setSavedSettings] = useState<SavedSettingsState>({
    profile: brokerProfileMock,
    passwordForm: passwordFormMock,
    twoFactor: twoFactorMock,
    appPreferences: appPreferencesMock,
  });

  const [profile, setProfile] = useState<BrokerProfile>(brokerProfileMock);
  const [passwordForm, setPasswordForm] =
    useState<PasswordForm>(passwordFormMock);
  const [twoFactor, setTwoFactor] = useState<TwoFactorState>(twoFactorMock);
  const [appPreferences, setAppPreferences] =
    useState<AppPreferencesState>(appPreferencesMock);

  const [passwordError, setPasswordError] = useState("");
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    if (!saveMessage) return;

    const timer = window.setTimeout(() => {
      setSaveMessage("");
    }, SAVE_MESSAGE_DURATION);

    return () => window.clearTimeout(timer);
  }, [saveMessage]);

  const isDirty = useMemo(() => {
    return (
      JSON.stringify(savedSettings) !==
      JSON.stringify({
        profile,
        passwordForm,
        twoFactor,
        appPreferences,
      })
    );
  }, [savedSettings, profile, passwordForm, twoFactor, appPreferences]);

  const handleProfileChange = (value: BrokerProfile) => {
    setProfile({
      ...value,
      initials: getInitials(value.fullName),
    });
  };

  const handlePasswordChange = (value: PasswordForm) => {
    setPasswordForm(value);
    setPasswordError("");
  };

  const handleToggle2FA = () => {
    setTwoFactor((prev) => ({
      ...prev,
      enabled: !prev.enabled,
      title: !prev.enabled
        ? "MFA is protecting your account"
        : "MFA is currently disabled",
    }));
  };

  const handlePreferencesChange = (value: AppPreferencesState) => {
    setAppPreferences(value);
  };

  const validatePasswordForm = () => {
    const current = passwordForm.currentPassword.trim();
    const next = passwordForm.newPassword.trim();
    const confirm = passwordForm.confirmNewPassword.trim();

    const hasPasswordInput = current || next || confirm;

    if (!hasPasswordInput) {
      return true;
    }

    if (!current) {
      setPasswordError("Current password is required.");
      setActiveTab("security_suite");
      return false;
    }

    if (!next) {
      setPasswordError("New password is required.");
      setActiveTab("security_suite");
      return false;
    }

    if (next.length < 12) {
      setPasswordError("New password must be at least 12 characters.");
      setActiveTab("security_suite");
      return false;
    }

    if (next !== confirm) {
      setPasswordError("New password and confirm password do not match.");
      setActiveTab("security_suite");
      return false;
    }

    if (current === next) {
      setPasswordError("New password must be different from current password.");
      setActiveTab("security_suite");
      return false;
    }

    setPasswordError("");
    return true;
  };

  const handleSaveAll = () => {
    if (!validatePasswordForm()) return;

    setSavedSettings({
      profile,
      passwordForm,
      twoFactor,
      appPreferences,
    });

    setSaveMessage("Changes saved successfully.");
  };

  const handleResetChanges = () => {
    setProfile(savedSettings.profile);
    setPasswordForm(savedSettings.passwordForm);
    setTwoFactor(savedSettings.twoFactor);
    setAppPreferences(savedSettings.appPreferences);
    setPasswordError("");
    setSaveMessage("");
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg font-medium text-[#111827]">
            System Settings
          </h1>
          <p className="text-[14px] leading-6 text-[#6B7280]">
            Configure your professional profile and workspace security.
          </p>

          <div className="mt-2 min-h-1">
            {saveMessage ? (
              <p className="text-[13px] font-medium text-emerald-600">
                {saveMessage}
              </p>
            ) : isDirty ? (
              <p className="text-[13px] font-medium text-amber-600">
                You have unsaved changes.
              </p>
            ) : null}
          </div>
        </div>

        <div className="flex w-full gap-3 md:w-auto md:flex-row">
          <button
            type="button"
            onClick={handleResetChanges}
            disabled={!isDirty}
            className={cn(
              "inline-flex h-11 w-full items-center justify-center rounded-[10px] border px-5 text-[15px] font-medium transition md:h-12 md:w-auto md:text-[16px]",
              isDirty
                ? "border-[#D1D5DB] bg-white text-[#374151] hover:bg-slate-50"
                : "cursor-not-allowed border-[#E5E7EB] bg-[#F9FAFB] text-[#9CA3AF]",
            )}
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={!isDirty}
            className={cn(
              "inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] px-5 text-[15px] font-medium text-white transition md:h-12 md:w-auto md:text-[18px]",
              isDirty
                ? "bg-[#0EA5E9] hover:bg-sky-600"
                : "cursor-not-allowed bg-sky-300",
            )}
          >
            <Save className="h-4 w-4 md:h-5 md:w-5" />
            Save Changes
          </button>
        </div>
      </div>

      <div className="border-t border-[#E5E7EB] pt-4">
        <div className="grid grid-cols-1 gap-2 rounded-xl border border-[#63C8FF] bg-[#EEF8FF] p-2 md:grid-cols-2 xl:inline-flex xl:flex-wrap">
          {settingsTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.key;

            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  "inline-flex h-10 items-center justify-center gap-2 rounded-lg px-4 text-center text-[14px] font-medium transition md:text-[15px] xl:justify-start xl:text-[16px]",
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
        <AccountProfileTab profile={profile} onChange={handleProfileChange} />
      ) : null}

      {activeTab === "security_suite" ? (
        <SecuritySuiteTab
          passwordForm={passwordForm}
          twoFactor={twoFactor}
          passwordError={passwordError}
          onPasswordChange={handlePasswordChange}
          onToggle2FA={handleToggle2FA}
        />
      ) : null}

      {activeTab === "app_preferences" ? (
        <AppPreferencesTab
          value={appPreferences}
          timezoneOptions={timezoneOptions}
          currencyOptions={currencyOptions}
          stagnationOptions={stagnationOptions}
          onChange={handlePreferencesChange}
        />
      ) : null}
    </div>
  );
};

export default BrokerSettings;
