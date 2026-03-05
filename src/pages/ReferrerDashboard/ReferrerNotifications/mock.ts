// src/pages/ReferrerDashboard/ReferrerNotifications/mock.ts
import type {
  NotificationItem,
  NotificationMeta,
  NotificationType,
} from "./types";
import { FileText, CheckCircle2, DollarSign } from "lucide-react";

export const notificationMeta: Record<NotificationType, NotificationMeta> = {
  referral_settled: {
    icon: FileText,
    iconBg: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  },
  payment_confirmed: {
    icon: CheckCircle2,
    iconBg: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  },
  commission_calculated: {
    icon: DollarSign,
    iconBg: "bg-sky-100 text-sky-700 ring-1 ring-sky-200",
  },
};

export const notificationsMock: NotificationItem[] = [
  {
    id: "n1",
    title: "Referral Settled",
    message:
      "Sarah Jenkins (TechFlow Solutions) has officially settled. Expected commission has been updated.",
    type: "referral_settled",
    read: false, // 1 unread (matches screenshot)
    createdAt: "2026-01-12T10:00:00Z",
  },
  {
    id: "n2",
    title: "Payment Confirmed",
    message:
      "The referral fee for Julia Ortiz has been processed and paid in the latest cycle.",
    type: "payment_confirmed",
    read: true,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "n3",
    title: "Commission Calculated",
    message:
      "The expected commission for Eleanor Vance has been finalized at $1,500.00.",
    type: "commission_calculated",
    read: true,
    createdAt: "2026-01-09T10:00:00Z",
  },
];
