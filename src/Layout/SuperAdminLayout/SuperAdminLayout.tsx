 import { Outlet } from 'react-router-dom';
import SuperAdminSidebar from './SuperAdminSidebar';
import SuperAdminTopbar from './SuperAdminTopbar';

const SuperAdminLayout = () => {
    return (
        <div className="h-screen w-full bg-slate-50 flex overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            <SuperAdminSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <SuperAdminTopbar />
                <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default SuperAdminLayout;
