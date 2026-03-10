import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useFloatingMenu } from "@/hooks/useFloatingMenu";

import type {
  MemberStatus,
  TeamMember,
} from "../../../pages/BrokerDashboard/BrokerTeamManagement/types";

type TeamMembersTableProps = {
  members: TeamMember[];
  onEditUser: (id: string) => void;
  onToggleStatus: (id: string) => void;
};

function StatusBadge({ status }: { status: MemberStatus }) {
  return (
    <span
      className={cn(
        "inline-flex min-w-17.5 items-center justify-center rounded-full px-3 py-1 text-[12px] font-medium",
        status === "Active"
          ? "border border-[#BDE7C7] bg-[#EAFBF0] text-[#2E9A4D]"
          : "border border-[#E4E4E7] bg-[#F4F4F5] text-[#8A8A94]",
      )}
    >
      {status}
    </span>
  );
}

function ActionMenu({
  member,
  onEdit,
  onToggleStatus,
}: {
  member: TeamMember;
  onEdit: () => void;
  onToggleStatus: () => void;
}) {
  const [open, setOpen] = useState(false);

  const { triggerRef, menuRef, position, updatePosition } = useFloatingMenu({
    open,
    gap: 8,
    viewportPadding: 8,
  });

  const wrapRef = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  useEffect(() => {
    if (open) updatePosition();
  }, [open, updatePosition]);

  return (
    <div ref={wrapRef} className="relative flex justify-center">
      <button
        type="button"
        ref={triggerRef}
        onClick={() => {
          const next = !open;
          setOpen(next);

          if (next) {
            requestAnimationFrame(() => updatePosition());
          }
        }}
        className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#7A7A85] transition hover:bg-[#F5F7FA] hover:text-[#111827]"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {open ? (
        <div
          ref={menuRef}
          className="fixed z-30 min-w-55 overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-[0_18px_40px_rgba(0,0,0,0.18)]"
          style={{
            top: position.top,
            left: position.left,
          }}
        >
          <button
            type="button"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
            className="flex h-19 w-full items-center px-8 text-left text-[18px] font-medium text-[#111111] transition hover:bg-[#F8F8F8]"
          >
            Edit User
          </button>

          <button
            type="button"
            onClick={() => {
              onToggleStatus();
              setOpen(false);
            }}
            className="flex h-19 w-full items-center border-t border-[#EFEFEF] px-8 text-left text-[18px] font-medium text-[#EF4444] transition hover:bg-[#FFF5F5]"
          >
            {member.status === "Active" ? "Deactivate User" : "Activate User"}
          </button>
        </div>
      ) : null}
    </div>
  );
}

const TeamMembersTable = ({
  members,
  onEditUser,
  onToggleStatus,
}: TeamMembersTableProps) => {
  return (
    <>
      <div className="hidden overflow-x-auto md:block">
        <table className="min-w-full border-t border-[#E6E6E8]">
          <thead>
            <tr className="bg-[#FAFAFB] text-left">
              {[
                "Name",
                "Email",
                "Role",
                "Seat Type",
                "Status",
                "Last Active",
                "Actions",
              ].map((head) => (
                <th
                  key={head}
                  className="px-5 py-4 text-[15px] font-semibold text-[#66666D]"
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr
                key={member.id}
                className="border-t border-[#ECECEE] text-[16px] text-[#111111]"
              >
                <td className="px-5 py-5">{member.name}</td>
                <td className="px-5 py-5 text-[#707078]">{member.email}</td>
                <td
                  className={cn(
                    "px-5 py-5 font-medium",
                    member.role === "Master Broker" && "text-[#11A8F5]",
                    member.role === "Broker" && "text-[#D6A100]",
                    member.role === "Admin Support" && "text-[#6F6F75]",
                  )}
                >
                  {member.role}
                </td>
                <td className="px-5 py-5 text-[#66666D]">{member.seatType}</td>
                <td className="px-5 py-5">
                  <StatusBadge status={member.status} />
                </td>
                <td className="px-5 py-5 text-[#66666D]">
                  {member.lastActive}
                </td>
                <td className="px-5 py-5">
                  <ActionMenu
                    member={member}
                    onEdit={() => onEditUser(member.id)}
                    onToggleStatus={() => onToggleStatus(member.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="space-y-4 border-t border-[#E6E6E8] p-4 md:hidden">
        {members.map((member) => (
          <div
            key={member.id}
            className="rounded-2xl border border-[#E7E7EA] bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[17px] font-medium text-[#111111]">
                  {member.name}
                </p>
                <p className="mt-1 text-[14px] text-[#73737B]">
                  {member.email}
                </p>
              </div>

              <ActionMenu
                member={member}
                onEdit={() => onEditUser(member.id)}
                onToggleStatus={() => onToggleStatus(member.id)}
              />
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 text-[14px]">
              <div>
                <p className="text-[#8A8A92]">Role</p>
                <p className="mt-1 text-[#111111]">{member.role}</p>
              </div>
              <div>
                <p className="text-[#8A8A92]">Seat Type</p>
                <p className="mt-1 text-[#111111]">{member.seatType}</p>
              </div>
              <div>
                <p className="text-[#8A8A92]">Status</p>
                <div className="mt-1">
                  <StatusBadge status={member.status} />
                </div>
              </div>
              <div>
                <p className="text-[#8A8A92]">Last Active</p>
                <p className="mt-1 text-[#111111]">{member.lastActive}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default TeamMembersTable;
