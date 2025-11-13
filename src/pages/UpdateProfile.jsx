import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import PrivateRoute from '../componenets/PrivateRoute';
import { AuthContext } from '../provider/AuthProvider';

const UpdateProfileContent = () => {
  const { user, updateUserProfile } = useContext(AuthContext);
  const [name, setName] = useState(user?.displayName || '');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = 'Update Profile';
  }, []);

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUserProfile(name, photoURL)
      .then(() => {
        toast.success('Profile updated successfully! 🎉', { autoClose: 2000 });
        setTimeout(() => navigate('/profile'), 2000);
      })
      .catch((err) => {
        toast.error(`Error: ${err.message}`, { autoClose: 2500 });
      });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-green-50 to-green-100"
    >
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-lg p-8 border border-green-100">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-green-600">Update Profile</h1>
          <p className="text-gray-500 mt-1">Keep your profile information fresh 🌱</p>
        </div>

        <form onSubmit={handleUpdate} className="flex flex-col gap-4">
          <label className="font-medium text-gray-700">Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="input input-bordered w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            placeholder="Enter your name"
            required
          />

          <label className="font-medium text-gray-700">Profile Photo URL</label>
          <input
            type="text"
            value={photoURL}
            onChange={(e) => setPhotoURL(e.target.value)}
            className="input input-bordered w-full rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            placeholder="Paste your photo link"
          />

          <div className="mt-6 flex gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn bg-green-600 hover:bg-green-700 text-white px-6 rounded-lg shadow-md transition"
            >
              Save Changes
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="button"
              onClick={() => navigate('/profile')}
              className="btn btn-outline border-green-600 text-green-600 hover:bg-green-50 px-6 rounded-lg"
            >
              Cancel
            </motion.button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

const UpdateProfile = () => (
  <PrivateRoute>
    <UpdateProfileContent />
  </PrivateRoute>
);

export default UpdateProfile;
