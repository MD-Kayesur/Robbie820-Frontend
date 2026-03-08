// src/Layout/AuthenticationLayout/AuthenticationLayout.tsx

import { Outlet } from "react-router-dom";
import logo from "@/assets/refer_now_logo.png";

const AuthenticationLayout = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-screen px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
        <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-3xl flex-col items-center justify-center">
          <div className="mb-6 sm:mb-8">
            <img
              src={logo}
              alt="ReferNow"
              className="h-auto w-42.5 sm:w-52.5 lg:w-60"
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
