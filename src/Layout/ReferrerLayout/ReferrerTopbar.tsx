// src/Layout/ReferrerLayout/ReferrerTopbar.tsx

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Plus, Search } from "lucide-react";
import { cn } from "@/hooks/useCn";
import NewReferralModal from "@/components/ReferrerDashboardCom/NewReferralModal";

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

  const [openNew, setOpenNew] = useState(false);

  const meta = useMemo(() => {
    return (
      ROUTE_META.find((r) => r.match(pathname))?.meta ?? {
        title: "Dashboard",
        subtitle: "manage your workspace.",
      }
    );
  }, [pathname]);

  return (
    <header className="relative z-50 w-full bg-white px-4 pt-5 sm:px-5 sm:pt-6 md:px-6 md:pt-8 xl:px-7.5 xl:pt-11">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        {/* Left */}
        <div className="min-w-0">
          <h2 className="text-base font-medium leading-none text-black sm:text-lg">
            {meta.title}
          </h2>
          <p className="mt-2 text-sm text-[#666666] sm:mt-2.5 sm:text-base">
            {meta.subtitle}
          </p>
        </div>

        {/* Right */}
        <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center lg:w-auto lg:flex-nowrap lg:justify-end">
          {/* Search */}
          <div className="relative w-full sm:flex-1 md:min-w-65 lg:w-[320px] xl:mr-8.5 xl:w-105">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 sm:h-4.5 sm:w-4.5" />
            <input
              type="text"
              placeholder="search referrals..."
              className={cn(
                "h-11 w-full rounded-md border border-slate-200 bg-white pl-11 pr-3.5 sm:h-12 sm:pl-12",
                "text-sm text-slate-700 placeholder:text-slate-400",
                "outline-none focus:ring-2 focus:ring-slate-200 shadow-sm",
              )}
            />
          </div>

          <div className="flex items-center gap-3 sm:gap-4 lg:gap-5 xl:gap-0">
            {/* Bell */}
            <button
              type="button"
              onClick={() => navigate("/referrer-dashboard/notifications")}
              className={cn(
                "grid h-11 w-11 shrink-0 place-items-center rounded-md border shadow-sm transition sm:h-12 sm:w-12 lg:mr-6 xl:mr-20",
                meta.bellActive
                  ? "border-sky-200 bg-[#00B4FE] text-white shadow-sky-100"
                  : "border-slate-200 bg-white text-black hover:bg-slate-50",
              )}
              aria-label="Notifications"
            >
              <Bell
                className={cn(
                  "h-5 w-5 sm:h-6 sm:w-6",
                  meta.bellActive ? "text-white" : "text-black",
                )}
              />
            </button>

            {/* New Referral */}
            <button
              type="button"
              onClick={() => setOpenNew(true)}
              className={cn(
                "inline-flex h-11 items-center justify-center gap-2.5 rounded-md bg-black px-4 sm:h-12 sm:gap-3 sm:px-5 md:px-6",
                "text-xs font-medium uppercase tracking-wide text-white sm:text-sm",
                "shadow-md hover:bg-slate-900",
              )}
            >
              <Plus className="h-4 w-4 sm:h-5 sm:w-5" />
              NEW REFERRAL
            </button>
          </div>
        </div>
      </div>

      {/* Bottom divider (like screenshot) */}
      <div className="mt-3.5 h-px w-full bg-slate-200/70" />

      {/* Modal */}
      <NewReferralModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        onSubmit={(data) => {
          // wire your API here
          // eslint-disable-next-line no-console
          console.log("new referral submit:", data);
        }}
      />
    </header>
  );
}
