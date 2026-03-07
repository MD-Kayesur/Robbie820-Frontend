// src/pages/ReferrerDashboard/ReferrerClientDetails/mock.ts

import type { ClientDetailsData } from "./types";

export const clientDetailsMock: ClientDetailsData = {
  clientName: "Sarah Jenkins",
  companyName: "TECHFLOW SOLUTIONS",
  avatarText: "S",
  badgeText: "LOAN SETTLED",
  expectedReferralFee: "$1,250",
  progressTimeline: [
    {
      id: "submitted",
      title: "REFERRAL SUBMITTED",
      date: "2024-03-10",
      tone: "blue",
      icon: "file",
    },
    {
      id: "lodged",
      title: "LOAN LODGED",
      date: "2024-04-05",
      tone: "blue",
      icon: "clock",
    },
    {
      id: "settled",
      title: "LOAN SETTLED",
      date: "2024-05-12",
      tone: "blue",
      icon: "check",
    },
    {
      id: "fee-paid",
      title: "REFERRAL FEE PAID",
      date: "2024-03-10",
      tone: "beige",
      icon: "dollar",
    },
  ],
  clientInformation: [
    {
      id: "email",
      label: "EMAIL ADDRESS",
      value: "sarah@techflow.io",
      icon: "mail",
    },
    {
      id: "phone",
      label: "PHONE NUMBER",
      value: "+61 412 345 678",
      icon: "phone",
    },
    {
      id: "date",
      label: "DATE REFERRED",
      value: "2024-03-10",
      icon: "calendar",
    },
  ],
  statusHistory: [
    {
      id: "sent",
      title: "Referral Sent",
      description: "Status updated by broker system",
      date: "2024-03-10",
    },
    {
      id: "lodged",
      title: "Loan Lodged",
      description: "Status updated by broker system",
      date: "2024-05-01",
    },
    {
      id: "settled",
      title: "Loan Settled",
      description: "Status updated by broker system",
      date: "2024-05-15",
    },
  ],
  brokerProgressNotes:
    "Client has provided all necessary documentation. Settlement confirmed for May 12.",
  lastUpdated: "2024-05-12",
};
