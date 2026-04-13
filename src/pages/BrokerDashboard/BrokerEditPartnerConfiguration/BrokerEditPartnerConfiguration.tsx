import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  ChevronDown,
  Link2,
  Mail,
  MoreVertical,
  Plus,
  Save,
} from "lucide-react";

import { cn } from "@/hooks/useCn";
import {
  commissionAgreementsMock,
  commissionRulesMock,
  partnerConfigurationsMock,
  partnerProfilesMock,
} from "../BrokerPartnerProfiles/mock";
import type {
  CommissionRule,
  CommissionRuleCondition,
  CommissionValueType,
  LoanCategory,
} from "../BrokerPartnerProfiles/types";
import ResetPasswordModal from "../../../components/BrokerDashboardCom/BEditPartnerConfigurationCom/ResetPasswordModal";
import SendInvitationModal from "../../../components/BrokerDashboardCom/BEditPartnerConfigurationCom/SendInvitationModal";
import AddAdditionalLoginModal from "@/components/BrokerDashboardCom/BEditPartnerConfigurationCom/AddAdditionalLoginModal";

type ReviewFrequency = "Monthly" | "Quarterly" | "Half-Yearly" | "Yearly";

const loanTypeOptions: LoanCategory[] = [
  "Residential",
  "Commercial",
  "Asset Finance",
  "Personal Loan",
];

const commissionTypeOptions: CommissionValueType[] = [
  "Percentage",
  "Fixed Amount",
];

const conditionOptions: CommissionRuleCondition[] = [
  "Standard",
  "Min $1M loan",
  "Per deal",
  "Custom",
];

const reviewFrequencyOptions: ReviewFrequency[] = [
  "Monthly",
  "Quarterly",
  "Half-Yearly",
  "Yearly",
];

function SelectMenu<T extends string>({
  value,
  onChange,
  options,
  placeholder,
}: {
  value: T | "";
  onChange: (value: T) => void;
  options: readonly T[];
  placeholder?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="flex h-11 w-full items-center justify-between rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3 text-left text-sm text-[#111827]"
      >
        <span className={cn("truncate", !value && "text-[#9CA3AF]")}>
          {value || placeholder || "Select"}
        </span>
        <ChevronDown className="h-4 w-4 shrink-0 text-[#6B7280]" />
      </button>

      {open ? (
        <>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-10 cursor-default"
            aria-label="Close select"
          />
          <div className="absolute left-0 right-0 top-[calc(100%+8px)] z-20 max-h-64 overflow-auto rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
            {options.map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => {
                  onChange(option);
                  setOpen(false);
                }}
                className="block w-full px-3 py-2 text-left text-sm text-[#111827] hover:bg-slate-50"
              >
                {option}
              </button>
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

function RuleActionsMenu({
  onEdit,
  onDelete,
}: {
  onEdit: () => void;
  onDelete: () => void;
}) {
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
            aria-label="Close menu"
          />
          <div className="absolute right-0 top-9 z-20 min-w-42.5 overflow-hidden rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
            <button
              type="button"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-[#111827] hover:bg-slate-50"
            >
              Edit Rule
            </button>

            <button
              type="button"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="block w-full px-4 py-2 text-left text-sm text-red-500 hover:bg-slate-50"
            >
              Delete Rule
            </button>
          </div>
        </>
      ) : null}
    </div>
  );
}

function StatusPill({
  children,
  active = true,
}: {
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium",
        active ? "bg-[#DCFCE7] text-[#16A34A]" : "bg-[#E5E7EB] text-[#6B7280]",
      )}
    >
      {children}
    </span>
  );
}

const BrokerEditPartnerConfiguration = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [sendInvitationOpen, setSendInvitationOpen] = useState(false);
  const [addLoginOpen, setAddLoginOpen] = useState(false);

  const partner = useMemo(
    () => partnerProfilesMock.find((item) => item.id === id),
    [id],
  );

  const config = useMemo(
    () => partnerConfigurationsMock.find((item) => item.partnerId === id),
    [id],
  );

  const linkedAgreementDefaults = useMemo(
    () =>
      commissionAgreementsMock
        .filter((item) => item.partnerId === id)
        .map((item) => item.agreementName),
    [id],
  );

  const [rules, setRules] = useState<CommissionRule[]>(
    commissionRulesMock.filter((item) => item.partnerId === id),
  );

  const [effectiveDate, setEffectiveDate] = useState(
    config?.effectiveDate || "",
  );
  const [linkedAgreements, setLinkedAgreements] = useState<string[]>(
    config?.linkedAgreements?.length
      ? config.linkedAgreements
      : linkedAgreementDefaults,
  );
  const [newAgreement, setNewAgreement] = useState("");
  const [automaticSettlement, setAutomaticSettlement] = useState(
    config?.automaticSettlement ?? true,
  );
  const [reviewFrequency, setReviewFrequency] = useState<ReviewFrequency>(
    (config?.agreementReviewFrequency as ReviewFrequency) || "Quarterly",
  );

  if (!partner) {
    return (
      <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 md:p-8">
        <p className="text-sm text-[#6B7280]">Partner not found.</p>
      </div>
    );
  }

  const handleRuleChange = <K extends keyof CommissionRule>(
    ruleId: string,
    key: K,
    value: CommissionRule[K],
  ) => {
    setRules((prev) =>
      prev.map((rule) =>
        rule.id === ruleId ? { ...rule, [key]: value } : rule,
      ),
    );
  };

  const handleAddRule = () => {
    const nextRule: CommissionRule = {
      id: `rule-${Date.now()}`,
      partnerId: partner.id,
      loanCategory: "Residential",
      valueType: "Percentage",
      value: 1,
    };

    setRules((prev) => [...prev, nextRule]);
  };

  const handleDeleteRule = (ruleId: string) => {
    setRules((prev) => prev.filter((rule) => rule.id !== ruleId));
  };

  const handleAddAgreement = () => {
    const trimmed = newAgreement.trim();
    if (!trimmed) return;
    if (linkedAgreements.includes(trimmed)) {
      setNewAgreement("");
      return;
    }

    setLinkedAgreements((prev) => [...prev, trimmed]);
    setNewAgreement("");
  };

  const handleRemoveAgreement = (name: string) => {
    setLinkedAgreements((prev) => prev.filter((item) => item !== name));
  };

  const handleSaveConfiguration = () => {};

  return (
    <>
      <section className="space-y-4 md:space-y-6">
        <div className="space-y-3 md:space-y-4">
          <button
            type="button"
            onClick={() => navigate(`/broker-dashboard/partner-profile/${id}`)}
            className="inline-flex items-center gap-2 text-sm leading-none text-[#6B7280] transition hover:text-[#111827]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back To Partner Profile
          </button>

          <div>
            <h1 className="wrap-break-word text-[26px] font-semibold leading-tight text-[#111827] md:text-[32px] lg:text-[38px] lg:leading-none">
              {partner.partnerName}
            </h1>
            <p className="mt-2 text-sm leading-6 text-[#6B7280]">
              Partner: {partner.primaryContactName} ·{" "}
              <span className="text-[#16A34A]">{partner.status}</span>
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:gap-6 2xl:grid-cols-[1.8fr_0.9fr]">
          <div className="space-y-4 md:space-y-6">
            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <h2 className="text-base font-medium text-[#111827] md:text-lg">
                  Commission Rules & Logic
                </h2>

                <button
                  type="button"
                  onClick={handleAddRule}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] px-4 text-sm font-medium text-white transition hover:bg-[#0284C7] md:w-auto"
                >
                  <Plus className="h-4 w-4" />
                  Add Rule
                </button>
              </div>

              {/* mobile cards */}
              <div className="mt-5 space-y-4 lg:hidden">
                {rules.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-8 text-center text-sm text-[#6B7280]">
                    No commission rules yet.
                  </div>
                ) : (
                  rules.map((rule) => (
                    <div
                      key={rule.id}
                      className="rounded-2xl border border-[#E5E7EB] bg-[#FCFCFD] p-4"
                    >
                      <div className="mb-4 flex items-start justify-between gap-3">
                        <p className="text-sm font-medium text-[#111827]">
                          Commission Rule
                        </p>
                        <RuleActionsMenu
                          onEdit={() => {}}
                          onDelete={() => handleDeleteRule(rule.id)}
                        />
                      </div>

                      <div className="space-y-4">
                        <div>
                          <p className="mb-2 text-xs font-medium text-[#6B7280]">
                            Loan Type
                          </p>
                          <SelectMenu<LoanCategory>
                            value={rule.loanCategory}
                            onChange={(value) =>
                              handleRuleChange(rule.id, "loanCategory", value)
                            }
                            options={loanTypeOptions}
                          />
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-medium text-[#6B7280]">
                            Commission Type
                          </p>
                          <SelectMenu<CommissionValueType>
                            value={rule.valueType}
                            onChange={(value) =>
                              handleRuleChange(rule.id, "valueType", value)
                            }
                            options={commissionTypeOptions}
                          />
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-medium text-[#6B7280]">
                            Value
                          </p>
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={rule.value}
                              onChange={(e) =>
                                handleRuleChange(
                                  rule.id,
                                  "value",
                                  Number(e.target.value || 0),
                                )
                              }
                              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3 pr-12 text-sm text-[#111827] outline-none"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">
                              {rule.valueType === "Percentage" ? "%" : "AUD"}
                            </span>
                          </div>
                        </div>

                        <div>
                          <p className="mb-2 text-xs font-medium text-[#6B7280]">
                            Qualifying Conditions
                          </p>
                          <SelectMenu<CommissionRuleCondition>
                            value={
                              (rule.conditions as CommissionRuleCondition) ||
                              "Standard"
                            }
                            onChange={(value) =>
                              handleRuleChange(
                                rule.id,
                                "conditions" as keyof CommissionRule,
                                value as CommissionRule[keyof CommissionRule],
                              )
                            }
                            options={conditionOptions}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* desktop table */}
              <div className="mt-5 hidden overflow-x-auto lg:block">
                <table className="w-full min-w-190 border-collapse">
                  <thead>
                    <tr className="border-b border-[#E5E7EB]">
                      <th className="px-2 py-3 text-left text-xs font-medium text-[#6B7280]">
                        Loan Type
                      </th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-[#6B7280]">
                        Commission Type
                      </th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-[#6B7280]">
                        Value
                      </th>
                      <th className="px-2 py-3 text-left text-xs font-medium text-[#6B7280]">
                        Qualifying Conditions
                      </th>
                      <th className="px-2 py-3 text-right text-xs font-medium text-[#6B7280]">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {rules.map((rule) => (
                      <tr
                        key={rule.id}
                        className="border-b border-[#F1F5F9] last:border-b-0"
                      >
                        <td className="px-2 py-3 align-top">
                          <SelectMenu<LoanCategory>
                            value={rule.loanCategory}
                            onChange={(value) =>
                              handleRuleChange(rule.id, "loanCategory", value)
                            }
                            options={loanTypeOptions}
                          />
                        </td>

                        <td className="px-2 py-3 align-top">
                          <SelectMenu<CommissionValueType>
                            value={rule.valueType}
                            onChange={(value) =>
                              handleRuleChange(rule.id, "valueType", value)
                            }
                            options={commissionTypeOptions}
                          />
                        </td>

                        <td className="px-2 py-3 align-top">
                          <div className="relative">
                            <input
                              type="number"
                              step="0.01"
                              value={rule.value}
                              onChange={(e) =>
                                handleRuleChange(
                                  rule.id,
                                  "value",
                                  Number(e.target.value || 0),
                                )
                              }
                              className="h-10 w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3 text-sm text-[#111827] outline-none"
                            />
                            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6B7280]">
                              {rule.valueType === "Percentage" ? "%" : "AUD"}
                            </span>
                          </div>
                        </td>

                        <td className="px-2 py-3 align-top">
                          <SelectMenu<CommissionRuleCondition>
                            value={
                              (rule.conditions as CommissionRuleCondition) ||
                              "Standard"
                            }
                            onChange={(value) =>
                              handleRuleChange(
                                rule.id,
                                "conditions" as keyof CommissionRule,
                                value as CommissionRule[keyof CommissionRule],
                              )
                            }
                            options={conditionOptions}
                          />
                        </td>

                        <td className="px-2 py-3 text-right align-top">
                          <div className="flex justify-end">
                            <RuleActionsMenu
                              onEdit={() => {}}
                              onDelete={() => handleDeleteRule(rule.id)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}

                    {rules.length === 0 ? (
                      <tr>
                        <td
                          colSpan={5}
                          className="px-2 py-8 text-center text-sm text-[#6B7280]"
                        >
                          No commission rules yet.
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
              <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
                <div>
                  <h2 className="text-base font-medium text-[#111827] md:text-lg">
                    Linked Portfolio
                  </h2>
                  <p className="mt-3 text-[30px] font-semibold leading-none text-[#111827] md:mt-4 md:text-[42px]">
                    {config?.linkedPortfolioActiveReferrals ?? 42}
                  </p>
                  <p className="mt-2 text-sm text-[#6B7280]">
                    Active Referrals
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => {}}
                  className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-[#D1D5DB] bg-white px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50 md:w-auto"
                >
                  View Full Pipeline
                  <Link2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
              <h2 className="text-base font-medium text-[#111827] md:text-lg">
                Partner Portal Access
              </h2>

              <div className="mt-5 grid gap-5 md:grid-cols-2 md:gap-6">
                <div>
                  <p className="text-xs text-[#6B7280]">Login Email</p>
                  <div className="mt-2 flex items-start gap-2 text-sm font-medium text-[#111827]">
                    <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#6B7280]" />
                    <span className="break-all">
                      {config?.loginEmail || partner.email}
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-xs text-[#6B7280]">Account Status</p>
                  <div className="mt-2">
                    <StatusPill
                      active={(config?.accountStatus || "Active") === "Active"}
                    >
                      {config?.accountStatus || "Active"}
                    </StatusPill>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-6">
                <p className="text-xs text-[#6B7280]">Last Login</p>
                <p className="mt-2 wrap-break-word text-sm font-medium text-[#111827]">
                  {config?.lastLogin || "-"}
                </p>
              </div>

              <div className="mt-6 border-t border-[#E5E7EB] pt-6">
                <p className="text-sm font-medium text-[#111827]">Actions</p>

                <div className="mt-4 grid gap-3 md:grid-cols-2">
                  <button
                    type="button"
                    onClick={() => setResetPasswordOpen(true)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50"
                  >
                    Reset Password
                  </button>

                  <button
                    type="button"
                    onClick={() => setSendInvitationOpen(true)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50"
                  >
                    Send Portal Invite
                  </button>

                  <button
                    type="button"
                    onClick={() => setAddLoginOpen(true)}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50"
                  >
                    Add Additional Login
                  </button>

                  <button
                    type="button"
                    onClick={() => {}}
                    className="inline-flex h-11 items-center justify-center rounded-xl border border-[#E5E7EB] bg-white px-4 text-sm font-medium text-red-500 transition hover:bg-red-50"
                  >
                    Disable Access
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-4 md:p-5">
            <h2 className="text-base font-medium text-[#111827] md:text-lg">
              Setup Configuration
            </h2>

            <div className="mt-5 space-y-6">
              <div>
                <p className="text-sm font-medium text-[#111827]">
                  Effective Date
                </p>
                <div className="relative mt-2">
                  <input
                    type="date"
                    value={effectiveDate}
                    onChange={(e) => setEffectiveDate(e.target.value)}
                    className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F8FAFC] px-3 pr-10 text-sm text-[#111827] outline-none"
                  />
                  <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6B7280]" />
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-6">
                <p className="text-sm font-medium text-[#111827]">
                  Linked Agreements
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {linkedAgreements.map((agreement) => (
                    <button
                      key={agreement}
                      type="button"
                      onClick={() => handleRemoveAgreement(agreement)}
                      className="inline-flex max-w-full items-center rounded-full bg-[#F3F4F6] px-3 py-1.5 text-left text-xs font-medium text-[#374151] transition hover:bg-[#E5E7EB]"
                    >
                      <span className="truncate">{agreement}</span>
                    </button>
                  ))}
                </div>

                <div className="mt-4 flex flex-col gap-2 md:flex-row">
                  <input
                    type="text"
                    value={newAgreement}
                    onChange={(e) => setNewAgreement(e.target.value)}
                    placeholder="Add agreement"
                    className="h-10 flex-1 rounded-xl border border-[#E5E7EB] bg-white px-3 text-sm text-[#111827] outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleAddAgreement}
                    className="inline-flex h-10 items-center justify-center rounded-xl border border-[#D1D5DB] px-4 text-sm font-medium text-[#111827] transition hover:bg-slate-50 md:w-auto"
                  >
                    + Add
                  </button>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-[#111827]">
                      Automatic Settlement
                    </p>
                    <p className="mt-1 text-xs text-[#6B7280]">
                      Auto-process commission payouts
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setAutomaticSettlement((prev) => !prev)}
                    className={cn(
                      "relative mt-0.5 inline-flex h-6 w-11 shrink-0 rounded-full transition",
                      automaticSettlement ? "bg-[#111827]" : "bg-[#CBD5E1]",
                    )}
                  >
                    <span
                      className={cn(
                        "absolute top-0.5 h-5 w-5 rounded-full bg-white transition",
                        automaticSettlement ? "left-5.5" : "left-0.5",
                      )}
                    />
                  </button>
                </div>
              </div>

              <div className="border-t border-[#E5E7EB] pt-6">
                <p className="text-sm font-medium text-[#111827]">
                  Agreement Review Frequency
                </p>

                <div className="mt-2">
                  <SelectMenu<ReviewFrequency>
                    value={reviewFrequency}
                    onChange={setReviewFrequency}
                    options={reviewFrequencyOptions}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveConfiguration}
                className="inline-flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-[#020222] px-4 text-sm font-medium text-white transition hover:bg-[#0B0B35]"
              >
                <Save className="h-4 w-4" />
                Save Configuration
              </button>
            </div>
          </div>
        </div>
      </section>

      <ResetPasswordModal
        open={resetPasswordOpen}
        email={config?.loginEmail || partner.email}
        onClose={() => setResetPasswordOpen(false)}
        onSubmit={() => setResetPasswordOpen(false)}
      />

      <SendInvitationModal
        open={sendInvitationOpen}
        email={config?.loginEmail || partner.email}
        onClose={() => setSendInvitationOpen(false)}
        onSubmit={() => setSendInvitationOpen(false)}
      />

      <AddAdditionalLoginModal
        open={addLoginOpen}
        onClose={() => setAddLoginOpen(false)}
        onSubmit={() => setAddLoginOpen(false)}
      />
    </>
  );
};

export default BrokerEditPartnerConfiguration;
