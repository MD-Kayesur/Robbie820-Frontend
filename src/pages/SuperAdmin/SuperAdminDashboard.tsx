 import { motion } from 'framer-motion';
import {
    Users,
    UserCheck,
    CreditCard,
    DollarSign,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    CheckCircle2,
    AlertTriangle,
    
} from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, color }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-3 rounded-xl ${color} bg-opacity-10 text-opacity-100 flex items-center justify-center`}>
                <Icon className="w-6 h-6" style={{ color }} />
            </div>
            <div className={`flex items-center gap-1 text-sm font-bold ${change.startsWith('+') ? 'text-emerald-500' : 'text-rose-500'}`}>
                {change}
                {change.startsWith('+') ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
            </div>
        </div>
        <div className="space-y-1">
            <h3 className="text-4xl font-bold text-slate-900 tracking-tight">{value}</h3>
            <p className="text-sm font-semibold text-slate-400 uppercase tracking-wider">{title}</p>
        </div>
    </motion.div>
);

const GrowthCard = ({ title, value, change }: any) => (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">{title}</span>
            <span className="text-emerald-500 text-sm font-bold flex items-center gap-1">{change}</span>
        </div>
        <h3 className="text-5xl font-bold text-slate-800 tracking-tighter">{value}</h3>
    </div>
);

const HealthRow = ({ title, description, status }: any) => (
    <div className="flex items-center justify-between p-4 rounded-xl border border-slate-100 bg-slate-50/30">
        <div className="flex items-center gap-4">
            <div className={`p-2 rounded-full ${status === 'healthy' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                {status === 'healthy' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
            </div>
            <div>
                <h4 className="font-bold text-slate-800">{title}</h4>
                <p className="text-sm text-slate-500 font-medium">{description}</p>
            </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest ${status === 'healthy' ? 'bg-emerald-500 text-white' : 'bg-amber-500 text-white'}`}>
            {status === 'healthy' ? 'Healthy' : 'Warning'}
        </span>
    </div>
);

const SuperAdminDashboard = () => {
    return (
        <div className="p-8 space-y-10 max-w-[1600px] mx-auto">
            <div>
                <h1 className="text-4xl font-black text-slate-900 tracking-tight mb-2">Platform Overview</h1>
                <p className="text-slate-500 font-semibold text-lg">System-wide subscription and platform health metrics.</p>
            </div>

            <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Key Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                    <MetricCard title="Total Licensed Users" value="1,248" change="+3%" icon={Users} color="#6366f1" />
                    <MetricCard title="Total Registered" value="432" change="+7%" icon={UserCheck} color="#0ea5e9" />
                    <MetricCard title="Active Subscriptions" value="984" change="+1%" icon={CreditCard} color="#10b981" />
                    <MetricCard title="Monthly Revenue" value="$142,500" change="+10%" icon={DollarSign} color="#f59e0b" />
                    <MetricCard title="Annual Revenue" value="$1.71M" change="+3%" icon={TrendingUp} color="#ec4899" />
                </div>
            </section>

            <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Growth Metrics</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <GrowthCard title="New Signups (MTD)" value="46" change="+3%" />
                    <GrowthCard title="Churned Accounts" value="3" change="+1%" />
                    <GrowthCard title="Net Growth" value="45" change="+3%" />
                </div>
            </section>

            <section>
                <h2 className="text-sm font-bold text-slate-400 uppercase tracking-[0.2em] mb-6">Infrastructure</h2>
                <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-8 space-y-6">
                    <h3 className="text-2xl font-black text-slate-900">System Health</h3>
                    <div className="space-y-4">
                        <HealthRow title="CRM Sync Status" description="Last sync completed 2 minutes ago. 14,582 records processed." status="healthy" />
                        <HealthRow title="Payment Status Alerts" description="Payment gateway experiencing latency issues. Stripe API connection stable." status="warning" />
                        <HealthRow title="System Warnings" description="All core microservices running within normal performance parameters." status="healthy" />
                    </div>
                    <p className="text-center text-[10px] font-bold text-slate-400 uppercase tracking-[0.3em] pt-4 border-t border-slate-50">
                        Live Updates Active • Last Refreshed at 16:39:23
                    </p>
                </div>
            </section>
        </div>
    );
};

export default SuperAdminDashboard;
