import type { Lead, TeamMember } from "./types";

export const brokerTeamMembers: TeamMember[] = [
  { id: "tm-1", name: "Marcus Broker", role: "Broker" },
  { id: "tm-2", name: "Sarah Team", role: "Team Member" },
  { id: "tm-3", name: "John Staff", role: "Staff" },
];

export const leadsMock: Lead[] = [
  {
    id: "lead-1001",
    borrowerName: "Emily Roberts",
    borrowerEmail: "emily.roberts@example.com",
    mobileNumber: "+61 412 345 678",
    companyName: "Digital Ventures",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "CONTACTED",
    allocatedTeamMemberId: "tm-1",
    leadCreatedDate: "2026-02-15",

    estimatedLoanAmount: 750000,
    interestRate: 5.5,
    expectedSettlementDate: "2026-02-29",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-02-25T12:00:00",

    notes: [
      {
        id: "note-1",
        content: "Borrower asked for a quick turnaround on pre-approval.",
        createdAt: "2026-02-15T10:45:00",
        author: "Marcus Broker",
      },
    ],

    milestoneHistory: [
      { id: "m-1", label: "Lead Created", date: "February 10, 2026 10:30 AM" },
      {
        id: "m-2",
        label: "Submitted to Lender",
        date: "February 12, 2026 2:15 PM",
      },
      { id: "m-3", label: "Under Review", date: "February 14, 2026 11:40 AM" },
      { id: "m-4", label: "Approved", date: "February 18, 2026 3:20 PM" },
      {
        id: "m-5",
        label: "Settlement Completed",
        date: "February 25, 2026 12:00 PM",
      },
    ],

    agreementSplitPercent: 40,
    netCommission: 8500,
    referrerFeeExpected: 3400,
    expectedReferrerPaymentDate: "2026-02-29",
  },

  {
    id: "lead-1002",
    borrowerName: "Alice Henderson",
    borrowerEmail: "alice@example.com",
    mobileNumber: "+61 400 111 222",
    companyName: "Prime Estates",

    refSource: "prime estates",
    timeline: "mtd",

    leadStage: "APPROVED",
    allocatedTeamMemberId: "tm-1",
    leadCreatedDate: "2026-02-20",

    estimatedLoanAmount: 450000,
    interestRate: 4.25,
    expectedSettlementDate: "2026-03-15",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-02-26T09:15:00",

    notes: [],
    milestoneHistory: [
      { id: "m-21", label: "Lead Created", date: "February 20, 2026 9:00 AM" },
      { id: "m-22", label: "Approved", date: "February 24, 2026 1:20 PM" },
    ],

    agreementSplitPercent: 40,
    netCommission: 14062.5,
    referrerFeeExpected: 5625,
    expectedReferrerPaymentDate: "2026-03-31",
  },

  {
    id: "lead-1003",
    borrowerName: "Diana Prince",
    borrowerEmail: "diana@example.com",
    mobileNumber: "+61 433 221 111",
    companyName: "Zapier Hook",

    refSource: "zapier hook",
    timeline: "fytd",

    leadStage: "FUNDED",
    allocatedTeamMemberId: "tm-2",
    leadCreatedDate: "2026-01-11",

    estimatedLoanAmount: 450000,
    interestRate: 4.1,
    expectedSettlementDate: "2026-02-21",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-02-21T16:00:00",

    notes: [
      {
        id: "note-31",
        content: "Funds released successfully.",
        createdAt: "2026-02-21T16:30:00",
        author: "Sarah Team",
      },
    ],
    milestoneHistory: [
      { id: "m-31", label: "Lead Created", date: "January 11, 2026 10:10 AM" },
      { id: "m-32", label: "Funded", date: "February 21, 2026 4:00 PM" },
    ],

    agreementSplitPercent: 40,
    netCommission: 23437.5,
    referrerFeeExpected: 9375,
    expectedReferrerPaymentDate: "2026-03-31",
  },

  {
    id: "lead-1004",
    borrowerName: "Michael Turner",
    borrowerEmail: "michael.turner@example.com",
    mobileNumber: "+61 422 555 991",
    companyName: "Turner Holdings",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "APPLICATION IN PROGRESS",
    allocatedTeamMemberId: "tm-2",
    leadCreatedDate: "2026-02-18",

    estimatedLoanAmount: 620000,
    interestRate: 5.1,
    expectedSettlementDate: "2026-03-20",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-02-26T10:00:00",

    notes: [],
    milestoneHistory: [
      { id: "m-41", label: "Lead Created", date: "February 18, 2026 11:00 AM" },
      {
        id: "m-42",
        label: "Application In Progress",
        date: "February 19, 2026 2:45 PM",
      },
    ],

    agreementSplitPercent: 40,
    netCommission: 12400,
    referrerFeeExpected: 4960,
    expectedReferrerPaymentDate: "2026-03-30",
  },

  {
    id: "lead-1005",
    borrowerName: "Oliver Bennett",
    borrowerEmail: "oliver.bennett@example.com",
    mobileNumber: "+61 455 200 998",
    companyName: "Bennett Logistics",

    refSource: "website",
    timeline: "mtd",

    leadStage: "UNDER REVIEW",
    allocatedTeamMemberId: "tm-3",
    leadCreatedDate: "2026-02-22",

    estimatedLoanAmount: 880000,
    interestRate: 4.9,
    expectedSettlementDate: "2026-04-02",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-02-27T09:30:00",

    notes: [],
    milestoneHistory: [
      { id: "m-51", label: "Lead Created", date: "February 22, 2026 9:10 AM" },
      {
        id: "m-52",
        label: "Under Review",
        date: "February 25, 2026 3:30 PM",
      },
    ],

    agreementSplitPercent: 40,
    netCommission: 17600,
    referrerFeeExpected: 7040,
    expectedReferrerPaymentDate: "2026-04-10",
  },

  {
    id: "lead-1006",
    borrowerName: "Sophia Martinez",
    borrowerEmail: "sophia.martinez@example.com",
    mobileNumber: "+61 433 778 321",
    companyName: "Martinez Retail Group",

    refSource: "partner referral",
    timeline: "fytd",

    leadStage: "SUBMITTED TO LENDER",
    allocatedTeamMemberId: "tm-1",
    leadCreatedDate: "2026-01-29",

    estimatedLoanAmount: 510000,
    interestRate: 4.6,
    expectedSettlementDate: "2026-03-18",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-02-24T15:45:00",

    notes: [],
    milestoneHistory: [
      { id: "m-61", label: "Lead Created", date: "January 29, 2026 10:20 AM" },
      {
        id: "m-62",
        label: "Submitted to Lender",
        date: "February 02, 2026 12:30 PM",
      },
    ],

    agreementSplitPercent: 40,
    netCommission: 10200,
    referrerFeeExpected: 4080,
    expectedReferrerPaymentDate: "2026-03-31",
  },

  {
    id: "lead-1007",
    borrowerName: "Daniel Carter",
    borrowerEmail: "daniel.carter@example.com",
    mobileNumber: "+61 477 654 123",
    companyName: "Carter Constructions",

    refSource: "prime estates",
    timeline: "fytd",

    leadStage: "NEW LEAD",
    allocatedTeamMemberId: "tm-3",
    leadCreatedDate: "2026-03-01",

    estimatedLoanAmount: 390000,
    interestRate: 5.3,
    expectedSettlementDate: "2026-04-25",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-01T10:05:00",

    notes: [],
    milestoneHistory: [
      { id: "m-71", label: "Lead Created", date: "March 01, 2026 10:05 AM" },
    ],

    agreementSplitPercent: 40,
    netCommission: 7800,
    referrerFeeExpected: 3120,
    expectedReferrerPaymentDate: "2026-04-30",
  },

  {
    id: "lead-1008",
    borrowerName: "Nathan Collins",
    borrowerEmail: "nathan.collins@example.com",
    mobileNumber: "+61 421 987 654",
    companyName: "Collins Property Group",

    refSource: "partner referral",
    timeline: "mtd",

    leadStage: "CONTACTED",
    allocatedTeamMemberId: "tm-2",
    leadCreatedDate: "2026-03-02",

    estimatedLoanAmount: 520000,
    interestRate: 4.75,
    expectedSettlementDate: "2026-04-10",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-02T14:20:00",

    notes: [],
    milestoneHistory: [
      { id: "m-81", label: "Lead Created", date: "March 02, 2026 11:10 AM" },
      { id: "m-82", label: "Contacted", date: "March 02, 2026 2:20 PM" },
    ],

    agreementSplitPercent: 40,
    netCommission: 10400,
    referrerFeeExpected: 4160,
    expectedReferrerPaymentDate: "2026-04-30",
  },

  {
    id: "lead-1009",
    borrowerName: "Isabella Wright",
    borrowerEmail: "isabella.wright@example.com",
    mobileNumber: "+61 434 210 998",
    companyName: "Wright Investments",

    refSource: "website",
    timeline: "mtd",

    leadStage: "NEW LEAD",
    allocatedTeamMemberId: "tm-1",
    leadCreatedDate: "2026-03-04",

    estimatedLoanAmount: 610000,
    interestRate: 5.2,
    expectedSettlementDate: "2026-04-22",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-04T10:15:00",

    notes: [],
    milestoneHistory: [
      { id: "m-91", label: "Lead Created", date: "March 04, 2026 10:15 AM" },
    ],

    agreementSplitPercent: 40,
    netCommission: 12200,
    referrerFeeExpected: 4880,
    expectedReferrerPaymentDate: "2026-04-30",
  },

  {
    id: "lead-1010",
    borrowerName: "Lucas Anderson",
    borrowerEmail: "lucas.anderson@example.com",
    mobileNumber: "+61 488 345 112",
    companyName: "Anderson Tech Pty Ltd",

    refSource: "zapier hook",
    timeline: "mtd",

    leadStage: "UNDER REVIEW",
    allocatedTeamMemberId: "tm-3",
    leadCreatedDate: "2026-03-06",

    estimatedLoanAmount: 720000,
    interestRate: 4.55,
    expectedSettlementDate: "2026-04-18",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-06T13:00:00",

    notes: [
      {
        id: "note-101",
        content: "Lender requested additional financial documents.",
        createdAt: "2026-03-06T14:15:00",
        author: "Marcus Broker",
      },
    ],

    milestoneHistory: [
      { id: "m-101", label: "Lead Created", date: "March 06, 2026 9:20 AM" },
      { id: "m-102", label: "Under Review", date: "March 06, 2026 1:00 PM" },
    ],

    agreementSplitPercent: 40,
    netCommission: 14400,
    referrerFeeExpected: 5760,
    expectedReferrerPaymentDate: "2026-04-30",
  },

  {
    id: "lead-1011",
    borrowerName: "Chloe Mitchell",
    borrowerEmail: "chloe.mitchell@example.com",
    mobileNumber: "+61 477 800 654",
    companyName: "Mitchell Hospitality",

    refSource: "prime estates",
    timeline: "mtd",

    leadStage: "APPLICATION IN PROGRESS",
    allocatedTeamMemberId: "tm-2",
    leadCreatedDate: "2026-03-07",

    estimatedLoanAmount: 830000,
    interestRate: 4.35,
    expectedSettlementDate: "2026-04-25",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: 50,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: "2026-03-07T11:30:00",

    notes: [],
    milestoneHistory: [
      { id: "m-111", label: "Lead Created", date: "March 07, 2026 8:50 AM" },
      {
        id: "m-112",
        label: "Application In Progress",
        date: "March 07, 2026 11:30 AM",
      },
    ],

    agreementSplitPercent: 40,
    netCommission: 16600,
    referrerFeeExpected: 6640,
    expectedReferrerPaymentDate: "2026-04-30",
  },
];
