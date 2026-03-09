import { useEffect, useMemo, useState } from "react";
import { MoreVertical, Plus, X } from "lucide-react";

import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";
import { useFloatingMenu } from "@/hooks/useFloatingMenu";

type TeamRole = "Master Broker" | "Broker" | "Admin Support";
type SeatType = "Primary Seat" | "Paid Seat" | "Included Seat";
type MemberStatus = "Active" | "Inactive";

type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  seatType: SeatType;
  status: MemberStatus;
  lastActive: string;
};

type AddUserForm = {
  fullName: string;
  email: string;
  role: TeamRole;
};

const initialMembers: TeamMember[] = [
  {
    id: "tm-1",
    name: "John Hans",
    email: "john@company.com",
    role: "Master Broker",
    seatType: "Primary Seat",
    status: "Active",
    lastActive: "Today",
  },
  {
    id: "tm-2",
    name: "Sarah Lee",
    email: "sarah@company.com",
    role: "Broker",
    seatType: "Paid Seat",
    status: "Active",
    lastActive: "2 hours ago",
  },
  {
    id: "tm-3",
    name: "David Chen",
    email: "david@company.com",
    role: "Admin Support",
    seatType: "Included Seat",
    status: "Inactive",
    lastActive: "3 days ago",
  },
];

const totalSeats = 5;
const monthlyPlanCost = 149;
const paidSeatExtraCost = 20;

const roleCards: Array<{
  role: TeamRole;
  title: string;
  description: string;
  badge: string;
  badgeClassName: string;
}> = [
  {
    role: "Master Broker",
    title: "Master Broker (Subscriber)",
    description:
      "Full visibility across all referrals and settings. Can manage users, partners, and system configuration.",
    badge: "Full Access",
    badgeClassName: "bg-[#E9F1FF] text-[#4D7CFE]",
  },
  {
    role: "Broker",
    title: "Broker",
    description:
      "Manages their own leads and referrals only. No access to company-wide settings.",
    badge: "Paid Seat Required",
    badgeClassName: "bg-[#FFF1E7] text-[#F07B49]",
  },
  {
    role: "Admin Support",
    title: "Admin Support",
    description:
      "Operational support role. Can assist with updates, notes, and admin tasks.",
    badge: "Included Seat",
    badgeClassName: "bg-[#EAFBF0] text-[#2E9A4D]",
  },
];

const roleOptions: Array<{
  value: TeamRole;
  label: string;
  description: string;
  warning?: string;
}> = [
  {
    value: "Master Broker",
    label: "Master Broker (Subscriber)",
    description: "Full access and settings control.",
  },
  {
    value: "Broker",
    label: "Broker",
    description: "Can manage only their own referrals.",
    warning: "This role requires a paid subscription seat.",
  },
  {
    value: "Admin Support",
    label: "Admin Support",
    description: "Operational support role.",
  },
];

function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "rounded-[22px] border border-[#D9D9D9] bg-white shadow-[0_2px_8px_rgba(17,24,39,0.04)]",
        className,
      )}
    >
      {children}
    </div>
  );
}

function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center rounded-full px-3 text-[12px] font-medium",
        className,
      )}
    >
      {children}
    </span>
  );
}

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
    if (open) {
      updatePosition();
    }
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

export function AddTeamMemberModal({
  open,
  onClose,
  onSubmit,
  usedSeats,
}: {
  open: boolean;
  onClose: () => void;
  onSubmit: (payload: AddUserForm) => void;
  usedSeats: number;
}) {
  const [form, setForm] = useState<AddUserForm>({
    fullName: "",
    email: "",
    role: "Broker",
  });

  useEffect(() => {
    if (!open) {
      setForm({
        fullName: "",
        email: "",
        role: "Broker",
      });
    }
  }, [open]);

  useLockBodyScroll(open);
  const modalRef = useOutsideClose<HTMLDivElement>(open, onClose);

  const isBroker = form.role === "Broker";
  const nextUsedSeats = isBroker ? usedSeats + 1 : usedSeats;
  const increaseAmount = isBroker ? paidSeatExtraCost : 0;

  const canAddSelectedRole = form.role !== "Broker" || usedSeats < totalSeats;

  const canSubmit =
    form.fullName.trim().length > 0 &&
    form.email.trim().length > 0 &&
    canAddSelectedRole;

  if (!open) return null;

  const handleChange = <K extends keyof AddUserForm>(
    key: K,
    value: AddUserForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(form);
    setForm({
      fullName: "",
      email: "",
      role: "Broker",
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/35 p-3 sm:p-5">
      <div
        ref={modalRef}
        className="max-h-[92vh] w-full max-w-260 overflow-y-auto rounded-[28px] bg-white shadow-[0_28px_80px_rgba(0,0,0,0.28)]"
      >
        <div className="flex items-center justify-between px-6 py-5 sm:px-8 sm:py-6">
          <h2 className="text-[28px] font-medium leading-none text-[#111111] sm:text-[34px]">
            Add Team Member
          </h2>

          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full text-[#111111] transition hover:bg-[#F5F5F5]"
          >
            <X className="h-8 w-8" strokeWidth={1.8} />
          </button>
        </div>

        <div className="border-t border-[#E8E8E8]" />

        <div className="space-y-8 px-6 py-8 sm:px-8 sm:py-10">
          <section>
            <h3 className="text-[22px] font-medium text-[#111111] sm:text-[24px]">
              User Details
            </h3>

            <div className="mt-8 space-y-6">
              <div>
                <label className="mb-3 block text-[18px] text-[#6E6E73]">
                  Full Name
                </label>
                <input
                  type="text"
                  value={form.fullName}
                  onChange={(e) => handleChange("fullName", e.target.value)}
                  placeholder="Enter full name"
                  className="h-17 w-full rounded-[18px] border border-[#D9D9DF] bg-[#F8F8FA] px-5 text-[18px] text-[#111111] outline-none transition placeholder:text-[#9B9BA1] focus:border-[#11A8F5] focus:bg-white"
                />
              </div>

              <div>
                <label className="mb-3 block text-[18px] text-[#6E6E73]">
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="email@example.com"
                  className="h-17 w-full rounded-[18px] border border-[#D9D9DF] bg-[#F8F8FA] px-5 text-[18px] text-[#111111] outline-none transition placeholder:text-[#9B9BA1] focus:border-[#11A8F5] focus:bg-white"
                />
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[22px] font-medium text-[#111111] sm:text-[24px]">
              Assign Role
            </h3>

            <div className="mt-8 space-y-4">
              {roleOptions.map((option) => {
                const selected = form.role === option.value;

                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleChange("role", option.value)}
                    className={cn(
                      "flex w-full items-start gap-4 rounded-[20px] border px-5 py-6 text-left transition sm:px-6",
                      selected
                        ? "border-[#11A8F5] bg-white shadow-[inset_0_0_0_1px_#11A8F5]"
                        : "border-[#D9D9D9] bg-white hover:border-[#C8CDD5]",
                    )}
                  >
                    <span
                      className={cn(
                        "mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2",
                        selected
                          ? "border-[#030526] bg-[#030526]"
                          : "border-[#D9D9D9] bg-white",
                      )}
                    >
                      {selected ? (
                        <span className="h-3 w-3 rounded-full bg-white" />
                      ) : null}
                    </span>

                    <div className="min-w-0">
                      <p className="text-[18px] font-medium text-[#111111] sm:text-[20px]">
                        {option.label}
                      </p>
                      <p className="mt-3 text-[16px] text-[#6F6F75] sm:text-[17px]">
                        {option.description}
                      </p>

                      {option.warning ? (
                        <span className="mt-4 inline-flex rounded-xl bg-[#FFF1E7] px-4 py-2 text-[15px] text-[#F07B49]">
                          {option.warning}
                        </span>
                      ) : null}
                    </div>
                  </button>
                );
              })}
            </div>
          </section>

          <section className="rounded-[20px] border border-[#D9D9DF] bg-[#FAFAFB] px-5 py-5 sm:px-6">
            <h4 className="text-[18px] font-medium text-[#111111]">
              Seat Summary:
            </h4>
            <p className="mt-4 text-[18px] text-[#66666D]">
              Current seats used:{" "}
              <span className="font-medium text-[#111111]">
                {nextUsedSeats} of {totalSeats}
              </span>
            </p>
            <p className="mt-4 text-[18px] text-[#111111]">
              {increaseAmount > 0
                ? `Adding this user will increase your monthly subscription by $${increaseAmount}.`
                : "Adding this user will not increase your monthly subscription."}
            </p>
          </section>

          <div className="grid grid-cols-1 gap-4 pt-2 sm:grid-cols-2">
            <button
              type="button"
              onClick={onClose}
              className="h-17 rounded-[18px] border border-[#D9D9DF] bg-white text-[18px] font-medium text-[#111111] transition hover:bg-[#F8F8F8]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={!canSubmit}
              className={cn(
                "h-17 rounded-[18px] bg-[#020428] text-[18px] font-medium text-white transition",
                canSubmit
                  ? "hover:opacity-95"
                  : "cursor-not-allowed opacity-50",
              )}
            >
              Add User
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const BrokerTeamManagement = () => {
  const [members, setMembers] = useState<TeamMember[]>(initialMembers);
  const [modalOpen, setModalOpen] = useState(false);

  const usedSeats = useMemo(
    () =>
      members.filter((member) => member.seatType !== "Included Seat").length,
    [members],
  );

  const seatProgress = Math.min((usedSeats / totalSeats) * 100, 100);

  const handleAddMember = (payload: AddUserForm) => {
    const seatType: SeatType =
      payload.role === "Broker"
        ? "Paid Seat"
        : payload.role === "Master Broker"
          ? "Primary Seat"
          : "Included Seat";

    const newMember: TeamMember = {
      id: crypto.randomUUID(),
      name: payload.fullName,
      email: payload.email,
      role: payload.role,
      seatType,
      status: "Active",
      lastActive: "Just now",
    };

    setMembers((prev) => [newMember, ...prev]);
    setModalOpen(false);
  };

  const handleToggleStatus = (id: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? {
              ...member,
              status: member.status === "Active" ? "Inactive" : "Active",
            }
          : member,
      ),
    );
  };

  const handleEditUser = (id: string) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id
          ? { ...member, lastActive: "Updated just now" }
          : member,
      ),
    );
  };

  return (
    <>
      <div className="space-y-7 bg-[#F8F9FB] p-4 sm:p-6 xl:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[28px] font-medium leading-none text-[#111111]">
              Team Management
            </h1>
            <p className="mt-3 text-[16px] text-[#7C7C84]">
              audit user permissions and manage workspace access.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#11A8F5] px-5 text-[18px] font-medium text-white transition hover:bg-[#0E9BE3]"
          >
            <Plus className="h-5 w-5" />
            Add Team Member
          </button>
        </div>

        <Card className="p-5 sm:p-6 lg:p-7">
          <h2 className="text-[22px] font-medium text-[#111111]">
            Subscription &amp; User Seats
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-[15px] text-[#7B7B82]">Plan Name</p>
              <p className="mt-1 text-[18px] font-medium text-[#111111]">
                Professional Plan
              </p>
            </div>

            <div className="md:text-right">
              <p className="text-[15px] text-[#7B7B82]">Monthly Cost</p>
              <p className="mt-1 text-[18px] font-medium text-[#111111]">
                ${monthlyPlanCost}/month
              </p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between gap-3">
            <p className="text-[15px] text-[#7B7B82]">Seat usage indicator</p>
            <p className="text-[16px] text-[#111111]">
              Active Seats: {usedSeats} of {totalSeats} used
            </p>
          </div>

          <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-[#E7E9EF]">
            <div
              className="h-full rounded-full bg-[#11A8F5]"
              style={{ width: `${seatProgress}%` }}
            />
          </div>

          <p className="mt-5 text-[15px] text-[#7B7B82]">
            Each additional broker seat adds to your monthly subscription.
          </p>

          <button
            type="button"
            className="mt-6 inline-flex h-11 items-center justify-center rounded-xl border border-[#1F2937] px-4 text-[16px] font-medium text-[#111111] transition hover:bg-[#F7F7F8]"
          >
            View Subscription Details
          </button>
        </Card>

        <div className="grid gap-5 xl:grid-cols-3">
          {roleCards.map((item) => (
            <Card key={item.role} className="p-5 sm:p-6">
              <h3 className="text-[20px] font-medium leading-snug text-[#111111]">
                {item.title}
              </h3>
              <p className="mt-4 text-[16px] leading-7 text-[#7A7A82]">
                {item.description}
              </p>

              <div className="mt-5">
                <Badge className={item.badgeClassName}>{item.badge}</Badge>
              </div>
            </Card>
          ))}
        </div>

        <Card className="overflow-hidden">
          <div className="px-5 py-5 sm:px-6">
            <h2 className="text-[22px] font-medium text-[#111111]">
              Team Members
            </h2>
          </div>

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
                    <td className="px-5 py-5 text-[#66666D]">
                      {member.seatType}
                    </td>
                    <td className="px-5 py-5">
                      <StatusBadge status={member.status} />
                    </td>
                    <td className="px-5 py-5 text-[#66666D]">
                      {member.lastActive}
                    </td>
                    <td className="px-5 py-5">
                      <ActionMenu
                        member={member}
                        onEdit={() => handleEditUser(member.id)}
                        onToggleStatus={() => handleToggleStatus(member.id)}
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
                    onEdit={() => handleEditUser(member.id)}
                    onToggleStatus={() => handleToggleStatus(member.id)}
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
        </Card>
      </div>

      <AddTeamMemberModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleAddMember}
        usedSeats={usedSeats}
      />
    </>
  );
};

export default BrokerTeamManagement;
