import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const JoinChallenge = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios.get(`http://localhost:3000/challenges/${id}`)
      .then(res => setChallenge(res.data))
      .finally(() => setLoading(false));

    // fetch user progress
    axios.get(`http://localhost:3000/userChallenges/${user?.uid}`)
      .then(res => {
        const uc = res.data.find(c => c.challengeId === id);
        if (uc) setProgress(uc.progress);
      });
  }, [id, user]);

  const handleJoin = () => {
    setJoining(true);
    axios.post(`http://localhost:3000/challenges/join/${id}`, { userId: user.uid })
      .then(res => {
        toast.success(res.data.message);
        setProgress(0);
      })
      .catch(err => toast.error(err.response?.data?.message || 'Failed to join'))
      .finally(() => setJoining(false));
  };

  if (loading) return <p className="text-center text-green-600 mt-10">Loading Challenge...</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg border border-green-200"
    >
      <h1 className="text-3xl font-bold text-green-700 mb-4">{challenge.title}</h1>
      <p className="text-gray-600 mb-4">{challenge.description}</p>

      {!progress && (
        <button
          onClick={handleJoin}
          disabled={joining}
          className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white mb-4"
        >
          {joining ? 'Joining...' : 'Join Challenge'}
        </button>
      )}

      {progress >= 0 && (
        <div>
          <p className="text-gray-700 mb-2">Progress: {progress}%</p>
          <div className="h-4 w-full bg-gray-200 rounded-full mb-4">
            <div className="h-4 bg-emerald-500 rounded-full" style={{ width: `${progress}%` }}></div>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default JoinChallenge;
