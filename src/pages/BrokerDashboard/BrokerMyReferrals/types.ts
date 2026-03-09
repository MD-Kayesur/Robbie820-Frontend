export type PipelineStage =
  | "New Referral"
  | "Contacted"
  | "Application Started"
  | "Submitted to Lender"
  | "Approved"
  | "Funded"
  | "Closed / Not Proceeding";

export type CommissionStatus = "Pending" | "Approved" | "Paid" | "Scheduled";

export type ReferralRow = {
  id: number;
  borrowerName: string;
  referrer: string;
  loanAmount: number;
  pipelineStage: PipelineStage;
  expectedCommission: number;
  commissionStatus: CommissionStatus;
  dateSubmitted: string;
  assignedTeamMember: string;
  settlementDate: string;
};

export const stageOptions = [
  "Stage",
  "New Referral",
  "Contacted",
  "Application Started",
  "Submitted to Lender",
  "Approved",
  "Funded",
  "Closed / Not Proceeding",
] as const;

export const referrerFilterOptions = [
  "Referrer",
  "ABC Realty Group",
  "Elite Financial Partners",
  "Premier Mortgage Solutions",
  "Summit Property Advisors",
] as const;

export const teamMemberOptions = [
  "Team Members",
  "John Broker",
  "Sarah Smith",
  "Mike Johnson",
] as const;
