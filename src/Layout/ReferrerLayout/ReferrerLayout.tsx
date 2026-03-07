import { Outlet } from "react-router-dom";
import { useState } from "react";
import ReferrerSidebar from "./ReferrerSidebar";
import ReferrerTopbar from "./ReferrerTopbar";

const ReferrerLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans selection:bg-sky-100 selection:text-sky-900">
      <ReferrerSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <ReferrerTopbar onOpenSidebar={() => setMobileSidebarOpen(true)} />
        <main className="no-scrollbar flex-1 overflow-y-auto scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ReferrerLayout;
