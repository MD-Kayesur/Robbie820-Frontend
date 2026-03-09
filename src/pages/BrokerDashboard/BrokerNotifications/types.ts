export type NotificationCategory = "lead" | "commission" | "account";

export type NotificationType =
  | "new_referral_received"
  | "lead_status_updated"
  | "lead_assigned_to_you"
  | "commission_calculated"
  | "payout_scheduled"
  | "seat_limit_reached"
  | "subscription_renewal_reminder";

export type NotificationSource =
  | "REFERRAL PORTAL"
  | "CRMSYNC"
  | "COMMISSION ENGINE"
  | "PAYOUT SYSTEM"
  | "TEAM MANAGEMENT"
  | "SUBSCRIPTION SYSTEM";

export type NotificationIconKey =
  | "user-plus"
  | "refresh"
  | "dollar"
  | "calendar"
  | "users"
  | "alert";

export type NotificationItem = {
  id: string;
  type: NotificationType;
  category: NotificationCategory;
  title: string;
  description: string;
  source: NotificationSource;
  timeAgo: string;
  isRead: boolean;
  icon: NotificationIconKey;
};

export type NotificationPreferenceGroup = {
  id: string;
  title: string;
  items: NotificationType[];
};

export type NotificationPreferenceItem = {
  type: NotificationType;
  label: string;
  category: NotificationCategory;
  enabled: boolean;
  email: boolean;
  inApp: boolean;
};

export type NotificationTab = "ALL" | "UNREAD";
