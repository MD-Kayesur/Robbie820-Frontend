// src/components/ReferrerDashboardCom/RSettingsCom/TeamManagementTab.tsx
import React, { useMemo, useState } from "react";
import { MoreVertical, UserPlus, Shield, UserRound } from "lucide-react";
import {
  TeamMember,
  TeamPermission,
} from "@/pages/ReferrerDashboard/ReferrerSettings/types";

function cn(...s: Array<string | false | null | undefined>) {
  return s.filter(Boolean).join(" ");
}

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
    <span className="inline-flex min-w-35 items-center justify-center gap-2 rounded-full bg-sky-100 px-4 py-2 text-sm font-semibold text-slate-900">
      <UserRound className="h-4 w-4 text-slate-700" />
      {value}
    </span>
  );
}

function RowActions({ onRemove }: { onRemove: () => void }) {
  const [open, setOpen] = useState(false);
  const ref = useOutsideClose<HTMLDivElement>(open, () => setOpen(false));

  return (
    <div className="relative flex justify-end" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="grid h-9 w-9 place-items-center rounded-lg hover:bg-slate-50 active:scale-[0.99] transition"
      >
        <MoreVertical className="h-4 w-4 text-slate-500" />
      </button>

      {open ? (
        <div className="absolute right-0 top-10 z-50 w-50 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
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

  return (
    <div className="space-y-6">
      {/* blue header */}
      <div className="rounded-2xl bg-sky-500 px-6 py-6 text-white">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15 ring-1 ring-white/20">
              <UserRound className="h-5 w-5" />
            </div>
            <div>
              <p className="text-lg font-semibold">Business Team</p>
              <p className="text-sm text-white/85">
                Manage employees and their permissions for referral submissions.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onAdd}
            className="inline-flex h-10 items-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold text-slate-900 hover:bg-white/95"
          >
            <UserPlus className="h-4 w-4" />
            Add Team Member
          </button>
        </div>
      </div>

      {/* table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
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
                      "px-6 py-4 text-left text-xs font-semibold tracking-wide text-slate-500",
                      h === "REFERRALS" || h === "JOINED" ? "text-right" : "",
                    )}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-200">
              {rows.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50/60">
                  <td className="px-6 py-4">
                    <p className="text-sm font-semibold text-slate-900">
                      {m.name}
                    </p>
                    <p className="text-xs text-slate-500">{m.email}</p>
                  </td>

                  <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                    {m.role}
                  </td>

                  <td className="px-6 py-4">
                    <PermPill value={m.permission} />
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                    {m.referrals}
                  </td>

                  <td className="px-6 py-4 text-right text-sm font-semibold text-slate-900">
                    {m.joined}
                  </td>

                  <td className="px-3 py-4">
                    <RowActions onRemove={() => onRemove(m.id)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* about */}
      <div className="rounded-2xl border border-sky-200 bg-sky-50 px-5 py-5">
        <div className="flex items-start gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-sky-500/10 text-sky-700 ring-1 ring-sky-200">
            <Shield className="h-5 w-5" />
          </div>
          <div className="min-w-0">
            <p className="text-base font-semibold text-slate-900">
              About Team Permissions
            </p>
            <p className="mt-1 text-sm text-slate-500">
              Admins can manage team members, view all commissions, and access
              business settings. Members can only submit new referrals and view
              progress for leads they personally introduced.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
