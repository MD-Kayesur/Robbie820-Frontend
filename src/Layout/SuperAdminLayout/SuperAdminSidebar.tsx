// src/Layout/SuperAdminLayout/SuperAdminSidebar.tsx

import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  Users,
  CreditCard,
  GitBranch,
  FileText,
  Settings,
  Zap,
  X,
} from "lucide-react";

type ItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  onClick?: () => void;
  end?: boolean;
};

type SuperAdminSidebarProps = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

const navItems = [
  { to: "/super-admin", icon: LayoutGrid, label: "Dashboard", end: true },
  {
    to: "/super-admin/user-management",
    icon: Users,
    label: "User Management",
  },
  {
    to: "/super-admin/subscriptions",
    icon: CreditCard,
    label: "Subscriptions",
  },
  {
    to: "/super-admin/integrations",
    icon: GitBranch,
    label: "Integrations",
  },
  { to: "/super-admin/audit-logs", icon: FileText, label: "Audit Logs" },
  { to: "/super-admin/settings", icon: Settings, label: "System Settings" },
];

const SidebarItem = ({ to, icon: Icon, label, onClick, end }: ItemProps) => (
  <NavLink
    to={to}
    end={end}
    onClick={onClick}
    className={({ isActive }) =>
      [
        "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
        isActive ? "bg-sky-500 text-white" : "text-slate-700 hover:bg-slate-50",
      ].join(" ")
    }
  >
    <Icon className="h-5 w-5 shrink-0" />
    <span className="truncate">{label}</span>
  </NavLink>
);

function SidebarContent({ onItemClick }: { onItemClick?: () => void }) {
  return (
    <>
      <div className="hidden lg:flex items-center gap-3 px-2">
        <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500">
          <Zap className="h-5 w-5 fill-white text-white" />
        </div>
        <span className="text-[15px] font-semibold text-slate-900">
          SuperAdmin
        </span>
      </div>

      <nav className="mt-6 space-y-6">
        {navItems.map((item) => (
          <SidebarItem
            key={item.to}
            to={item.to}
            icon={item.icon}
            label={item.label}
            onClick={onItemClick}
            end={item.end}
          />
        ))}
      </nav>
    </>
  );
}

const SuperAdminSidebar = ({
  mobileOpen = false,
  onClose,
}: SuperAdminSidebarProps) => {
  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden h-full w-60 shrink-0 bg-[#F5F5F5] px-5 py-6 lg:block">
        <SidebarContent />
      </aside>

      {/* Mobile drawer */}
      <div
        className={[
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none",
        ].join(" ")}
      >
        <div
          onClick={onClose}
          className={[
            "absolute inset-0 bg-black/35 transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0",
          ].join(" ")}
        />

        <aside
          className={[
            "absolute left-0 top-0 h-full w-60 bg-[#F5F5F5] px-5 py-6 shadow-xl transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full",
          ].join(" ")}
        >
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3 px-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-sky-500">
                <Zap className="h-5 w-5 fill-white text-white" />
              </div>
              <span className="text-[15px] font-semibold text-slate-900">
                SuperAdmin
              </span>
            </div>

            <button
              type="button"
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 rounded-xl bg-white text-black transition hover:bg-slate-50"
            >
              <X size={24} />
            </button>
          </div>

          <SidebarContent onItemClick={onClose} />
        </aside>
      </div>
    </>
  );
};

export default SuperAdminSidebar;
