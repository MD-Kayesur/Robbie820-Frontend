import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import BrokerSidebar from "./BrokerSidebar";
import BrokerTopbar from "./BrokerTopbar";

const BrokerLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, search, hash } = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white selection:bg-sky-100 selection:text-sky-900">
      <BrokerSidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <BrokerTopbar onMenuClick={() => setMobileOpen(true)} />

        <main
          ref={mainRef}
          className="no-scrollbar scroll-smooth flex-1 overflow-y-auto min-w-0 px-4 py-3 md:px-7.5 md:py-10"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default BrokerLayout;
