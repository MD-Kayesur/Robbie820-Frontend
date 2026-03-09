export type ReportRangeKey = "LAST_6_MONTHS" | "MTD" | "FYTD";

export type MetricTrend = "up" | "down";

export type ReferrerKey =
  | "ALL"
  | "PRIME_ESTATES"
  | "ELITE_REALTY"
  | "DIRECT_REF"
  | "HOME_FINDER"
  | "METRO_PARTNERS";

export type SummaryMetric = {
  id: string;
  label: string;
  value: string;
  delta: string;
  trend: MetricTrend;
  icon: "conversion" | "funded" | "settlement" | "revenue";
};

export type AuditBarDatum = {
  referrer: ReferrerKey;
  label: string;
  leads: number;
  funded: number;
};

export type ForecastDatum = {
  label: string;
  value: number;
};

export type PerformanceRow = {
  referrer: ReferrerKey;
  referrerName: string;
  leads: number;
  fundedDeals: number;
  conversion: number;
  volumeFunded: number;
  totalCommission: number;
  avgDealSize: number;
};

export type DealStatus = "APPROVED" | "PENDING" | "SETTLED";

export type FundedDealRow = {
  id: string;
  borrower: string;
  referrer: ReferrerKey;
  referrerLabel: string;
  amount: number;
  lastUpdated: string;
  status: DealStatus;
  rate: number;
  commission: number;
  fundedAt: string;
};

export type ReferrerOption = {
  value: ReferrerKey;
  label: string;
};

export type RangeOption = {
  value: ReportRangeKey;
  label: string;
};

export type DatePresetOption = {
  value: string;
  label: string;
  withCalendar?: boolean;
};
