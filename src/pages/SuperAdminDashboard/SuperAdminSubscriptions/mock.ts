// src/pages/SuperAdmin/SubscriptionsCom/mock.ts
import type {
  PlanCard,
  RevenueByPlanRow,
  RevenuePoint,
  SubscriptionRow,
} from "./types";

export const subscriptionsMock: SubscriptionRow[] = [
  {
    brokerCompany: "Prime Mortgage Group",
    plan: "Enterprise",
    seats: 12,
    monthlyPrice: "$999",
    billingCycle: "Monthly",
    nextBillingDate: "Mar 1, 2026",
    paymentStatus: "Paid",
    status: "Active",
  },
  {
    brokerCompany: "Capital Home Loans",
    plan: "Pro",
    seats: 8,
    monthlyPrice: "$599",
    billingCycle: "Monthly",
    nextBillingDate: "Mar 5, 2026",
    paymentStatus: "Paid",
    status: "Active",
  },
  {
    brokerCompany: "First Choice Finance",
    plan: "Business",
    seats: 5,
    monthlyPrice: "$399",
    billingCycle: "Monthly",
    nextBillingDate: "Mar 10, 2026",
    paymentStatus: "Failed",
    status: "Payment Failed",
  },
  {
    brokerCompany: "Horizon Lending",
    plan: "Enterprise",
    seats: 15,
    monthlyPrice: "$999",
    billingCycle: "Yearly",
    nextBillingDate: "Dec 15, 2026",
    paymentStatus: "Paid",
    status: "Active",
  },
  {
    brokerCompany: "Aussie Finance Co",
    plan: "Pro",
    seats: 6,
    monthlyPrice: "$599",
    billingCycle: "Monthly",
    nextBillingDate: "N/A",
    paymentStatus: "Pending",
    status: "Suspended",
  },
  {
    brokerCompany: "NextGen Mortgages",
    plan: "Business",
    seats: 3,
    monthlyPrice: "$399",
    billingCycle: "Monthly",
    nextBillingDate: "Feb 28, 2026",
    paymentStatus: "Paid",
    status: "Trial",
  },
];

export const plansMock: PlanCard[] = [
  {
    name: "Business",
    monthly: 399,
    yearly: 3990,
    includedSeats: 5,
    additionalSeat: 40,
    maxActiveDeals: 50,
    features: [
      "Up to 5 team members",
      "50 active deals",
      "Basic reporting",
      "Email support",
      "Mobile app access",
    ],
  },
  {
    name: "Pro",
    monthly: 599,
    yearly: 5990,
    includedSeats: 10,
    additionalSeat: 50,
    maxActiveDeals: 150,
    popular: true,
    features: [
      "Up to 10 team members",
      "150 active deals",
      "Advanced reporting",
      "Priority support",
      "Custom branding",
      "API access",
    ],
  },
  {
    name: "Enterprise",
    monthly: 999,
    yearly: 9990,
    includedSeats: 15,
    additionalSeat: 60,
    maxActiveDeals: "Unlimited",
    features: [
      "Up to 15 team members",
      "Unlimited active deals",
      "Advanced analytics & AI",
      "Dedicated account manager",
      "White-label options",
      "SSO integration",
      "Custom integrations",
    ],
  },
];

export const revenueTrendMock: RevenuePoint[] = [
  { month: "Aug", value: 135000 },
  { month: "Sep", value: 140000 },
  { month: "Oct", value: 145000 },
  { month: "Nov", value: 148000 },
  { month: "Dec", value: 144000 },
  { month: "Jan", value: 152000 },
  { month: "Feb", value: 158800 },
];

export const revenueByPlanMock: RevenueByPlanRow[] = [
  {
    plan: "Enterprise",
    activeAccounts: 47,
    monthlyRevenue: 46053,
    contribution: 47.2,
  },
  {
    plan: "Pro",
    activeAccounts: 89,
    monthlyRevenue: 35311,
    contribution: 32.3,
  },
  {
    plan: "Business",
    activeAccounts: 124,
    monthlyRevenue: 49476,
    contribution: 20.5,
  },
];
