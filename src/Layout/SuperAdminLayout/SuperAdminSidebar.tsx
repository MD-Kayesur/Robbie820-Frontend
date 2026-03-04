import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  CreditCard,
  GitBranch,
  FileText,
  Settings,
  Zap,
} from "lucide-react";

type ItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
};

const SidebarItem = ({ to, icon: Icon, label }: ItemProps) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      [
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
        isActive ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-50",
      ].join(" ")
    }
  >
    <Icon className="h-5 w-5" />
    <span className="truncate">{label}</span>
  </NavLink>
);

const SuperAdminSidebar = () => {
  return (
    <aside className="w-60 h-full bg-[#F5F5F5] px-5 py-6">
      {/* Brand */}
      <div className="flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500">
          <Zap className="h-5 w-5 text-white fill-white" />
        </div>
        <span className="text-[15px] font-semibold text-slate-900">
          SuperAdmin
        </span>
      </div>

      {/* Nav */}
      <nav className="mt-6 space-y-6">
        <SidebarItem
          to="/admin/dashboard"
          icon={LayoutGrid}
          label="Dashboard"
        />
        <SidebarItem
          to="/admin/user-management"
          icon={Users}
          label="User Management"
        />
        <SidebarItem
          to="/admin/subscriptions"
          icon={CreditCard}
          label="Subscriptions"
        />
        <SidebarItem
          to="/admin/integrations"
          icon={GitBranch}
          label="Integrations"
        />
        <SidebarItem
          to="/admin/audit-logs"
          icon={FileText}
          label="Audit Logs"
        />
        <SidebarItem
          to="/admin/settings"
          icon={Settings}
          label="System Settings"
        />
      </nav>
    </aside>
  );
};

export default SuperAdminSidebar;
