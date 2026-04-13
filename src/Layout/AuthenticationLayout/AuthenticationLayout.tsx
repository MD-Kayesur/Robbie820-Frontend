// src/Layout/AuthenticationLayout/AuthenticationLayout.tsx

import { Outlet } from "react-router-dom";
import logo from "@/assets/logos/refer_now_logo.png";

const AuthenticationLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-screen px-4 py-3 md:px-6 md:py-10 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col items-center justify-center">
          <div className="mb-3 md:mb-8">
            <img
              src={logo}
              alt="ReferNow"
              className="h-auto w-42.5 md:w-52.5 lg:w-60"
            />
          </div>

          <div className="flex w-full items-center justify-center">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationLayout;
