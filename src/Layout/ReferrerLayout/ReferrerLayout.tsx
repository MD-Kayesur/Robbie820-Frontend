import { Outlet } from 'react-router-dom';
import ReferrerSidebar from './ReferrerSidebar';
import { LayoutNavber } from '../LayoutNavber';

const ReferrerLayout = () => {
    return (
        <div className="h-screen w-full bg-[#fdfdfd] flex overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            <ReferrerSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <LayoutNavber />
                <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ReferrerLayout;
