export type Tab = "Brokers" | "Referrers";

export type StatusFilter = "Active" | "Suspended";

export type BrokerPlan = "Enterprise" | "Pro" | "Business";
export type BrokerStatus = "Active" | "Suspended";
export type ReferrerStatus = "Active" | "Disabled";

export type BrokerRow = {
  name: string;
  company: string;
  plan: BrokerPlan;
  seats: number;
  referrers: number;
  commissionYTD: string;
  status: BrokerStatus;
};

export type ReferrerRow = {
  name: string;
  linkedBroker: string;
  totalReferrals: number;
  totalCommission: string;
  markedPaid: string;
  status: ReferrerStatus;
  lastLogin: string;
};
