import type { RoleCardItem, RoleOption, TeamMember } from "./types";

export const initialMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "John Hans",
    email: "john@company.com",
    role: "Master Broker",
    seatType: "Primary Seat",
    status: "Active",
    lastActive: "Today",
  },
  {
    id: "tm-2",
    name: "Sarah Lee",
    email: "sarah@company.com",
    role: "Broker",
    seatType: "Paid Seat",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "tm-3",
    name: "David Chen",
    email: "david@company.com",
    role: "Admin Support",
    seatType: "Included Seat",
    status: "Inactive",
    lastActive: "3 days ago",
  },
];

export const totalSeats = 5;
export const monthlyPlanCost = 149;
export const paidSeatExtraCost = 20;

export const roleCards: RoleCardItem[] = [
  {
    role: "Master Broker",
    title: "Master Broker (Subscriber)",
    description:
      "Full visibility across all referrals and settings. Can manage users, partners, and system configuration.",
    badge: "Full Access",
    badgeClassName: "bg-[#E9F1FF] text-[#4D7CFE]",
  },
  {
    role: "Broker",
    title: "Broker",
    description:
      "Manages their own leads and referrals only. No access to company-wide settings.",
    badge: "Paid Seat Required",
    badgeClassName: "bg-[#FFF1E7] text-[#F07B49]",
  },
  {
    role: "Admin Support",
    title: "Admin Support",
    description:
      "Operational support role. Can assist with updates, notes, and admin tasks.",
    badge: "Included Seat",
    badgeClassName: "bg-[#EAFBF0] text-[#2E9A4D]",
  },
];

export const roleOptions: RoleOption[] = [
  {
    value: "Master Broker",
    label: "Master Broker (Subscriber)",
    description: "Full access and settings control.",
  },
  {
    value: "Broker",
    label: "Broker",
    description: "Can manage only their own referrals.",
    warning: "This role requires a paid subscription seat.",
  },
  {
    value: "Admin Support",
    label: "Admin Support",
    description: "Operational support role.",
  },
];
