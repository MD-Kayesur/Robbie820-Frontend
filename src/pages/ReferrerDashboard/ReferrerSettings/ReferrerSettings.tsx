// src/pages/ReferrerDashboard/ReferrerSettings/ReferrerSettings.tsx

import { useMemo, useState } from "react";

import type {
  AlertPrefs,
  AlertStage,
  BankingForm,
  LegalDocument,
  ProfileForm,
  SettingsTab,
  TeamMember,
  TeamRole,
} from "./types";

import {
  alertPrefsMock,
  alertStagesMock,
  bankingMock,
  legalDocsMock,
  profileMock,
  tabsMock,
  teamMock,
} from "./mock";
import MyProfileTab from "@/components/ReferrerDashboardCom/RSettingsCom/MyProfileTab";
import TeamManagementTab from "@/components/ReferrerDashboardCom/RSettingsCom/TeamManagementTab";
import AlertsTab from "@/components/ReferrerDashboardCom/RSettingsCom/AlertsTab";
import LegalDocumentsTab from "@/components/ReferrerDashboardCom/RSettingsCom/LegalDocumentsTab";
import BankingDetailsTab from "@/components/ReferrerDashboardCom/RSettingsCom/BankingDetailsTab";
import TMTNewMemberModal from "@/components/ReferrerDashboardCom/RSettingsCom/modals/TMTNewMemberModal";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

type InvitePayload = {
  fullName: string;
  email: string;
  role: TeamRole;
  permissions: {
    submitReferrals: boolean;
    viewOwnReferralsOnly: boolean;
    viewCommission: boolean;
  };
  additionalSeatCost: number;
  newMonthlyTotal: number;
};

const ReferrerSettings = () => {
  const [tab, setTab] = useState<SettingsTab>("My Profile");

  const [profile, setProfile] = useState<ProfileForm>(profileMock);
  const [team, setTeam] = useState<TeamMember[]>(teamMock);
  const [alertPrefs, setAlertPrefs] = useState<AlertPrefs>(alertPrefsMock);
  const [alertStages, setAlertStages] = useState<AlertStage[]>(alertStagesMock);
  const [docs, setDocs] = useState<LegalDocument[]>(legalDocsMock);
  const [banking, setBanking] = useState<BankingForm>(bankingMock);
  const [memberModalOpen, setMemberModalOpen] = useState(false);

  const tabs = useMemo(() => tabsMock as unknown as SettingsTab[], []);

  function onAddMember() {
    setMemberModalOpen(true);
  }

  function onInviteMember(payload: InvitePayload) {
    const permissionLabel = payload.permissions.viewCommission
      ? "Admin"
      : "Member";

    setTeam((prev) => [
      ...prev,
      {
        id: `t_${Date.now()}`,
        name: payload.fullName,
        email: payload.email,
        role: payload.role,
        permission: permissionLabel,
        referrals: 0,
        joined: new Date().toISOString().slice(0, 10),
      },
    ]);
  }

  function onRemoveMember(id: string) {
    setTeam((prev) => prev.filter((m) => m.id !== id));
  }

  function onToggleStage(id: string) {
    setAlertStages((prev) =>
      prev.map((s) => (s.id === id ? { ...s, enabled: !s.enabled } : s)),
    );
  }

  function onUploadDoc() {
    const title = prompt("Document title (mock):");
    if (!title) return;

    setDocs((prev) => [
      ...prev,
      {
        id: `d_${Date.now()}`,
        title,
        type: "Agreement",
        sizeLabel: "—",
        uploadedOn: new Date().toISOString().slice(0, 10),
      },
    ]);
  }

  function onDownloadDoc(id: string) {
    const d = docs.find((x) => x.id === id);
    alert(`Download (mock): ${d?.title ?? id}`);
  }

  return (
    <div className="mx-auto w-full bg-white px-4 pb-10 pt-5 md:px-6 md:pb-12 md:pt-8 clash">
      {/* tabs */}
      <div className="overflow-x-auto no-scrollbar max-w-4xl mx-auto">
        <div className="mb-6 flex min-w-max mx-auto items-center gap-2.5 justify-center">
          {tabs.map((t) => {
            const active = t === tab;
            return (
              <button
                key={t}
                type="button"
                onClick={() => setTab(t)}
                className={cn(
                  "relative shrink-0 pb-1 px-2.5 text-left text-xs uppercase tracking-normal text-black transition md:text-sm leading-4",
                  active ? "" : "hover:text-slate-700",
                )}
              >
                <span>{t}</span>

                <span
                  className={cn(
                    "absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition",
                    active ? "bg-[#00B4FE]" : "bg-transparent",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* content */}
      <div>
        {tab === "My Profile" ? (
          <MyProfileTab value={profile} onSave={setProfile} />
        ) : null}

        {tab === "Team Management" ? (
          <TeamManagementTab
            members={team}
            onAdd={onAddMember}
            onRemove={onRemoveMember}
          />
        ) : null}

        {tab === "Alerts" ? (
          <AlertsTab
            prefs={alertPrefs}
            stages={alertStages}
            onChangePrefs={setAlertPrefs}
            onToggleStage={onToggleStage}
          />
        ) : null}

        {tab === "Legal Documents" ? (
          <LegalDocumentsTab
            docs={docs}
            onUpload={onUploadDoc}
            onDownload={onDownloadDoc}
          />
        ) : null}

        {tab === "Banking Details" ? (
          <BankingDetailsTab value={banking} onSave={setBanking} />
        ) : null}
      </div>

      <TMTNewMemberModal
        open={memberModalOpen}
        onClose={() => setMemberModalOpen(false)}
        onSubmit={onInviteMember}
        baseMonthlyTotal={150}
        seatCost={25}
      />
    </div>
  );
};

export default ReferrerSettings;
