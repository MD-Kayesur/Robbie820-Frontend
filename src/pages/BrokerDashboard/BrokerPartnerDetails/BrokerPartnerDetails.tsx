import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  CalendarDays,
  Download,
  Edit,
  Mail,
  MoreVertical,
  Phone,
  Save,
  User,
  Wallet,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  bankingDetailsMock,
  commissionAgreementsMock,
  internalPartnerNotesMock,
  partnerConfigurationsMock,
  partnerProfilesMock,
  partnerRecentReferralsMock,
} from "../BrokerPartnerProfiles/mock";
import { appPreferencesMock } from "../BrokerSettings/mock";
import PartnerLegalDocuments from "@/components/BrokerDashboardCom/BPartnerProfileCom/PartnerLegalDocuments";
import type {
  PartnerRecentReferral,
  ReferralFeeStatus,
  ReferralStatus,
} from "../BrokerPartnerProfiles/types";

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatPrettyDate(date: string) {
  if (!date) return "-";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return date;

  return parsed.toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function MetricCard({
  title,
  value,
  icon,
  iconClassName,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
  iconClassName: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-[#6B7280]">{title}</p>
          <p className="mt-2 wrap-break-word text-[24px] font-semibold leading-tight text-[#111827] md:text-[28px] md:leading-none">
            {value}
          </p>
        </div>

        <div
          className={cn(
            "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
            iconClassName,
          )}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}

function StatusPill({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

function getReferralStatusClass(status: ReferralStatus) {
  switch (status) {
    case "In Progress":
      return "bg-[#DBEAFE] text-[#2563EB]";
    case "Approved":
      return "bg-[#DCFCE7] text-[#16A34A]";
    case "Under Review":
      return "bg-[#FEF3C7] text-[#CA8A04]";
    case "Completed":
      return "bg-[#E5E7EB] text-[#374151]";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getFeeStatusClass(status: ReferralFeeStatus) {
  switch (status) {
    case "Paid":
      return "bg-[#DCFCE7] text-[#16A34A]";
    case "Pending":
      return "bg-[#FCE7F3] text-[#DB2777]";
    case "Not Paid":
      return "bg-[#F3F4F6] text-[#6B7280]";
    default:
      return "bg-slate-100 text-slate-600";
  }
}

function ReferralActionsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-[#6B7280] transition hover:bg-slate-100"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
            aria-label="Close actions"
          />
          <div className="absolute right-0 top-9 z-20 min-w-40 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-slate-50"
            >
              View Referral
            </button>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="block w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-slate-50"
            >
              Open Lead
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function ReferralMobileCard({ item }: { item: PartnerRecentReferral }) {
  return (
    <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[#111827]">
            {item.clientName}
          </p>
          <p className="mt-2 text-xs text-[#6B7280]">
            Submitted {item.dateSubmitted}
          </p>
        </div>

        <ReferralActionsMenu />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <StatusPill className={getReferralStatusClass(item.status)}>
          {item.status}
        </StatusPill>

        <StatusPill className={getFeeStatusClass(item.referralFeeStatus)}>
          {item.referralFeeStatus}
        </StatusPill>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-4">
        <div>
          <p className="text-[11px] text-[#6B7280]">Loan Amount</p>
          <p className="mt-1 text-sm font-medium text-[#111827]">
            {formatMoney(item.loanAmount)}
          </p>
        </div>

        <div>
          <p className="text-[11px] text-[#6B7280]">Commission</p>
          <p className="mt-1 text-sm font-medium text-[#111827]">
            {formatMoney(item.commissionGenerated)}
          </p>
        </div>
      </div>
    </div>
  );
}

const BrokerPartnerDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [, setNote] = useState("");

  const partner = useMemo(
    () => partnerProfilesMock.find((item) => item.id === id),
    [id],
  );

  const agreement = useMemo(
    () => commissionAgreementsMock.find((item) => item.partnerId === id),
    [id],
  );

  const banking = useMemo(
    () => bankingDetailsMock.find((item) => item.partnerId === id),
    [id],
  );

  const config = useMemo(
    () => partnerConfigurationsMock.find((item) => item.partnerId === id),
    [id],
  );

  const referrals = useMemo(
    () => partnerRecentReferralsMock.filter((item) => item.partnerId === id),
    [id],
  );

  const savedNote = useMemo(
    () =>
      internalPartnerNotesMock.find((item) => item.partnerId === id)?.note ??
      "",
    [id],
  );

  const [draftNote, setDraftNote] = useState(savedNote);

  if (!partner) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
        <p className="text-sm text-[#6B7280]">Partner not found.</p>
      </div>
    );
  }

  const PartnerIcon = partner.partnerType === "Company" ? Building2 : User;

  const totalCommission = referrals.reduce(
    (sum, item) => sum + item.commissionGenerated,
    0,
  );

  const handleSaveNote = () => {
    setNote(draftNote);
  };

  return (
    <section className="space-y-4 md:space-y-6">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <button
            type="button"
            onClick={() => navigate("/broker-dashboard/partner-profile")}
            className="inline-flex items-center gap-2 text-sm leading-none text-[#6B7280] transition hover:text-[#111827]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Partner Profiles
          </button>

          <div className="flex flex-wrap items-center gap-3">
            <h1 className="wrap-break-word text-[28px] font-semibold leading-tight text-[#111827] md:text-[34px] xl:text-[38px] xl:leading-none">
              {partner.partnerName}
            </h1>

            <StatusPill className="bg-[#DCFCE7] text-[#16A34A]">
              {partner.status}
            </StatusPill>
          </div>

          <p className="text-sm text-[#6B7280]">
            View partner details, agreement, and performance.
          </p>
        </div>

        <div className="flex w-full flex-col gap-3 md:w-auto md:flex-row">
          <button
            type="button"
            onClick={() => {
              alert(
                "Downloading Full Agreement: " +
                (agreement?.agreementName || "Standard Referral Agreement"),
              );
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50 md:w-auto"
          >
            <Download className="h-4 w-4" />
            Download Full Agreement
          </button>

          <button
            type="button"
            onClick={() =>
              navigate(`/broker-dashboard/partner-profile/${partner.id}/edit`)
            }
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] px-4 text-sm font-medium text-white transition hover:bg-[#0284C7] md:w-auto"
          >
            <Edit className="h-4 w-4" />
            Edit Configuration
          </button>

          <button
            type="button"
            onClick={() => {
              alert("Portal access reset link sent to " + partner.email);
            }}
            className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50 md:w-auto"
          >
            <User className="h-4 w-4" />
            Reset Portal Access
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
        <h2 className="text-sm font-medium text-[#111827]">
          Partner Information
        </h2>

        <div className="mt-5 grid gap-6 lg:grid-cols-[1.1fr_1fr_0.8fr]">
          <div className="flex items-start gap-4">
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white",
                partner.partnerType === "Company"
                  ? "bg-[#2563EB]"
                  : "bg-[#9333EA]",
              )}
            >
              {partner.partnerName
                .split(" ")
                .map((item) => item[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="min-w-0">
              <h3 className="wrap-break-word text-lg font-semibold text-[#111827]">
                {partner.partnerName}
              </h3>
              <p className="mt-1 flex items-center gap-2 text-sm text-[#6B7280]">
                <PartnerIcon className="h-4 w-4 shrink-0" />
                {partner.partnerType}
              </p>
            </div>
          </div>

          <div className="space-y-3 min-w-0">
            <div>
              <p className="text-xs text-[#6B7280]">Primary Contact</p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-[#111827]">
                {partner.primaryContactName}
              </p>
            </div>

            <div className="flex items-start gap-2 text-sm text-[#6B7280]">
              <Mail className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="break-all">{partner.email}</span>
            </div>

            <div className="flex items-start gap-2 text-sm text-[#6B7280]">
              <Phone className="mt-0.5 h-4 w-4 shrink-0" />
              <span className="wrap-break-word">{partner.phoneNumber}</span>
            </div>

            {partner.abn ? (
              <div className="flex items-start gap-2 text-sm text-[#6B7280]">
                <Wallet className="mt-0.5 h-4 w-4 shrink-0" />
                <span className="wrap-break-word">ABN: {partner.abn}</span>
              </div>
            ) : null}
          </div>

          <div className="space-y-3">
            <div>
              <p className="text-xs text-[#6B7280]">Account Status</p>
              <div className="mt-1">
                <StatusPill
                  className={
                    partner.status === "Active"
                      ? "bg-[#DCFCE7] text-[#16A34A]"
                      : "bg-[#E5E7EB] text-[#6B7280]"
                  }
                >
                  {partner.status}
                </StatusPill>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">Joined Date</p>
              <p className="mt-1 text-sm font-medium text-[#111827]">
                {config?.effectiveDate
                  ? formatPrettyDate(config.effectiveDate)
                  : formatPrettyDate(agreement?.effectiveStartDate || "")}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
          <h2 className="text-sm font-medium text-[#111827]">
            Agreement & Commission
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-[#6B7280]">Agreement Name</p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-[#111827]">
                {agreement?.agreementName || "Standard Referral Agreement"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">Effective Start Date</p>
              <p className="mt-1 text-sm font-medium text-[#111827]">
                {formatPrettyDate(agreement?.effectiveStartDate || "")}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">Agreement Status</p>
              <div className="mt-1">
                <StatusPill className="bg-[#DCFCE7] text-[#16A34A]">
                  {agreement?.status || "Active"}
                </StatusPill>
              </div>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">Referral Percentage</p>
              <p className="mt-1 text-sm font-medium text-[#111827]">
                {agreement?.referrerCommissionPercent ?? 0}%
              </p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">Aggregator Fee (Global)</p>
              <p className="mt-1 text-sm font-medium text-[#111827]">
                {appPreferencesMock.aggregatorFeePercent}%
              </p>
              <p className="mt-1 text-xs leading-5 text-[#6B7280]">
                Global aggregator fee applied before referral commission is
                calculated.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
          <h2 className="text-sm font-medium text-[#111827]">
            Banking Information
          </h2>

          <div className="mt-5 space-y-4">
            <div>
              <p className="text-xs text-[#6B7280]">Bank Name</p>
              <p className="mt-1 wrap-break-word text-sm font-medium text-[#111827]">
                {banking?.bankName || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">BSB Number</p>
              <p className="mt-1 text-sm font-medium text-[#111827]">
                {banking?.bsb || "-"}
              </p>
            </div>

            <div>
              <p className="text-xs text-[#6B7280]">Account Number</p>
              <p className="mt-1 text-sm font-medium text-[#111827]">
                {banking?.accountNumber
                  ? `***${banking.accountNumber.slice(-4)}`
                  : "-"}
              </p>
            </div>

            <div className="rounded-xl bg-[#EFF6FF] px-4 py-3 text-xs text-[#2563EB]">
              Used for referral payout transfers.
            </div>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
        <h2 className="text-sm font-medium text-[#0EA5E9]">
          Referrer Internal Notes
        </h2>

        <div className="mt-4">
          <textarea
            value={draftNote}
            onChange={(e) => setDraftNote(e.target.value)}
            placeholder="Add internal notes about this referrer such as birthdays, company hierarchy, key decision makers, relationship details, or any other relevant information."
            rows={5}
            className="w-full resize-none rounded-2xl border border-[#E5E7EB] bg-white px-4 py-3 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#CBD5E1]"
          />
        </div>

        <div className="mt-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs italic leading-5 text-[#6B7280]">
            Notes are visible only to internal brokers.
          </p>

          <button
            type="button"
            onClick={handleSaveNote}
            className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-lg bg-[#0EA5E9] px-4 text-xs font-medium text-white transition hover:bg-[#0284C7] md:w-auto"
          >
            <Save className="h-3.5 w-3.5" />
            Save Notes
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
        <PartnerLegalDocuments />
      </div>

      <div>
        <h2 className="text-base font-semibold text-[#111827]">
          Performance Metrics
        </h2>

        <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            title="Total Referrals"
            value={String(partner.metrics.totalReferrals)}
            icon={<User className="h-4 w-4 text-[#2563EB]" />}
            iconClassName="bg-[#DBEAFE]"
          />

          <MetricCard
            title="Active Referrals"
            value={String(partner.metrics.activeReferrals)}
            icon={<CalendarDays className="h-4 w-4 text-[#16A34A]" />}
            iconClassName="bg-[#DCFCE7]"
          />

          <MetricCard
            title="Total Commission"
            value={formatMoney(totalCommission || partner.metrics.commission)}
            icon={<Wallet className="h-4 w-4 text-[#9333EA]" />}
            iconClassName="bg-[#F3E8FF]"
          />

          <MetricCard
            title="Last Activity"
            value={partner.metrics.lastActivity}
            icon={<CalendarDays className="h-4 w-4 text-[#EA580C]" />}
            iconClassName="bg-[#FFEDD5]"
          />
        </div>
      </div>

      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h2 className="text-sm font-medium text-[#111827]">
            Recent Referrals
          </h2>

          <button
            type="button"
            onClick={() => { }}
            className="inline-flex h-9 w-full items-center justify-center rounded-lg border border-[#D1D5DB] bg-white px-4 text-xs font-medium text-[#111827] transition hover:bg-slate-50 md:w-auto"
          >
            View All Referrals
          </button>
        </div>

        {/* mobile cards */}
        <div className="mt-4 space-y-4 lg:hidden">
          {referrals.length === 0 ? (
            <div className="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-8 text-center text-sm text-[#6B7280]">
              No recent referrals found.
            </div>
          ) : (
            referrals.map((item: PartnerRecentReferral) => (
              <ReferralMobileCard key={item.id} item={item} />
            ))
          )}
        </div>

        {/* desktop table */}
        <div className="mt-4 hidden overflow-x-auto lg:block">
          <table className="w-full min-w-225 border-collapse">
            <thead>
              <tr className="border border-[#E5E7EB] bg-[#F8FAFC]">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280]">
                  Client Name
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280]">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280]">
                  Ref Comm Earned
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280]">
                  Referral Fee Paid
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280]">
                  Date Submitted
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#6B7280]">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {referrals.map((item: PartnerRecentReferral) => (
                <tr
                  key={item.id}
                  className="border-b border-[#E5E7EB] last:border-b-0"
                >
                  <td className="px-4 py-3 text-sm text-[#111827]">
                    {item.clientName}
                  </td>

                  <td className="px-4 py-3">
                    <StatusPill className={getReferralStatusClass(item.status)}>
                      {item.status}
                    </StatusPill>
                  </td>

                  <td className="px-4 py-3 text-sm text-[#111827]">
                    {formatMoney(item.commissionGenerated)}
                  </td>

                  <td className="px-4 py-3">
                    <StatusPill
                      className={getFeeStatusClass(item.referralFeeStatus)}
                    >
                      {item.referralFeeStatus}
                    </StatusPill>
                  </td>

                  <td className="px-4 py-3 text-sm text-[#6B7280]">
                    {item.dateSubmitted}
                  </td>

                  <td className="px-4 py-3">
                    <ReferralActionsMenu />
                  </td>
                </tr>
              ))}

              {referrals.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-8 text-center text-sm text-[#6B7280]"
                  >
                    No recent referrals found.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default BrokerPartnerDetails;
