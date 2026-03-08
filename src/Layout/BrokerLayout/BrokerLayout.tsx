import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import BrokerSidebar from "./BrokerSidebar";
import BrokerTopbar from "./BrokerTopbar";

const BrokerLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="flex min-h-screen w-full bg-white">
      <BrokerSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        {/* mobile only */}
        <BrokerTopbar onMenuClick={() => setMobileOpen(true)} />

        {/* desktop has no topbar */}
        <main className="min-w-0 mx-7.5 my-10  flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BrokerLayout;
