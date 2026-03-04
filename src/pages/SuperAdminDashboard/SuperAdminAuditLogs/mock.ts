import type { AuditRow, Option, SuspiciousCard } from "./types";

export const userOptions: Option[] = [
  { label: "All Users", value: "all" },
  { label: "Super Admin", value: "super_admin" },
  { label: "Brokers", value: "brokers" },
  { label: "Referrers", value: "referrers" },
  { label: "System", value: "system" },
];

export const actionOptions: Option[] = [
  { label: "All Actions", value: "all" },
  { label: "Login Activity", value: "Login Activity" },
  { label: "Subscription Changes", value: "Subscription Change" },
  { label: "Commission Status Changes", value: "Commission Update" },
  { label: "Payment Marked Paid", value: "Payment Marked Paid" },
  { label: "Refund Issued", value: "Refund" },
  { label: "Manual Credit Added", value: "Manual Credit" },
  { label: "Account Suspension", value: "Account Suspension" },
  { label: "Role Changes", value: "Role Change" },
  { label: "System Errors", value: "System Error" },
];

export const rangeOptions: Option[] = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Custom Range", value: "custom" },
];

export function makeAuditRows(now: number): AuditRow[] {
  return [
    {
      id: "1",
      at: new Date(now - 2 * 60 * 60 * 1000).toISOString(),
      user: "Super Admin",
      role: "Platform Owner",
      actionType: "Impersonation",
      affectedAccount: "Prime Mortgage Group",
      description: "Super Admin impersonated Broker John Smith",
      ip: "203.45.67.89",
      status: "Success",
    },
    {
      id: "2",
      at: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
      user: "John Smith",
      role: "Broker",
      actionType: "Commission Update",
      affectedAccount: "Lisa Wong",
      description:
        "Broker marked commission as Paid for Referrer Lisa Wong ($2,450)",
      ip: "192.168.1.45",
      status: "Success",
    },
    {
      id: "3",
      at: new Date(now - 4.5 * 60 * 60 * 1000).toISOString(),
      user: "Super Admin",
      role: "Platform Owner",
      actionType: "Subscription Change",
      affectedAccount: "Capital Home Loans",
      description: "Subscription upgraded from Starter to Professional",
      ip: "203.45.67.89",
      status: "Success",
    },
    {
      id: "4",
      at: new Date(now - 5.5 * 60 * 60 * 1000).toISOString(),
      user: "Super Admin",
      role: "Platform Owner",
      actionType: "Manual Credit",
      affectedAccount: "First Choice Finance",
      description: "Manual credit of $100 added to subscription",
      ip: "203.45.67.89",
      status: "Success",
    },
    {
      id: "5",
      at: new Date(now - 6.5 * 60 * 60 * 1000).toISOString(),
      user: "Super Admin",
      role: "Platform Owner",
      actionType: "Refund",
      affectedAccount: "Horizon Lending",
      description: "Refund of $149 issued for billing error",
      ip: "203.45.67.89",
      status: "Success",
    },
    {
      id: "6",
      at: new Date(now - 8 * 60 * 60 * 1000).toISOString(),
      user: "Super Admin",
      role: "Platform Owner",
      actionType: "Account Suspension",
      affectedAccount: "Alice Cooper",
      description: "Referrer account disabled due to policy violation",
      ip: "203.45.67.89",
      status: "Warning",
    },
    {
      id: "7",
      at: new Date(now - 10 * 60 * 60 * 1000).toISOString(),
      user: "System",
      role: "System",
      actionType: "Payment Failed",
      affectedAccount: "Aussie Finance Co",
      description: "Failed payment attempt - card declined",
      ip: "N/A",
      status: "Failed",
    },
    {
      id: "8",
      at: new Date(now - 12 * 60 * 60 * 1000).toISOString(),
      user: "System",
      role: "System",
      actionType: "System Error",
      affectedAccount: "CRM Integration",
      description: "CRM sync error - connection timeout",
      ip: "N/A",
      status: "Failed",
    },
  ];
}

export function makeSuspiciousCards(now: number): SuspiciousCard[] {
  return [
    {
      id: "s1",
      title: "Failed Login Attempts",
      tone: "high",
      desc: "5 failed login attempts from IP 45.67.89.123",
      at: now - 60 * 60 * 1000,
    },
    {
      id: "s2",
      title: "High-Value Refund",
      tone: "medium",
      desc: "Refund of $2,450 issued to Horizon Lending",
      at: now - 3 * 60 * 60 * 1000,
    },
    {
      id: "s3",
      title: "Large Manual Credit",
      tone: "medium",
      desc: "Manual credit of $500 added to subscription",
      at: now - 5 * 60 * 60 * 1000,
    },
  ];
}
