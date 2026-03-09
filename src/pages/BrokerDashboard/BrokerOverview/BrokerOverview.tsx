// src/pages/BrokerDashboard/BrokerOverview/BrokerOverview.tsx
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowUpRight, BarChart3, DollarSign, Users2 } from "lucide-react";

import type { Lead, LeadStatus, RangeKey } from "./types";
import { brokerTeamMembers, leadsMock, referrerOptions } from "./mock";
import { formatShortMoney } from "./utils";

import CreateLeadModal from "../../../components/BrokerDashboardCom/BOverviewCom/modals/CreateLeadModal";
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
    <div className="rounded-2xl border border-[#E6EAF0] bg-white px-4 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[11px] font-medium text-[#9AA3AF]">{title}</p>
          <h3 className="mt-2 text-[28px] font-semibold leading-none text-[#111827]">
            {value}
          </h3>

          {badge ? (
            <p className="mt-3 text-[12px] text-[#6B7280]">
              <span className="font-medium text-[#16A34A]">{badge}</span> vs
              last month
            </p>
          ) : null}
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF4FF] text-[#2563EB]">
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
              title="Total Active Referrals"
              value={metrics.activeReferrals.toLocaleString()}
              badge="+12.5%"
              icon={Users2}
            />
            <MetricCard
              title="Loans in Pipeline"
              value={metrics.pipelineCount.toLocaleString()}
              badge="+8.2%"
              icon={BarChart3}
            />
            <MetricCard
              title="Conversion Rate"
              value={`${metrics.conversionRate}%`}
              badge="+2.1%"
              icon={ArrowUpRight}
            />
            <MetricCard
              title="Total Commission Generated"
              value={formatShortMoney(metrics.totalCommission)}
              badge="+18.7%"
              icon={DollarSign}
            />
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-[320px_minmax(0,1fr)]">
            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-[18px] font-semibold text-[#111827]">
                  Top Referrers
                </h2>

                <button
                  type="button"
                  className="text-[13px] font-medium text-[#1BAEF5]"
                >
                  View All
                </button>
              </div>

              <div className="mt-5 space-y-4">
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
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold text-white ${
                            toneClasses[index % toneClasses.length]
                          }`}
                        >
                          {initials}
                        </div>

                        <div className="min-w-0">
                          <p className="truncate text-[14px] font-medium text-[#111827]">
                            {item.name}
                          </p>
                          <p className="text-[12px] text-[#9CA3AF]">
                            {item.referrals} referrals
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <p className="text-[14px] font-semibold text-[#111827]">
                          {formatShortMoney(item.amount)}
                        </p>
                        <p className="text-[12px] text-[#16A34A]">
                          {formatShortMoney(item.amount * 0.01)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-[#E5E7EB] bg-white p-5">
              <div>
                <h2 className="text-[18px] font-semibold text-[#111827]">
                  Loan Pipeline Overview
                </h2>
                <p className="mt-1 text-[12px] text-[#9CA3AF]">
                  {metrics.pipelineCount} loans in pipeline
                </p>
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-6">
                {stageOverview.map((item) => {
                  const toneMap = {
                    slate: "border-[#E5E7EB] bg-[#F8FAFC] text-[#475569]",
                    blue: "border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EB]",
                    orange: "border-[#FED7AA] bg-[#FFF7ED] text-[#F97316]",
                    purple: "border-[#E9D5FF] bg-[#FAF5FF] text-[#9333EA]",
                    green: "border-[#BBF7D0] bg-[#F0FDF4] text-[#16A34A]",
                    emerald: "border-[#A7F3D0] bg-[#ECFDF5] text-[#059669]",
                  } as const;

                  return (
                    <div
                      key={item.label}
                      className={`rounded-xl border p-4 ${toneMap[item.tone as keyof typeof toneMap]}`}
                    >
                      <p className="text-[28px] font-semibold leading-none">
                        {item.value}
                      </p>
                      <p className="mt-2 text-[12px] font-medium">
                        {item.label}
                      </p>
                    </div>
                  );
                })}
              </div>

              <div className="mt-6">
                <div className="mb-2 flex items-center justify-between">
                  <p className="text-[12px] text-[#9CA3AF]">
                    Pipeline Progress
                  </p>
                  <p className="text-[12px] text-[#9CA3AF]">% funded</p>
                </div>

                <div className="flex h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
                  {stageOverview.map((item, index) => {
                    const total = stageOverview.reduce(
                      (sum, stage) => sum + stage.value,
                      0,
                    );
                    const width = total ? (item.value / total) * 100 : 0;

                    const colors = [
                      "#9CA3AF",
                      "#38BDF8",
                      "#FB7185",
                      "#A855F7",
                      "#4ADE80",
                      "#10B981",
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
        referrers={referrerOptions}
      />
    </>
  );
}
