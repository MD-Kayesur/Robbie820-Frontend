import type {
  AdditionalLoginRole,
  AgreementStatus,
  BankingDetails,
  CommissionAgreement,
  CommissionRule,
  CommissionValueType,
  LoanCategory,
  OnboardPartnerForm,
  PartnerLogin,
  PartnerProfile,
  PartnerActionKey,
  PortalAccessRole,
} from "./types";

export const partnerProfilesMock: PartnerProfile[] = [
  {
    id: "partner-1",
    partnerType: "Company",
    status: "Active",
    partnerName: "ABC Realty Group",
    primaryContactName: "Tom Harris",
    email: "tom.harris@primeestates.com.au",
    phoneNumber: "+61 400 000 001",
    abn: "12 345 678 901",
    businessAddress: "12 George Street, Sydney NSW 2000",
    metrics: {
      totalReferrals: 45,
      activeReferrals: 12,
      loanVolume: 8750000,
      commission: 87500,
      conversionRate: 78,
      avgLoanSize: 450000,
      lastActivity: "2 days ago",
    },
  },
  {
    id: "partner-2",
    partnerType: "Company",
    status: "Active",
    partnerName: "Elite Financial Partners",
    primaryContactName: "Emma Stone",
    email: "emma@elitefinancial.com.au",
    phoneNumber: "+61 400 000 002",
    abn: "98 765 432 101",
    businessAddress: "88 Collins Street, Melbourne VIC 3000",
    metrics: {
      totalReferrals: 62,
      activeReferrals: 18,
      loanVolume: 12400000,
      commission: 124000,
      conversionRate: 82,
      avgLoanSize: 520000,
      lastActivity: "Yesterday",
    },
  },
  {
    id: "partner-3",
    partnerType: "Individual",
    status: "Active",
    partnerName: "Sarah Mitchell",
    primaryContactName: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phoneNumber: "+61 400 000 003",
    metrics: {
      totalReferrals: 28,
      activeReferrals: 8,
      loanVolume: 5200000,
      commission: 52000,
      conversionRate: 71,
      avgLoanSize: 380000,
      lastActivity: "3 days ago",
    },
  },
  {
    id: "partner-4",
    partnerType: "Company",
    status: "Active",
    partnerName: "Premier Mortgage Solutions",
    primaryContactName: "Liam Cooper",
    email: "liam@premiermortgage.com.au",
    phoneNumber: "+61 400 000 004",
    abn: "11 222 333 444",
    businessAddress: "20 Queen Street, Brisbane QLD 4000",
    metrics: {
      totalReferrals: 53,
      activeReferrals: 15,
      loanVolume: 9800000,
      commission: 98000,
      conversionRate: 76,
      avgLoanSize: 485000,
      lastActivity: "Yesterday",
    },
  },
  {
    id: "partner-5",
    partnerType: "Company",
    status: "Active",
    partnerName: "Summit Property Advisors",
    primaryContactName: "Noah Blake",
    email: "noah@summitproperty.com.au",
    phoneNumber: "+61 400 000 005",
    abn: "55 666 777 888",
    businessAddress: "45 King William Street, Adelaide SA 5000",
    metrics: {
      totalReferrals: 38,
      activeReferrals: 9,
      loanVolume: 7100000,
      commission: 71000,
      conversionRate: 74,
      avgLoanSize: 425000,
      lastActivity: "4 days ago",
    },
  },
  {
    id: "partner-6",
    partnerType: "Individual",
    status: "Inactive",
    partnerName: "Michael Chen",
    primaryContactName: "Michael Chen",
    email: "michael.chen@email.com",
    phoneNumber: "+61 400 000 006",
    metrics: {
      totalReferrals: 15,
      activeReferrals: 0,
      loanVolume: 2800000,
      commission: 28000,
      conversionRate: 65,
      avgLoanSize: 350000,
      lastActivity: "Feb 10, 2026",
    },
  },
];

export const partnerLoginsMock: PartnerLogin[] = [
  {
    id: "login-1",
    partnerId: "partner-1",
    fullName: "Tom Harris",
    email: "tom.harris@primeestates.com.au",
    role: "Admin",
    isPrimary: true,
  },
  {
    id: "login-2",
    partnerId: "partner-1",
    fullName: "Sarah Connor",
    email: "sarah@primeestates.com.au",
    role: "Member",
  },
  {
    id: "login-3",
    partnerId: "partner-2",
    fullName: "Emma Stone",
    email: "emma@elitefinancial.com.au",
    role: "Admin",
    isPrimary: true,
  },
  {
    id: "login-4",
    partnerId: "partner-3",
    fullName: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    role: "Admin",
    isPrimary: true,
  },
];

export const commissionAgreementsMock: CommissionAgreement[] = [
  {
    id: "agreement-1",
    partnerId: "partner-1",
    agreementName: "Standard Referral Agreement 2026",
    effectiveStartDate: "2025-02-05",
    status: "Active",
    referrerCommissionPercent: 1.0,
  },
  {
    id: "agreement-2",
    partnerId: "partner-2",
    agreementName: "Elite Referral Agreement 2026",
    effectiveStartDate: "2025-03-12",
    status: "Active",
    referrerCommissionPercent: 1.0,
  },
  {
    id: "agreement-3",
    partnerId: "partner-3",
    agreementName: "Individual Referral Agreement 2026",
    effectiveStartDate: "2025-01-20",
    status: "Active",
    referrerCommissionPercent: 0.9,
  },
  {
    id: "agreement-4",
    partnerId: "partner-6",
    agreementName: "Legacy Referral Agreement",
    effectiveStartDate: "2024-11-10",
    status: "Inactive",
    referrerCommissionPercent: 0.8,
  },
];

export const bankingDetailsMock: BankingDetails[] = [
  {
    id: "bank-1",
    partnerId: "partner-1",
    bankName: "AB Bank",
    bsb: "333222",
    accountNumber: "987654321",
    accountHolder: "Shamim Sorder",
  },
  {
    id: "bank-2",
    partnerId: "partner-2",
    bankName: "Commonwealth Bank",
    bsb: "062000",
    accountNumber: "123456789",
    accountHolder: "Elite Financial Partners Pty Ltd",
  },
  {
    id: "bank-3",
    partnerId: "partner-3",
    bankName: "Westpac",
    bsb: "032456",
    accountNumber: "456789123",
    accountHolder: "Sarah Mitchell",
  },
];

export const commissionRulesMock: CommissionRule[] = [
  {
    id: "rule-1",
    partnerId: "partner-1",
    loanCategory: "Residential",
    valueType: "Percentage",
    value: 1,
    isDefault: true,
  },
  {
    id: "rule-2",
    partnerId: "partner-1",
    loanCategory: "Commercial",
    valueType: "Percentage",
    value: 1.2,
  },
  {
    id: "rule-3",
    partnerId: "partner-1",
    loanCategory: "Asset Finance",
    valueType: "Fixed Amount",
    value: 1500,
  },
  {
    id: "rule-4",
    partnerId: "partner-1",
    loanCategory: "Personal Loan",
    valueType: "Fixed Amount",
    value: 800,
  },
  {
    id: "rule-5",
    partnerId: "partner-2",
    loanCategory: "Residential",
    valueType: "Percentage",
    value: 1,
    isDefault: true,
  },
  {
    id: "rule-6",
    partnerId: "partner-3",
    loanCategory: "Residential",
    valueType: "Percentage",
    value: 0.9,
    isDefault: true,
  },
];

export const defaultOnboardPartnerForm: OnboardPartnerForm = {
  partnerType: "Company",
  partnerName: "",
  primaryContactName: "",
  email: "",
  phoneNumber: "",
  abn: "",
  businessAddress: "",

  loginEmail: "",
  sendInvitationEmail: true,
  portalAccessRole: "Partner Admin",

  agreementName: "",
  effectiveStartDate: "",
  agreementStatus: "Active",
  referrerCommissionPercent: 1.0,

  bankName: "",
  bsb: "",
  accountNumber: "",
  accountHolder: "",

  confirmAgreement: false,
};

export const additionalLoginDefaultForm = {
  fullName: "",
  email: "",
  role: "Member" as AdditionalLoginRole,
};

export const resetPasswordDefaultForm = {
  loginEmail: "",
};

export const sendInvitationDefaultForm = {
  loginEmail: "",
};

export const partnerActionOptions: {
  key: PartnerActionKey;
  label: string;
  danger?: boolean;
}[] = [
    { key: "view-profile", label: "View Profile" },
    { key: "edit-partner", label: "Edit Partner" },
    { key: "deactivate-partner", label: "Deactivate Partner", danger: true },
  ];

export const additionalLoginRoleOptions: AdditionalLoginRole[] = [
  "Admin",
  "Member",
];

export const portalAccessRoleOptions: PortalAccessRole[] = [
  "Partner Admin",
  "Partner Staff",
];

export const agreementStatusOptions: AgreementStatus[] = [
  "Draft",
  "Active",
  "Inactive",
];

export const loanCategoryOptions: LoanCategory[] = [
  "Residential",
  "Commercial",
  "Asset Finance",
  "Personal Loan",
];

export const commissionValueTypeOptions: CommissionValueType[] = [
  "Percentage",
  "Fixed Amount",
];

export const partnerTypeOptions = ["Company", "Individual"] as const;

export const partnerProfileStepLabels = [
  "Partner Profile",
  "Account Setup",
  "Commission Agreement",
  "Banking Details",
  "Review & Activate",
] as const;

import type {
  InternalPartnerNote,
  PartnerConfiguration,
  PartnerRecentReferral,
} from "./types";

export const internalPartnerNotesMock: InternalPartnerNote[] = [
  {
    partnerId: "partner-1",
    note: "Strong relationship with the director team. Prefers quick turnaround and direct updates on complex residential deals. Best to follow up mid-week. Interested in premium partner incentives for high-volume months.",
  },
  {
    partnerId: "partner-2",
    note: "High-performing finance partner with strong commercial pipeline.",
  },
  {
    partnerId: "partner-3",
    note: "Independent referrer. Prefers email communication over calls.",
  },
];

export const partnerRecentReferralsMock: PartnerRecentReferral[] = [
  {
    id: "ref-1",
    partnerId: "partner-1",
    clientName: "Michael Chen",
    status: "In Progress",
    loanAmount: 750000,
    commissionGenerated: 3750,
    referralFeeStatus: "Paid",
    dateSubmitted: "Feb 15, 2026",
  },
  {
    id: "ref-2",
    partnerId: "partner-1",
    clientName: "Emma Thompson",
    status: "Approved",
    loanAmount: 620000,
    commissionGenerated: 2600,
    referralFeeStatus: "Pending",
    dateSubmitted: "Feb 15, 2026",
  },
  {
    id: "ref-3",
    partnerId: "partner-1",
    clientName: "David Park",
    status: "Under Review",
    loanAmount: 890000,
    commissionGenerated: 4450,
    referralFeeStatus: "Paid",
    dateSubmitted: "Feb 15, 2026",
  },
  {
    id: "ref-4",
    partnerId: "partner-1",
    clientName: "Sophie Martinez",
    status: "Completed",
    loanAmount: 435000,
    commissionGenerated: 2875,
    referralFeeStatus: "Paid",
    dateSubmitted: "Feb 15, 2026",
  },
  {
    id: "ref-5",
    partnerId: "partner-1",
    clientName: "James Wilson",
    status: "In Progress",
    loanAmount: 680000,
    commissionGenerated: 3400,
    referralFeeStatus: "Not Paid",
    dateSubmitted: "Feb 15, 2026",
  },
  {
    id: "ref-6",
    partnerId: "partner-2",
    clientName: "Olivia Brown",
    status: "Approved",
    loanAmount: 980000,
    commissionGenerated: 4900,
    referralFeeStatus: "Paid",
    dateSubmitted: "Feb 14, 2026",
  },
];

export const partnerConfigurationsMock: PartnerConfiguration[] = [
  {
    partnerId: "partner-1",
    effectiveDate: "2024-03-15",
    linkedAgreements: ["Standard Referral Agreement", "Premium Partner Terms"],
    automaticSettlement: true,
    agreementReviewFrequency: "Quarterly",
    linkedPortfolioActiveReferrals: 42,
    loginEmail: "tom.harris@primeestates.com.au",
    accountStatus: "Active",
    lastLogin: "Feb 15, 2026 at 2:34 PM",
  },
  {
    partnerId: "partner-2",
    effectiveDate: "2024-04-01",
    linkedAgreements: ["Elite Referral Agreement 2026"],
    automaticSettlement: false,
    agreementReviewFrequency: "Monthly",
    linkedPortfolioActiveReferrals: 18,
    loginEmail: "emma@elitefinancial.com.au",
    accountStatus: "Active",
    lastLogin: "Feb 14, 2026 at 9:10 AM",
  },
];
