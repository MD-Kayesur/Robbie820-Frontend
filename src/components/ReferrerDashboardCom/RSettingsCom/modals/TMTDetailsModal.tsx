import React from "react";
import { X } from "lucide-react";
import { TeamMember } from "@/pages/ReferrerDashboard/ReferrerSettings/types";
import { cn } from "@/hooks/useCn";
import { useEscClose } from "@/hooks/useEscClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

type Props = {
  open: boolean;
  member: TeamMember | null;
  onClose: () => void;
};

function DetailRow({
  label,
  value,
  valueClassName,
}: {
  label: string;
  value: React.ReactNode;
  valueClassName?: string;
}) {
  return (
    <div className="grid grid-cols-[110px_minmax(0,1fr)] items-start gap-4">
      <p className="text-[16px] font-medium uppercase leading-none text-[#3A3A3A]">
        {label}
      </p>
      <div className={cn("min-w-0 text-right", valueClassName)}>{value}</div>
    </div>
  );
}

export default function TeamMemberDetailsModal({
  open,
  member,
  onClose,
}: Props) {
  useEscClose(open, onClose);
  useLockBodyScroll(open);

  if (!open || !member) return null;

  return (
    <div
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/30 p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-90 rounded-[20px] bg-white px-5 pb-8 pt-10 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full border-2 border-black text-black transition hover:bg-slate-50"
        >
          <X className="h-5 w-5" strokeWidth={2.5} />
        </button>

        <div className="space-y-8 pt-6">
          <DetailRow
            label="Member"
            value={
              <div>
                <p className="text-[22px] font-medium leading-tight text-[#666666]">
                  {member.name}
                </p>
                <p className="mt-2 break-all text-[16px] text-[#666666]">
                  {member.email}
                </p>
              </div>
            }
          />

          <DetailRow
            label="Role"
            value={
              <p className="text-[20px] font-medium text-black">
                {member.role}
              </p>
            }
          />

          <DetailRow
            label="Permissions"
            value={
              <p className="text-[20px] font-medium text-[#19D243]">
                {member.permission}
              </p>
            }
          />

          <DetailRow
            label="Referrals"
            value={
              <p className="text-[24px] font-medium text-black">
                {member.referrals}
              </p>
            }
          />

          <DetailRow
            label="Joined"
            value={
              <p className="text-[20px] font-medium text-black">
                {member.joined}
              </p>
            }
          />
        </div>
      </div>
    </div>
  );
}
