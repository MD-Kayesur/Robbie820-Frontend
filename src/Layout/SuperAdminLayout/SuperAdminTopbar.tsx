import { Search, Bell } from "lucide-react";

const SuperAdminTopbar = () => {
  return (
    <header className="h-25 w-full bg-white border-b border-slate-100 flex items-center justify-between px-10 relative z-50">
      <div className="flex items-center gap-10 flex-1">
        <h2 className="text-xl font-black text-slate-800 tracking-tighter hidden lg:block">
          Platform Overview
        </h2>

        {/* Search Bar */}
        <div className="max-w-100 w-full relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-sky-500 transition-colors" />
          <input
            type="text"
            placeholder="Search records, users, or logs..."
            className="w-full h-12 bg-slate-50 border border-slate-100 rounded-2xl pl-12 pr-4 font-bold text-slate-600 placeholder:text-slate-400 focus:outline-none focus:ring-4 focus:ring-sky-500/10 focus:bg-white transition-all text-[15px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-8">
        {/* Notifications */}
        <button className="relative p-2 text-slate-400 hover:text-sky-500 transition-colors group">
          <Bell className="w-6 h-6 stroke-[2.5px]" />
          <span className="absolute top-1.5 right-2 w-2.5 h-2.5 bg-rose-500 border-2 border-white rounded-full"></span>
        </button>

        {/* Topbar User Profile */}
        <div className="flex items-center gap-4 cursor-pointer hover:bg-slate-50 p-2 rounded-2xl transition-all">
          <div className="flex flex-col items-end mr-1">
            <h4 className="font-black text-slate-900 leading-tight">
              Alexander Thomas
            </h4>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Super Admin
            </p>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-sky-100 overflow-hidden shadow-sm border-2 border-white ring-1 ring-slate-100">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alexander"
              alt="Alexander Thomas"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default SuperAdminTopbar;
