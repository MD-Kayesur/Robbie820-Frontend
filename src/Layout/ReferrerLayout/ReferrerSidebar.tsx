// src/Layout/ReferrerLayout/ReferrerSidebar.tsx
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Bell,
  LayoutGrid,
  LogOut,
  Settings as SettingsIcon,
  User,
  X,
} from "lucide-react";
import { cn } from "@/hooks/useCn";
import { useOutsideClose } from "@/hooks/useOutsideClose";

type ItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
  onClick?: () => void;
};

type Props = {
  mobileOpen: boolean;
  onClose: () => void;
};

const SidebarItem = ({ to, icon: Icon, label, end, onClick }: ItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          "flex items-center gap-1.5 rounded-sm px-3 py-2 transition",
          isActive ? "bg-[#67C5F0]" : "hover:bg-[#00B4FE1A]",
        )
      }
    >
      <Icon className="h-6 w-6 shrink-0 text-black" strokeWidth={2} />
      <span className="text-black">{label}</span>
    </NavLink>
  );
};

const ReferrerSidebar = ({ mobileOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const sidebarRef = useOutsideClose<HTMLElement>(mobileOpen, onClose);

  const handleSignOut = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile overlay */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-40 bg-black/30 transition-opacity md:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0",
        )}
      />

      <aside
        ref={sidebarRef}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen sm:w-70 flex-col overflow-y-auto bg-[#F3F3F3] px-4 py-6 sm:px-8 sm:py-11 transition-transform duration-300 md:static lg:z-0 lg:w-72.5 lg:translate-x-0 lg:border-r lg:border-slate-200",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-12.5 flex items-start justify-between gap-3">
          <button
            type="button"
            onClick={() => {
              navigate("/");
              onClose();
            }}
            className="text-left text-[#00B4FE]"
          >
            <h1 className="text-2xl font-semibold leading-6">Refer Now</h1>
            <p className="text-[10px] font-medium uppercase leading-2.5">
              Seamlessly
              <br />
              Connected
            </p>
          </button>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-white p-2 text-black shadow-sm md:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="space-y-4 sm:space-y-7.5">
          <SidebarItem
            to="/referrer-dashboard"
            icon={LayoutGrid}
            label="Overview"
            end
            onClick={onClose}
          />
          <SidebarItem
            to="/referrer-dashboard/my-referrals"
            icon={User}
            label="My Referrals"
            onClick={onClose}
          />
          <SidebarItem
            to="/referrer-dashboard/notifications"
            icon={Bell}
            label="Notifications"
            onClick={onClose}
          />
          <SidebarItem
            to="/referrer-dashboard/settings"
            icon={SettingsIcon}
            label="Settings"
            onClick={onClose}
          />
        </nav>

        {/* Footer */}
        <div className="mt-auto pt-10">
          <div className="mb-6 h-px w-full bg-[#E5E5E5]" />

          <button
            type="button"
            onClick={handleSignOut}
            className="flex w-full items-center gap-1.5 p-4 text-left transition hover:bg-[#00B4FE1A]"
          >
            <LogOut className="h-6 w-6 text-black" strokeWidth={2} />
            <span className="text-black">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ReferrerSidebar;
