// src/pages/ReferrerDashboard/ReferrerMyReferrals/types.ts
export type ReferralStatus =
  | "Referral Sent"
  | "Loan Lodged"
  | "Loan Settled"
  | "Awaiting Referral Fee"
  | "Fee Paid"
  | "Not Progressed";

export type TimePreset = "All Time" | "This Month" | "Last 3 Months";

export type ReferralRow = {
  id: string;
  clientName: string;
  company: string;
  status: ReferralStatus;
  referredBy: string;
  expectedRefFee: number | null; // null => "Pending"
  dateSubmitted: string; // ISO date: YYYY-MM-DD
};

export type MonthRange = {
  from: string; // YYYY-MM
  to: string; // YYYY-MM
};

export type StatusFilter = "All Statuses" | ReferralStatus;

export type RowAction = "edit" | "remove";
