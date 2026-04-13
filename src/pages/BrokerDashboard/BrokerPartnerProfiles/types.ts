export type PartnerType = "Company" | "Individual";
export type PartnerStatus = "Active" | "Inactive";
export type ViewMode = "grid" | "table";

export type PortalAccessRole = "Partner Admin" | "Partner Staff";
export type AdditionalLoginRole = "Admin" | "Member";

export type AgreementStatus = "Draft" | "Active" | "Inactive";

export type LoanCategory =
  | "Residential"
  | "Commercial"
  | "Asset Finance"
  | "Personal Loan";

export type CommissionValueType = "Percentage" | "Fixed Amount";

export type PartnerMetric = {
  totalReferrals: number;
  activeReferrals: number;
  loanVolume: number;
  commission: number;
  conversionRate: number;
  avgLoanSize: number;
  lastActivity: string;
};

export type PartnerProfile = {
  id: string;
  partnerType: PartnerType;
  status: PartnerStatus;

  partnerName: string;
  primaryContactName: string;
  email: string;
  phoneNumber: string;
  abn?: string;
  businessAddress?: string;

  metrics: PartnerMetric;
};

export type PartnerLogin = {
  id: string;
  partnerId: string;
  fullName: string;
  email: string;
  role: AdditionalLoginRole;
  isPrimary?: boolean;
};

export type CommissionAgreement = {
  id: string;
  partnerId: string;
  agreementName: string;
  effectiveStartDate: string;
  status: AgreementStatus;
  referrerCommissionPercent: number;
};

export type BankingDetails = {
  id: string;
  partnerId: string;
  bankName: string;
  bsb: string;
  accountNumber: string;
  accountHolder: string;
};

export type CommissionRule = {
  id: string;
  partnerId: string;
  loanCategory: LoanCategory;
  valueType: CommissionValueType;
  value: number;
  conditions?: CommissionRuleCondition;
  isDefault?: boolean;
};

export type OnboardPartnerForm = {
  partnerType: PartnerType;
  partnerName: string;
  primaryContactName: string;
  email: string;
  phoneNumber: string;
  abn: string;
  businessAddress: string;

  loginEmail: string;
  sendInvitationEmail: boolean;
  portalAccessRole: PortalAccessRole;

  agreementName: string;
  effectiveStartDate: string;
  agreementStatus: AgreementStatus;
  referrerCommissionPercent: number | "";

  bankName: string;
  bsb: string;
  accountNumber: string;
  accountHolder: string;

  confirmAgreement: boolean;
};

export type PartnerActionKey =
  | "view-profile"
  | "edit-partner"
  | "deactivate-partner"
  | "reset-password"
  | "send-invitation"
  | "add-login";

export type CommissionRuleActionKey = "edit-rule" | "delete-rule";

export type ReferralStatus =
  | "In Progress"
  | "Approved"
  | "Under Review"
  | "Completed";

export type ReferralFeeStatus = "Paid" | "Pending" | "Not Paid";

export type PartnerRecentReferral = {
  id: string;
  partnerId: string;
  clientName: string;
  status: ReferralStatus;
  loanAmount: number;
  commissionGenerated: number;
  referralFeeStatus: ReferralFeeStatus;
  dateSubmitted: string;
};

export type PartnerConfiguration = {
  partnerId: string;
  effectiveDate: string;
  linkedAgreements: string[];
  automaticSettlement: boolean;
  agreementReviewFrequency: "Monthly" | "Quarterly" | "Half-Yearly" | "Yearly";
  linkedPortfolioActiveReferrals: number;
  loginEmail: string;
  accountStatus: "Active" | "Inactive";
  lastLogin: string;
};

export type CommissionRuleCondition =
  | "Standard"
  | "Min $1M loan"
  | "Per deal"
  | "Custom";

export type InternalPartnerNote = {
  partnerId: string;
  note: string;
};
