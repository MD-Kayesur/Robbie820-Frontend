import { useState } from "react";
import { Outlet } from "react-router-dom";
import BrokerSidebar from "./BrokerSidebar";
import BrokerTopbar from "./BrokerTopbar";

const BrokerLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <BrokerSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <BrokerTopbar onMenuClick={() => setMobileOpen(true)} />

        <main className="flex-1 overflow-y-auto min-w-0 px-4 py-3 sm:px-7.5 sm:py-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BrokerLayout;
