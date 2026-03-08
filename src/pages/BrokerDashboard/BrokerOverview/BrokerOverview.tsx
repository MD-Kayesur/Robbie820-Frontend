import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Clock3,
  Filter,
  MoreHorizontal,
  Plus,
  RefreshCcw,
  Search,
  Share2,
  TrendingUp,
  Users2,
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { Lead, LeadStatus, RangeKey } from "./types";
import { brokerTeamMembers, leadsMock } from "./mock";
import { formatMoney, formatShortMoney, mapLeadToTableRow } from "./utils";
import CreateLeadModal from "../../../components/BrokerDashboardCom/BOverivewCom/modals/CreateLeadModal";

const chartDataByRange = {
  monthly: [
    { label: "Jan", value: 2.2 },
    { label: "Feb", value: 3.8 },
    { label: "Mar", value: 2.0 },
    { label: "Apr", value: 2.9 },
    { label: "May", value: 1.3 },
    { label: "Jun", value: 2.1 },
    { label: "Jul", value: 1.6 },
  ],
  mtd: [
    { label: "Jan", value: 1.8 },
    { label: "Feb", value: 2.3 },
    { label: "Mar", value: 2.0 },
    { label: "Apr", value: 2.5 },
    { label: "May", value: 2.2 },
    { label: "Jun", value: 2.9 },
    { label: "Jul", value: 2.4 },
  ],
  fytd: [
    { label: "Jan", value: 2.5 },
    { label: "Feb", value: 4.1 },
    { label: "Mar", value: 3.2 },
    { label: "Apr", value: 4.5 },
    { label: "May", value: 3.6 },
    { label: "Jun", value: 4.2 },
    { label: "Jul", value: 4.8 },
  ],
} satisfies Record<RangeKey, { label: string; value: number }[]>;

const statusClassMap: Record<LeadStatus, string> = {
  "NEW LEAD": "text-slate-500",
  CONTACTED: "text-sky-600",
  "APPLICATION IN PROGRESS": "text-[#4D59FF]",
  "SUBMITTED TO LENDER": "text-indigo-600",
  "UNDER REVIEW": "text-violet-600",
  APPROVED: "text-[#2E9A4D]",
  "AWAITING REFERRAL FEE": "text-[#D6A100]",
  FUNDED: "text-[#0E7ADB]",
  "SETTLEMENT COMPLETED": "text-emerald-600",
};

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

function ActionMenu({
  lead,
  onOpenDetails,
}: {
  lead: Lead;
  onOpenDetails: (id: string) => void;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-[#EFF6FB] text-[#7C8B97] transition hover:bg-[#E4F0F7]"
        >
          <MoreHorizontal className="h-5 w-5" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        align="end"
        className="w-62.5 rounded-[22px] border border-[#E7E7E7] bg-white p-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
      >
        <div className="space-y-1.5">
          <button
            type="button"
            onClick={() => onOpenDetails(lead.id)}
            className="w-full rounded-xl px-4 py-3 text-left text-[16px] font-medium text-[#2A2A2A] transition hover:bg-[#F7F7F7]"
          >
            View Lead Details
          </button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default function BrokerOverview() {
  const navigate = useNavigate();

  const [range, setRange] = useState<RangeKey>("mtd");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<LeadStatus | "ALL">("ALL");
  const [dateLabel, setDateLabel] = useState("Nov 2025 - Jan 2026");
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
        statusFilter === "ALL" ? true : lead.leadStage === statusFilter;

      return matchesRange && matchesSearch && matchesStatus;
    });
  }, [leads, range, search, statusFilter]);

  const tableRows = useMemo(
    () => filteredLeads.map(mapLeadToTableRow),
    [filteredLeads],
  );

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
          <div className="hidden lg:flex lg:items-start lg:justify-between">
            <div>
              <h1 className="text-[22px] font-semibold leading-none text-[#202020]">
                Broker Dashboard
              </h1>
              <p className="mt-2 text-[14px] text-[#7D7D7D]">
                overview of your referral pipeline and performance
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden xl:block">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#A8A8A8]" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="search referrals..."
                  className="h-11 w-70 rounded-lg border border-[#E6E6E6] bg-white pl-10 pr-4 text-[13px] text-[#333] outline-none placeholder:text-[#B8B8B8]"
                />
              </div>

              <button
                type="button"
                className="relative inline-flex h-11 w-11 items-center justify-center rounded-lg border border-[#E6E6E6] bg-white text-[#444]"
              >
                <span className="sr-only">Notifications</span>
                <div className="h-4 w-4 rounded-full border border-current" />
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-wrap items-center gap-3">
              <div className="inline-flex rounded-xl border border-[#DDDDDD] bg-white p-1">
                {(["monthly", "mtd", "fytd"] as const).map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => setRange(item)}
                    className={cn(
                      "rounded-md px-5 py-2 text-[12px] font-medium transition",
                      range === item
                        ? "bg-black text-white"
                        : "text-[#222] hover:bg-[#F4F4F4]",
                    )}
                  >
                    {item === "monthly" ? "This Monthly" : item.toUpperCase()}
                  </button>
                ))}
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#DDDDDD] bg-white px-4 text-[13px] font-medium text-[#222]"
                  >
                    <Filter className="h-4 w-4" strokeWidth={1.8} />
                    Filter
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-65 rounded-2xl border border-[#E7E7E7] p-4">
                  <div className="space-y-3">
                    <p className="text-[14px] font-semibold text-[#222]">
                      Lead Status
                    </p>

                    {(
                      [
                        "ALL",
                        "NEW LEAD",
                        "CONTACTED",
                        "APPLICATION IN PROGRESS",
                        "SUBMITTED TO LENDER",
                        "UNDER REVIEW",
                        "APPROVED",
                        "AWAITING REFERRAL FEE",
                        "FUNDED",
                        "SETTLEMENT COMPLETED",
                      ] as const
                    ).map((status) => (
                      <button
                        key={status}
                        type="button"
                        onClick={() => setStatusFilter(status)}
                        className={cn(
                          "flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-[14px] transition",
                          statusFilter === status
                            ? "bg-[#EFF6FB] text-[#1BAEF5]"
                            : "hover:bg-[#F7F7F7] text-[#2A2A2A]",
                        )}
                      >
                        <span>{status}</span>
                        {statusFilter === status ? (
                          <Check className="h-4 w-4" />
                        ) : null}
                      </button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>

              <button
                type="button"
                onClick={() => setDateLabel("Nov 2025 - Jan 2026")}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-[#DDDDDD] bg-white px-4 text-[13px] font-medium text-[#222]"
              >
                <Calendar className="h-4 w-4" strokeWidth={1.8} />
                {dateLabel}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setCreateLeadOpen(true)}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-md bg-[#1BAEF5] px-5 text-[13px] font-medium text-white transition hover:bg-[#099fe8]"
            >
              <Plus className="h-4 w-4" />
              Create Lead
            </button>
          </div>

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
            <section className="rounded-2xl border border-[#D9E7F2] bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-[18px] font-medium text-[#3A3A3A]">
                  Weekly Loan Value
                </h2>

                <button
                  type="button"
                  className="inline-flex h-10 items-center gap-2 rounded-md bg-[#A9C6D7] px-4 text-[13px] font-medium text-[#202020]"
                >
                  Last 6 Months
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>

              <div className="mt-5 h-55 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={chartDataByRange[range]}
                    margin={{ top: 10, right: 10, left: -18, bottom: 0 }}
                  >
                    <CartesianGrid stroke="#EEEEEE" vertical={false} />
                    <XAxis
                      dataKey="label"
                      tick={{ fontSize: 11, fill: "#8C8C8C" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      domain={[0, 5]}
                      ticks={[0, 1, 2, 3, 4, 5]}
                      tickFormatter={(value) => `$${value}M`}
                      tick={{ fontSize: 11, fill: "#B4B4B4" }}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}M`, "Loan Value"]}
                    />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#77CFFD"
                      strokeWidth={2}
                      dot={{ r: 3, fill: "#77CFFD" }}
                      activeDot={{ r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="rounded-2xl border border-[#D9E7F2] bg-white p-4 sm:p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Share2 className="h-4.5 w-4.5 text-[#8A8A8A]" />
                  <h2 className="text-[18px] font-medium text-[#222]">
                    CRM Integration
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={handleMockRefresh}
                  className="text-[#8A8A8A] transition hover:text-[#222]"
                >
                  <RefreshCcw
                    className={cn(
                      "h-4 w-4",
                      crmStatus === "syncing" && "animate-spin",
                    )}
                  />
                </button>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black text-[20px] font-semibold text-white">
                  S
                </div>

                <div>
                  <h3 className="text-[18px] font-medium leading-none text-[#181818]">
                    Salesforce Enterprise
                  </h3>
                  <p className="mt-1 text-[12px] text-[#8D8D8D]">
                    api integration v2.4.1
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl border border-[#9FD1AA] bg-[#EEF7F0] px-4 py-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[#4B9961]">
                    <div className="flex h-4 w-4 items-center justify-center rounded-full border border-[#4B9961]">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#4B9961]" />
                    </div>
                    <span className="text-[13px] font-medium">
                      {crmStatus === "syncing" ? "syncing" : "operational"}
                    </span>
                  </div>

                  <div className="h-2.5 w-2.5 rounded-full bg-[#2E9A4D]" />
                </div>
              </div>

              <div className="mt-5 space-y-2">
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#8A8A8A]">auto-sync referrals</span>
                  <span className="font-medium text-[#222]">Enabled</span>
                </div>
                <div className="flex items-center justify-between text-[14px]">
                  <span className="text-[#8A8A8A]">last sync</span>
                  <span className="font-medium text-[#222]">{lastSync}</span>
                </div>
              </div>

              <div className="mt-6 text-center text-[13px] text-[#4B9961]">
                sync type: two-way sync enabled
              </div>
            </section>
          </div>

          <section className="overflow-hidden rounded-2xl border border-[#E1E1E1] bg-white">
            <div className="flex items-center justify-between px-4 py-4 sm:px-5">
              <h2 className="text-[18px] font-medium text-[#222]">
                Recent Leads
              </h2>

              <button
                type="button"
                className="inline-flex items-center gap-1 text-[14px] font-medium text-[#1BAEF5]"
              >
                View All
                <ArrowUpRight className="h-4 w-4" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-245 w-full border-collapse">
                <thead>
                  <tr className="border-b border-[#ECECEC] text-left">
                    <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                      Borrower
                    </th>
                    <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                      Amount
                    </th>
                    <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                      Last Updated
                    </th>
                    <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                      Status
                    </th>
                    <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                      Rate
                    </th>
                    <th className="px-5 py-3 text-[12px] font-medium uppercase text-[#555]">
                      Exp. Comm To Referrer
                    </th>
                    <th className="px-5 py-3 text-center text-[12px] font-medium uppercase text-[#555]">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {tableRows.length ? (
                    tableRows.map((row) => {
                      const fullLead = filteredLeads.find(
                        (lead) => lead.id === row.id,
                      );
                      if (!fullLead) return null;

                      return (
                        <tr
                          key={row.id}
                          className="border-b border-[#F0F0F0] last:border-b-0"
                        >
                          <td className="px-5 py-4">
                            <div>
                              <p className="text-[16px] font-medium text-[#222]">
                                {row.name}
                              </p>
                              <p className="text-[12px] text-[#8D8D8D]">
                                ref: {row.ref}
                              </p>
                            </div>
                          </td>

                          <td className="px-5 py-4 text-[16px] text-[#4A4A4A]">
                            {formatMoney(row.amount)}
                          </td>

                          <td className="px-5 py-4 text-[15px] text-[#666]">
                            {row.date}
                          </td>

                          <td
                            className={cn(
                              "px-5 py-4 text-[14px] font-medium",
                              statusClassMap[row.status],
                            )}
                          >
                            {row.status}
                          </td>

                          <td className="px-5 py-4 text-[15px] text-[#4A4A4A]">
                            {row.rate}%
                          </td>

                          <td className="px-5 py-4 text-[15px] font-medium text-[#2E9A4D]">
                            {formatMoney(row.commission)}
                          </td>

                          <td className="px-5 py-4 text-center">
                            <ActionMenu
                              lead={fullLead}
                              onOpenDetails={(id) =>
                                navigate(`/broker-dashboard/leads/${id}`)
                              }
                            />
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="px-5 py-10 text-center text-[14px] text-[#8D8D8D]"
                      >
                        No leads found for the current filters.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
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
