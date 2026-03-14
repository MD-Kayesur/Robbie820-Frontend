// src/components/ReferrerDashboardCom/RSettingsCom/TeamManagementTab.tsx
import  { useMemo, useState } from "react";
import {
  Eye,
  MoreVertical,
  UserPlus,
  UserRound,
  Users,
  ShieldCheck,
} from "lucide-react";
import {
  TeamMember,
  TeamPermission,
} from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";
import TeamMemberDetailsModal from "./modals/TMTDetailsModal";
import { useOutsideClose } from "@/hooks/useOutsideClose";

function PermPill({ value }: { value: TeamPermission }) {
  return (
    <span className="inline-flex min-w-37 items-center justify-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-medium leading-4 text-slate-900">
      <UserRound className="h-4 w-4 text-slate-700" />
      {value}
    </span>
  );
}

function RoleText({ value }: { value: TeamPermission | string }) {
  return (
    <span className="text-sm font-medium text-[#7C3AED] md:text-base">
      {value}
    </span>
  );
}

function RowActions({
  onRemove,
  onView,
  mobile = false,
}: {
  onRemove: () => void;
  onView?: () => void;
  mobile?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  if (mobile) {
    return (
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={onView}
          className="grid h-11 w-11 place-items-center rounded-full transition hover:bg-slate-100 active:scale-[0.99]"
        >
          <Eye className="h-7 w-7 text-black" strokeWidth={2.1} />
        </button>
      </div>
    );
  }

  return (
    <div className="relative flex justify-end" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-lg transition hover:bg-slate-50 active:scale-[0.99]"
      >
        <MoreVertical className="h-4 w-4 text-black" />
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 w-40 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          <button
            type="button"
            onClick={() => {
              onRemove();
              setOpen(false);
            }}
            className="w-full px-4 py-3 text-left text-sm text-slate-700 hover:bg-slate-50"
          >
            Remove
          </button>
        </div>
      ) : null}
    </div>
  );
}

function MobileMemberCard({
  member,
  onRemove,
  onView,
}: {
  member: TeamMember;
  onRemove: (id: string) => void;
  onView: (member: TeamMember) => void;
}) {
  return (
    <div className="rounded-xl border border-[#CFCFCF] bg-white p-4">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium leading-tight text-[#666666]">
            {member.name}
          </p>
          <p className="mt-1 break-all text-xs leading-tight text-[#666666]">
            {member.email}
          </p>
        </div>

        <div className="shrink-0">
          <RowActions
            mobile
            onView={() => onView(member)}
            onRemove={() => onRemove(member.id)}
          />
        </div>
      </div>

      <div>
        <RoleText value={member.role} />
      </div>
    </div>
  );
}

export default function TeamManagementTab({
  members,
  onAdd,
  onRemove,
}: {
  members: TeamMember[];
  onAdd: () => void;
  onRemove: (id: string) => void;
}) {
  const rows = useMemo(() => members, [members]);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  return (
    <>
      <div className="space-y-6 md:space-y-8">
        {/* blue header */}
        <div className="rounded-2xl bg-[#00B4FE] p-4 md:p-6 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-start md:items-center gap-2.5">
              <div className="p-2.5 rounded-lg bg-white/20">
                <Users className="h-6 w-6" />
              </div>

              <div>
                <p className="text-xl font-medium leading-4.5">Business Team</p>
                <p className="mt-2 text-base leading-4">
                  Manage employees and their permissions for referral
                  submissions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onAdd}
              className="w-full flex items-center leading-none justify-center gap-2.5 rounded-sm bg-white p-2.5 text-sm font-medium text-black hover:bg-white/95 md:w-fit"
            >
              <UserPlus className="h-5 w-5" />
              Add Team Member
            </button>
          </div>
        </div>

        {/* mobile cards */}
        <div className="space-y-5 lg:hidden">
          {rows.map((m) => (
            <MobileMemberCard
              key={m.id}
              member={m}
              onRemove={onRemove}
              onView={setSelectedMember}
            />
          ))}
        </div>

        {/* desktop table */}
        <div className="hidden overflow-hidden rounded-2xl border border-slate-200 bg-white px-5 py-3 lg:block">
          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-230">
              <thead>
                <tr className="border-b border-slate-200">
                  {[
                    "MEMBER",
                    "ROLE",
                    "PERMISSIONS",
                    "REFERRALS",
                    "JOINED",
                    "",
                  ].map((h) => (
                    <th
                      key={h}
                      className={cn(
                        "py-4 text-left text-lg font-medium tracking-wide text-[#333333]",
                        h === "REFERRALS" || h === "JOINED" ? "text-right" : "",
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/60">
                    <td className="py-4">
                      <p className="text-base font-medium text-slate-900">
                        {m.name}
                      </p>
                      <p className="text-sm text-slate-500">{m.email}</p>
                    </td>

                    <td className="py-4 text-sm font-medium text-slate-900">
                      {m.role}
                    </td>

                    <td className="py-4">
                      <PermPill value={m.permission} />
                    </td>

                    <td className="py-4 text-center text-lg font-medium text-slate-900">
                      {m.referrals}
                    </td>

                    <td className="py-4 text-right font-medium text-slate-900">
                      {m.joined}
                    </td>

                    <td className="py-4">
                      <RowActions onRemove={() => onRemove(m.id)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* about */}
        <div className="rounded-xl border border-sky-200 bg-[#00B4FE0D] p-4 md:p-6">
          <div className="flex flex-col items-start gap-3 md:flex-row md:gap-6">
            <div className="grid p-2.5 shrink-0 rounded-sm bg-[#00B4FE] text-white">
              <ShieldCheck className="h-6 w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-xl font-medium text-black leading-4.5">
                About Team Permissions
              </p>
              <p className="text-base leading-4 mt-1.5 text-[#666666]">
                Admins can manage team members, view all commissions, and access
                business settings. Members can only submit new referrals and
                view progress for leads they personally introduced.
              </p>
            </div>
          </div>
        </div>
      </div>

      <TeamMemberDetailsModal
        open={!!selectedMember}
        member={selectedMember}
        onClose={() => setSelectedMember(null)}
      />
    </>
  );
}
