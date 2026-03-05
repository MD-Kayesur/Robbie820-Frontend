// src/pages/ReferrerDashboard/ReferrerOverview/types.ts

export type Metric = {
  id: string;
  label: string;
  value: string;
  change?: string; // e.g. "8.2%"
  icon: "users" | "dollar" | "trend" | "briefcase" | "spark";
};

export type DealStage = {
  id: string;
  label: string;
  count: number;
  tone?: "blue" | "amber" | "neutral" | "white-blue";
};

export type ActivityStatus =
  | "LOAN SETTLED"
  | "LOAN LODGED"
  | "AWAITING REFERRAL FEE"
  | "REFERRAL SENT"
  | "FEE PAID";

export type ActivityRow = {
  id: string;
  clientName: string;
  company: string;
  status: ActivityStatus;
  referralFee: string; // "$1,250" or "-"
};

export type DashboardFilters = {
  period: "MTD" | "FYTD";
  dateRangeLabel: string;

  // ✅ calendar state (month-based)
  range: {
    start: string; // "2025-11"
    end: string; // "2026-01"
  };
};

export type NewReferralForm = {
  fullName: string;
  email: string;
  phone: string;
  company?: string;
  notes?: string;
};
