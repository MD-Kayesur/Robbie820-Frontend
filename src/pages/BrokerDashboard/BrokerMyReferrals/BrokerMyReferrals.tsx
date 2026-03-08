import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  Check,
  ChevronDown,
  Download,
  Eye,
  FilePlus2,
  MoreHorizontal,
  Plus,
  X,
  RefreshCw,
  Search,
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";

type ReferralStatus =
  | "New"
  | "Qualified"
  | "In Progress"
  | "Converted"
  | "Disqualified";

type ReferralRow = {
  id: number;
  clientName: string;
  referrerName: string;
  company: string;
  status: ReferralStatus;
  expectedCommission: number;
  basedOn: number;
  dateSubmitted: string;
  referredByTeam: string;
};

const allStatuses = [
  "All Statuses",
  "New",
  "Qualified",
  "In Progress",
  "Converted",
  "Disqualified",
] as const;

const allReferrers = [
  "All Referrers",
  "Tom Harris",
  "Alice Wong",
  "Sarah Connor",
  "Mark Stevens",
  "Alex Partners",
  "Partners Financial Group",
] as const;

const allTeamMembers = [
  "All Team Members",
  "Marcus Broker (You)",
  "Sarah Team",
  "John Staff",
] as const;

const rows: ReferralRow[] = [
  {
    id: 1,
    clientName: "Sarah Jenkins",
    referrerName: "Tom Harris",
    company: "Prime Estates",
    status: "New",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "Marcus Broker (You)",
  },
  {
    id: 2,
    clientName: "Michael Chen",
    referrerName: "Alice Wong",
    company: "Metro Partners",
    status: "Qualified",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "Sarah Team",
  },
  {
    id: 3,
    clientName: "Robert Fox",
    referrerName: "Sarah Connor",
    company: "Elite Realty",
    status: "In Progress",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "John Staff",
  },
  {
    id: 4,
    clientName: "Emily Blunt",
    referrerName: "Tom Harris",
    company: "Prime Estates",
    status: "Converted",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "Marcus Broker (You)",
  },
  {
    id: 5,
    clientName: "David Wright",
    referrerName: "Mark Stevens",
    company: "Direct Ref",
    status: "Disqualified",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "Sarah Team",
  },
  {
    id: 6,
    clientName: "Jessica Alba",
    referrerName: "Alice Wong",
    company: "Metro Partners",
    status: "In Progress",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "John Staff",
  },
  {
    id: 7,
    clientName: "Kevin Hart",
    referrerName: "Tom Harris",
    company: "Prime Estates",
    status: "New",
    expectedCommission: 4200,
    basedOn: 350000,
    dateSubmitted: "Nov 28, 2023",
    referredByTeam: "Marcus Broker (You)",
  },
];

function StatusPill({ status }: { status: ReferralStatus }) {
  const tone = {
    New: "text-[#149C44]",
    Qualified: "text-[#7C3AED]",
    "In Progress": "text-[#D89B00]",
    Converted: "text-[#149C44]",
    Disqualified: "text-[#6B7280]",
  }[status];

  return (
    <span className={cn("text-[13px] font-medium uppercase", tone)}>
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
        className="flex w-full items-center justify-between rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] px-4 py-2 text-left text-[15px] font-medium text-[#111827]"
      >
        <span className="truncate">{value}</span>
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-[#9CA3AF] transition",
            open && "rotate-180",
          )}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-30 w-full rounded-2xl border border-[#E5E7EB] bg-white p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          <div className="space-y-1">
            {options.map((option) => {
              const selected = option === value;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => {
                    onChange(option);
                    setOpen(false);
                  }}
                  className={cn(
                    "flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-[15px] text-[#111827] transition hover:bg-[#F3F4F6]",
                    selected && "bg-[#F2F4F7]",
                  )}
                >
                  <span>{option}</span>
                  {selected && <Check className="h-4 w-4 text-[#6B7280]" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function RowMenu({ onView }: { onView: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  const items = [
    { label: "View Lead Details", icon: Eye, onClick: onView },
    { label: "Update Status", icon: RefreshCw, onClick: () => setOpen(false) },
    { label: "Add Note", icon: FilePlus2, onClick: () => setOpen(false) },
  ];

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#111827] transition hover:bg-[#F3F4F6]"
      >
        <MoreHorizontal className="h-5 w-5" />
      </button>

      {open && (
        <div className="absolute right-0 top-[calc(100%+8px)] z-30 min-w-67.5 overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white shadow-[0_18px_40px_rgba(0,0,0,0.12)]">
          {items.map((item, index) => {
            const Icon = item.icon;

            return (
              <button
                key={item.label}
                type="button"
                onClick={item.onClick}
                className={cn(
                  "flex w-full items-center gap-3 px-5 py-4 text-left text-[15px] text-[#374151] transition hover:bg-[#F8FAFC]",
                  index !== items.length - 1 && "border-b border-[#ECEFF3]",
                )}
              >
                <Icon className="h-4 w-4 text-[#9CA3AF]" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
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
  const [statusMode, setStatusMode] = useState("Selected");
  const [fields, setFields] = useState({
    clientName: true,
    referrer: true,
    status: true,
    expectedCommission: true,
    dateSubmitted: true,
    settledDate: true,
  });

  const ref = useOutsideClose<HTMLDivElement>(open, onClose);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  const dateOptions = ["Last 30 Days", "MTD", "FYTD", "Custom"];
  const statusOptions = ["All", "Selected"];

  const toggleField = (key: keyof typeof fields) => {
    setFields((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const includeRows = [
    ["Client Name", "clientName"],
    ["Referrer", "referrer"],
    ["Status", "status"],
    ["Expected Commission", "expectedCommission"],
    ["Date Submitted", "dateSubmitted"],
    ["Settled Date", "settledDate"],
  ] as const;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 py-6">
      <div
        ref={ref}
        className="max-h-[95vh] w-full max-w-240 overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
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
                Status Filter
              </h3>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {statusOptions.map((option) => {
                const active = statusMode === option;
                return (
                  <button
                    key={option}
                    type="button"
                    onClick={() => setStatusMode(option)}
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
                      <Check className="h-5 w-5" />
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
  const [status, setStatus] =
    useState<(typeof allStatuses)[number]>("All Statuses");
  const [referrer, setReferrer] =
    useState<(typeof allReferrers)[number]>("All Referrers");
  const [teamMember, setTeamMember] =
    useState<(typeof allTeamMembers)[number]>("All Team Members");
  const [page, setPage] = useState(1);
  const [exportOpen, setExportOpen] = useState(false);

  const perPage = 7;

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesSearch =
        row.clientName.toLowerCase().includes(search.toLowerCase()) ||
        row.referrerName.toLowerCase().includes(search.toLowerCase()) ||
        row.company.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        status === "All Statuses" ? true : row.status === status;

      const matchesReferrer =
        referrer === "All Referrers" ? true : row.referrerName === referrer;

      const matchesTeam =
        teamMember === "All Team Members"
          ? true
          : row.referredByTeam === teamMember;

      return matchesSearch && matchesStatus && matchesReferrer && matchesTeam;
    });
  }, [search, status, referrer, teamMember]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / perPage));
  const currentPage = Math.min(page, totalPages);

  const paginatedRows = useMemo(() => {
    const start = (currentPage - 1) * perPage;
    return filteredRows.slice(start, start + perPage);
  }, [filteredRows, currentPage]);

  useEffect(() => {
    setPage(1);
  }, [search, status, referrer, teamMember]);

  return (
    <>
      <div className="space-y-5">
        {/* Header */}
        <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          {/* Header */}
          <div>
            <h1 className="text-lg font-medium leading-6 text-[#111827]">
              Referral Management
            </h1>
            <p className="mt-2.5 text-[#6B7280] leading-4">
              monitor and track incoming leads from your partner network.
            </p>
          </div>
          {/* Buttons */}
          <div className="flex flex-col gap-6 sm:flex-row">
            <button
              type="button"
              onClick={() => setExportOpen(true)}
              className="inline-flex py-2.5 items-center justify-center gap-2 rounded-lg bg-[#D3ECF7] px-5 text-[#374151] transition hover:opacity-90"
            >
              <Download className="h-4 w-4" />
              EXPORT CSV
            </button>

            <button
              type="button"
              className="inline-flex py-2.5 items-center justify-center gap-2 rounded-lg bg-[#12A9F4] px-5 text-white transition hover:opacity-90"
            >
              <Plus className="h-4 w-4" />
              Create Lead
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
          <div className="grid grid-cols-1 gap-3 xl:grid-cols-[1.25fr_1fr_1fr_1fr_210px]">
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search clients or referrers..."
                className="py-2 w-full rounded-xl border border-[#E4E4E7] bg-[#F7F7F8] pl-11 pr-4 text-[14px] text-[#111827] outline-none placeholder:text-[#9CA3AF]"
              />
            </div>

            <FilterDropdown
              value={status}
              options={allStatuses}
              onChange={setStatus}
            />

            <FilterDropdown
              value={referrer}
              options={allReferrers}
              onChange={setReferrer}
            />

            <FilterDropdown
              value={teamMember}
              options={allTeamMembers}
              onChange={setTeamMember}
            />

            <button
              type="button"
              className="inline-flex items-center justify-center gap-3 rounded-xl border border-[#E4E4E7] bg-white px-4 text-[15px] font-medium text-[#111827] text-nowrap"
            >
              <Calendar className="h-4 w-4 text-[#111827]" />
              Nov 2025 - Jan 2026
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-[18px] border border-[#E5E7EB] bg-white">
          <div className="overflow-x-auto">
            <table className="min-w-245 w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB] font-medium text-black">
                  <th className="px-8  py-10 text-left uppercase">
                    Client Name
                  </th>
                  <th className="px-4 py-10 text-left uppercase">Referrer</th>
                  <th className="px-4 py-10 text-left uppercase">Status</th>
                  <th className="px-4 py-10 text-left uppercase">
                    Expected Comm.
                  </th>
                  <th className="px-4 py-10 text-left uppercase">
                    Date Submitted
                  </th>
                  <th className="px-4 py-10 text-left uppercase">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedRows.map((row) => (
                  <tr
                    key={row.id}
                    className="border-b border-[#ECEFF3] last:border-b-0"
                  >
                    <td className="px-8 py-5 text-[15px] font-medium uppercase text-[#4B5563]">
                      {row.clientName}
                    </td>

                    <td className="px-4 py-5">
                      <div className="text-[15px] font-medium uppercase text-[#4B5563]">
                        {row.referrerName}
                      </div>
                      <div className="mt-1 text-[12px] uppercase text-[#8A8F98]">
                        {row.company}
                      </div>
                    </td>

                    <td className="px-4 py-5">
                      <StatusPill status={row.status} />
                    </td>

                    <td className="px-4 py-5">
                      <div className="text-[15px] font-medium text-[#4B5563]">
                        ${row.expectedCommission.toLocaleString()}
                      </div>
                      <div className="mt-1 text-[12px] uppercase text-[#8A8F98]">
                        on ${row.basedOn.toLocaleString()}
                      </div>
                    </td>

                    <td className="px-4 py-5 text-[15px] text-[#4B5563]">
                      {row.dateSubmitted}
                    </td>

                    <td className="px-4 py-5">
                      <RowMenu
                        onView={() => console.log("View details:", row)}
                      />
                    </td>
                  </tr>
                ))}

                {paginatedRows.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-8 py-12 text-center text-[15px] text-[#6B7280]"
                    >
                      No referrals found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col gap-4 px-6 py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[13px] uppercase text-[#12A9F4]">
              Showing {paginatedRows.length} of {filteredRows.length} referrals
            </p>

            <div className="flex items-center gap-3 self-end">
              <button
                type="button"
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-[#CDE8F4] px-5 text-[14px] text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span className="text-lg leading-none">‹</span>
                Next
              </button>

              <button
                type="button"
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
                className="inline-flex h-10 items-center gap-2 rounded-md bg-black px-5 text-[14px] text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
                <span className="text-lg leading-none">›</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <ExportModal open={exportOpen} onClose={() => setExportOpen(false)} />
    </>
  );
};

export default BrokerMyReferrals;
