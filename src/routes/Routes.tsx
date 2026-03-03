import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import NotFound from "@/pages/NotFound";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";

import ReferrerLayout from "@/Layout/ReferrerLayout/ReferrerLayout";
import ReferrerDashboard from "@/pages/Referrer/ReferrerDashboard";
import {
  ReferrerMyReferrals,
  ReferrerNotifications,
  ReferrerSettings,
} from "@/pages/Referrer/ReferrerRoutes";

import SuperAdminLayout from "@/Layout/SuperAdminLayout/SuperAdminLayout";
import SuperAdminDashboard from "@/pages/SuperAdmin/SuperAdminDashboard";
import {
  SuperAdminUserManagement,
  SuperAdminSubscriptions,
  SuperAdminIntegrations,
  SuperAdminAuditLogs,
  SuperAdminSettings,
} from "@/pages/SuperAdmin/SuperAdminRoutes";

import About from "@/pages/About";
import TermsOfService from "@/pages/About/TermsOfService";
import PrivacyPolicy from "@/pages/About/PrivacyPolicy";
import CookiePolicy from "@/pages/About/CookiePolicy";
import AdminRoutes from "./AdminRoutes";

import BrokerLayout from "@/Layout/BrokerLayout/BrokerLayout";
import BrokerDashboard from "@/pages/Broker/BrokerDashboard";
import {
  BrokerMyReferrals,
  BrokerPartnerProfile,
  BrokerTeamManagement,
  BrokerReport,
  BrokerNotifications,
  BrokerSubscription,
  BrokerSettings,
} from "@/pages/Broker/BrokerRoutes";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/about-content",
        element: <ReferrerLayout />,
        children: [
          {
            path: "about",
            element: <About />,
          },
          {
            path: "terms",
            element: <TermsOfService />,
          },
          {
            path: "privacy",
            element: <PrivacyPolicy />,
          },
          {
            path: "cookies",
            element: <CookiePolicy />,
          },
        ],
      },

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },

      // referrer
      {
        path: "/referrer",
        element: <ReferrerLayout />,
        children: [
          { index: true, element: <ReferrerDashboard /> },
          { path: "overview", element: <ReferrerDashboard /> },
          { path: "my-referrals", element: <ReferrerMyReferrals /> },
          { path: "notifications", element: <ReferrerNotifications /> },
          { path: "settings", element: <ReferrerSettings /> },
        ],
      },

      // broker
      {
        path: "/broker",
        element: <BrokerLayout />,
        children: [
          { index: true, element: <BrokerDashboard /> },
          { path: "overview", element: <BrokerDashboard /> },
          { path: "my-referrals", element: <BrokerMyReferrals /> },
          { path: "partner-profile", element: <BrokerPartnerProfile /> },
          { path: "team-management", element: <BrokerTeamManagement /> },
          { path: "report", element: <BrokerReport /> },
          { path: "notifications", element: <BrokerNotifications /> },
          { path: "subscription", element: <BrokerSubscription /> },
          { path: "settings", element: <BrokerSettings /> },
        ],
      },

      // admin
      {
        path: "/admin",
        element: <AdminRoutes />,
        children: [
          {
            element: <SuperAdminLayout />,
            children: [
              { index: true, element: <SuperAdminDashboard /> },
              { path: "dashboard", element: <SuperAdminDashboard /> },
              {
                path: "user-management",
                element: <SuperAdminUserManagement />,
              },
              { path: "subscriptions", element: <SuperAdminSubscriptions /> },
              { path: "integrations", element: <SuperAdminIntegrations /> },
              { path: "audit-logs", element: <SuperAdminAuditLogs /> },
              { path: "settings", element: <SuperAdminSettings /> },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
