import { Search, Bell, Menu } from "lucide-react";

type SuperAdminTopbarProps = {
  onMenuClick?: () => void;
};

const SuperAdminTopbar = ({ onMenuClick }: SuperAdminTopbarProps) => {
  return (
    <header className="relative z-40 w-full bg-white">
      <div className="mx-auto flex h-20 items-center justify-between px-4 md:px-6 lg:px-10">
        {/* Left */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-700 transition hover:bg-slate-50 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <h2 className="text-lg font-semibold tracking-tight text-black md:text-xl lg:px-9 lg:text-2xl">
            Platform Overview
          </h2>
        </div>

        {/* Right */}
        <div className="flex items-center gap-3 md:gap-4 lg:gap-6">
          {/* Search */}
          <div className="relative hidden w-105 max-w-130 md:block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search users, subscriptions, logs..."
              aria-label="Search users, subscriptions, and logs"
              className="h-11 w-full rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] pl-11 pr-4 text-sm text-slate-700 placeholder:text-slate-400 outline-none transition focus:border-slate-300 focus:ring-4 focus:ring-slate-200/60"
            />
          </div>

          {/* Bell */}
          <button
            type="button"
            className="relative grid h-11 w-11 place-items-center rounded-full text-slate-500 transition hover:bg-slate-100"
            aria-label="Notifications"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-rose-500 ring-2 ring-white" />
          </button>

          {/* Avatar */}
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#2B7FFF_0%,#1447E6_100%)] text-sm font-bold text-white"
            aria-label="Account"
          >
            SA
          </button>
        </div>
      </div>
    </header>
  );
};

export default SuperAdminTopbar;
