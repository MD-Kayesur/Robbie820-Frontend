export type Option = { label: string; value: string };

export type AuditRole =
  | "Platform Owner"
  | "Super Admin"
  | "Broker"
  | "Referrer"
  | "System";

export type AuditStatus = "Success" | "Warning" | "Failed";

export type AuditActionType =
  | "Impersonation"
  | "Login Activity"
  | "Subscription Change"
  | "Commission Update"
  | "Payment Marked Paid"
  | "Refund"
  | "Manual Credit"
  | "Account Suspension"
  | "Payment Failed"
  | "System Error"
  | "Role Change";

export type AuditRow = {
  id: string;
  at: string; // ISO date
  user: string;
  role: AuditRole;
  actionType: AuditActionType;
  affectedAccount: string;
  description: string;
  ip: string;
  status: AuditStatus;
};

export type SuspiciousTone = "high" | "medium";

export type SuspiciousCard = {
  id: string;
  title: string;
  tone: SuspiciousTone;
  desc: string;
  at: number; // ms timestamp
};
