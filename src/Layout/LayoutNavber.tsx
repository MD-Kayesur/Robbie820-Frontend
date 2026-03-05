import React from "react"
import { useLocation } from "react-router-dom"
import { Search, Bell } from "lucide-react"

export const LayoutNavber: React.FC = () => {
    const location = useLocation();
    const path = location.pathname;

    // Dynamic Title based on route
    const getDashboardInfo = () => {
        if (path.includes('/broker')) {
            return {
                title: "Broker Dashboard",
                subtitle: "overview of your referral pipeline and performance",
                placeholder: "search referrals..."
            };
        } else if (path.includes('/referrer')) {
            return {
                title: "Referrer Dashboard",
                subtitle: "welcome back, your portfolio is growing.",
                placeholder: "search referrals..."
            };
        } else if (path.includes('/super-admin')) {
            return {
                title: "Platform Overview",
                subtitle: "",
                placeholder: "Search users, subscriptions, logs..."
            };
        }
        return {
            title: "Dashboard",
            subtitle: "",
            placeholder: "Search..."
        };
    };

    const info = getDashboardInfo();

    return (
        <header className="relative z-50 w-full bg-white h-20 border-b border-slate-100 flex items-center justify-between px-6 lg:px-10">
            {/* Left: Title & Subtitle */}
            <div className="flex flex-col">
                <h2 className="text-xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-1">
                    {info.title}
                </h2>
                {info.subtitle && (
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{info.subtitle}</p>
                )}
            </div>

            {/* Right: Search + actions */}
            <div className="flex items-center gap-4 sm:gap-6">
                {/* Search */}
                <div className="relative hidden w-80 md:block group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-sky-500 transition-colors" />
                    <input
                        type="text"
                        placeholder={info.placeholder}
                        className="h-11 w-full rounded-xl border border-slate-100 bg-slate-50/50 pl-11 pr-4 text-sm font-bold text-slate-600 placeholder:text-slate-300 outline-none transition focus:border-sky-500/30 focus:bg-white"
                    />
                </div>

                {/* Notifications */}
                <button
                    type="button"
                    className="relative grid h-11 w-11 place-items-center rounded-xl text-slate-400 border border-slate-100 bg-white shadow-sm hover:text-sky-500 hover:border-sky-100 transition-all"
                    aria-label="Notifications"
                >
                    <Bell className="h-5 w-5 stroke-[2.5px]" />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
                </button>

                {/* Avatar */}
                <button
                    type="button"
                    className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(135deg,#2B7FFF_0%,#1447E6_100%)] text-[13px] font-black text-white hover:scale-105 transition-transform"
                    aria-label="Account"
                >
                    {path.includes('super-admin') ? 'SA' : (path.includes('broker') ? 'BR' : 'RF')}
                </button>
            </div>
        </header>
    )
}
