// src/pages/ReferrerDashboard/ReferrerClientDetails/types.ts

import type { LucideIcon } from "lucide-react";

export type ClientProgressStep = {
  id: string;
  title: string;
  date: string;
  tone?: "blue" | "beige";
  icon: "file" | "clock" | "check" | "dollar";
};

export type ClientContactItem = {
  id: string;
  label: string;
  value: string;
  icon: "mail" | "phone" | "calendar";
};

export type StatusHistoryItem = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export type ClientDetailsData = {
  clientName: string;
  companyName: string;
  avatarText: string;
  badgeText: string;
  expectedReferralFee: string;
  progressTimeline: ClientProgressStep[];
  clientInformation: ClientContactItem[];
  statusHistory: StatusHistoryItem[];
  brokerProgressNotes: string;
  lastUpdated: string;
};

export type IconMap = Record<string, LucideIcon>;
