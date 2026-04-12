// src/pages/BrokerDashboard/BrokerOverview/mock.ts

import type { Lead, ReferrerOption, TeamMember } from "./types";

export const brokerTeamMembers: TeamMember[] = [
  { id: "tm-1", name: "Alex Thompson", role: "Senior Broker" },
  { id: "tm-2", name: "Sam Rivera", role: "Loan Officer" },
  { id: "tm-3", name: "Casey Morgan", role: "Broker" },
  { id: "tm-4", name: "Jordan Lee", role: "Lead Specialist" },
];

export const referrerOptions: ReferrerOption[] = [
  {
    id: "ref-1",
    name: "Sarah Johnson",
    companyName: "Prime Realty Group",
    agreementType: "Standard Partnership Agreement",
    commissionPercent: 10,
    totalReferrals: 42,
  },
  {
    id: "ref-2",
    name: "Michael Chen",
    companyName: "Metro Finance Partners",
    agreementType: "Revenue Share",
    commissionPercent: 25,
    totalReferrals: 31,
  },
  {
    id: "ref-3",
    name: "Emily Rodriguez",
    companyName: "Elite Property Network",
    agreementType: "Standard Partnership Agreement",
    commissionPercent: 15,
    totalReferrals: 35,
  },
  {
    id: "ref-4",
    name: "David Park",
    companyName: "Urban Lending Partners",
    agreementType: "Flat Referral Fee",
    commissionPercent: 12,
    totalReferrals: 21,
  },
  {
    id: "ref-5",
    name: "Jessica Williams",
    companyName: "Growth Realty Co.",
    agreementType: "Standard Partnership Agreement",
    commissionPercent: 20,
    totalReferrals: 69,
  },
];

export const leadsMock: Lead[] = [
  {
    id: "lead-1001",
    borrowerName: "James Anderson",
    borrowerEmail: "james.anderson@email.com",
    mobileNumber: "+1 (555) 234-5678",
    companyName: "Anderson Enterprises LLC",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "SUBMITTED TO LENDER",
    allocatedTeamMemberId: "tm-1",
    leadCreatedDate: "2026-03-05",

    estimatedLoanAmount: 450000,
    loanType: "Home Loan",
    expectedSettlementDate: "2026-04-15",

    referrerName: "Sarah Johnson",
    partnerCompany: "Prime Realty Group",
    agreementType: "Standard Partnership Agreement",
    referrerCommissionPercent: 10,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-08T10:15:00",

    notes: [
      {
        id: "note-1",
        content: "Borrower is responsive and submitted initial documents.",
        createdAt: "2026-03-08T09:10:00",
        author: "Alex Thompson",
      },
    ],

    milestoneHistory: [
      {
        id: "m-1",
        label: "Referral Created",
        date: "Mar 5, 2026",
        time: "9:30 AM",
        tone: "info",
      },
      {
        id: "m-2",
        label: "Borrower Contacted",
        date: "Mar 6, 2026",
        time: "8:15 PM",
        tone: "info",
      },
      {
        id: "m-3",
        label: "Application Started",
        date: "Mar 6, 2026",
        time: "10:00 AM",
        tone: "warning",
      },
      {
        id: "m-4",
        label: "Submitted to Lender",
        date: "Mar 7, 2026",
        time: "11:45 AM",
        tone: "pending",
      },
      {
        id: "m-5",
        label: "Awaiting Approval",
        date: "Mar 8, 2026",
        time: "9:00 AM",
        tone: "neutral",
      },
    ],

    agreementSplitPercent: 10,
    totalCommission: 4500,
    brokerCommission: 4050,
    referrerFeeExpected: 450,
    expectedReferrerPaymentDate: "2026-04-20",

    paymentStatus: "Payment outstanding to referrer",
    paymentDate: "2026-04-20",
    paymentMadeDate: "",
    paymentNotes:
      "Payment will be processed within 5 business days after settlement.",
  },

  {
    id: "lead-1002",
    borrowerName: "Maria Garcia",
    borrowerEmail: "maria.garcia@email.com",
    mobileNumber: "+1 (555) 102-8891",
    companyName: "Garcia Retail Co.",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "SUBMITTED TO LENDER",
    allocatedTeamMemberId: "tm-2",
    leadCreatedDate: "2026-03-01",

    estimatedLoanAmount: 320000,
    loanType: "Refinance",
    expectedSettlementDate: "2026-04-08",

    referrerName: "Michael Chen",
    partnerCompany: "Metro Finance Partners",
    agreementType: "Revenue Share",
    referrerCommissionPercent: 25,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-08T08:00:00",

    notes: [],
    milestoneHistory: [
      {
        id: "m-21",
        label: "Referral Created",
        date: "Mar 1, 2026",
        time: "8:00 AM",
        tone: "info",
      },
      {
        id: "m-22",
        label: "Submitted to Lender",
        date: "Mar 5, 2026",
        time: "2:20 PM",
        tone: "pending",
      },
    ],

    agreementSplitPercent: 25,
    totalCommission: 3200,
    brokerCommission: 2400,
    referrerFeeExpected: 800,
    expectedReferrerPaymentDate: "2026-04-15",

    paymentStatus: "pending settlement",
    paymentDate: "",
    paymentMadeDate: "",
    paymentNotes: "",
  },

  {
    id: "lead-1003",
    borrowerName: "Robert Taylor",
    borrowerEmail: "robert.taylor@email.com",
    mobileNumber: "+1 (555) 888-1022",
    companyName: "Taylor Holdings",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "APPLICATION STARTED",
    allocatedTeamMemberId: "tm-3",
    leadCreatedDate: "2026-03-03",

    estimatedLoanAmount: 580000,
    loanType: "Commercial Loan",
    expectedSettlementDate: "2026-04-25",

    referrerName: "Emily Rodriguez",
    partnerCompany: "Elite Property Network",
    agreementType: "Standard Partnership Agreement",
    referrerCommissionPercent: 15,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-08T11:10:00",

    notes: [],
    milestoneHistory: [
      {
        id: "m-31",
        label: "Referral Created",
        date: "Mar 3, 2026",
        time: "11:00 AM",
        tone: "info",
      },
      {
        id: "m-32",
        label: "Application Started",
        date: "Mar 4, 2026",
        time: "1:30 PM",
        tone: "warning",
      },
    ],

    agreementSplitPercent: 15,
    totalCommission: 5000,
    brokerCommission: 4250,
    referrerFeeExpected: 750,
    expectedReferrerPaymentDate: "2026-04-28",

    paymentStatus: "pending settlement",
    paymentDate: "",
    paymentMadeDate: "",
    paymentNotes: "",
  },

  {
    id: "lead-1004",
    borrowerName: "Lisa Thompson",
    borrowerEmail: "lisa.thompson@email.com",
    mobileNumber: "+1 (555) 762-8810",
    companyName: "Thompson Ventures",

    refSource: "website",
    timeline: "mtd",

    leadStage: "CONTACTED",
    allocatedTeamMemberId: "tm-4",
    leadCreatedDate: "2026-03-06",

    estimatedLoanAmount: 275000,
    loanType: "Investment Property",
    expectedSettlementDate: "2026-04-18",

    referrerName: "David Park",
    partnerCompany: "Urban Lending Partners",
    agreementType: "Flat Referral Fee",
    referrerCommissionPercent: 12,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-08T07:45:00",

    notes: [],
    milestoneHistory: [
      {
        id: "m-41",
        label: "Referral Created",
        date: "Mar 6, 2026",
        time: "9:20 AM",
        tone: "info",
      },
      {
        id: "m-42",
        label: "Borrower Contacted",
        date: "Mar 6, 2026",
        time: "4:15 PM",
        tone: "info",
      },
    ],

    agreementSplitPercent: 12,
    totalCommission: 2750,
    brokerCommission: 2420,
    referrerFeeExpected: 330,
    expectedReferrerPaymentDate: "2026-04-22",

    paymentStatus: "pending settlement",
    paymentDate: "",
    paymentMadeDate: "",
    paymentNotes: "",
  },

  {
    id: "lead-1005",
    borrowerName: "Kevin Martinez",
    borrowerEmail: "kevin.martinez@email.com",
    mobileNumber: "+1 (555) 982-4411",
    companyName: "Martinez Property Group",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "FUNDED",
    allocatedTeamMemberId: "tm-1",
    leadCreatedDate: "2026-02-25",

    estimatedLoanAmount: 300000,
    loanType: "Construction Loan",
    expectedSettlementDate: "2026-03-30",

    referrerName: "Jessica Williams",
    partnerCompany: "Growth Realty Co.",
    agreementType: "Standard Partnership Agreement",
    referrerCommissionPercent: 20,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-08T12:10:00",

    notes: [
      {
        id: "note-51",
        content: "Funds released successfully. Payment processing next.",
        createdAt: "2026-03-08T12:20:00",
        author: "Alex Thompson",
      },
    ],

    milestoneHistory: [
      {
        id: "m-51",
        label: "Referral Created",
        date: "Feb 25, 2026",
        time: "10:00 AM",
        tone: "info",
      },
      {
        id: "m-52",
        label: "Borrower Contacted",
        date: "Feb 26, 2026",
        time: "3:45 PM",
        tone: "info",
      },
      {
        id: "m-53",
        label: "Application Started",
        date: "Feb 27, 2026",
        time: "11:10 AM",
        tone: "warning",
      },
      {
        id: "m-54",
        label: "Submitted to Lender",
        date: "Mar 1, 2026",
        time: "9:40 AM",
        tone: "pending",
      },
      {
        id: "m-55",
        label: "Approved",
        date: "Mar 4, 2026",
        time: "2:30 PM",
        tone: "success",
      },
      {
        id: "m-56",
        label: "Funded",
        date: "Mar 6, 2026",
        time: "1:00 PM",
        tone: "success",
      },
    ],

    agreementSplitPercent: 20,
    totalCommission: 3000,
    brokerCommission: 2400,
    referrerFeeExpected: 600,
    expectedReferrerPaymentDate: "2026-04-05",

    paymentStatus: "Paid to ref",
    paymentDate: "2026-04-05",
    paymentMadeDate: "2026-04-06",
    paymentNotes: "Scheduled after lender settlement confirmation.",
  },
];
