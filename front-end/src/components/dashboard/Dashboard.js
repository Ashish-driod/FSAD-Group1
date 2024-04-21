import React from 'react';
import SidePanel from 'components/dashboard/sidepanel/SidePanel';
import Header from 'components/dashboard/header/Header';
import { Outlet } from 'react-router-dom';

const Dashboard = () => (
    <div className="flex h-screen">
        <SidePanel />
        <div className="flex flex-col w-3/4">
            <Header />
            <div className="flex-1 p-4 overflow-auto bg-gray-50">
                <Outlet /> {/* This is where the routed components will be displayed */}
            </div>
        </div>
    </div>
);

export default Dashboard;
