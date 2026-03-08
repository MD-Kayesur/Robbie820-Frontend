import type { BrokerRow, ReferrerRow } from "./types";

export const brokersMock: BrokerRow[] = [
  {
    name: "John Anderson",
    company: "Prime Mortgage Group",
    plan: "Enterprise",
    seats: 12,
    referrers: 45,
    commissionYTD: "$127,450",
    status: "Active",
  },
  {
    name: "Sarah Mitchell",
    company: "Capital Home Loans",
    plan: "Pro",
    seats: 8,
    referrers: 28,
    commissionYTD: "$89,200",
    status: "Active",
  },
  {
    name: "Michael Chen",
    company: "First Choice Finance",
    plan: "Business",
    seats: 5,
    referrers: 15,
    commissionYTD: "$42,800",
    status: "Active",
  },
  {
    name: "Emma Wilson",
    company: "Horizon Lending",
    plan: "Enterprise",
    seats: 15,
    referrers: 52,
    commissionYTD: "$156,900",
    status: "Active",
  },
  {
    name: "David Thompson",
    company: "Aussie Finance Co",
    plan: "Pro",
    seats: 6,
    referrers: 22,
    commissionYTD: "$68,400",
    status: "Suspended",
  },
];

export const referrersMock: ReferrerRow[] = [
  {
    name: "Alice Cooper",
    linkedBroker: "Prime Mortgage Group",
    totalReferrals: 34,
    totalCommission: "$28,400",
    markedPaid: "$24,100",
    status: "Active",
    lastLogin: "2 hours ago",
  },
  {
    name: "Robert Greene",
    linkedBroker: "Capital Home Loans",
    totalReferrals: 52,
    totalCommission: "$42,800",
    markedPaid: "$39,200",
    status: "Active",
    lastLogin: "1 day ago",
  },
  {
    name: "Jennifer Lee",
    linkedBroker: "First Choice Finance",
    totalReferrals: 28,
    totalCommission: "$19,600",
    markedPaid: "$19,600",
    status: "Active",
    lastLogin: "3 hours ago",
  },
  {
    name: "Mark Stevens",
    linkedBroker: "Horizon Lending",
    totalReferrals: 41,
    totalCommission: "$35,200",
    markedPaid: "$30,400",
    status: "Active",
    lastLogin: "5 days ago",
  },
  {
    name: "Lisa Martinez",
    linkedBroker: "Prime Mortgage Group",
    totalReferrals: 18,
    totalCommission: "$14,200",
    markedPaid: "$12,000",
    status: "Disabled",
    lastLogin: "2 weeks ago",
  },
];

export const pillPlan = (p: BrokerRow["plan"]) =>
  p === "Enterprise"
    ? "bg-violet-50 text-violet-700"
    : p === "Pro"
      ? "bg-sky-50 text-sky-700"
      : "bg-slate-100 text-slate-700";

export const pillStatus = (s: string) =>
  s === "Active"
    ? "bg-emerald-50 text-emerald-700"
    : s === "Suspended"
      ? "bg-rose-600 text-white"
      : "bg-slate-100 text-slate-700";
