export type RangeKey = "monthly" | "mtd" | "fytd";

export type LeadStatus =
  | "NEW LEAD"
  | "CONTACTED"
  | "APPLICATION IN PROGRESS"
  | "SUBMITTED TO LENDER"
  | "UNDER REVIEW"
  | "APPROVED"
  | "AWAITING REFERRAL FEE"
  | "FUNDED"
  | "SETTLEMENT COMPLETED";

export type CRMStatus = "Operational" | "Syncing" | "Disconnected";

export type AgreementType =
  | "Standard Commission Split"
  | "Custom Split"
  | "Flat Referral Fee";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

export type LeadNote = {
  id: string;
  content: string;
  createdAt: string;
  author: string;
};

export type MilestoneItem = {
  id: string;
  label: string;
  date: string;
};

export type Lead = {
  id: string;

  borrowerName: string;
  borrowerEmail: string;
  mobileNumber: string;
  companyName: string;

  refSource: string;
  timeline: RangeKey;

  leadStage: LeadStatus;
  allocatedTeamMemberId: string;
  leadCreatedDate: string;

  estimatedLoanAmount: number;
  interestRate: number;
  expectedSettlementDate: string;

  referrerName: string;
  partnerCompany: string;
  agreementType: AgreementType;
  referrerCommissionPercent: number;

  crmConnectedSystem: string;
  crmStatus: CRMStatus;
  crmAutoSync: boolean;
  lastSyncAt: string;

  notes: LeadNote[];
  milestoneHistory: MilestoneItem[];

  agreementSplitPercent: number;
  netCommission: number;
  referrerFeeExpected: number;
  expectedReferrerPaymentDate: string;
};

export type LeadTableRow = {
  id: string;
  name: string;
  ref: string;
  amount: number;
  date: string;
  status: LeadStatus;
  rate: number;
  commission: number;
  timeline: RangeKey;
};

export type CreateLeadStage =
  | "New Lead"
  | "Contacted"
  | "Application in Progress"
  | "Submitted to Lender"
  | "Settled";

export type CreateLeadForm = {
  fullName: string;
  email: string;
  mobile: string;
  companyName: string;
  estimatedLoanAmount: string;
  leadStage: CreateLeadStage;
  assignTo: string;
};
