import { Cloud, Link2, Zap, Trello, Webhook } from "lucide-react";
import type {
  AlertRow,
  Filter,
  IntegrationCardData,
  WebhookRow,
} from "./types";

export const filterOptions: Filter[] = [
  "All",
  "Active",
  "Inactive",
  "Error",
  "Needs Attention",
];

export const integrationCardsMock: IntegrationCardData[] = [
  {
    id: "sf",
    name: "Salesforce",
    status: "Connected",
    lastSync: "5 minutes ago",
    syncErrors: 0,
    brokers: 24,
    icon: Cloud,
  },
  {
    id: "hs",
    name: "HubSpot",
    status: "Connected",
    lastSync: "10 minutes ago",
    syncErrors: 0,
    brokers: 18,
    icon: Cloud,
  },
  {
    id: "zp",
    name: "Zapier",
    status: "Warning",
    lastSync: "2 hours ago",
    syncErrors: 3,
    brokers: 42,
    icon: Zap,
  },
  {
    id: "tr",
    name: "Trello",
    status: "Connected",
    lastSync: "15 minutes ago",
    syncErrors: 0,
    brokers: 12,
    icon: Trello,
  },
  {
    id: "wh",
    name: "Custom Webhook",
    status: "Connected",
    lastSync: "1 minute ago",
    syncErrors: 0,
    brokers: 35,
    icon: Webhook,
  },
  {
    id: "api",
    name: "API Integration",
    status: "Disconnected",
    lastSync: "3 days ago",
    syncErrors: 127,
    brokers: 0,
    icon: Link2,
  },
];

export const systemAlertsMock: AlertRow[] = [
  {
    title: "Failed Stripe Webhook",
    tone: "Warning",
    desc: "3 webhook delivery attempts failed for payment succeeded event",
    time: "2 hours ago",
  },
  {
    title: "CRM Sync Delay",
    tone: "Warning",
    desc: "Salesforce sync experiencing delays, 15-minute lag detected",
    time: "4 hours ago",
  },
  {
    title: "Email Delivery Failure Spike",
    tone: "Critical",
    desc: "Bounce rate increased to 3.5%, investigating issue with SendGrid",
    time: "8 hours ago",
  },
];

export const webhookRowsMock: WebhookRow[] = [
  {
    type: "lead.created",
    url: "https://broker1.com/webhook",
    lastTriggered: "2 minutes ago",
    status: "Active",
    failures: 0,
    retry: "N/A",
  },
  {
    type: "commission.calculated",
    url: "https://broker2.com/webhook",
    lastTriggered: "15 minutes ago",
    status: "Active",
    failures: 0,
    retry: "N/A",
  },
  {
    type: "status.updated",
    url: "https://broker3.com/webhook",
    lastTriggered: "1 hour ago",
    status: "Failed",
    failures: 3,
    retry: "Pending",
  },
  {
    type: "referral.assigned",
    url: "https://broker4.com/webhook",
    lastTriggered: "5 minutes ago",
    status: "Active",
    failures: 0,
    retry: "N/A",
  },
  {
    type: "payment.received",
    url: "https://broker5.com/webhook",
    lastTriggered: "3 hours ago",
    status: "Retrying",
    failures: 1,
    retry: "In Progress",
  },
];
