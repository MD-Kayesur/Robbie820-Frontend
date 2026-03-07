// src/pages/ReferrerDashboard/ReferrerNotifications/types.ts
import type { LucideIcon } from "lucide-react";

export type NotificationType =
  | "referral_settled"
  | "payment_confirmed"
  | "commission_calculated";

export type NotificationItem = {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  read: boolean;
  createdAt: string; // ISO date/time string (for future use)
};

export type NotificationMeta = {
  icon: LucideIcon;
  iconBg: string; // tailwind classes
};
