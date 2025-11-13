import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SkeletonLoader from '../SekeletonLoader';

const MyActivitiesDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;
    axios.get(`http://localhost:3000/userChallenges/${user.uid}`)
      .then(res => {
        const act = res.data.find(c => c.challengeId === id);
        setActivity(act);
      })
      .finally(() => setLoading(false));
  }, [user, id]);

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setActivity({ ...activity, progress: newProgress });
  };

  const handleUpdate = () => {
    setUpdating(true);
    axios.patch(`http://localhost:3000/userChallenges/${user.uid}/${id}`, { progress: activity.progress })
      .then(() => toast.success('Progress updated! 🌱'))
      .catch(() => toast.error('Failed to update progress'))
      .finally(() => setUpdating(false));
  };

  if (loading) return <SkeletonLoader count={1} />;

  if (!activity) return <p className="text-center mt-10 text-gray-600">Challenge not found 😔</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-6"
    >
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg border border-green-200">
        <h1 className="text-3xl font-bold text-green-700 mb-4">{activity.challengeTitle || activity.challengeId}</h1>

        <p className="text-gray-700 mb-2">Progress: {activity.progress}%</p>
        <div className="h-4 w-full bg-gray-200 rounded-full mb-4">
          <div className="h-4 bg-emerald-500 rounded-full" style={{ width: `${activity.progress}%` }}></div>
        </div>

        <label className="text-sm text-gray-700 font-medium">Update Progress</label>
        <input
          type="number"
          min={0}
          max={100}
          value={activity.progress}
          onChange={handleProgressChange}
          className="input input-bordered w-full mb-4 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg"
        />

        <button
          onClick={handleUpdate}
          disabled={updating}
          className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          {updating ? 'Updating...' : 'Update Progress'}
        </button>
      </div>
    </motion.div>
  );
};

export default MyActivitiesDetails;
