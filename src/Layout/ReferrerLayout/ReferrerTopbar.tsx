// src/Layout/ReferrerLayout/ReferrerTopbar.tsx

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Bell, Menu, Plus, Search } from "lucide-react";
import { cn } from "@/hooks/useCn";
import NewReferralModal from "@/components/ReferrerDashboardCom/NewReferralModal";

type TopbarMeta = {
  title: string;
  subtitle: string;
  bellActive?: boolean;
};

type Props = {
  onOpenSidebar: () => void;
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

export default function ReferrerTopbar({ onOpenSidebar }: Props) {
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
    <>
      <header className="relative z-30 w-full bg-white mt-11 md:mt-0">
        {/* Mobile controls only: sticky */}
        <div className=" bg-white px-4 pt-5 pb-3 md:hidden">
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={onOpenSidebar}
              className="fixed z-50 left-4 top-5 grid h-11 w-11 place-items-center rounded-xl bg-white text-black shadow-sm ring-1 ring-slate-200"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>

            <button
              type="button"
              onClick={() => navigate("/referrer-dashboard/notifications")}
              className={cn(
                "fixed z-50 right-4 top-5 grid h-11 w-11 place-items-center rounded-xl shadow-sm ring-1 transition",
                meta.bellActive
                  ? "bg-[#00B4FE] text-white ring-sky-200"
                  : "bg-white text-black ring-slate-200",
              )}
              aria-label="Notifications"
            >
              <Bell className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main content */}
        <div className="px-4 md:px-5 md:px-6 md:pt-8 xl:px-7.5 xl:pt-11">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Left */}
            <div className="min-w-0">
              <h2 className="text-[18px] font-medium leading-none text-black md:text-[20px] md:text-base xl:text-lg">
                {meta.title}
              </h2>
              <p className="mt-3 text-[15px] text-[#666666] md:text-base md:mt-2.5">
                {meta.subtitle}
              </p>
            </div>

            {/* Right */}
            <div className="flex w-full flex-col gap-3 md:flex-row md:flex-wrap md:items-center lg:w-auto lg:flex-nowrap lg:justify-end">
              {/* Search */}
              <div className="relative w-full md:flex-1 md:min-w-65 lg:w-[320px] xl:mr-8.5 xl:w-105">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="search referrals..."
                  className={cn(
                    "h-12 w-full rounded-2xl border border-slate-200 bg-white pl-12 pr-4",
                    "text-sm text-slate-700 placeholder:text-slate-400",
                    "outline-none shadow-sm focus:ring-2 focus:ring-slate-200",
                  )}
                />
              </div>

              {/* Desktop actions */}
              <div className="hidden items-center gap-3 md:flex lg:gap-5 xl:gap-0">
                <button
                  type="button"
                  onClick={() => navigate("/referrer-dashboard/notifications")}
                  className={cn(
                    "grid h-12 w-12 shrink-0 place-items-center rounded-xl border shadow-sm transition lg:mr-6 xl:mr-20",
                    meta.bellActive
                      ? "border-sky-200 bg-[#00B4FE] text-white shadow-sky-100"
                      : "border-slate-200 bg-white text-black hover:bg-slate-50",
                  )}
                  aria-label="Notifications"
                >
                  <Bell
                    className={cn(
                      "h-5 w-5",
                      meta.bellActive ? "text-white" : "text-black",
                    )}
                  />
                </button>

                <button
                  type="button"
                  onClick={() => setOpenNew(true)}
                  className={cn(
                    "inline-flex h-12 items-center justify-center gap-3 rounded-xl bg-black px-5 md:px-6",
                    "text-xs font-medium uppercase tracking-wide text-white",
                    "shadow-md transition hover:bg-slate-900",
                  )}
                >
                  <Plus className="h-5 w-5" />
                  NEW REFERRAL
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-slate-200/70 md:mt-3.5" />
        </div>
      </header>

      {/* Mobile floating add button */}
      <button
        type="button"
        onClick={() => setOpenNew(true)}
        className="fixed bottom-5 right-5 z-60 grid h-16 w-16 place-items-center rounded-full bg-black text-white shadow-[0_10px_30px_rgba(0,0,0,0.2)] transition hover:scale-[1.03] md:hidden"
        aria-label="New referral"
      >
        <Plus className="h-8 w-8" strokeWidth={2.2} />
      </button>

      <NewReferralModal
        open={openNew}
        onClose={() => setOpenNew(false)}
        onSubmit={(data) => {
          console.log("new referral submit:", data);
        }}
      />
    </>
  );
}
