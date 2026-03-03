import React from 'react';
import { Outlet } from 'react-router-dom';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
            <Outlet />
        </div>
    );
};

export default Layout;
