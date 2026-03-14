import { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import ReferrerSidebar from "./ReferrerSidebar";
import ReferrerTopbar from "./ReferrerTopbar";

const ReferrerLayout = () => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { pathname, search, hash } = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, search, hash]);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white selection:bg-sky-100 selection:text-sky-900">
      <ReferrerSidebar
        mobileOpen={mobileSidebarOpen}
        onClose={() => setMobileSidebarOpen(false)}
      />

      <div className="flex h-full flex-1 flex-col overflow-hidden">
        <main
          ref={mainRef}
          className="no-scrollbar flex-1 overflow-y-auto scroll-smooth"
        >
          <ReferrerTopbar onOpenSidebar={() => setMobileSidebarOpen(true)} />
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ReferrerLayout;
