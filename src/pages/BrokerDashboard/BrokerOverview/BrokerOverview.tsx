import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, Clock3, TrendingUp, Users2 } from "lucide-react";

import type { Lead, LeadStatus, RangeKey } from "./types";
import { brokerTeamMembers, leadsMock } from "./mock";
import { formatShortMoney } from "./utils";

import CreateLeadModal from "../../../components/BrokerDashboardCom/BOverivewCom/modals/CreateLeadModal";
import OverviewHeader from "../../../components/BrokerDashboardCom/BOverivewCom/OverviewHeader";
import OverviewFilters from "../../../components/BrokerDashboardCom/BOverivewCom/OverviewFilters";
import LoanValueChart from "../../../components/BrokerDashboardCom/BOverivewCom/LoanValueChart";
import CrmIntegrationCard from "../../../components/BrokerDashboardCom/BOverivewCom/CrmIntegrationCard";
import RecentLeadsTable from "../../../components/BrokerDashboardCom/BOverivewCom/RecentLeadsTable";

function MetricCard({
  title,
  value,
  badge,
  icon: Icon,
}: {
  title: string;
  value: string;
  badge?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="rounded-2xl border border-[#B9D8FF] bg-white px-4 py-3.5">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 items-center justify-center rounded-[10px] bg-[#DFF3FF] text-[#1BAEF5]">
          <Icon className="h-4.5 w-4.5" strokeWidth={2} />
        </div>

        {badge ? (
          <span className="inline-flex items-center rounded-full border border-[#98D5A8] bg-[#EAF7EE] px-2 py-0.5 text-[10px] font-medium leading-none text-[#4B9961]">
            {badge}
          </span>
        ) : null}
      </div>

      <div className="mt-4">
        <p className="text-[11px] font-medium uppercase text-[#7C7C7C]">
          {title}
        </p>
        <h3 className="mt-2 text-[18px] font-semibold leading-none text-[#181818]">
          {value}
        </h3>
      </div>
    </div>
  );
}

export default function BrokerOverview() {
  const navigate = useNavigate();

  const [range, setRange] = useState<RangeKey>("mtd");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
  const [dateLabel, setDateLabel] = useState("Nov 2025 - Jan 2026");
  const [dateRange, setDateRange] = useState({
    from: "",
    to: "",
  });
  const [crmStatus, setCrmStatus] = useState<"operational" | "syncing">(
    "operational",
  );
  const [lastSync, setLastSync] = useState("2 Mins Ago");
  const [createLeadOpen, setCreateLeadOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(leadsMock);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesRange = lead.timeline === range;
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        lead.borrowerName.toLowerCase().includes(query) ||
        lead.refSource.toLowerCase().includes(query) ||
        lead.leadStage.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || lead.leadStage === statusFilter;

      return matchesRange && matchesSearch && matchesStatus;
    });
  }, [leads, range, search, statusFilter]);

  const metrics = useMemo(() => {
    const activeReferrals = filteredLeads.length;
    const pipeline = filteredLeads.reduce(
      (sum, lead) => sum + lead.estimatedLoanAmount,
      0,
    );

    const fundedCount = filteredLeads.filter(
      (lead) =>
        lead.leadStage === "FUNDED" ||
        lead.leadStage === "SETTLEMENT COMPLETED",
    ).length;

    const conversionRate = activeReferrals
      ? Math.round((fundedCount / activeReferrals) * 100)
      : 0;

    const totalCommission = filteredLeads.reduce(
      (sum, lead) => sum + lead.referrerFeeExpected,
      0,
    );

    const attentionCount = filteredLeads.filter(
      (lead) => lead.leadStage === "APPLICATION IN PROGRESS",
    ).length;

    return {
      activeReferrals,
      pipeline,
      conversionRate,
      totalCommission,
      attentionCount,
    };
  }, [filteredLeads]);

  const handleCreateLead = (lead: Lead) => {
    setLeads((prev) => [lead, ...prev]);
  };

  const handleApplyDate = () => {
    if (dateRange.from && dateRange.to) {
      setDateLabel(`${dateRange.from} - ${dateRange.to}`);
    }
  };

  const handleMockRefresh = () => {
    setCrmStatus("syncing");
    setLastSync("Syncing...");

    setTimeout(() => {
      setCrmStatus("operational");
      setLastSync("Just Now");
    }, 900);
  };

  return (
    <>
      <div className="min-h-full">
        <div className="mx-auto max-w-350 space-y-6">
          <OverviewHeader search={search} onSearchChange={setSearch} />

          <OverviewFilters
            range={range}
            onRangeChange={setRange}
            statusFilter={statusFilter}
            onStatusChange={setStatusFilter}
            dateLabel={dateLabel}
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
            onApplyDate={handleApplyDate}
            onCreateLead={() => setCreateLeadOpen(true)}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              title="Active Referrals"
              value={metrics.activeReferrals.toLocaleString()}
              badge="+12% MTD"
              icon={Users2}
            />
            <MetricCard
              title="Pipeline (Active Deals)"
              value={formatShortMoney(metrics.pipeline)}
              badge={
                metrics.attentionCount > 0 ? "REQUIRES ATTENTION" : "STABLE"
              }
              icon={Clock3}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${metrics.conversionRate}%`}
              badge="2.1% MTD"
              icon={TrendingUp}
            />
            <MetricCard
              title="Total Commission"
              value={formatShortMoney(metrics.totalCommission)}
              badge="MTD"
              icon={ArrowUpRight}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[minmax(0,1.7fr)_minmax(320px,1fr)]">
            <LoanValueChart range={range} />
            <CrmIntegrationCard
              crmStatus={crmStatus}
              lastSync={lastSync}
              onRefresh={handleMockRefresh}
            />
          </div>

          <RecentLeadsTable
            leads={filteredLeads}
            onOpenDetails={(id) => navigate(`/broker-dashboard/leads/${id}`)}
            onUpdateStatus={(id) => console.log("update status", id)}
            onAddNote={(id) => console.log("add note", id)}
          />
        </div>
      </div>

      <CreateLeadModal
        open={createLeadOpen}
        onClose={() => setCreateLeadOpen(false)}
        onCreate={handleCreateLead}
        timeline={range}
        teamMembers={brokerTeamMembers}
      />
    </>
  );
}
