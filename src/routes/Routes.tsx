import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/Layout/RootLayout/RootLayout";

import NotFound from "@/pages/NotFound";
 
import SuperAdminLayout from "@/Layout/SuperAdminLayout/SuperAdminLayout";
 
import AdminRoutes from "./AdminRoutes";

import BrokerLayout from "@/Layout/BrokerLayout/BrokerLayout";
import BrokerDashboard from "@/pages/BrokerDashboard/BrokerDashboard/BrokerDashboard";
import BrokerMyReferrals from "@/pages/BrokerDashboard/BrokerMyReferrals/BrokerMyReferrals";
import BrokerPartnerProfile from "@/pages/BrokerDashboard/BrokerPartnerProfile/BrokerPartnerProfile";
import BrokerTeamManagement from "@/pages/BrokerDashboard/BrokerTeamManagement/BrokerTeamManagement";
import BrokerReport from "@/pages/BrokerDashboard/BrokerReport/BrokerReport";
import BrokerNotifications from "@/pages/BrokerDashboard/BrokerNotifications/BrokerNotifications";
import BrokerSubscription from "@/pages/BrokerDashboard/BrokerSubscription/BrokerSubscription";
import BrokerSettings from "@/pages/BrokerDashboard/BrokerSettings/BrokerSettings";
import SuperAdminUserManagement from "@/pages/SuperAdminDashboard/SuperAdminUserManagement/SuperAdminUserManagement";
import SuperAdminSubscriptions from "@/pages/SuperAdminDashboard/SuperAdminSubscriptions/SuperAdminSubscriptions";
import SuperAdminIntegrations from "@/pages/SuperAdminDashboard/SuperAdminIntegrations/SuperAdminIntegrations";
import SuperAdminAuditLogs from "@/pages/SuperAdminDashboard/SuperAdminAuditLogs/SuperAdminAuditLogs";
import SuperAdminSettings from "@/pages/SuperAdminDashboard/SuperAdminSettings/SuperAdminSettings";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard/SuperAdminDashboard/SuperAdminDashboard";
import SuperAdminLayoutNoTopbar from "@/Layout/SuperAdminLayout/SuperAdminLayoutNoTopbar";
import Login from "@/components/authentication/login/Login";
import Signup from "@/components/authentication/Signup";
import ForgotPasswordForm from "@/components/authentication/login/ForgotPasswordForm";
import Home from "@/pages/Home/Home";
import ReferrerLayout from "@/Layout/ReferrerLayout/ReferrerLayout";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
     

      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPasswordForm/>,
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
        path: "/super-admin",
        element: <AdminRoutes />,
        children: [
          {
            element: <SuperAdminLayout />,
            children: [
              { index: true, element: <SuperAdminDashboard /> },
              { path: "dashboard", element: <SuperAdminDashboard /> },
            ],
          },
          {
            element: <SuperAdminLayoutNoTopbar />,
            children: [
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
