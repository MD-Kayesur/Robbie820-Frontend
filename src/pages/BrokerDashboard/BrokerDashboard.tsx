import { motion } from 'framer-motion';
import {
    Users,
    Clock,
    TrendingUp,
    DollarSign,
    Filter,
    Calendar,
    Plus,
    ArrowUpRight,
    MoreHorizontal,
    RefreshCcw,
    CloudLightning
} from 'lucide-react';

const MetricCard = ({ title, value, badge, icon: Icon, color }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1 min-w-[240px]"
    >
        <div className="flex justify-between items-start mb-4">
            <div className={`p-2.5 rounded-xl ${color} bg-opacity-10 flex items-center justify-center`}>
                <Icon className="w-5 h-5" style={{ color }} />
            </div>
            {badge && (
                <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${badge.includes('+') ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-50 text-slate-400'
                    }`}>
                    {badge}
                </div>
            )}
        </div>
        <div className="space-y-1">
            <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest leading-none mb-2">{title}</p>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight">{value}</h3>
        </div>
    </motion.div>
);

const LineChartPlaceholder = () => (
    <div className="w-full h-[300px] mt-8 relative">
        <div className="absolute inset-0 flex items-end justify-between px-4 pb-4">
            {[2, 3.5, 2.5, 3.2, 1.8, 2.2, 1.5].map((h, i) => (
                <div key={i} className="flex flex-col items-center gap-2 w-full">
                    <div className="w-full flex items-end justify-center h-full relative group">
                        <div className="absolute bottom-0 w-[2px] bg-sky-100 h-full"></div>
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: `${h * 40}px` }}
                            className="w-[2px] bg-sky-400 relative z-10"
                        ></motion.div>
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            style={{ bottom: `${h * 40}px` }}
                            className="absolute w-2 h-2 rounded-full bg-sky-500 border-2 border-white z-20 shadow-sm"
                        ></motion.div>
                    </div>
                </div>
            ))}
        </div>
        <div className="absolute left-0 top-0 bottom-0 flex flex-col justify-between text-[10px] font-bold text-slate-300 py-4 h-full">
            <span>$6M</span><span>$4M</span><span>$3M</span><span>$2M</span><span>$1M</span><span>$0M</span>
        </div>
        <div className="absolute bottom-0 left-10 right-0 flex justify-between text-[11px] font-black text-slate-400 uppercase tracking-widest px-8">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
        </div>
    </div>
);

const BrokerDashboard = () => {
    const leads = [
        { name: 'Alice Henderson', ref: 'prime estates', amount: '$450,000', date: '2023-11-20', status: 'APPROVED', rate: '4.25%/80% LVR', commission: '$12,525', statusColor: 'text-emerald-500' },
        { name: 'Alice Henderson', ref: 'salesforce', amount: '$450,000', date: '2023-11-20', status: 'APPLICATION IN PROGRESS', rate: '3.85%/65% LVR', commission: '$15,000', statusColor: 'text-sky-500' },
        { name: 'Charlie Davis', ref: 'metro partners', amount: '$450,000', date: '2023-11-20', status: 'AWAITING REFERRAL FEE', rate: '5.15%/90% LVR', commission: '$4,000', statusColor: 'text-amber-500' },
        { name: 'Diana Prince', ref: 'zapier hook', amount: '$450,000', date: '2023-11-20', status: 'FUNDED', rate: '4.1%/75% LVR', commission: '$9,375', statusColor: 'text-indigo-500' },
        { name: 'Edward Norton', ref: 'highnetworth', amount: '$450,000', date: '2023-11-20', status: 'APPROVED', rate: '3.5%/50% LVR', commission: '$0', statusColor: 'text-rose-500' },
    ];

    return (
        <div className="p-10 space-y-10 max-w-[1600px] mx-auto bg-[#fdfdfd]">

            {/* Filters & Header */}
            <div className="flex flex-wrap items-center justify-between gap-6">
                <div className="flex gap-4">
                    <div className="bg-white border border-slate-100 rounded-xl p-1 flex">
                        <button className="px-5 py-2 text-xs font-black uppercase tracking-widest text-slate-400">Monthly</button>
                        <button className="px-5 py-2 text-xs font-black uppercase tracking-widest bg-black text-white rounded-lg shadow-lg">MTD</button>
                        <button className="px-5 py-2 text-xs font-black uppercase tracking-widest text-slate-400">FYTD</button>
                    </div>
                    <button className="bg-white border border-slate-100 px-5 py-2 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                        <Filter className="w-4 h-4" /> Filter
                    </button>
                    <button className="bg-white border border-slate-100 px-5 py-2 rounded-xl flex items-center gap-3 text-xs font-black uppercase tracking-widest text-slate-500">
                        <Calendar className="w-4 h-4" /> Nov 2025 - Jan 2026
                    </button>
                </div>
                <button className="bg-sky-500 text-white px-8 h-12 rounded-xl font-black text-xs uppercase tracking-[0.2em] hover:bg-sky-600 transition-all shadow-xl shadow-sky-100 flex items-center gap-2">
                    <Plus className="w-4 h-4" /> Create Lead
                </button>
            </div>

            {/* Metrics Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard title="Active Referrals" value="1,284" badge="+12% MTD" icon={Users} color="#0ea5e9" />
                <MetricCard title="Pipeline (Active Deals)" value="$3,600" badge="Requires Attention" icon={Clock} color="#0ea5e9" />
                <MetricCard title="Conversion Rate" value="40%" badge="2.1% MTD" icon={TrendingUp} color="#0ea5e9" />
                <MetricCard title="Total Commission" value="$242.4K" badge="MTD" icon={DollarSign} color="#0ea5e9" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Loan Value Chart */}
                <section className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Weekly Loan Value</h3>
                        <div className="bg-slate-50 px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2 cursor-pointer">
                            Last 6 Months <RefreshCcw className="w-3 h-3" />
                        </div>
                    </div>
                    <LineChartPlaceholder />
                </section>

                {/* CRM Integration */}
                <section className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col">
                    <div className="flex justify-between items-center mb-8">
                        <div className="flex items-center gap-3">
                            <CloudLightning className="w-5 h-5 text-sky-500" />
                            <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">CRM Integration</h3>
                        </div>
                        <RefreshCcw className="w-4 h-4 text-slate-300 cursor-pointer" />
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-6 flex flex-col gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center">
                                <span className="text-white font-black text-xl">S</span>
                            </div>
                            <div>
                                <h4 className="font-black text-slate-800">Salesforce Enterprise</h4>
                                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">api integration v2.4.1</p>
                            </div>
                        </div>
                        <div className="bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 rounded-xl flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                                <span className="text-[11px] font-black text-emerald-700 uppercase tracking-widest">Operational</span>
                            </div>
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                        </div>
                    </div>
                    <div className="mt-8 space-y-4 px-2">
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">auto-sync referrals</span>
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest">Enabled</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">last sync</span>
                            <span className="text-[11px] font-black text-slate-800 uppercase tracking-widest uppercase">2 Mins Ago</span>
                        </div>
                    </div>
                    <button className="mt-auto pt-6 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em] border-t border-slate-50 hover:underline">
                        sync type: two-way sync enabled
                    </button>
                </section>
            </div>

            {/* Recent Leads */}
            <section className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h3 className="text-lg font-black text-slate-800 tracking-tight uppercase">Recent Leads</h3>
                    <button className="text-sky-500 font-black text-xs uppercase tracking-widest flex items-center gap-2">
                        View All <ArrowUpRight className="w-4 h-4" />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Borrower</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Amount</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Updated</th>
                                <th className="px-6 py-5 text-center text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Rate / LVR</th>
                                <th className="px-8 py-5 text-left text-[10px] font-black text-slate-400 uppercase tracking-widest">Commission</th>
                                <th className="px-8 py-5 text-right text-[10px] font-black text-slate-400 uppercase tracking-widest">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads.map((item, idx) => (
                                <tr key={idx} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col">
                                            <span className="font-black text-slate-800 text-[14px]">{item.name}</span>
                                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">ref: {item.ref}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-black text-slate-700 text-[14px]">{item.amount}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-bold text-slate-400 text-[13px]">{item.date}</span>
                                    </td>
                                    <td className="px-6 py-6 text-center">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.statusColor}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="font-bold text-slate-700 text-[13px]">{item.rate}</span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`font-black text-[14px] ${item.commission === '$0' ? 'text-slate-300' : 'text-emerald-500'}`}>
                                            {item.commission}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                                            <MoreHorizontal className="w-5 h-5 text-slate-400" />
                                        </button>
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

export default BrokerDashboard;
