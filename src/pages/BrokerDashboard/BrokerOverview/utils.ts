import type {
  CreateLeadForm,
  CreateLeadStage,
  Lead,
  LeadStatus,
  LeadTableRow,
  RangeKey,
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

export function mapCreateStageToLeadStatus(stage: CreateLeadStage): LeadStatus {
  switch (stage) {
    case "New Lead":
      return "NEW LEAD";
    case "Contacted":
      return "CONTACTED";
    case "Application in Progress":
      return "APPLICATION IN PROGRESS";
    case "Submitted to Lender":
      return "SUBMITTED TO LENDER";
    case "Settled":
      return "SETTLEMENT COMPLETED";
    default:
      return "NEW LEAD";
  }
}

export function mapLeadToTableRow(lead: Lead): LeadTableRow {
  return {
    id: lead.id,
    name: lead.borrowerName,
    ref: lead.refSource,
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

export function buildLeadFromCreateForm({
  form,
  timeline,
  teamMembers,
}: {
  form: CreateLeadForm;
  timeline: RangeKey;
  teamMembers: TeamMember[];
}): Lead {
  const amount = parseMoneyInput(form.estimatedLoanAmount);
  const commissionPercent = 50;
  const agreementSplitPercent = 40;
  const referrerFeeExpected = Number((amount * 0.0045333333).toFixed(2));
  const netCommission = Number((referrerFeeExpected / 0.4).toFixed(2));
  const selectedMember = teamMembers.find((m) => m.id === form.assignTo);

  return {
    id: `lead-${Date.now()}`,

    borrowerName: form.fullName.trim(),
    borrowerEmail: form.email.trim(),
    mobileNumber: form.mobile.trim(),
    companyName: form.companyName.trim(),

    refSource: form.companyName.trim().toLowerCase() || "manual entry",
    timeline,

    leadStage: mapCreateStageToLeadStatus(form.leadStage),
    allocatedTeamMemberId: form.assignTo,
    leadCreatedDate: getTodayDate(),

    estimatedLoanAmount: amount,
    interestRate: 5.5,
    expectedSettlementDate: "",

    referrerName: "Alex Partners",
    partnerCompany: "Partners Financial Group",
    agreementType: "Standard Commission Split",
    referrerCommissionPercent: commissionPercent,

    crmConnectedSystem: "Salesforce",
    crmStatus: "Operational",
    crmAutoSync: true,
    lastSyncAt: new Date().toISOString(),

    notes: [],
    milestoneHistory: [
      {
        id: `milestone-${Date.now()}`,
        label: "Lead Created",
        date: new Date().toLocaleString(),
      },
      {
        id: `milestone-team-${Date.now() + 1}`,
        label: `Allocated to ${selectedMember?.name ?? "Team Member"}`,
        date: new Date().toLocaleString(),
      },
    ],

    agreementSplitPercent,
    netCommission,
    referrerFeeExpected,
    expectedReferrerPaymentDate: "",
  };
}
