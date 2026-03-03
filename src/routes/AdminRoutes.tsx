import { Navigate, Outlet } from "react-router-dom";

const AdminRoutes = () => {
    const isAdmin = true; // replace with Redux or auth logic

    return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminRoutes;
