// src/components/ReferrerDashboardCom/RSettingsCom/TeamManagementTab.tsx
import React, { useMemo, useState } from "react";
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

function useOutsideClose<T extends HTMLElement>(
  open: boolean,
  onClose: () => void,
) {
  const ref = React.useRef<T | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const onDown = (e: MouseEvent) => {
      if (!ref.current) return;
      if (!ref.current.contains(e.target as Node)) onClose();
    };

    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open, onClose]);

  return ref;
}

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
    <span className="text-[15px] font-medium text-[#7C3AED] sm:text-base">
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
    <div className="rounded-[22px] border border-[#CFCFCF] bg-white px-5 py-5">
      <div className="flex items-center justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-[22px] font-medium leading-tight text-[#666666]">
            {member.name}
          </p>
          <p className="mt-2 break-all text-[18px] leading-tight text-[#666666]">
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

      <div className="mt-6">
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
      <div className="space-y-6 sm:space-y-8">
        {/* blue header */}
        <div className="rounded-3xl bg-[#00B4FE] px-5 py-6 text-white sm:px-6 sm:py-6 lg:px-8 lg:py-8">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 sm:gap-5">
              <div className="mt-1 grid h-18 w-18 shrink-0 place-items-center rounded-[18px] bg-white/20 ring-1 ring-white/10 sm:h-14 sm:w-14 sm:rounded-xl">
                <Users className="h-8 w-8 sm:h-7 sm:w-7" />
              </div>

              <div className="min-w-0">
                <p className="text-[30px] font-medium leading-none sm:text-2xl lg:text-[30px]">
                  Business Team
                </p>
                <p className="mt-5 max-w-105 text-[18px] leading-[1.6] text-white/95 sm:mt-2 sm:text-sm sm:leading-6 lg:text-[18px] lg:leading-[1.7]">
                  Manage employees and their permissions for referral
                  submissions.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onAdd}
              className="inline-flex h-20 w-full items-center justify-center gap-4 rounded-2xl bg-white px-6 text-[20px] font-medium text-slate-900 transition hover:bg-white/95 sm:h-12 sm:w-fit sm:rounded-lg sm:px-5 sm:text-sm"
            >
              <UserPlus className="h-7 w-7 sm:h-4 sm:w-4" />
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
        <div className="rounded-3xl border border-sky-200 bg-sky-50 px-5 py-6 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
          <div className="flex flex-col items-start gap-5 sm:flex-row sm:gap-6">
            <div className="grid h-22 w-22 shrink-0 place-items-center rounded-[14px] bg-[#00B4FE] text-white ring-1 ring-sky-200 sm:h-auto sm:w-auto sm:rounded-xl sm:p-3">
              <ShieldCheck className="h-9 w-9 sm:h-6 sm:w-6" />
            </div>

            <div className="min-w-0">
              <p className="text-[28px] font-medium leading-tight text-black sm:text-xl">
                About Team Permissions
              </p>
              <p className="mt-5 text-[18px] leading-[1.45] tracking-[0.04em] text-[#666666] sm:mt-2 sm:text-base sm:leading-7 sm:tracking-normal">
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
