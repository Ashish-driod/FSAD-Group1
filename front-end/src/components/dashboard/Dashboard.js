import React, { useState, useEffect } from 'react';
import SidePanel from 'components/dashboard/sidepanel/SidePanel';
import { Outlet } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import './Dashboard.css';
import {ToastContainer} from "react-toastify";



const Dashboard = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="flex h-screen">
            <SidePanel />
            <div className="outlet-parent flex flex-col">
                <header className="header-wrapper bg-white shadow-sm">
                    <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                            <span className="home-header font-semibold text-indigo-600 hover:text-indigo-500">FitMate</span>
                            {user ? (
                                <span className="home-user-info font-medium">Welcome, {user.email}</span>
                            ) : (
                                <span className="home-user-info font-medium">Welcome, Guest</span>
                            )}
                        </div>
                    </div>
                </header>
                <Outlet />
                <ToastContainer
                    position="bottom-center" // Set default position for all toasts
                    autoClose={2000} />
                {/* This is where the routed components will be displayed */}
            </div>
        </div>
    );
};

export default Dashboard;
