// src/pages/ReferrerDashboard/mock.ts
import type { ActivityRow, DealStage, Metric } from "./types";

export const dashboardFiltersMock = {
  period: "MTD" as const,
  dateRangeLabel: "Nov 2025 - Jan 2026",
  range: {
    start: "2025-11",
    end: "2026-01",
  },
};

const metricsMTD: Metric[] = [
  {
    id: "m1",
    label: "TOTAL REFERRALS",
    value: "5",
    change: "8.2%",
    icon: "users",
  },
  {
    id: "m2",
    label: "Total Referral Fee Earned",
    value: "$3,600",
    change: "12.4%",
    icon: "dollar",
  },
  {
    id: "m3",
    label: "CONVERSION RATE",
    value: "40%",
    change: "2.1%",
    icon: "trend",
  },
  {
    id: "m4",
    label: "FUNDED DEALS",
    value: "2",
    change: "1",
    icon: "briefcase",
  },
  { id: "m5", label: "EXPECTED REFERRAL FEE", value: "$5", icon: "spark" },
];

const stagesMTD: DealStage[] = [
  { id: "s1", label: "REFERRAL SENT", count: 5, tone: "neutral" },
  { id: "s2", label: "LOAN LODGED", count: 5, tone: "white-blue" },
  { id: "s3", label: "LOAN SETTLED", count: 5, tone: "blue" },
  { id: "s4", label: "AWAITING REFERRAL FEE", count: 5, tone: "amber" },
];

const activitiesMTD: ActivityRow[] = [
  {
    id: "a1",
    clientName: "Sarah Jenkins",
    company: "techflow solutions",
    status: "LOAN SETTLED",
    referralFee: "$1,250",
  },
  {
    id: "a2",
    clientName: "Eleanor Vance",
    company: "vance legal partners",
    status: "LOAN LODGED",
    referralFee: "-",
  },
  {
    id: "a3",
    clientName: "Cameron Williamson",
    company: "david chen chen logistics",
    status: "AWAITING REFERRAL FEE",
    referralFee: "$1,550",
  },
  {
    id: "a4",
    clientName: "Jenny Wilson",
    company: "ortiz medical group",
    status: "REFERRAL SENT",
    referralFee: "$1,250",
  },
  {
    id: "a5",
    clientName: "Robert Fox",
    company: "mark robertson greenbuild construction",
    status: "FEE PAID",
    referralFee: "$1,100",
  },
  {
    id: "a6",
    clientName: "Dianne Russell",
    company: "atlas finance",
    status: "REFERRAL SENT",
    referralFee: "-",
  },
  {
    id: "a7",
    clientName: "Kristin Watson",
    company: "harbor law",
    status: "LOAN SETTLED",
    referralFee: "$980",
  },
];

const metricsFYTD: Metric[] = [
  {
    id: "m1",
    label: "TOTAL REFERRALS",
    value: "18",
    change: "4.1%",
    icon: "users",
  },
  {
    id: "m2",
    label: "Total Referral Fee Earned",
    value: "$12,900",
    change: "9.7%",
    icon: "dollar",
  },
  {
    id: "m3",
    label: "CONVERSION RATE",
    value: "33%",
    change: "1.4%",
    icon: "trend",
  },
  {
    id: "m4",
    label: "FUNDED DEALS",
    value: "6",
    change: "2",
    icon: "briefcase",
  },
  { id: "m5", label: "EXPECTED REFERRAL FEE", value: "$14", icon: "spark" },
];

const stagesFYTD: DealStage[] = [
  { id: "s1", label: "REFERRAL SENT", count: 18, tone: "neutral" },
  { id: "s2", label: "LOAN LODGED", count: 10, tone: "neutral" },
  { id: "s3", label: "LOAN SETTLED", count: 6, tone: "blue" },
  { id: "s4", label: "AWAITING REFERRAL FEE", count: 4, tone: "amber" },
];

const activitiesFYTD: ActivityRow[] = [
  ...activitiesMTD,
  {
    id: "a8",
    clientName: "Arlene McCoy",
    company: "northstar group",
    status: "LOAN LODGED",
    referralFee: "-",
  },
  {
    id: "a9",
    clientName: "Cody Fisher",
    company: "stonebridge capital",
    status: "FEE PAID",
    referralFee: "$1,450",
  },
  {
    id: "a10",
    clientName: "Leslie Alexander",
    company: "tidewater construction",
    status: "AWAITING REFERRAL FEE",
    referralFee: "$1,250",
  },
];

export const dashboardDataMock = {
  MTD: {
    dateRangeLabel: "Nov 2025 - Jan 2026",
    metrics: metricsMTD,
    stages: stagesMTD,
    activities: activitiesMTD,
  },
  FYTD: {
    dateRangeLabel: "Jul 2025 - Jan 2026",
    metrics: metricsFYTD,
    stages: stagesFYTD,
    activities: activitiesFYTD,
  },
} as const;
