import { useEffect, useMemo, useState } from "react";
import { Calendar, Download, Plus, Search } from "lucide-react";

import { cn } from "@/hooks/useCn";
import CreateLeadModal from "@/components/BrokerDashboardCom/BOverviewCom/CreateLeadModal";
import { Lead, RangeKey } from "../BrokerOverview/types";
import { brokerTeamMembers, referrerOptions } from "../BrokerOverview/mock";

import ExportModal from "../../../components/BrokerDashboardCom/BMyReferralsCom/ExportModal";
import {
  CommissionStatusBadge,
  FilterDropdown,
  formatMoney,
  MobileReferralCard,
  RowMenu,
  StageBadge,
} from "../../../components/BrokerDashboardCom/BMyReferralsCom/ReferralTableParts";
import { referralRows } from "./mock";
import type { CommissionStatus, PipelineStage, ReferralRow } from "./types";
import {
  referrerFilterOptions,
  stageOptions,
  teamMemberOptions,
} from "./types";

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
  }, [search, referrer, stage, teamMember, leadRows]);

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
            <h1 className="text-lg font-medium leading-6 text-[#111827]">
              Referral Management
            </h1>
            <p className="mt-1 text-[14px] text-[#6B7280]">
              monitor and track incoming leads from your partner network.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#D3ECF7] px-4 text-[13px] font-medium text-[#374151] transition hover:opacity-90 md:h-8"
            >
              <Download className="h-4 w-4" />
              EXPORT CSV
            </button>

            <button
              type="button"
              onClick={() => setCreateLeadOpen(true)}
              className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-[#12A9F4] px-4 text-[13px] font-medium text-white transition hover:opacity-90 md:h-8"
            >
              <Plus className="h-4 w-4" />
              Create Lead
            </button>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-3">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.25fr_1fr_1fr_1fr_160px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A8A8]" />

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
              className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-[#E5E7EB] bg-white px-4 text-[13px] font-medium text-[#111827] whitespace-nowrap"
            >
              <Calendar className="h-4 w-4 text-[#111827]" />
              Nov 2025 - Jan 2026
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white">
          <div className="block space-y-4 p-4 lg:hidden">
            {paginatedRows.map((row) => (
              <MobileReferralCard key={row.id} row={row} />
            ))}

            {paginatedRows.length === 0 ? (
              <div className="px-2 py-10 text-center text-[14px] text-[#6B7280]">
                No referrals found.
              </div>
            ) : null}
          </div>

          <div className="hidden overflow-x-auto lg:block">
            <table className="w-full min-w-300">
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

          <div className="flex flex-col gap-4 px-4 py-4 md:flex-row md:items-center md:justify-between">
            <p className="text-[12px] text-[#6B7280]">
              Showing {startResult} to {endResult} of {filteredRows.length}{" "}
              results
            </p>

            <div className="flex flex-wrap items-center gap-2 md:justify-end">
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
