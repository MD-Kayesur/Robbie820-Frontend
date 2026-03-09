import type {
  AuditBarDatum,
  DatePresetOption,
  ForecastDatum,
  FundedDealRow,
  PerformanceRow,
  RangeOption,
  ReferrerOption,
  SummaryMetric,
} from "./types";

export const rangeOptions: RangeOption[] = [
  { value: "LAST_6_MONTHS", label: "Last 6 Month" },
  { value: "MTD", label: "MTD" },
  { value: "FYTD", label: "FYTD" },
];

export const datePresetOptions: DatePresetOption[] = [
  {
    value: "NOV_2025_JAN_2026",
    label: "Nov 2025 - Jan 2026",
    withCalendar: true,
  },
  {
    value: "OCT_2025_DEC_2025",
    label: "Oct 2025 - Dec 2025",
    withCalendar: true,
  },
  {
    value: "JAN_2026_MAR_2026",
    label: "Jan 2026 - Mar 2026",
    withCalendar: true,
  },
];

export const referrerOptions: ReferrerOption[] = [
  { value: "ALL", label: "All Referrers" },
  { value: "METRO_PARTNERS", label: "Metro Partners" },
  { value: "PRIME_ESTATES", label: "Prime Estates" },
  { value: "ELITE_REALTY", label: "Elite Realty" },
  { value: "DIRECT_REF", label: "Direct Ref" },
  { value: "HOME_FINDER", label: "Home Finder" },
];

export const summaryMetrics: SummaryMetric[] = [
  {
    id: "conversion-rate",
    label: "CONVERSION RATE",
    value: "28.4%",
    delta: "+2.1%",
    trend: "up",
    icon: "conversion",
  },
  {
    id: "funded-deals",
    label: "FUNDED DEALS",
    value: "42",
    delta: "+14%",
    trend: "up",
    icon: "funded",
  },
  {
    id: "pending-settlement",
    label: "PENDING SETTLEMENT",
    value: "$12.4M",
    delta: "-4%",
    trend: "down",
    icon: "settlement",
  },
  {
    id: "forecasted-revenue",
    label: "FORECASTED REVENUE",
    value: "$156.2K",
    delta: "+18%",
    trend: "up",
    icon: "revenue",
  },
];

export const partnerAuditData: AuditBarDatum[] = [
  { referrer: "PRIME_ESTATES", label: "Prime Estates", leads: 45, funded: 12 },
  { referrer: "ELITE_REALTY", label: "Rose Realty", leads: 32, funded: 8 },
  { referrer: "METRO_PARTNERS", label: "Elite Realty", leads: 28, funded: 10 },
  { referrer: "DIRECT_REF", label: "Direct Ref", leads: 15, funded: 2 },
  { referrer: "HOME_FINDER", label: "Home Finder", leads: 22, funded: 5 },
];

export const settlementForecastData: ForecastDatum[] = [
  { label: "Dec 23", value: 2.8 },
  { label: "Jan 24", value: 4.0 },
  { label: "Feb 24", value: 4.2 },
  { label: "Mar 24", value: 4.2 },
  { label: "Apr 24", value: 2.9 },
  { label: "Apr 24 ", value: 5.4 },
];

export const performanceRows: PerformanceRow[] = [
  {
    referrer: "PRIME_ESTATES",
    referrerName: "Prime Estates",
    leads: 45,
    fundedDeals: 12,
    conversion: 26.6,
    volumeFunded: 5.4,
    totalCommission: 185000,
    avgDealSize: 440476,
  },
  {
    referrer: "METRO_PARTNERS",
    referrerName: "Elite Realty",
    leads: 28,
    fundedDeals: 10,
    conversion: 26.6,
    volumeFunded: 5.4,
    totalCommission: 85000,
    avgDealSize: 540476,
  },
  {
    referrer: "DIRECT_REF",
    referrerName: "Direct Ref",
    leads: 15,
    fundedDeals: 2,
    conversion: 26.6,
    volumeFunded: 5.4,
    totalCommission: 5000,
    avgDealSize: 640476,
  },
  {
    referrer: "HOME_FINDER",
    referrerName: "H Home Finder",
    leads: 22,
    fundedDeals: 5,
    conversion: 26.6,
    volumeFunded: 5.4,
    totalCommission: 105000,
    avgDealSize: 740476,
  },
];

export const fundedDealsRows: FundedDealRow[] = [
  {
    id: "deal-1",
    borrower: "Alice Henderson",
    referrer: "PRIME_ESTATES",
    referrerLabel: "prime estates",
    amount: 450000,
    lastUpdated: "2023-11-20",
    status: "APPROVED",
    rate: 4.25,
    commission: 5625,
    fundedAt: "2023-10-08",
  },
  {
    id: "deal-2",
    borrower: "Edward Norton",
    referrer: "PRIME_ESTATES",
    referrerLabel: "highnetworth",
    amount: 250000,
    lastUpdated: "2023-11-20",
    status: "APPROVED",
    rate: 3.5,
    commission: 250,
    fundedAt: "2023-10-19",
  },
  {
    id: "deal-3",
    borrower: "Mila Stone",
    referrer: "METRO_PARTNERS",
    referrerLabel: "metro partners",
    amount: 375000,
    lastUpdated: "2023-11-14",
    status: "APPROVED",
    rate: 4.1,
    commission: 3200,
    fundedAt: "2023-10-11",
  },
  {
    id: "deal-4",
    borrower: "Harper Wells",
    referrer: "HOME_FINDER",
    referrerLabel: "home finder",
    amount: 510000,
    lastUpdated: "2023-11-23",
    status: "SETTLED",
    rate: 4.45,
    commission: 6100,
    fundedAt: "2023-10-27",
  },
  {
    id: "deal-5",
    borrower: "Leo Watson",
    referrer: "DIRECT_REF",
    referrerLabel: "direct ref",
    amount: 190000,
    lastUpdated: "2023-11-09",
    status: "PENDING",
    rate: 3.95,
    commission: 980,
    fundedAt: "2023-10-30",
  },
];
