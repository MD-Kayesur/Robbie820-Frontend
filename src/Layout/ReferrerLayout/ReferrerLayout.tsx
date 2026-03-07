import { Outlet } from 'react-router-dom';
import ReferrerSidebar from './ReferrerSidebar';
import ReferrerTopbar from './ReferrerTopbar';


const ReferrerLayout = () => {
    return (
        <div className="h-screen w-full bg-[#fdfdfd] flex overflow-hidden font-sans selection:bg-sky-100 selection:text-sky-900">
            <ReferrerSidebar />
            <div className="flex-1 flex flex-col h-full overflow-hidden">
              <ReferrerTopbar/>
                <main className="flex-1 overflow-y-auto no-scrollbar scroll-smooth">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default ReferrerLayout;
