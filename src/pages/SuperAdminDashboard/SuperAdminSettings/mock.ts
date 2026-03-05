// src/pages/SuperAdminDashboard/SuperAdminSettings/mock.ts

import type {
  CommissionPreviewInput,
  CommissionSettings,
  FeatureFlag,
  SeatPricingPreviewInput,
  SeatPricingSettings,
  SystemBehaviorSettings,
  TemplateItem,
} from "./types";

/* ---------------------- Commission Defaults ---------------------- */
export const commissionDefaultsMock: CommissionSettings = {
  defaultBankCommissionRatePct: 0.65,
  defaultGstMultiplier: 1.1,
  defaultAggregatorFactor: 0.95,
  allowBrokerOverride: true,
  allowFixedAmountCommissionOption: true,
  defaultReferralCommissionPct: 40,
};

export const commissionPreviewMock: CommissionPreviewInput = {
  loanAmount: 800_000,
};

/* -------------------------- Seat Pricing ------------------------- */
export const seatPricingMock: SeatPricingSettings = {
  includedSeatsPerPlan: 3,
  pricePerAdditionalSeat: 29,
  allowSeatDowngradeMidCycle: false,
  prorateAdditionalSeats: true,
};

export const seatPricingPreviewMock: SeatPricingPreviewInput = {
  basePlanPriceMonthly: 199,
  totalSeatsExample: 5,
};

/* -------------------------- Feature Flags ------------------------ */
export const featureFlagsMock: FeatureFlag[] = [
  {
    key: "advancedReporting",
    title: "Advanced Reporting",
    description: "Enable comprehensive analytics and custom report generation",
    enabled: true,
  },
  {
    key: "crmAutoSync",
    title: "CRM Auto Sync",
    description: "Automatically synchronize data with connected CRM systems",
    enabled: true,
  },
  {
    key: "commissionForecasting",
    title: "Commission Forecasting",
    description: "Predictive commission calculations and projections",
    enabled: true,
  },
  {
    key: "aiInsights",
    title: "AI Insights",
    description: "AI-powered lead scoring and performance predictions",
    enabled: false,
  },
  {
    key: "automatedReminderEmails",
    title: "Automated Reminder Emails",
    description: "Send automatic payment and follow-up reminders",
    enabled: true,
  },
  {
    key: "manualCreditSystem",
    title: "Manual Credit System",
    description: "Allow admins to add manual credits to subscriptions",
    enabled: true,
  },
  {
    key: "refundProcessing",
    title: "Refund Processing",
    description: "Enable refund issuance through the platform",
    enabled: true,
  },
  {
    key: "brokerImpersonation",
    title: "Broker Impersonation Enabled",
    description:
      "Allow super admins to impersonate broker accounts for support",
    enabled: true,
  },
  {
    key: "referrerPortalAccess",
    title: "Referrer Portal Access",
    description: "Enable referrer self-service portal for tracking commissions",
    enabled: true,
  },
];

/* ------------------------- System Behavior ----------------------- */
export const systemBehaviorMock: SystemBehaviorSettings = {
  defaultExpectedReferrerPaymentRule: "end_of_month_following_settlement",
  overdueCommissionReminderDays: 7,
  defaultSubscriptionAutoRenew: true,
  failedPaymentGracePeriodDays: 5,
  accountSuspensionRule: "suspend_after_3_failed",
};

/* ------------------------ Default Templates ---------------------- */
export const templatesMock: TemplateItem[] = [
  {
    id: "broker-agreement",
    title: "Default Broker Agreement Template",
    subtitle: "Standard terms and conditions for broker platform access",
  },
  {
    id: "referrer-agreement",
    title: "Default Referrer Agreement Template",
    subtitle: "Commission structure and referral terms agreement",
  },
  {
    id: "commission-confirmation",
    title: "Commission Confirmation Email Template",
    subtitle: "Email sent when commission is calculated and confirmed",
  },
  {
    id: "payment-reminder",
    title: "Payment Reminder Email Template",
    subtitle: "Automated reminder for overdue commission payments",
  },
  {
    id: "subscription-invoice",
    title: "Subscription Invoice Email Template",
    subtitle: "Monthly subscription billing invoice notification",
  },
];
