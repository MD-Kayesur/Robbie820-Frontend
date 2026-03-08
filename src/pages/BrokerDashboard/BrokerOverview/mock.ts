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
];
