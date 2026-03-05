// src/pages/SuperAdminDashboard/SuperAdminSettings/types.ts

export type SettingsTab =
  | "Commission Defaults"
  | "Seat Pricing"
  | "Feature Flags"
  | "System Behavior"
  | "Default Templates";

/* ---------------------- Commission Defaults ---------------------- */
export type CommissionSettings = {
  defaultBankCommissionRatePct: number; // e.g. 0.65 means 0.65%
  defaultGstMultiplier: number; // e.g. 1.1
  defaultAggregatorFactor: number; // e.g. 0.95
  allowBrokerOverride: boolean;
  allowFixedAmountCommissionOption: boolean;
  defaultReferralCommissionPct: number; // e.g. 40 means 40%
};

export type CommissionPreviewInput = {
  loanAmount: number; // e.g. 800000
};

/* -------------------------- Seat Pricing ------------------------- */
export type SeatPricingSettings = {
  includedSeatsPerPlan: number; // e.g. 3
  pricePerAdditionalSeat: number; // e.g. 29
  allowSeatDowngradeMidCycle: boolean;
  prorateAdditionalSeats: boolean;
};

export type SeatPricingPreviewInput = {
  basePlanPriceMonthly: number; // e.g. 199
  totalSeatsExample: number; // e.g. 5
};

/* -------------------------- Feature Flags ------------------------ */
export type FeatureFlagKey =
  | "advancedReporting"
  | "crmAutoSync"
  | "commissionForecasting"
  | "aiInsights"
  | "automatedReminderEmails"
  | "manualCreditSystem"
  | "refundProcessing"
  | "brokerImpersonation"
  | "referrerPortalAccess";

export type FeatureFlag = {
  key: FeatureFlagKey;
  title: string;
  description: string;
  enabled: boolean;
};

/* ------------------------- System Behavior ----------------------- */
export type ReferrerPaymentRule =
  | "end_of_month_following_settlement"
  | "weekly_after_settlement"
  | "immediate_after_settlement";

export type AccountSuspensionRule =
  | "suspend_after_3_failed"
  | "suspend_after_5_failed"
  | "never_suspend";

export type SystemBehaviorSettings = {
  defaultExpectedReferrerPaymentRule: ReferrerPaymentRule;
  overdueCommissionReminderDays: number; // e.g. 7
  defaultSubscriptionAutoRenew: boolean;
  failedPaymentGracePeriodDays: number; // e.g. 5
  accountSuspensionRule: AccountSuspensionRule;
};

/* ------------------------ Default Templates ---------------------- */
export type TemplateItem = {
  id: string;
  title: string;
  subtitle: string;
};
