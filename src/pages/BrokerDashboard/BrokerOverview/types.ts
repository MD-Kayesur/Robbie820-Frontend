// src/pages/BrokerDashboard/BrokerOverview/types.ts

export type RangeKey = "monthly" | "mtd" | "fytd";

export type LeadStatus =
  | "NEW REFERRAL"
  | "CONTACTED"
  | "APPLICATION STARTED"
  | "SUBMITTED TO LENDER"
  | "APPROVED"
  | "FUNDED"
  | "DISQUALIFIED";

export type CRMStatus = "Operational" | "Syncing" | "Disconnected";

export type AgreementType =
  | "Standard Partnership Agreement"
  | "Revenue Share"
  | "Flat Referral Fee";

export type LoanType =
  | "Home Loan"
  | "Refinance"
  | "Commercial Loan"
  | "Investment Property"
  | "Construction Loan"
  | "Personal Loan"
  | "Asset Finance";

export type PaymentStatus =
  | "Paid to ref"
  | "pending settlement"
  | "Payment outstanding to referrer";

export type TeamMember = {
  id: string;
  name: string;
  role: string;
};

export type ReferrerOption = {
  id: string;
  name: string;
  companyName: string;
  agreementType: AgreementType;
  commissionPercent: number;
  totalReferrals: number;
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
  time?: string;
  tone?: "neutral" | "info" | "warning" | "success" | "pending";
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
  loanType: LoanType;
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
  totalCommission: number;
  brokerCommission: number;
  referrerFeeExpected: number;
  expectedReferrerPaymentDate: string;

  paymentStatus: PaymentStatus;
  paymentDate: string;
  paymentMadeDate: string;
  paymentNotes: string;
};

export type LeadTableRow = {
  id: string;
  name: string;
  ref: string;
  amount: number;
  date: string;
  status: LeadStatus;
  commission: number;
  timeline: RangeKey;
  paymentStatus: PaymentStatus;
};

export type CreateLeadStage =
  | "New Referral"
  | "Contacted"
  | "Application Started"
  | "Submitted to Lender"
  | "Disqualified";

export type CreateLeadForm = {
  fullName: string;
  email: string;
  mobile: string;
  companyName: string;

  referrerId: string;
  agreementType: AgreementType | "";
  referrerCommissionPercent: string;

  estimatedLoanAmount: string;
  loanType: LoanType | "";
  expectedSettlementDate: string;

  leadStage: CreateLeadStage;
  assignTo: string;
};

export type EditLeadForm = {
  fullName: string;
  email: string;
  mobile: string;
  companyName: string;

  estimatedLoanAmount: string;
  expectedSettlementDate: string;

  leadStage: LeadStatus;
  paymentStatus: PaymentStatus;
  paymentDate: string;
  paymentMadeDate: string;
  paymentNotes: string;
};
