import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import SkeletonLoader from '../componenets/SekeletonLoader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-toastify';

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState(null);

  useEffect(() => {
    if (!user) return;

    const fetchActivities = async () => {
      try {
        setLoading(true);
       
        const res = await axios.get(`https://ecotrack-virid.vercel.app/userChallenges/${user.uid}`);
        const userChallenges = res.data;

      
        const activitiesWithDetails = await Promise.all(
          userChallenges.map(async (act) => {
            try {
              const challengeRes = await axios.get(`https://ecotrack-virid.vercel.app/challenges/${act.challengeId}`);
              return {
                ...act,
                challengeTitle: challengeRes.data.title,
                challengeDescription: challengeRes.data.description,
              };
            } catch {
              return act;
            }
          })
        );

        setActivities(activitiesWithDetails);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivities();
  }, [user]);

  const handleCancel = async (challengeId) => {
    setCancellingId(challengeId);
    try {
      await axios.delete(`https://ecotrack-virid.vercel.app/userChallenges/${user.uid}/${challengeId}`);
      setActivities(prev => prev.filter(act => act.challengeId !== challengeId));
      toast.success('Challenge canceled successfully 🌿');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to cancel');
    } finally {
      setCancellingId(null);
    }
  };

  if (loading) return <SkeletonLoader count={4} />;

  if (activities.length === 0)
    return <p className="text-center mt-10 text-gray-600">You have not joined any challenges yet 😔</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-6"
    >
      <h1 className="md:text-4xl text-2xl font-bold text-green-700 text-center mb-10">🌿 My Eco Activities</h1>
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <motion.div
            key={act._id}
            className="bg-white p-6 rounded-2xl shadow-md border border-green-200 hover:shadow-xl transition transform hover:-translate-y-2"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="font-bold text-green-800 text-xl mb-2">{act.challengeTitle}</h3>
            <p className="text-gray-700 text-[12px] md:text-[18px] mb-3">{act.challengeDescription}</p>

            <div className="mb-3">
              <p className="text-gray-700 mb-1 font-medium">Progress: {act.progress}%</p>
              <div className="h-4 w-full bg-gray-200 rounded-full">
                <div
                  className="h-4 bg-emerald-400 rounded-full transition-all duration-500"
                  style={{ width: `${act.progress}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-400 text-xs mb-3">
              Last updated: {new Date(act.lastUpdated).toLocaleDateString()}
            </p>

            <Link
              to={`/my-activities/${act.challengeId}`}
              className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-2"
            >
              View Details
            </Link>

            <button
              onClick={() => handleCancel(act.challengeId)}
              disabled={cancellingId === act.challengeId}
              className="btn w-full bg-green-100 text-green-700 hover:bg-green-200"
            >
              {cancellingId === act.challengeId ? 'Cancelling...' : 'Cancel Challenge'}
            </button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyActivities;
