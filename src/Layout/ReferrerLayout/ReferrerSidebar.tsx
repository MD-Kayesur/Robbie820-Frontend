import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutGrid,
  User,
  Bell,
  Settings as SettingsIcon,
  LogOut,
} from "lucide-react";
import { cn } from "@/hooks/useCn";

type ItemProps = {
  to: string;
  icon: React.ElementType;
  label: string;
  end?: boolean;
};

const SidebarItem = ({ to, icon: Icon, label, end }: ItemProps) => {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        cn(
          "group flex items-center gap-2.75 rounded-sm px-2.5 py-1.5 transition",
          // hover only for inactive
          !isActive && "hover:bg-[#00B4FE33]",
          // active (stronger)
          isActive && "bg-[#00B4FE99]",
          // keep active color even when hovered
          "aria-[current=page]:hover:bg-[#00B4FE99]",
        )
      }
    >
      <Icon className="h-6 w-6 shrink-0 text-black" />
      <span className="text-base text-black">{label}</span>
    </NavLink>
  );
};

const ReferrerSidebar = () => {
  const navigate = useNavigate();

  return (
    <aside className="flex h-full w-64 flex-col bg-[#F5F5F5] px-8 py-11">
      {/* Brand */}
      <div className="mb-12.5">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="text-left"
        >
          <div className="text-2xl font-semibold text-[#00B4FE]">Refer Now</div>
          <div className="mt-1 text-[10px] font-medium uppercase leading-tight tracking-[0.18em] text-[#00B4FE]">
            Seamlessly
            <br />
            Connected
          </div>
        </button>
      </div>

      {/* Nav */}
      <nav className="space-y-8.5">
        <SidebarItem
          to="/referrer-dashboard/overview"
          icon={LayoutGrid}
          label="Overview"
          end
        />
        <SidebarItem
          to="/referrer-dashboard/my-referrals"
          icon={User}
          label="My Referrals"
        />
        <SidebarItem
          to="/referrer-dashboard/notifications"
          icon={Bell}
          label="Notifications"
        />
        <SidebarItem
          to="/referrer-dashboard/settings"
          icon={SettingsIcon}
          label="Settings"
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
          className="flex items-center gap-2.75 rounded-sm px-2.5 py-1.5 text-black hover:bg-[#00B4FE33]"
        >
          <LogOut className="h-6 w-6" />
          <span className="text-base">Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default ReferrerSidebar;
