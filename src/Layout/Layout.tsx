import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div
            className="flex flex-col h-screen overflow-hidden bg-background"
        >
            <main className="flex-grow">
                <Outlet />
            </main>
        </div >
    );
};

export default Layout;
