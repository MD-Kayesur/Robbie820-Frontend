// src/pages/ReferrerDashboard/ReferrerSettings/mock.ts
import type {
  AlertPrefs,
  AlertStage,
  BankingForm,
  LegalDocument,
  ProfileForm,
  TeamMember,
} from "./types";

export const tabsMock = [
  "My Profile",
  "Team Management",
  "Alerts",
  "Legal Documents",
  "Banking Details",
] as const;

/* ----------------------------- My Profile ----------------------------- */
export const profileMock: ProfileForm = {
  fullName: "Cameron Williamson",
  email: "debra.holt@example.com",
  businessName: "TECHFLOW SOLUTIONS",
  verificationStatus: "Identity Verified",
  accountStatus: "Active",
  mobileNumber: "+61400000000",
  gstRegistered: true,
  abnNumber: "××××××××××××××××××",
};

/* --------------------------- Team Management --------------------------- */
export const teamMock: TeamMember[] = [
  {
    id: "t1",
    name: "Alex Partner",
    email: "alex@partnerportal.com",
    role: "Agreement Holder",
    permission: "Admin",
    referrals: 24,
    joined: "2024-03-10",
  },
  {
    id: "t2",
    name: "Sarah Team",
    email: "sarah@partnerportal.com",
    role: "Staff Member",
    permission: "Member",
    referrals: 12,
    joined: "2024-03-10",
  },
  {
    id: "t3",
    name: "John Staff",
    email: "john@partnerportal.com",
    role: "Staff Member",
    permission: "Member",
    referrals: 5,
    joined: "2024-03-10",
  },
];

/* -------------------------------- Alerts ------------------------------- */
export const alertPrefsMock: AlertPrefs = {
  emailNotifications: true,
  smsNotifications: true,
};

export const alertStagesMock: AlertStage[] = [
  { id: "s1", label: "Referral Sent", enabled: true },
  { id: "s2", label: "Loan Lodged", enabled: true },
  { id: "s3", label: "Loan Settled", enabled: true },
  { id: "s4", label: "Awaiting Referral Fee", enabled: true },
  { id: "s5", label: "Fee Paid", enabled: true },
  { id: "s6", label: "Not Progressed", enabled: true },
];

/* --------------------------- Legal Documents --------------------------- */
export const legalDocsMock: LegalDocument[] = [
  {
    id: "d1",
    title: "Master Referral Agreement…",
    type: "Agreement",
    sizeLabel: "12 MB",
    uploadedOn: "2024-01-10",
  },
  {
    id: "d2",
    title: "Compliance Certificate - Q1.pdf",
    type: "Agreement",
    sizeLabel: "450 KB",
    uploadedOn: "2024-03-25",
  },
  {
    id: "d3",
    title: "Standard Commission…",
    type: "Agreement",
    sizeLabel: "80 KB",
    uploadedOn: "2024-02-15",
  },
];

/* --------------------------- Banking Details --------------------------- */
export const bankingMock: BankingForm = {
  bankName: "",
  accountName: "",
  accountNumber: "",
  routingBsb: "",
};
