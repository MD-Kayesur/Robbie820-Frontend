// src/pages/BrokerDashboard/BrokerOverview/BrokerOverview.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  FileText,
  TrendingUp,
  Users,
} from "lucide-react";

import type { Lead, LeadStatus, RangeKey } from "./types";
import { brokerTeamMembers, leadsMock, referrerOptions } from "./mock";
import { formatShortMoney } from "./utils";

import CreateLeadModal from "../../../components/BrokerDashboardCom/BOverviewCom/CreateLeadModal";
import OverviewHeader from "../../../components/BrokerDashboardCom/BOverviewCom/OverviewHeader";
import OverviewFilters from "../../../components/BrokerDashboardCom/BOverviewCom/OverviewFilters";
import LoanValueChart from "../../../components/BrokerDashboardCom/BOverviewCom/LoanValueChart";
import RecentLeadsTable from "../../../components/BrokerDashboardCom/BOverviewCom/RecentLeadsTable";

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
    <div className="rounded-2xl border border-[#E6EAF0] bg-white px-4 py-4 shadow-sm md:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-medium leading-4 text-[#9AA3AF] md:text-[12px]">
            {title}
          </p>

          <h3 className="mt-2 wrap-break-word text-[22px] font-semibold leading-none text-[#111827] md:text-[26px] xl:text-[28px]">
            {value}
          </h3>

          {badge ? (
            <p className="mt-3 flex flex-wrap items-center gap-x-1 gap-y-1 text-[12px] text-[#6B7280]">
              <TrendingUp className="h-4 w-4 text-[#16A34A]" strokeWidth={2} />
              <span className="font-medium text-[#16A34A]">{badge}</span>
              <span>vs last month</span>
            </p>
          ) : null}
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB] md:h-11 md:w-11">
          <Icon className="h-5 w-5" strokeWidth={2} />
        </div>
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
  const [createLeadOpen, setCreateLeadOpen] = useState(false);
  const [leads, setLeads] = useState<Lead[]>(leadsMock);

  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesRange = lead.timeline === range;
      const query = search.trim().toLowerCase();

      const matchesSearch =
        !query ||
        lead.borrowerName.toLowerCase().includes(query) ||
        lead.referrerName.toLowerCase().includes(query) ||
        lead.partnerCompany.toLowerCase().includes(query) ||
        lead.leadStage.toLowerCase().includes(query);

      const matchesStatus =
        statusFilter === "ALL" || lead.leadStage === statusFilter;

      return matchesRange && matchesSearch && matchesStatus;
    });
  }, [leads, range, search, statusFilter]);

  const metrics = useMemo(() => {
    const activeReferrals = filteredLeads.length;

    const pipelineCount = filteredLeads.filter(
      (lead) =>
        lead.leadStage === "NEW REFERRAL" ||
        lead.leadStage === "CONTACTED" ||
        lead.leadStage === "APPLICATION STARTED" ||
        lead.leadStage === "SUBMITTED TO LENDER",
    ).length;

    const conversionBase = filteredLeads.filter(
      (lead) => lead.leadStage !== "NEW REFERRAL",
    ).length;

    const convertedCount = filteredLeads.filter(
      (lead) => lead.leadStage === "APPROVED" || lead.leadStage === "FUNDED",
    ).length;

    const conversionRate = conversionBase
      ? Number(((convertedCount / conversionBase) * 100).toFixed(1))
      : 0;

    const totalCommission = filteredLeads.reduce(
      (sum, lead) => sum + lead.totalCommission,
      0,
    );

    return {
      activeReferrals,
      pipelineCount,
      conversionRate,
      totalCommission,
    };
  }, [filteredLeads]);

  const topReferrers = useMemo(() => {
    const grouped = filteredLeads.reduce<
      Record<
        string,
        {
          name: string;
          referrals: number;
          amount: number;
        }
      >
    >((acc, lead) => {
      if (!acc[lead.referrerName]) {
        acc[lead.referrerName] = {
          name: lead.referrerName,
          referrals: 0,
          amount: 0,
        };
      }

      acc[lead.referrerName].referrals += 1;
      acc[lead.referrerName].amount += lead.estimatedLoanAmount;

      return acc;
    }, {});

    return Object.values(grouped)
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);
  }, [filteredLeads]);

  const stageOverview = useMemo(() => {
    const counts: Record<LeadStatus, number> = {
      "NEW REFERRAL": 0,
      CONTACTED: 0,
      "APPLICATION STARTED": 0,
      "SUBMITTED TO LENDER": 0,
      APPROVED: 0,
      FUNDED: 0,
    };

    filteredLeads.forEach((lead) => {
      counts[lead.leadStage] += 1;
    });

    return [
      { label: "New Referral", value: counts["NEW REFERRAL"], tone: "slate" },
      { label: "Contacted", value: counts["CONTACTED"], tone: "blue" },
      {
        label: "Application Started",
        value: counts["APPLICATION STARTED"],
        tone: "orange",
      },
      {
        label: "Submitted to Lender",
        value: counts["SUBMITTED TO LENDER"],
        tone: "purple",
      },
      { label: "Approved", value: counts["APPROVED"], tone: "green" },
      { label: "Funded", value: counts["FUNDED"], tone: "emerald" },
    ];
  }, [filteredLeads]);

  const handleCreateLead = (lead: Lead) => {
    setLeads((prev) => [lead, ...prev]);
  };

  const handleApplyDate = () => {
    if (dateRange.from && dateRange.to) {
      setDateLabel(`${dateRange.from} - ${dateRange.to}`);
    }
  };

  const totalLeads = stageOverview.reduce((sum, stage) => sum + stage.value, 0);
  const fundedStage = stageOverview.find((stage) => stage.label === "Funded");
  const fundedPercent = totalLeads
    ? ((fundedStage?.value ?? 0) / totalLeads) * 100
    : 0;

  return (
    <>
      <div className="mx-auto max-w-360 space-y-4 md:space-y-5 lg:space-y-6">
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

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4 xl:gap-4">
          <MetricCard
            title="Total Active Referrals"
            value={metrics.activeReferrals.toLocaleString()}
            badge="+12.5%"
            icon={Users}
          />
          <MetricCard
            title="Loans in Pipeline"
            value={metrics.pipelineCount.toLocaleString()}
            badge="+8.2%"
            icon={FileText}
          />
          <MetricCard
            title="Conversion Rate"
            value={`${metrics.conversionRate}%`}
            badge="+2.1%"
            icon={ChartNoAxesColumnIncreasing}
          />
          <MetricCard
            title="Total Commission Generated"
            value={formatShortMoney(metrics.totalCommission)}
            badge="+18.7%"
            icon={CircleDollarSign}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 2xl:grid-cols-[360px_minmax(0,1fr)]">
          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-[16px] font-semibold text-[#111827] md:text-[18px]">
                Top Referrers
              </h2>

              <button
                type="button"
                className="shrink-0 text-[12px] font-medium text-[#1BAEF5] md:text-[13px]"
              >
                View All
              </button>
            </div>

            <div className="mt-4 space-y-3 md:mt-5 md:space-y-4">
              {topReferrers.map((item, index) => {
                const initials = item.name
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase();

                const toneClasses = [
                  "bg-[#3B82F6]",
                  "bg-[#A855F7]",
                  "bg-[#22C55E]",
                  "bg-[#F97316]",
                  "bg-[#EC4899]",
                ];

                return (
                  <div
                    key={item.name}
                    className="flex items-center justify-between gap-3"
                  >
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${
                          toneClasses[index % toneClasses.length]
                        }`}
                      >
                        {initials}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-[13px] font-medium text-[#111827] md:text-[14px]">
                          {item.name}
                        </p>
                        <p className="text-[11px] text-[#9CA3AF] md:text-[12px]">
                          {item.referrals} referrals
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-[13px] font-semibold text-[#111827] md:text-[14px]">
                        {formatShortMoney(item.amount)}
                      </p>
                      <p className="text-[11px] text-[#16A34A] md:text-[12px]">
                        {formatShortMoney(item.amount * 0.01)}
                      </p>
                    </div>
                  </div>
                );
              })}

              {topReferrers.length === 0 ? (
                <p className="text-sm text-[#9CA3AF]">No referrers found.</p>
              ) : null}
            </div>
          </section>

          <section className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
            <div className="flex flex-col gap-1">
              <h2 className="text-[16px] font-semibold text-[#111827] md:text-[18px]">
                Loan Pipeline Overview
              </h2>
              <p className="text-[12px] text-[#9CA3AF]">
                {metrics.pipelineCount} loans in pipeline
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 md:mt-5 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-6">
              {stageOverview.map((item) => {
                const toneMap = {
                  slate: "border-[#E5E7EB] bg-[#F3F4F6] text-[#666666]",
                  blue: "border-[#BEDBFF] bg-[#EFF6FF] text-[#00B4FE]",
                  orange: "border-[#FFF085] bg-[#FEFCE8] text-[#D76C6C]",
                  purple: "border-[#E9D4FF] bg-[#FAF5FF] text-[#853AE0]",
                  green: "border-[#4DF593] bg-[#F8FFFA] text-[#4DF593]",
                  emerald: "border-[#A4F4CF] bg-[#ECFDF5] text-[#1B7231]",
                } as const;

                return (
                  <div
                    key={item.label}
                    className={`rounded-xl border p-3 md:p-4 ${toneMap[item.tone as keyof typeof toneMap]}`}
                  >
                    <p className="text-[22px] font-semibold leading-none md:text-[26px] xl:text-[28px]">
                      {item.value}
                    </p>
                    <p className="mt-2 text-[11px] font-medium leading-4 md:text-[12px]">
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div className="mt-5 md:mt-6">
              <div className="mb-2 flex items-center justify-between gap-3">
                <p className="text-[12px] text-[#9CA3AF]">Pipeline Progress</p>
                <p className="text-[12px] text-[#9CA3AF]">
                  {fundedPercent.toFixed(0)}% funded
                </p>
              </div>

              <div className="flex h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
                {stageOverview.map((item, index) => {
                  const total = stageOverview.reduce(
                    (sum, stage) => sum + stage.value,
                    0,
                  );
                  const width = total ? (item.value / total) * 100 : 0;

                  const colors = [
                    "#666666",
                    "#00B4FE",
                    "#D76C6C",
                    "#853AE0",
                    "#4DF593",
                    "#1B7231",
                  ];

                  return (
                    <div
                      key={item.label}
                      style={{
                        width: `${width}%`,
                        backgroundColor: colors[index],
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </section>
        </div>

        <LoanValueChart range={range} />

        <RecentLeadsTable
          leads={filteredLeads}
          onOpenDetails={(id) => navigate(`/broker-dashboard/leads/${id}`)}
          onUpdateStatus={() => {}}
          onAddNote={() => {}}
        />
      </div>

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
}
