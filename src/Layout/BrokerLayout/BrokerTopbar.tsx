import { Search, Bell, Plus } from 'lucide-react';

const BrokerTopbar = () => {
    return (
        <header className="h-[100px] w-full bg-white border-b border-slate-100 flex items-center justify-between px-10 relative z-50">
            <div className="flex flex-col flex-1">
                <h2 className="text-xl font-black text-slate-800 tracking-tighter uppercase leading-none mb-1">Broker Dashboard</h2>
                <p className="text-[13px] font-bold text-slate-400">overview of your referral pipeline and performance</p>
            </div>

            <div className="flex items-center gap-6">
                {/* Search Bar */}
                <div className="w-[300px] relative group hidden md:block">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-hover:text-sky-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="search referrals..."
                        className="w-full h-10 bg-slate-50 border border-slate-100 rounded-xl pl-10 pr-4 font-bold text-slate-600 placeholder:text-slate-300 focus:outline-none focus:ring-4 focus:ring-sky-500/5 transition-all text-[13px]"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2.5 text-slate-400 bg-white border border-slate-100 rounded-xl hover:text-sky-500 hover:border-sky-100 transition-all shadow-sm">
                    <Bell className="w-5 h-5 stroke-[2.5px]" />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full"></span>
                </button>

                {/* Create Lead Button */}
                <button className="flex items-center gap-2 bg-sky-500 text-white px-5 h-11 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-sky-600 transition-all shadow-xl shadow-sky-50">
                    <Plus className="w-4 h-4" />
                    Create Lead
                </button>
            </div>
        </header>
    );
};

export default BrokerTopbar;
