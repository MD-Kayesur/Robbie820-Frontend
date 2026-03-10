import { useMemo, useState } from "react";
import { LayoutGrid, List, Plus, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { cn } from "@/hooks/useCn";
import { partnerProfilesMock } from "./mock";
import type {
  OnboardPartnerForm,
  PartnerActionKey,
  PartnerProfile,
  ViewMode,
} from "./types";
import PartnerCard from "@/components/BrokerDashboardCom/BPartnerProfileCom/PartnerCard";
import PartnerTable from "@/components/BrokerDashboardCom/BPartnerProfileCom/PartnerTable";
import OnboardPartnerModal from "@/components/BrokerDashboardCom/BPartnerProfileCom/OnboardPartnerModal";
import ResetPasswordModal from "@/components/BrokerDashboardCom/BEditPartnerConfigurationCom/ResetPasswordModal";
import SendInvitationModal from "@/components/BrokerDashboardCom/BEditPartnerConfigurationCom/SendInvitationModal";
import AddAdditionalLoginModal from "@/components/BrokerDashboardCom/BEditPartnerConfigurationCom/AddAdditionalLoginModal";

const BrokerPartnerProfiles = () => {
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [onboardOpen, setOnboardOpen] = useState(false);

  const [selectedPartner, setSelectedPartner] = useState<PartnerProfile | null>(
    null,
  );
  const [resetPasswordOpen, setResetPasswordOpen] = useState(false);
  const [sendInvitationOpen, setSendInvitationOpen] = useState(false);
  const [addLoginOpen, setAddLoginOpen] = useState(false);

  const navigate = useNavigate();

  const filteredPartners = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return partnerProfilesMock;

    return partnerProfilesMock.filter((partner) => {
      return (
        partner.partnerName.toLowerCase().includes(query) ||
        partner.primaryContactName.toLowerCase().includes(query) ||
        partner.email.toLowerCase().includes(query)
      );
    });
  }, [search]);

  const handlePartnerAction = (
    partner: PartnerProfile,
    action: PartnerActionKey,
  ) => {
    switch (action) {
      case "view-profile":
        navigate(`/broker-dashboard/partner-profile/${partner.id}`);
        break;

      case "edit-partner":
        navigate(`/broker-dashboard/partner-profile/${partner.id}/edit`);
        break;

      default:
        break;
    }
  };

  const handleSubmitOnboard = (values: OnboardPartnerForm) => {
    console.log("submit onboard partner:", values);
  };

  return (
    <>
      <section className="space-y-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-[28px] font-semibold leading-none text-[#111827]">
              Partner Profiles
            </h1>
            <p className="mt-2 text-sm text-[#6B7280]">
              Manage referral partners, agreements, and specific commission
              rules.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOnboardOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#0EA5E9] px-4 text-sm font-medium text-white transition hover:bg-[#0284C7]"
          >
            <Plus className="h-4 w-4" />
            Onboard New Partner
          </button>
        </div>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-130">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search partners by name or company..."
              className="h-12 w-full rounded-xl border border-[#E5E7EB] bg-white pl-11 pr-4 text-sm text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:border-[#CBD5E1]"
            />
          </div>

          <div className="inline-flex h-11 w-fit items-center rounded-xl border border-[#D1D5DB] bg-white p-1">
            <button
              type="button"
              onClick={() => setViewMode("grid")}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-lg px-3 transition",
                viewMode === "grid"
                  ? "bg-slate-100 text-[#111827]"
                  : "text-[#6B7280] hover:text-[#111827]",
              )}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>

            <button
              type="button"
              onClick={() => setViewMode("table")}
              className={cn(
                "inline-flex h-9 items-center justify-center rounded-lg px-3 transition",
                viewMode === "table"
                  ? "bg-slate-100 text-[#111827]"
                  : "text-[#6B7280] hover:text-[#111827]",
              )}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filteredPartners.map((partner) => (
              <PartnerCard
                key={partner.id}
                partner={partner}
                onAction={handlePartnerAction}
              />
            ))}
          </div>
        ) : (
          <PartnerTable
            partners={filteredPartners}
            onAction={handlePartnerAction}
          />
        )}
      </section>

      <OnboardPartnerModal
        open={onboardOpen}
        onClose={() => setOnboardOpen(false)}
        onSubmit={handleSubmitOnboard}
      />

      <ResetPasswordModal
        open={resetPasswordOpen}
        email={selectedPartner?.email || ""}
        onClose={() => {
          setResetPasswordOpen(false);
          setSelectedPartner(null);
        }}
        onSubmit={(email) => {
          console.log("send reset link:", email);
          setResetPasswordOpen(false);
          setSelectedPartner(null);
        }}
      />

      <SendInvitationModal
        open={sendInvitationOpen}
        email={selectedPartner?.email || ""}
        onClose={() => {
          setSendInvitationOpen(false);
          setSelectedPartner(null);
        }}
        onSubmit={(email) => {
          console.log("send invitation:", email);
          setSendInvitationOpen(false);
          setSelectedPartner(null);
        }}
      />

      <AddAdditionalLoginModal
        open={addLoginOpen}
        onClose={() => {
          setAddLoginOpen(false);
          setSelectedPartner(null);
        }}
        onSubmit={(values) => {
          console.log("create additional login:", {
            partner: selectedPartner,
            values,
          });
          setAddLoginOpen(false);
          setSelectedPartner(null);
        }}
      />
    </>
  );
};

export default BrokerPartnerProfiles;
