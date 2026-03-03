import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Users,
    CreditCard,
    Component,
    FileText,
    Settings,
    Zap
} from 'lucide-react';

const SidebarItem = ({ to, icon: Icon, label }: any) => (
    <NavLink
        to={to}
        className={({ isActive }) =>
            `flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 group ${isActive
                ? 'bg-sky-500 text-white shadow-lg shadow-sky-200 translate-x-1'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'
            }`
        }
    >
        <Icon className="w-6 h-6" />
        <span className="font-bold text-[15px] tracking-tight">{label}</span>
    </NavLink>
);

const SuperAdminSidebar = () => {
    return (
        <aside className="w-[300px] h-full bg-white border-r border-slate-100 flex flex-col p-6 overflow-y-auto no-scrollbar">
            {/* Logo */}
            <div className="flex items-center gap-3 px-4 mb-12">
                <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center shadow-lg shadow-sky-100">
                    <Zap className="text-white w-6 h-6 fill-white" />
                </div>
                <span className="text-2xl font-black text-slate-900 tracking-tighter">SuperAdmin</span>
            </div>

            {/* Nav Items */}
            <nav className="flex-1 space-y-2">
                <SidebarItem to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
                <SidebarItem to="/admin/user-management" icon={Users} label="User Management" />
                <SidebarItem to="/admin/subscriptions" icon={CreditCard} label="Subscriptions" />
                <SidebarItem to="/admin/integrations" icon={Component} label="Integrations" />
                <SidebarItem to="/admin/audit-logs" icon={FileText} label="Audit Logs" />
                <SidebarItem to="/admin/settings" icon={Settings} label="System Settings" />
            </nav>

            {/* User Profile Footer */}
            <div className="mt-auto pt-8 border-t border-slate-50">
                <div className="flex items-center gap-4 p-2">
                    <div className="w-12 h-12 rounded-2xl bg-slate-100 overflow-hidden shadow-sm">
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Jamson"
                            alt="Jamson Carter"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <h4 className="font-black text-slate-900 truncate">Jamson Carter</h4>
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Platform Owner</p>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default SuperAdminSidebar;
