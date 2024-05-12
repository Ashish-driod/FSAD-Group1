import React from 'react';
import SidePanel from 'components/dashboard/sidepanel/SidePanel';
import { Outlet } from 'react-router-dom';

const Dashboard = () => (
    <div className="flex h-screen">
        <SidePanel />
        <div className="outlet-parent flex flex-col">
            <header className="header-wrapper bg-white shadow-sm">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <span className="home-header font-semibold text-indigo-600 hover:text-indigo-500">FitMate</span>
                        <span className="home-user-info font-medium">Welcome, Tom Cook</span>
                    </div>
                </div>
            </header>
            <Outlet/> {/* This is where the routed components will be displayed */}
        </div>
    </div>
);


export default Dashboard;
