import type { LucideIcon } from "lucide-react";

export type SettingsTabKey =
  | "account_profile"
  | "security_suite"
  | "app_preferences";

export type SettingsTab = {
  key: SettingsTabKey;
  label: string;
  icon: LucideIcon;
};

export type BrokerProfile = {
  initials: string;
  fullName: string;
  role: string;
  companyName: string;
  licenceNumber: string;
  workEmail: string;
  mobilePhone: string;
  officeStreetAddress: string;
  city: string;
  state: string;
  zip: string;
  photo?: string;
};

export type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

export type TwoFactorState = {
  enabled: boolean;
  title: string;
  description: string;
};

export type TimezoneOption = {
  value: string;
  label: string;
};

export type CurrencyOption = {
  value: string;
  label: string;
};

export type StagnationOption = {
  value: string;
  label: string;
};

export type AppPreferencesState = {
  timezone: string;
  currency: string;
  referrerPaymentReminder: boolean;
  leadStagnationAlert: boolean;
  stagnationPeriod: string;
  weeklySummaryDigest: boolean;
};
