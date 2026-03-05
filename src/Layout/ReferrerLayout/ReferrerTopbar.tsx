// src/Layout/ReferrerLayout/ReferrerTopbar.tsx
"use client";

import { useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Plus, Search } from "lucide-react";
import { cn } from "@/hooks/useCn";

type TopbarMeta = {
  title: string;
  subtitle: string;
  bellActive?: boolean; // only notifications page
};

const ROUTE_META: Array<{ match: (p: string) => boolean; meta: TopbarMeta }> = [
  {
    match: (p) =>
      p === "/referrer-dashboard/overview" || p === "/referrer-dashboard",
    meta: {
      title: "PARTNER OVERVIEW",
      subtitle: "welcome back, alex, your portfolio is growing.",
    },
  },
  {
    match: (p) => p.startsWith("/referrer-dashboard/my-referrals"),
    meta: {
      title: "Referral Management",
      subtitle: "track and manage your team's submitted leads.",
    },
  },
  {
    match: (p) => p.startsWith("/referrer-dashboard/notifications"),
    meta: {
      title: "Notifications",
      subtitle: "stay updated on status changes and payments.",
      bellActive: true,
    },
  },
  {
    match: (p) => p.startsWith("/referrer-dashboard/settings"),
    meta: {
      title: "Business Settings",
      subtitle: "manage profile, team members, and business rules.",
    },
  },
];

export default function ReferrerTopbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const meta = useMemo(() => {
    return (
      ROUTE_META.find((r) => r.match(pathname))?.meta ?? {
        title: "Dashboard",
        subtitle: "manage your workspace.",
      }
    );
  }, [pathname]);

  return (
    <header className="relative z-50 w-full bg-white px-7.5 pt-11">
      <div className="flex items-center justify-between">
        {/* Left */}
        <div className="min-w-0">
          <h2 className="text-lg font-medium leading-none text-black">
            {meta.title}
          </h2>
          <p className="mt-2.5 text-base text-[#666666]">{meta.subtitle}</p>
        </div>

        {/* Right */}
        <div className="flex items-center">
          {/* Search */}
          <div className="relative hidden w-105 md:block mr-8.5">
            <Search className="absolute left-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="search referrals..."
              className={cn(
                "h-12 w-full rounded-md border border-slate-200 bg-white pl-12 pr-3.5",
                "text-sm text-slate-700 placeholder:text-slate-400",
                "outline-none focus:ring-2 focus:ring-slate-200 shadow-sm",
              )}
            />
          </div>

          {/* Bell */}
          <button
            type="button"
            onClick={() => navigate("/referrer-dashboard/notifications")}
            className={cn(
              "grid h-12 w-12 place-items-center rounded-md border shadow-sm transition mr-20",
              meta.bellActive
                ? "border-sky-200 bg-[#00B4FE] text-white shadow-sky-100"
                : "border-slate-200 bg-white text-black hover:bg-slate-50",
            )}
            aria-label="Notifications"
          >
            <Bell
              className={cn(
                "h-6 w-6",
                meta.bellActive ? "text-white" : "text-black",
              )}
            />
          </button>

          {/* New Referral */}
          <button
            type="button"
            onClick={() => navigate("/referrer-dashboard/my-referrals/new")}
            className={cn(
              "inline-flex h-12 items-center gap-3 rounded-md bg-black px-6",
              "text-sm font-medium uppercase tracking-wide text-white",
              "shadow-md hover:bg-slate-900",
            )}
          >
            <Plus className="h-5 w-5" />
            NEW REFERRAL
          </button>
        </div>
      </div>

      {/* Bottom divider (like screenshot) */}
      <div className="mt-3.5 h-px w-full bg-slate-200/70" />
    </header>
  );
}
