import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/Layout/RootLayout/RootLayout";
import NotFound from "@/pages/NotFound";
import ReferrerLayout from "@/Layout/ReferrerLayout/ReferrerLayout";
import SuperAdminLayout from "@/Layout/SuperAdminLayout/SuperAdminLayout";
import AdminRoutes from "./AdminRoutes";
import BrokerLayout from "@/Layout/BrokerLayout/BrokerLayout";
import BrokerMyReferrals from "@/pages/BrokerDashboard/BrokerMyReferrals/BrokerMyReferrals";
import BrokerPartnerProfile from "@/pages/BrokerDashboard/BrokerPartnerProfiles/BrokerPartnerProfiles";
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
import Home from "@/pages/Home/Home";
import ReferrerOverview from "@/pages/ReferrerDashboard/ReferrerOverview/ReferrerOverview";
import ReferrerMyReferrals from "@/pages/ReferrerDashboard/ReferrerMyReferrals/ReferrerMyReferrals";
import ReferrerNotifications from "@/pages/ReferrerDashboard/ReferrerNotifications/ReferrerNotifications";
import ReferrerSettings from "@/pages/ReferrerDashboard/ReferrerSettings/ReferrerSettings";
import ReferrerClientDetails from "@/pages/ReferrerDashboard/ReferrerClientDetails/ReferrerClientDetails";
import Login from "@/pages/Authentication/Login/Login";
import Signup from "@/pages/Authentication/Signup/Signup";
import AuthenticationLayout from "@/Layout/AuthenticationLayout/AuthenticationLayout";
import RecoverPassword from "@/pages/Authentication/RecoverPassword/RecoverPassword";
import BrokerOverview from "@/pages/BrokerDashboard/BrokerOverview/BrokerOverview";
import BrokerLeadDetails from "@/pages/BrokerDashboard/BrokerLeadDetails/BrokerLeadDetails";
import PartnerProfile from "@/pages/BrokerDashboard/BrokerPartnerDetails/BrokerPartnerDetails";
import EditPartnerConfiguration from "@/pages/BrokerDashboard/BrokerEditPartnerConfiguration/BrokerEditPartnerConfiguration";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },

      // authentication routes
      {
        element: <AuthenticationLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
          {
            path: "/recover-password",
            element: <RecoverPassword />,
          },
        ],
      },

      // referrer dashboard routes
      {
        path: "/referrer-dashboard",
        element: <ReferrerLayout />,
        children: [
          { index: true, element: <ReferrerOverview /> },
          {
            path: "overview",
            element: <ReferrerOverview />,
          },
          {
            path: "my-referrals",
            element: <ReferrerMyReferrals />,
          },
          {
            path: "my-referrals/clients/:id",
            element: <ReferrerClientDetails />,
          },
          { path: "notifications", element: <ReferrerNotifications /> },
          { path: "settings", element: <ReferrerSettings /> },
        ],
      },

      // broker dashboard routes
      {
        path: "/broker-dashboard",
        element: <BrokerLayout />,
        children: [
          { index: true, element: <BrokerOverview /> },
          { path: "overview", element: <BrokerOverview /> },
          { path: "leads/:id", element: <BrokerLeadDetails /> },
          { path: "my-referrals", element: <BrokerMyReferrals /> },
          { path: "partner-profile", element: <BrokerPartnerProfile /> },
          {
            path: "partner-profile/:id",
            element: <PartnerProfile />,
          },
          {
            path: "partner-profile/:id/edit",
            element: <EditPartnerConfiguration />,
          },
          { path: "team-management", element: <BrokerTeamManagement /> },
          { path: "report", element: <BrokerReport /> },
          { path: "notifications", element: <BrokerNotifications /> },
          { path: "subscription", element: <BrokerSubscription /> },
          { path: "settings", element: <BrokerSettings /> },
        ],
      },

      // super admin dashboard routes
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
