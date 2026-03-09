import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { cn } from "@/hooks/useCn";

import AddTeamMemberModal from "./AddTeamMemberModal";
import TeamMembersTable from "./TeamMembersTable";
import { initialMembers, monthlyPlanCost, roleCards, totalSeats } from "./mock";
import type { AddUserForm, SeatType, TeamMember } from "./types";

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
      <div className="space-y-7">
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

          <TeamMembersTable
            members={members}
            onEditUser={handleEditUser}
            onToggleStatus={handleToggleStatus}
          />
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
