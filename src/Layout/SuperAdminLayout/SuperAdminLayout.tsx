import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";
import { LayoutNavber } from "../LayoutNavber";

const SuperAdminLayout = () => {
  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden selection:bg-sky-100 selection:text-sky-900">
      <SuperAdminSidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <LayoutNavber />
        <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default SuperAdminLayout;
