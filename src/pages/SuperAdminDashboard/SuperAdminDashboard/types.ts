import type React from "react";
import type { UserRow } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/TotalLicensedUsersModal";
import type { SubscriptionRow } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/ActiveSubscriptionsModal";
import type { RevenueRow } from "../../../components/SuperAdminDashboardCom/SADashboardCom/modals/AnnualRevenueAnalyticsModal";

export type Tone = "indigo" | "blue" | "emerald" | "amber";

export type ToneStyle = {
  iconWrap: string;
  icon: string;
};

export type ModalType =
  | "licensedUsers"
  | "registeredAccounts"
  | "activeSubscriptions"
  | "annualRevenue";

export type RangeOption = string;

export type SystemHealthStatus = "healthy" | "warning";

export type SystemHealthRow = {
  label: string;
  status: SystemHealthStatus;
};

export type MetricCardProps = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
  tone: Tone;
  onInfo?: () => void;
};

export type GrowthCardProps = {
  title: string;
  value: string;
  change: string;
  icon: React.ElementType;
};

export type SnapshotCardProps = {
  title: string;
  children: React.ReactNode;
};

export type LinkRowProps = {
  label: string;
  onClick?: () => void;
};

export type ChipProps = {
  kind: SystemHealthStatus;
  label: string;
};

export type DashboardMetrics = {
  licensedUsersCount: string;
  licensedUsersChange: string;
  registeredAccountsCount: string;
  registeredAccountsChange: string;
  activeSubscriptionsCount: string;
  activeSubscriptionsChange: string;
  monthlyRevenue: string;
  monthlyRevenueChange: string;
  annualRevenueCount: string;
  annualRevenueChange: string;

  newSignups: string;
  newSignupsChange: string;
  churnedAccounts: string;
  churnedAccountsChange: string;
  netGrowth: string;
  netGrowthChange: string;

  activeBrokers: number;
  suspendedBrokers: number;
  activeReferrers: number;
  referrersWithLeads: number;

  totalCommission: string;
  marketPaid: string;
  pendingCommission: string;

  licensedUsers: UserRow[];
  registeredAccounts: UserRow[];
  subscriptions: SubscriptionRow[];
  annualRevenue: RevenueRow[];
};

export type DashboardMockData = {
  metricsByRange: Record<RangeOption, DashboardMetrics>;
  ranges: RangeOption[];
  systemHealth: SystemHealthRow[];
};
