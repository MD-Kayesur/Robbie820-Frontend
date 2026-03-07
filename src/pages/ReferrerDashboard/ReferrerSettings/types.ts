// src/pages/ReferrerDashboard/ReferrerSettings/types.ts

export type SettingsTab =
  | "My Profile"
  | "Team Management"
  | "Alerts"
  | "Legal Documents"
  | "Banking Details";

/* ----------------------------- My Profile ----------------------------- */
export type ProfileForm = {
  fullName: string;
  email: string;
  businessName: string;
  verificationStatus: "Identity Verified" | "Pending" | "Unverified";
  accountStatus: "Active" | "Inactive";
  mobileNumber: string;
  gstRegistered: boolean;
  abnNumber: string;
};

/* --------------------------- Team Management --------------------------- */
export type TeamRole = "Agreement Holder" | "Staff Member";
export type TeamPermission = "Admin" | "Member";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  permission: TeamPermission;
  referrals: number;
  joined: string; // YYYY-MM-DD
};

/* -------------------------------- Alerts ------------------------------- */
export type AlertPrefs = {
  emailNotifications: boolean;
  smsNotifications: boolean;
};

export type AlertStage = {
  id: string;
  label: string;
  enabled: boolean;
};

/* --------------------------- Legal Documents --------------------------- */
export type LegalDocType = "Agreement" | "Certificate" | "Policy";

export type LegalDocument = {
  id: string;
  title: string;
  type: LegalDocType;
  sizeLabel: string; // "12 MB"
  uploadedOn: string; // YYYY-MM-DD
};

/* --------------------------- Banking Details --------------------------- */
export type BankingForm = {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingBsb: string;
};
