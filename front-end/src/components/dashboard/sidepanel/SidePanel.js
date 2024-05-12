import React, {useState} from 'react';
import {Link, Outlet, useNavigate} from 'react-router-dom';
import {Avatar, Badge, Button} from "react-daisyui"; // Link for navigation, Outlet for nested routes
import {WavesIcon,HomeIcon,Goal,BriefcaseIcon,CalendarIcon,TextIcon,ClipboardListIcon,ActivityIcon} from 'utils/component-helper'
import { getAuth, signOut } from 'firebase/auth';

const SidePanel = () => {
    const [activeLink, setActiveLink] = useState('home');

    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login');
    };

    const handleLinkClick = (link) => {
        setActiveLink(link);
    };
    return (
        <div className="sidenav-wrapper w-64 h-full bg-[#4f46e5] p-6">
            <WavesIcon className="h-8 w-8 text-white mb-6"/>

            <nav className="space-y-1">
                <Link className={`flex items-center space-x-3 text-white p-2 rounded-md ${activeLink === 'home' ? 'active' : ''}`} to={'/dashboard/home'}
                      onClick={() => handleLinkClick('home')}>
                    <HomeIcon className="h-5 w-5"/>
                    <span>Dashboard</span>
                </Link>
                <Link className={`flex items-center space-x-3 text-white p-2 rounded-md ${activeLink === 'goals' ? 'active' : ''}`} to={'/dashboard/goal-setting'}
                      onClick={() => handleLinkClick('goals')}>
                    <Goal className="h-5 w-5"/>
                    <span>Gaols</span>
                </Link>
                <Link className={`flex items-center space-x-3 text-white p-2 rounded-md ${activeLink === 'activity' ? 'active' : ''}`} to={'/dashboard/activity-tracking'}
                      onClick={() => handleLinkClick('activity')}>
                    <ActivityIcon className="h-5 w-5"/>
                    <span>Track Activity</span>
                </Link>
                <Link className={`flex items-center space-x-3 text-white p-2 rounded-md ${activeLink === 'workouts' ? 'active' : ''}`} to={'/dashboard/workout-plans'}
                      onClick={() => handleLinkClick('workouts')}>
                    <ClipboardListIcon className="h-5 w-5"/>
                    <span>Workout Plans</span>
                </Link>
            </nav>
            <div className="user-name-panel">
                <div className="flex items-center space-x-3 text-white bg-[#4338ca] p-2 rounded-md">
                    <Button onClick={handleSignOut} className='log-out-btn' size='xs' color='error' variant={'outline'} fullWidth={true} >
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
}


export default SidePanel;
