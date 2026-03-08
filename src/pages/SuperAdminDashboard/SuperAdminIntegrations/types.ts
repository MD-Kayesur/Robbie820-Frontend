import type React from "react";

export type Filter =
  | "All"
  | "Active"
  | "Inactive"
  | "Error"
  | "Needs Attention";

export type AlertTone = "Warning" | "Critical";

export type WebhookStatus = "Active" | "Failed" | "Retrying";

export type WebhookRow = {
  type: string;
  url: string;
  lastTriggered: string;
  status: WebhookStatus;
  failures: number;
  retry: string;
};

export type AlertRow = {
  title: string;
  tone: AlertTone;
  desc: string;
  time: string;
};

export type ConnStatus = "Connected" | "Warning" | "Disconnected";

export type IntegrationCardData = {
  id: string;
  name: string;
  status: ConnStatus;
  lastSync: string;
  syncErrors: number;
  brokers: number;
  icon: React.ElementType;
};
