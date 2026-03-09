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
};

export type ChipProps = {
  kind: SystemHealthStatus;
  label: string;
};

export type DashboardMockData = {
  licensedUsers: UserRow[];
  registeredAccounts: UserRow[];
  subscriptions: SubscriptionRow[];
  annualRevenue: RevenueRow[];
  ranges: RangeOption[];
  systemHealth: SystemHealthRow[];
};
