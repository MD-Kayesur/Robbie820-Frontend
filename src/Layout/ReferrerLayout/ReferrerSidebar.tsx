import React, { useEffect, useRef } from "react";
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
          "group flex items-center gap-2.75 rounded-sm px-2.5 py-1.5 transition",
          !isActive && "hover:bg-[#00B4FE33]",
          isActive && "bg-[#00B4FE99]",
          "aria-[current=page]:hover:bg-[#00B4FE99]",
        )
      }
    >
      <Icon className="h-6 w-6 shrink-0 text-black" />
      <span className="text-base text-black">{label}</span>
    </NavLink>
  );
};

const ReferrerSidebar = ({ mobileOpen, onClose }: Props) => {
  const navigate = useNavigate();
  const sidebarRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!mobileOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (sidebarRef.current && !sidebarRef.current.contains(target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [mobileOpen, onClose]);

  return (
    <>
      {/* Mobile overlay */}
      <div
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
          "fixed left-0 top-0 z-50 flex h-full w-70 flex-col overflow-y-auto bg-[#F5F5F5] px-8 py-8 transition-transform duration-300 md:static md:z-0 md:w-64 md:translate-x-0 md:py-11",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="mb-10 flex items-center justify-between md:mb-12.5">
          {/* Brand */}
          <div>
            <button
              type="button"
              onClick={() => {
                navigate("/");
                onClose();
              }}
              className="text-left"
            >
              <div className="text-2xl font-semibold text-[#00B4FE]">
                Refer Now
              </div>
              <div className="mt-1 text-[10px] font-medium uppercase leading-tight tracking-[0.18em] text-[#00B4FE]">
                Seamlessly
                <br />
                Connected
              </div>
            </button>
          </div>

          {/* Mobile close */}
          <div className="md:hidden">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg bg-white p-1 text-black"
              aria-label="Close sidebar"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-8.5">
          <SidebarItem
            to="/referrer-dashboard/overview"
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
          <div className="mx-1 mb-3.5 h-px bg-[#EBEBEB]" />

          <button
            type="button"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
            className="flex items-center gap-2.75 rounded-sm px-2.5 py-1.5 text-black transition hover:bg-[#00B4FE33]"
          >
            <LogOut className="h-6 w-6" />
            <span className="text-base">Sign Out</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default ReferrerSidebar;
