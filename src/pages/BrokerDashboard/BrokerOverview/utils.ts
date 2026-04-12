// src/pages/BrokerDashboard/BrokerOverview/utils.ts
import type {
  CreateLeadForm,
  CreateLeadStage,
  Lead,
  LeadStatus,
  LeadTableRow,
  RangeKey,
  ReferrerOption,
  TeamMember,
} from "./types";

export function formatMoney(value: number) {
  return `$${value.toLocaleString()}`;
}

export function formatShortMoney(value: number) {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
  return `$${value}`;
}

export function parseMoneyInput(value: string) {
  const parsed = Number(value.replace(/[^0-9.]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
}

export function getTodayDate() {
  return new Date().toISOString().slice(0, 10);
}

export function getCurrentTimeLabel(date = new Date()) {
  return date.toLocaleTimeString([], {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDisplayDate(date: string) {
  if (!date) return "-";

  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function mapCreateStageToLeadStatus(stage: CreateLeadStage): LeadStatus {
  switch (stage) {
    case "New Referral":
      return "NEW REFERRAL";
    case "Contacted":
      return "CONTACTED";
    case "Application Started":
      return "APPLICATION STARTED";
    case "Submitted to Lender":
      return "SUBMITTED TO LENDER";
    default:
      return "NEW REFERRAL";
  }
}

export function mapLeadStatusToCreateStage(
  status: LeadStatus,
): CreateLeadStage {
  switch (status) {
    case "NEW REFERRAL":
      return "New Referral";
    case "CONTACTED":
      return "Contacted";
    case "APPLICATION STARTED":
      return "Application Started";
    case "SUBMITTED TO LENDER":
      return "Submitted to Lender";
    case "APPROVED":
    case "FUNDED":
      return "Submitted to Lender";
    default:
      return "New Referral";
  }
}

export function mapLeadToTableRow(lead: Lead): LeadTableRow {
  return {
    id: lead.id,
    name: lead.borrowerName,
    ref: lead.referrerName,
    amount: lead.estimatedLoanAmount,
    date: lead.leadCreatedDate,
    status: lead.leadStage,
    rate: lead.interestRate,
    commission: lead.referrerFeeExpected,
    timeline: lead.timeline,
  };
}

export function getAllocatedTeamMemberName(
  teamMembers: TeamMember[],
  allocatedTeamMemberId: string,
) {
  return (
    teamMembers.find((member) => member.id === allocatedTeamMemberId)?.name ??
    "-"
  );
}

export function getAllocatedTeamMemberLabel(
  teamMembers: TeamMember[],
  allocatedTeamMemberId: string,
) {
  const member = teamMembers.find((item) => item.id === allocatedTeamMemberId);
  if (!member) return "-";
  return `${member.name} - ${member.role}`;
}

export function getReferrerById(
  referrers: ReferrerOption[],
  referrerId: string,
) {
  return referrers.find((item) => item.id === referrerId);
}

export function calculateCommissionValues(
  amount: number,
  referrerCommissionPercent: number,
) {
  const totalCommission = Number((amount * 0.01).toFixed(2));
  const referrerFeeExpected = Number(
    ((totalCommission * referrerCommissionPercent) / 100).toFixed(2),
  );
  const brokerCommission = Number(
    (totalCommission - referrerFeeExpected).toFixed(2),
  );

  return {
    totalCommission,
    brokerCommission,
    referrerFeeExpected,
  };
}

export function buildLeadFromCreateForm({
  form,
  timeline,
  teamMembers,
  referrers,
}: {
  form: CreateLeadForm;
  timeline: RangeKey;
  teamMembers: TeamMember[];
  referrers: ReferrerOption[];
}): Lead {
  const amount = parseMoneyInput(form.estimatedLoanAmount);
  const referrer = getReferrerById(referrers, form.referrerId);
  const referrerCommissionPercent = Number(form.referrerCommissionPercent) || 0;

  const { totalCommission, brokerCommission, referrerFeeExpected } =
    calculateCommissionValues(amount, referrerCommissionPercent);

  const selectedMember = teamMembers.find((m) => m.id === form.assignTo);
  const now = new Date();
  const leadId = `lead-${Date.now()}`;
  const createdDate = getTodayDate();

  return {
    id: leadId,

    borrowerName: form.fullName.trim(),
    borrowerEmail: form.email.trim(),
    mobileNumber: form.mobile.trim(),
    companyName: form.companyName.trim(),

    refSource: referrer?.companyName?.toLowerCase() || "partner referral",
    timeline,

    leadStage: mapCreateStageToLeadStatus(form.leadStage),
    allocatedTeamMemberId: form.assignTo,
    leadCreatedDate: createdDate,

    estimatedLoanAmount: amount,
    loanType: form.loanType || "Home Loan",
    interestRate: 0,
    expectedSettlementDate: form.expectedSettlementDate,

    referrerName: referrer?.name || "Unknown Referrer",
    partnerCompany: referrer?.companyName || "Unknown Company",
    agreementType:
      form.agreementType ||
      referrer?.agreementType ||
      "Standard Partnership Agreement",
    referrerCommissionPercent,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: now.toISOString(),

    notes: [],
    milestoneHistory: [
      {
        id: `milestone-${Date.now()}`,
        label: "Referral Created",
        date: formatDisplayDate(createdDate),
        time: getCurrentTimeLabel(now),
        tone: "info",
      },
      {
        id: `milestone-team-${Date.now() + 1}`,
        label: `Assigned to ${selectedMember?.name ?? "Team Member"}`,
        date: formatDisplayDate(createdDate),
        time: getCurrentTimeLabel(now),
        tone: "neutral",
      },
    ],

    agreementSplitPercent: referrerCommissionPercent,
    totalCommission,
    brokerCommission,
    referrerFeeExpected,
    expectedReferrerPaymentDate: form.expectedSettlementDate || "",

    paymentStatus: "Pending",
    paymentDate: "",
    paymentNotes: "",
  };
}
