// src/pages/SuperAdmin/SubscriptionsCom/types.ts
export type Tab =
  | "Subscription Accounts"
  | "Plans & Pricing"
  | "Revenue Analytics";

export type PlanName = string;
export type BillingCycle = "Monthly" | "Yearly";

export type PaymentStatus = "Paid" | "Failed" | "Pending";
export type SubStatus =
  | "Active"
  | "Payment Failed"
  | "Suspended"
  | "Trial"
  | "Cancelled";

export type SubscriptionRow = {
  brokerCompany: string;
  plan: PlanName;
  seats: number;
  monthlyPrice: string;
  billingCycle: BillingCycle;
  nextBillingDate: string;
  paymentStatus: PaymentStatus;
  status: SubStatus;
};

export type PlanCard = {
  name: PlanName;
  monthly: number;
  yearly: number;
  includedSeats: number;
  additionalSeat: number;
  maxActiveDeals: string | number;
  features: string[];
  popular?: boolean;
};

export type RevenuePoint = { month: string; value: number };
export type RevenueByPlanRow = {
  plan: PlanName;
  activeAccounts: number;
  monthlyRevenue: number;
  contribution: number;
};
