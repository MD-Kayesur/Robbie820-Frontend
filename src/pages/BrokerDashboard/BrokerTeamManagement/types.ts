export type TeamRole = "Master Broker" | "Broker" | "Admin Support";
export type SeatType = "Primary Seat" | "Paid Seat" | "Included Seat";
export type MemberStatus = "Active" | "Inactive";

export type TeamMember = {
  id: string;
  name: string;
  email: string;
  role: TeamRole;
  seatType: SeatType;
  status: MemberStatus;
  lastActive: string;
};

export type AddUserForm = {
  fullName: string;
  email: string;
  role: TeamRole;
};

export type RoleCardItem = {
  role: TeamRole;
  title: string;
  description: string;
  badge: string;
  badgeClassName: string;
};

export type RoleOption = {
  value: TeamRole;
  label: string;
  description: string;
  warning?: string;
};
