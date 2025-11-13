import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import SkeletonLoader from '../SekeletonLoader';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const MyActivities = () => {
  const { user } = useContext(AuthContext);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    axios.get(`http://localhost:3000/userChallenges/${user.uid}`)
      .then(res => setActivities(res.data))
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) return <SkeletonLoader count={4} />;

  if (activities.length === 0) return <p className="text-center mt-10 text-gray-600">You have not joined any challenges yet 😔</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-6"
    >
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {activities.map((act) => (
          <motion.div
            key={act._id}
            className="bg-white p-5 rounded-2xl shadow-md border border-green-200"
            whileHover={{ scale: 1.03 }}
          >
            <h3 className="font-semibold text-green-800 mb-2">{act.challengeTitle || act.challengeId}</h3>
            <p className="text-gray-700 mb-2">Progress: {act.progress}%</p>
            <div className="h-4 w-full bg-gray-200 rounded-full mb-2">
              <div
                className="h-4 bg-emerald-500 rounded-full transition-all duration-500"
                style={{ width: `${act.progress}%` }}
              ></div>
            </div>
            <p className="text-gray-400 text-xs">Last updated: {new Date(act.lastUpdated).toLocaleDateString()}</p>
            <Link
              to={`/my-activities/${act.challengeId}`}
              className="btn w-full mt-3 bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              View Details
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MyActivities;
