import { motion } from 'framer-motion';
import {
    Users,
    DollarSign,
    TrendingUp,
    Clock,
    AlertCircle,
    Briefcase,
} from 'lucide-react';

const MetricCard = ({ title, value, change, icon: Icon, color, info }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 min-w-[240px]"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            {change && (
                <div className="flex items-center gap-1.5 px-2 py-1 bg-emerald-50 rounded-lg text-emerald-600 text-xs font-bold">
                    {change} <TrendingUp className="w-3 h-3" />
                </div>
            )}
            {info && (
                <AlertCircle className="w-4 h-4 text-slate-300 cursor-help" />
            )}
        </div>
        <div className="space-y-1">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        </div>
    </motion.div>
);

const DealStageBox = ({ label, count, color }: any) => (
    <div className={`p-6 rounded-2xl border border-slate-100 flex-1 ${color} bg-opacity-5`}>
        <h4 className="text-3xl font-black text-slate-900 mb-1">{count}</h4>
        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{label}</p>
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
    const styles: any = {
        'LOAN SETTLED': 'bg-sky-100 text-sky-600',
        'LOAN LODGED': 'bg-slate-100 text-slate-600',
        'AWAITING REFERRAL FEE': 'bg-amber-100 text-amber-600',
        'REFERRAL SENT': 'bg-slate-50 text-slate-400',
        'FEE PAID': 'bg-emerald-100 text-emerald-600'
    };
    return (
        <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider whitespace-nowrap ${styles[status]}`}>
            {status}
        </span>
    );
};

const ReferrerDashboard = () => {
    const activities = [
        { name: 'Sarah Jenkins', company: 'techflow solutions', status: 'LOAN SETTLED', fee: '$1,250' },
        { name: 'Eleanor Vance', company: 'vance legal partners', status: 'LOAN LODGED', fee: '-' },
        { name: 'Cameron Williamson', company: 'david chen chen logistics', status: 'AWAITING REFERRAL FEE', fee: '$1,550' },
        { name: 'Jenny Wilson', company: 'ortiz medical group', status: 'REFERRAL SENT', fee: '$1,250' },
        { name: 'Robert Fox', company: 'mark robertson greenbuild construction', status: 'FEE PAID', fee: '$1,100' },
    ];

    return (
        <div className="p-10 space-y-12 max-w-[1600px] mx-auto bg-slate-50/30">

            {/* Metrics Row */}
            <div className="flex gap-4 mb-4">
                <div className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-xs font-bold">MTD</div>
                <div className="flex items-center gap-2 bg-white text-slate-500 px-4 py-2 rounded-lg text-xs font-bold border border-slate-100">FYTD</div>
                <div className="flex items-center gap-2 bg-white text-slate-500 px-6 py-2 rounded-lg text-xs font-bold border border-slate-100 ml-4">
                    Nov 2025 - Jan 2026 <Clock className="w-4 h-4 ml-2" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <MetricCard title="Total Referrals" value="5" change="8.2%" icon={Users} color="#0ea5e9" info />
                <MetricCard title="Total Referral Fees Earned" value="$3,600" icon={DollarSign} color="#0ea5e9" info />
                <MetricCard title="Conversion Rate" value="40%" change="2.1%" icon={TrendingUp} color="#0ea5e9" info />
                <MetricCard title="Funded Deals" value="2" change="1" icon={Briefcase} color="#0ea5e9" info />
                <MetricCard title="Expected Referral Fees" value="$5" icon={TrendingUp} color="#0ea5e9" info />
            </div>

            {/* Deal Stage Overview */}
            <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="flex justify-between items-center mb-8 px-2">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center">
                            <TrendingUp className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Deal Stage Overview</h3>
                    </div>
                    <div className="flex items-center gap-2 bg-sky-50 text-sky-500 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider">
                        Live Tracking <span className="w-2 h-2 bg-sky-500 rounded-full animate-pulse ml-1"></span>
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <DealStageBox label="Referral Sent" count="5" color="bg-white" />
                    <DealStageBox label="Loan Lodged" count="5" color="bg-white" />
                    <DealStageBox label="Loan Settled" count="5" color="bg-sky-500" />
                    <DealStageBox label="Awaiting Referral Fee" count="5" color="bg-amber-500" />
                </div>
            </section>

            {/* Recent Activity */}
            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center">
                            <Activity className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tighter uppercase">Recent Activity</h3>
                    </div>
                    <button className="text-sky-500 font-bold text-sm hover:underline">view all portfolio</button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Client Name</th>
                                <th className="px-8 py-4 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-4 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Referral Fee</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {activities.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-[15px]">{item.name}</span>
                                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mt-0.5">{item.company}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <StatusBadge status={item.status} />
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <span className="font-black text-slate-900">{item.fee}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

const Activity = ({ className }: { className?: string }) => (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
)

export default ReferrerDashboard;
