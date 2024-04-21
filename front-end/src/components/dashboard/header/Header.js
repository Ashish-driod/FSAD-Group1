import React from 'react';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const auth = getAuth();
    const navigate = useNavigate();

    const handleSignOut = async () => {
        await signOut(auth);
        navigate('/login'); // Redirect to login page after sign-out
    };

    return (
        <div className="w-full flex justify-end p-4 bg-white shadow-md">
            <button onClick={handleSignOut} className="text-gray-700 hover:text-indigo-600">
                <img
                    className="w-8 h-8 rounded-full"
                    src="https://i.pravatar.cc/150?img=3" // Sample avatar
                    alt="Avatar"
                />
            </button>
        </div>
    );
};

export default Header;
