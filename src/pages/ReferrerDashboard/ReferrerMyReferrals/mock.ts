// src/pages/ReferrerDashboard/ReferrerMyReferrals/mock.ts
import type {
  MonthRange,
  ReferralRow,
  ReferralStatus,
  TimePreset,
} from "./types";

export const statusOptions: Array<"All Statuses" | ReferralStatus> = [
  "All Statuses",
  "Referral Sent",
  "Loan Lodged",
  "Loan Settled",
  "Awaiting Referral Fee",
  "Fee Paid",
  "Not Progressed",
];

export const timeOptions: TimePreset[] = [
  "All Time",
  "This Month",
  "Last 3 Months",
];

// Matches the screenshot’s visible range label
export const defaultRange: MonthRange = { from: "2025-11", to: "2026-01" };

// Matches the screenshot’s 5 rows
export const referralsMock: ReferralRow[] = [
  {
    id: "r1",
    clientName: "Sarah Jenkins",
    company: "TECHFLOW SOLUTIONS",
    status: "Loan Settled",
    referredBy: "Alex Partner",
    expectedRefFee: 1250,
    dateSubmitted: "2025-11-10",
  },
  {
    id: "r2",
    clientName: "Sarah Jenkins",
    company: "TECHFLOW SOLUTIONS",
    status: "Loan Lodged",
    referredBy: "Sarah Team",
    expectedRefFee: null, // Pending
    dateSubmitted: "2025-12-01",
  },
  {
    id: "r3",
    clientName: "Sarah Jenkins",
    company: "TECHFLOW SOLUTIONS",
    status: "Awaiting Referral Fee",
    referredBy: "Alex Partner",
    expectedRefFee: 1500,
    dateSubmitted: "2025-12-15",
  },
  {
    id: "r4",
    clientName: "Sarah Jenkins",
    company: "TECHFLOW SOLUTIONS",
    status: "Referral Sent",
    referredBy: "John Staff",
    expectedRefFee: 950,
    dateSubmitted: "2026-01-12",
  },
  {
    id: "r5",
    clientName: "Sarah Jenkins",
    company: "TECHFLOW SOLUTIONS",
    status: "Fee Paid",
    referredBy: "Sarah Team",
    expectedRefFee: 2100,
    dateSubmitted: "2025-11-15",
  },
];
