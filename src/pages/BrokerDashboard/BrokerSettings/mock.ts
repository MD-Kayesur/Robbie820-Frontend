import { BadgeCheck, Cog, Shield } from "lucide-react";

import type {
  AppPreferencesState,
  BrokerProfile,
  CurrencyOption,
  PasswordForm,
  SettingsTab,
  StagnationOption,
  TimezoneOption,
  TwoFactorState,
} from "./types";

export const settingsTabs: SettingsTab[] = [
  {
    key: "account_profile",
    label: "Account Profile",
    icon: BadgeCheck,
  },
  {
    key: "security_suite",
    label: "Security Suite",
    icon: Shield,
  },
  {
    key: "app_preferences",
    label: "App Preferences",
    icon: Cog,
  },
];

export const brokerProfileMock: BrokerProfile = {
  initials: "MB",
  fullName: "Marcus Broker",
  role: "Broker",
  companyName: "LendFlow Principal Partners",
  licenceNumber: "e.g. 123456 or CRN-789012",
  workEmail: "marcus@lendflow.pro",
  mobilePhone: "+1(555) 012-3456",
  officeStreetAddress: "1200 Financial Way, Suite 400",
  city: "San Francisco",
  state: "CA",
  zip: "94105",
};

export const passwordFormMock: PasswordForm = {
  currentPassword: "currentpassword",
  newPassword: "Min 12 characters",
  confirmNewPassword: "Repeat new password",
};

export const twoFactorMock: TwoFactorState = {
  enabled: true,
  title: "MFA is protecting your account",
  description:
    "Two-factor authentication adds an extra layer of security to your account by requiring more than just a password to log in.",
};

export const timezoneOptions: TimezoneOption[] = [
  {
    value: "sydney",
    label: "(GMT+10) Sydney, Australia",
  },
  {
    value: "melbourne",
    label: "(GMT+10) Melbourne, Australia",
  },
  {
    value: "brisbane",
    label: "(GMT+10) Brisbane, Australia",
  },
];

export const currencyOptions: CurrencyOption[] = [
  {
    value: "aud",
    label: "AUD ($)",
  },
  {
    value: "usd",
    label: "USD ($)",
  },
  {
    value: "eur",
    label: "EUR (€)",
  },
];

export const stagnationOptions: StagnationOption[] = [
  {
    value: "7_days",
    label: "7 Days",
  },
  {
    value: "14_days",
    label: "14 Days",
  },
  {
    value: "30_days",
    label: "30 Days",
  },
];

export const appPreferencesMock: AppPreferencesState = {
  timezone: "sydney",
  currency: "aud",
  referrerPaymentReminder: true,
  leadStagnationAlert: true,
  stagnationPeriod: "7_days",
  weeklySummaryDigest: false,
};
