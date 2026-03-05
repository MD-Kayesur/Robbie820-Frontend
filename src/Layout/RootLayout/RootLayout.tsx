import React from "react";
import { Outlet } from "react-router-dom";
import { Toaster } from "sonner";

const RootLayout: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Outlet />
      <Toaster />
    </div>
  );
};

export default RootLayout;
