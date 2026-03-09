import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ChevronDown,
  Download,
  Eye,
  FileText,
  MoreHorizontal,
  Plus,
  RefreshCw,
  UserPlus,
  X,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import CreateLeadModal from "@/components/BrokerDashboardCom/BOverviewCom/modals/CreateLeadModal";
import { Lead, RangeKey } from "../BrokerOverview/types";
import { brokerTeamMembers, referrerOptions } from "../BrokerOverview/mock";

type PipelineStage =
  | "New Referral"
  | "Contacted"
  | "Application Started"
  | "Submitted to Lender"
  | "Approved"
  | "Funded"
  | "Closed / Not Proceeding";

type CommissionStatus = "Pending" | "Approved" | "Paid" | "Scheduled";

type ReferralRow = {
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

const stageOptions = [
  "Stage",
  "New Referral",
  "Contacted",
  "Application Started",
  "Submitted to Lender",
  "Approved",
  "Funded",
  "Closed / Not Proceeding",
] as const;

const referrerFilterOptions = [
  "Referrer",
  "ABC Realty Group",
  "Elite Financial Partners",
  "Premier Mortgage Solutions",
  "Summit Property Advisors",
] as const;

const teamMemberOptions = [
  "Team Members",
  "John Broker",
  "Sarah Smith",
  "Mike Johnson",
] as const;

const referralRows: ReferralRow[] = [
  {
    id: 1,
    borrowerName: "Sarah Mitchell",
    referrer: "ABC Realty Group",
    loanAmount: 450000,
    pipelineStage: "Submitted to Lender",
    expectedCommission: 4500,
    commissionStatus: "Pending",
    dateSubmitted: "Mar 1, 2026",
    assignedTeamMember: "John Broker",
    settlementDate: "Apr 12, 2026",
  },
  {
    id: 2,
    borrowerName: "James Rodriguez",
    referrer: "Elite Financial Partners",
    loanAmount: 780000,
    pipelineStage: "Approved",
    expectedCommission: 7800,
    commissionStatus: "Approved",
    dateSubmitted: "Feb 28, 2026",
    assignedTeamMember: "Sarah Smith",
    settlementDate: "Mar 29, 2026",
  },
  {
    id: 3,
    borrowerName: "Emily Chen",
    referrer: "ABC Realty Group",
    loanAmount: 325000,
    pipelineStage: "Application Started",
    expectedCommission: 3250,
    commissionStatus: "Pending",
    dateSubmitted: "Mar 5, 2026",
    assignedTeamMember: "Mike Johnson",
    settlementDate: "Apr 15, 2026",
  },
  {
    id: 4,
    borrowerName: "Michael Thompson",
    referrer: "Premier Mortgage Solutions",
    loanAmount: 590000,
    pipelineStage: "Funded",
    expectedCommission: 5900,
    commissionStatus: "Paid",
    dateSubmitted: "Feb 15, 2026",
    assignedTeamMember: "John Broker",
    settlementDate: "Feb 28, 2026",
  },
  {
    id: 5,
    borrowerName: "Lisa Anderson",
    referrer: "Elite Financial Partners",
    loanAmount: 410000,
    pipelineStage: "Contacted",
    expectedCommission: 4100,
    commissionStatus: "Pending",
    dateSubmitted: "Mar 7, 2026",
    assignedTeamMember: "Sarah Smith",
    settlementDate: "Apr 9, 2026",
  },
  {
    id: 6,
    borrowerName: "David Park",
    referrer: "Summit Property Advisors",
    loanAmount: 875000,
    pipelineStage: "New Referral",
    expectedCommission: 8750,
    commissionStatus: "Pending",
    dateSubmitted: "Mar 8, 2026",
    assignedTeamMember: "Mike Johnson",
    settlementDate: "Apr 22, 2026",
  },
  {
    id: 7,
    borrowerName: "Jennifer Williams",
    referrer: "ABC Realty Group",
    loanAmount: 520000,
    pipelineStage: "Approved",
    expectedCommission: 5200,
    commissionStatus: "Scheduled",
    dateSubmitted: "Feb 20, 2026",
    assignedTeamMember: "John Broker",
    settlementDate: "Mar 18, 2026",
  },
  {
    id: 8,
    borrowerName: "Robert Martinez",
    referrer: "Premier Mortgage Solutions",
    loanAmount: 395000,
    pipelineStage: "Submitted to Lender",
    expectedCommission: 3950,
    commissionStatus: "Pending",
    dateSubmitted: "Mar 3, 2026",
    assignedTeamMember: "Sarah Smith",
    settlementDate: "Apr 10, 2026",
  },
];

function formatMoney(amount: number) {
  return `$${amount.toLocaleString()}`;
}

function StageBadge({ stage }: { stage: PipelineStage }) {
  const stageClasses: Record<PipelineStage, string> = {
    "New Referral": "bg-[#E8F0FF] text-[#2563EB]",
    Contacted: "bg-[#F3E8FF] text-[#9333EA]",
    "Application Started": "bg-[#FEF3C7] text-[#D97706]",
    "Submitted to Lender": "bg-[#FFF1E8] text-[#F97316]",
    Approved: "bg-[#DCFCE7] text-[#16A34A]",
    Funded: "bg-[#DCFCE7] text-[#16A34A]",
    "Closed / Not Proceeding": "bg-[#F3F4F6] text-[#6B7280]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none whitespace-nowrap",
        stageClasses[stage],
      )}
    >
      {stage}
    </span>
  );
}

function CommissionStatusBadge({ status }: { status: CommissionStatus }) {
  const statusClasses: Record<CommissionStatus, string> = {
    Pending: "bg-[#F3F4F6] text-[#4B5563]",
    Approved: "bg-[#E8F0FF] text-[#2563EB]",
    Paid: "bg-[#DCFCE7] text-[#16A34A]",
    Scheduled: "bg-[#FEF3C7] text-[#D97706]",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium leading-none whitespace-nowrap",
        statusClasses[status],
      )}
    >
      {status}
    </span>
  );
}

function FilterDropdown<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: readonly T[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div ref={ref} className="relative min-w-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          "flex h-11 w-full items-center justify-between rounded-[10px] border bg-white px-4 text-left text-[13px] font-medium text-[#374151] transition",
          open ? "border-[#3B82F6] ring-1 ring-[#3B82F6]" : "border-[#E5E7EB]",
        )}
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#4B5563] transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open ? (
        <div className="absolute left-0 top-full z-30 mt-1 w-full overflow-hidden border border-[#A3A3A3] bg-white shadow-sm">
          {options.map((option, index) => (
            <button
              key={option}
              type="button"
              onClick={() => {
                onChange(option);
                setOpen(false);
              }}
              className={cn(
                "block w-full px-4 py-3 text-left text-[13px] text-[#374151] transition hover:bg-[#E8F1FF]",
                (option === value || index === 0) && "bg-[#9EC5F8]",
              )}
            >
              {option}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function RowMenu({ onView }: { onView: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const items = [
    { label: "View Details", icon: Eye, onClick: onView },
    {
      label: "Update Stage",
      icon: RefreshCw,
      onClick: () => setOpen(false),
    },
    {
      label: "Add Internal Note",
      icon: FileText,
      onClick: () => setOpen(false),
    },
    {
      label: "Assign Team Member",
      icon: UserPlus,
      onClick: () => setOpen(false),
    },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-[#6B7280] transition hover:bg-[#F3F4F6]"
      >
        <MoreHorizontal className="h-4 w-4" />
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-62.5 overflow-hidden rounded-[20px] border border-[#E5E7EB] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="flex w-full items-center gap-4 px-6 py-4 text-left text-[15px] font-medium text-[#374151] transition hover:bg-[#F8FAFC]"
              >
                <Icon className="h-5 w-5 text-[#6B7280]" strokeWidth={1.8} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

function ExportModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [dateRange, setDateRange] = useState("Last 30 Days");
  const [exportScope, setExportScope] = useState("Filtered Results");
  const [fields, setFields] = useState({
    borrowerName: true,
    referrer: true,
    loanAmount: true,
    stage: true,
    expectedCommission: true,
    commissionStatus: true,
    dateSubmitted: true,
    settlementDate: true,
  });

  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  if (!open) return null;

  const dateOptions = ["Last 30 Days", "MTD", "FYTD", "Custom"] as const;
  const scopeOptions = ["All Referrals", "Filtered Results"] as const;

  const includeRows = [
    ["Borrower Name", "borrowerName"],
    ["Referrer", "referrer"],
    ["Loan Amount", "loanAmount"],
    ["Stage", "stage"],
    ["Expected Commission", "expectedCommission"],
    ["Commission Status", "commissionStatus"],
    ["Date Submitted", "dateSubmitted"],
    ["Settlement Date", "settlementDate"],
  ] as const;

  const toggleField = (key: keyof typeof fields) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 px-4 py-6">
      <div
        ref={modalRef}
        className="max-h-[95vh] w-full max-w-239 overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_28px_80px_rgba(0,0,0,0.28)] sm:p-8"
      >
        <div className="flex items-start gap-4 border-b border-[#E5E7EB] pb-5">
          <div className="flex h-22 w-22 items-center justify-center rounded-[20px] bg-[#D8EEF9]">
            <Download className="h-10 w-10 text-[#0EA5E9]" strokeWidth={1.8} />
          </div>

          <div className="min-w-0 flex-1 pt-1">
            <h2 className="text-[28px] font-semibold leading-none text-black sm:text-[34px]">
              Export Referrals
            </h2>
            <p className="mt-3 text-[18px] text-[#6B7280] sm:text-[20px]">
              Generate a detailed CSV report
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-black transition hover:bg-[#F3F4F6]"
          >
            <X className="h-8 w-8" strokeWidth={1.8} />
          </button>
        </div>

        <div className="mt-8 space-y-8">
          <section>
            <div className="mb-5 flex items-center gap-4">
              <Calendar className="h-9 w-9 text-black" strokeWidth={1.8} />
              <h3 className="text-[26px] font-medium text-black">Date Range</h3>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {dateOptions.map((option) => {
                const active = dateRange === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setDateRange(option)}
                    className={cn(
                      "h-17 rounded-[18px] border text-[22px] font-normal transition",
                      active
                        ? "border-[#11A9F3] bg-[#EDF7FC] text-[#11A9F3]"
                        : "border-[#11A9F3] bg-white text-[#11A9F3]",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-4">
              <Calendar className="h-9 w-9 text-black" strokeWidth={1.8} />
              <h3 className="text-[26px] font-medium text-black">
                Export Scope
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {scopeOptions.map((option) => {
                const active = exportScope === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setExportScope(option)}
                    className={cn(
                      "h-17 rounded-[18px] border text-[22px] font-normal transition",
                      active
                        ? "border-[#11A9F3] bg-[#EDF7FC] text-[#11A9F3]"
                        : "border-[#11A9F3] bg-white text-[#11A9F3]",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </section>

          <section>
            <div className="mb-5 flex items-center gap-4">
              <Calendar className="h-9 w-9 text-black" strokeWidth={1.8} />
              <h3 className="text-[26px] font-medium text-black">
                Include Fields
              </h3>
            </div>

            <div className="rounded-xl border border-[#D1D5DB] px-7 py-6">
              <div className="space-y-5">
                {includeRows.map(([label, key]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => toggleField(key)}
                    className="flex w-full items-center justify-between gap-4 text-left"
                  >
                    <span className="text-[22px] text-black">{label}</span>
                    <span
                      className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-md border",
                        fields[key]
                          ? "border-[#11A9F3] bg-white text-[#11A9F3]"
                          : "border-[#CBD5E1] bg-white text-transparent",
                      )}
                    >
                      <svg
                        viewBox="0 0 20 20"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M4.5 10.5l3.5 3.5 7-8" />
                      </svg>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </section>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          <button
            type="button"
            onClick={onClose}
            className="h-18 rounded-[18px] bg-[#CDE8F4] px-6 text-left text-[24px] font-medium text-black transition hover:opacity-90"
          >
            Cancel
          </button>

          <button
            type="button"
            className="inline-flex h-18 items-center justify-center gap-3 rounded-[18px] bg-[#11A9F3] px-6 text-[24px] font-medium text-white transition hover:opacity-90"
          >
            <Download className="h-8 w-8" strokeWidth={1.9} />
            Export CSV
          </button>
        </div>
      </div>
    </div>
  );
}

const BrokerMyReferrals = () => {
  const [search, setSearch] = useState("");
  const [referrer, setReferrer] =
    useState<(typeof referrerFilterOptions)[number]>("Referrer");
  const [stage, setStage] = useState<(typeof stageOptions)[number]>("Stage");
  const [teamMember, setTeamMember] =
    useState<(typeof teamMemberOptions)[number]>("Team Members");
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);

  const [createLeadOpen, setCreateLeadOpen] = useState(false);
  const [leadRows, setLeadRows] = useState<ReferralRow[]>(referralRows);

  const [range] = useState<RangeKey>("mtd");

  const perPage = 8;

  const filteredRows = useMemo(() => {
    return leadRows.filter((row) => {
      const query = search.toLowerCase().trim();

      const matchesSearch =
        query.length === 0
          ? true
          : row.borrowerName.toLowerCase().includes(query) ||
            row.referrer.toLowerCase().includes(query);

      const matchesReferrer =
        referrer === "Referrer" ? true : row.referrer === referrer;

      const matchesStage =
        stage === "Stage" ? true : row.pipelineStage === stage;

      const matchesTeam =
        teamMember === "Team Members"
          ? true
          : row.assignedTeamMember === teamMember;

      return matchesSearch && matchesReferrer && matchesStage && matchesTeam;
    });
  }, [search, referrer, stage, teamMember]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / perPage));
  const currentPage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredRows.slice(start, start + perPage);
  }, [filteredRows, currentPage]);

  useEffect(() => {
    setPage(1);
  }, [search, referrer, stage, teamMember]);

  const startResult =
    filteredRows.length === 0 ? 0 : (currentPage - 1) * perPage + 1;
  const endResult = Math.min(currentPage * perPage, filteredRows.length);

  function mapLeadToReferralRow(lead: Lead): ReferralRow {
    const commissionStatusMap: Record<string, CommissionStatus> = {
      "NEW LEAD": "Pending",
      CONTACTED: "Pending",
      "APPLICATION IN PROGRESS": "Pending",
      "SUBMITTED TO LENDER": "Approved",
      APPROVED: "Approved",
      "AWAITING REFERRAL FEE": "Scheduled",
      FUNDED: "Paid",
      "SETTLEMENT COMPLETE": "Paid",
    };

    const pipelineStageMap: Record<string, PipelineStage> = {
      "NEW LEAD": "New Referral",
      CONTACTED: "Contacted",
      "APPLICATION IN PROGRESS": "Application Started",
      "SUBMITTED TO LENDER": "Submitted to Lender",
      APPROVED: "Approved",
      FUNDED: "Funded",
      "SETTLEMENT COMPLETE": "Funded",
    };

    return {
      id: typeof lead.id === "number" ? lead.id : Date.now(),
      borrowerName: lead.borrowerName,
      referrer: lead.referrerName,
      loanAmount: lead.estimatedLoanAmount,
      pipelineStage:
        pipelineStageMap[lead.leadStage] ?? "Closed / Not Proceeding",
      expectedCommission: lead.referrerFeeExpected ?? 0,
      commissionStatus: commissionStatusMap[lead.leadStage] ?? "Pending",
      dateSubmitted: new Date(lead.leadCreatedDate).toLocaleDateString(
        "en-US",
        {
          month: "short",
          day: "numeric",
          year: "numeric",
        },
      ),
      assignedTeamMember:
        brokerTeamMembers.find((m) => m.id === lead.allocatedTeamMemberId)
          ?.name || "Unassigned",
      settlementDate: lead.expectedSettlementDate
        ? new Date(lead.expectedSettlementDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "-",
    };
  }

  const handleCreateLead = (newLead: Lead) => {
    const newRow = mapLeadToReferralRow(newLead);

    setLeadRows((prev) => [newRow, ...prev]);
    setCreateLeadOpen(false);
  };

  return (
    <>
      <div className="space-y-4">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <h1 className="text-[20px] font-medium leading-6 text-[#111827]">
              Referral Management
            </h1>
            <p className="mt-2 text-[14px] text-[#6B7280]">
              monitor and track incoming leads from your partner network.
            </p>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#D3ECF7] px-4 text-[13px] font-medium text-[#374151] transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              EXPORT CSV
            </button>

            <button
              type="button"
              onClick={() => setCreateLeadOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#12A9F4] px-4 text-[13px] font-medium text-white transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Create Lead
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-3">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.25fr_1fr_1fr_1fr_160px]">
            <div className="relative">
              <svg
                viewBox="0 0 20 20"
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <circle cx="9" cy="9" r="5.5" />
                <path d="M13.5 13.5L17 17" strokeLinecap="round" />
              </svg>

              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients or referrers..."
                className="h-11 w-full rounded-[10px] border border-[#E5E7EB] bg-[#F7F7F8] pl-10 pr-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>

            <FilterDropdown
              value={referrer}
              options={referrerFilterOptions}
              onChange={setReferrer}
            />

            <FilterDropdown
              value={stage}
              options={stageOptions}
              onChange={setStage}
            />

            <FilterDropdown
              value={teamMember}
              options={teamMemberOptions}
              onChange={setTeamMember}
            />

            <button
              type="button"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#111827] whitespace-nowrap"
            >
              <Calendar className="h-4 w-4 text-[#111827]" />
              Nov 2025 - Jan 2026
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-300 w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Borrower Name
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Referrer
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Loan Amount
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Pipeline Stage
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Expected Commission
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Commission Status
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Date Submitted
                  </th>
                  <th className="px-4 py-4 text-left text-[10px] font-medium uppercase tracking-wide text-[#6B7280]">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {paginatedRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#ECEFF3] last:border-b-0"
                  >
                    <td className="px-4 py-4 text-[12px] font-medium text-[#111827]">
                      {row.borrowerName}
                    </td>

                    <td className="px-4 py-4 text-[12px] text-[#374151]">
                      {row.referrer}
                    </td>

                    <td className="px-4 py-4 text-[12px] text-[#111827]">
                      {formatMoney(row.loanAmount)}
                    </td>

                    <td className="px-4 py-4">
                      <StageBadge stage={row.pipelineStage} />
                    </td>

                    <td className="px-4 py-4 text-[12px] text-[#111827]">
                      {formatMoney(row.expectedCommission)}
                    </td>

                    <td className="px-4 py-4">
                      <CommissionStatusBadge status={row.commissionStatus} />
                    </td>

                    <td className="px-4 py-4 text-[12px] text-[#374151]">
                      {row.dateSubmitted}
                    </td>

                    <td className="px-4 py-4">
                      <RowMenu
                        onView={() => console.log("View details:", row)}
                      />
                    </td>
                  </tr>
                ))}

                {paginatedRows.length === 0 ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-10 text-center text-[14px] text-[#6B7280]"
                    >
                      No referrals found.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[12px] text-[#6B7280]">
              Showing {startResult} to {endResult} of {filteredRows.length}{" "}
              results
            </p>

            <div className="flex items-center gap-2 self-end">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#6B7280] transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                ‹
              </button>

              {Array.from({ length: totalPages }, (_, index) => index + 1).map(
                (pageNumber) => (
                  <button
                    key={pageNumber}
                    type="button"
                    onClick={() => setPage(pageNumber)}
                    className={cn(
                      "inline-flex h-8 w-8 items-center justify-center rounded-md border text-[13px] transition",
                      currentPage === pageNumber
                        ? "border-[#2563EB] bg-[#2563EB] text-white"
                        : "border-[#D1D5DB] bg-white text-[#6B7280]",
                    )}
                  >
                    {pageNumber}
                  </button>
                ),
              )}

              <button
                type="button"
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-[#D1D5DB] bg-white text-[#6B7280] transition disabled:cursor-not-allowed disabled:opacity-50"
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />

      <CreateLeadModal
        open={createLeadOpen}
        onClose={() => setCreateLeadOpen(false)}
        onCreate={handleCreateLead}
        timeline={range}
        teamMembers={brokerTeamMembers}
        referrers={referrerOptions}
      />
    </>
  );
};

export default BrokerMyReferrals;
