import { NavLink, useNavigate } from 'react-router-dom';
import {
    BarChart3,
    Users,
    Bell,
    Settings,
    LogOut,
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }: any) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center justify-between gap-4 px-6 py-4 rounded-xl transition-all duration-300 group ${isActive
                ? 'bg-sky-400 text-white shadow-lg shadow-sky-100'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`
        }
    >
        <div className="flex items-center gap-4">
            <Icon className="w-5 h-5 flex-shrink-0" />
            <span className="font-black text-[14px] tracking-tight uppercase">{label}</span>
        </div>
    </NavLink>
);

const ReferrerSidebar = () => {
    const navigate = useNavigate();

    return (
        <aside className="w-[280px] h-full bg-white border-r border-slate-100 flex flex-col p-6 overflow-y-auto no-scrollbar">
            {/* Logo */}
            <div className="flex flex-col mb-16 px-2">
                <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
                    <span className="text-2xl font-black tracking-tighter text-sky-500">Refer Now</span>
                </div>
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] leading-tight">Seamlessly Connected</p>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 space-y-2">
                <SidebarItem to="/referrer/overview" icon={BarChart3} label="Overview" />
                <SidebarItem to="/referrer/my-referrals" icon={Users} label="My Referrals" />
                <SidebarItem to="/referrer/notifications" icon={Bell} label="Notifications" />
                <SidebarItem to="/referrer/settings" icon={Settings} label="Settings" />
            </nav>

            {/* Logout Footer */}
            <div className="mt-auto pt-8 border-t border-slate-50">
                <button
                    onClick={() => {
                        localStorage.clear();
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-4 w-full p-4 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-2xl transition-all group"
                >
                    <LogOut className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" />
                    <span className="font-black text-[14px] tracking-tight uppercase">Sign Out</span>
                </button>
            </div>
        </aside>
    );
};

export default ReferrerSidebar;
