import { useState } from "react";
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminTopbar from "./SuperAdminTopbar";

const SuperAdminLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 selection:bg-sky-100 selection:text-sky-900">
      <SuperAdminSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <SuperAdminTopbar onMenuClick={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
