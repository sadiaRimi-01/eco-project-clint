import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import PrivateRoute from '../componenets/PrivateRoute';

const ProfileContent = () => {
    const { user } = useContext(AuthContext);

    useEffect(() => {
        document.title = 'Profile';
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 p-4">
            <div className="w-full max-w-md bg-white/70 backdrop-blur-md shadow-lg rounded-2xl border border-green-200 p-8 text-center transition-transform transform hover:scale-[1.01]">
                
                <h1 className="text-3xl font-bold mb-4 text-green-700">🌿 My Profile</h1>

                <div className="flex flex-col items-center mb-6">
                    <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-green-400 shadow-md">
                        <img
                            src={user?.photoURL || 'https://i.ibb.co.com/6Rc7hdTr/profile.jpg'}
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                <div className="space-y-3 text-left bg-green-50 rounded-xl p-4 shadow-inner">
                    <p className="text-gray-800 font-semibold">
                        <span className="text-green-600">Name:</span> {user?.displayName || 'N/A'}
                    </p>
                    <p className="text-gray-800 font-semibold">
                        <span className="text-green-600">Email:</span> {user?.email || 'N/A'}
                    </p>
                </div>

                <div className="mt-8">
                    <Link
                        to="/profile/update"
                        className="btn bg-green-500 hover:bg-green-600 text-white border-none w-full shadow-md rounded-xl"
                    >
                        ✏️ Update Profile
                    </Link>
                </div>
            </div>
        </div>
    );
};

const Profile = () => (
    <PrivateRoute>
        <ProfileContent />
    </PrivateRoute>
);

export default Profile;
