// SuperAdminLayoutNoTopbar.tsx
import { Outlet } from "react-router-dom";
import SuperAdminSidebar from "./SuperAdminSidebar";

const SuperAdminLayoutNoTopbar = () => {
  return (
    <div className="h-screen w-full bg-slate-50 flex overflow-hidden">
      <SuperAdminSidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default SuperAdminLayoutNoTopbar;
