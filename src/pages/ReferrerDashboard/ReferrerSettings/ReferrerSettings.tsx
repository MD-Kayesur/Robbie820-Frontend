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
    // eslint-disable-next-line no-alert
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
    // eslint-disable-next-line no-alert
    alert(`Download (mock): ${d?.title ?? id}`);
  }

  return (
    <div className="mx-auto max-w-5xl bg-white py-9 clash">
      {/* top tabs */}
      <div className="mb-6 flex flex-wrap items-center gap-4 px-6">
        {tabs.map((t) => {
          const active = t === tab;
          return (
            <button
              key={t}
              type="button"
              onClick={() => setTab(t)}
              className={cn(
                "relative text-sm text-black",
                active ? "" : "hover:text-slate-700",
              )}
            >
              <span className="px-2.5 py-1.5">{t.toUpperCase()}</span>
              <span
                className={cn(
                  "absolute left-0 right-0 -bottom-px h-0.5 rounded-full transition",
                  active ? "bg-[#00B4FE]" : "bg-transparent",
                )}
              />
            </button>
          );
        })}
      </div>

      {/* content */}
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
