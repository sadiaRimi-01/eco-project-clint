import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { AuthContext } from '../provider/AuthProvider';
import { CheckCircle2 } from 'lucide-react';

const JoinChallenge = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/challenges/${id}`)
      .then(res => setChallenge(res.data))
      .finally(() => setLoading(false));

    if (user) {
      axios.get(`http://localhost:3000/userChallenges/${user?.uid}`)
        .then(res => {
          const uc = res.data.find(c => c.challengeId === id);
          if (uc) {
            setProgress(uc.progress);
            if (uc.progress >= 0) setJoined(true);
          }
        });
    }
  }, [id, user]);

  const handleJoin = () => {
    if (!user) {
      navigate('/auth/login', { state: { from: `/challenges/join/${id}` } });
      return;
    }

    setJoining(true);
    axios.post(`http://localhost:3000/challenges/join/${id}`, { userId: user.uid })
      .then(res => {
        toast.success('Joined Successfully! 🎉');
        setJoined(true);
        setProgress(0);
      })
      .catch(err => toast.error(err.response?.data?.message || 'Failed to join'))
      .finally(() => setJoining(false));
  };

  if (loading) return (
    <p className="text-center text-green-600 mt-10 text-lg font-medium animate-pulse">
      Loading Challenge...
    </p>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-4xl mx-auto mt-10 p-8 bg-gradient-to-r from-green-50 via-emerald-50 to-green-100 rounded-3xl shadow-2xl border border-emerald-200"
    >
      <div className="flex flex-col md:flex-row gap-8">
        
        <div className="md:w-1/2 rounded-xl overflow-hidden shadow-lg">
          <img
            src={challenge.imageUrl}
            alt={challenge.title}
            className="w-full h-80 object-cover hover:scale-105 transition-transform duration-500"
          />
        </div>

      
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-extrabold text-green-800 mb-4">{challenge.title}</h1>
            <p className="text-gray-700 text-lg mb-4">{challenge.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Category:</strong> <span className="text-emerald-700">{challenge.category}</span>
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Impact:</strong> {challenge.impactMetric}
            </p>
          </div>

        
          {!joined ? (
            <button
              onClick={handleJoin}
              disabled={joining}
              className="btn bg-emerald-500 hover:bg-emerald-600 text-white py-3 text-lg font-semibold rounded-xl shadow-lg transition transform hover:-translate-y-1"
            >
              {joining ? 'Joining...' : 'Join Challenge'}
            </button>
          ) : (
            <div className="flex items-center gap-2 py-3 px-4 bg-green-600 text-white font-semibold rounded-xl justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
              <span>Joined</span>
            </div>
          )}

         
          {joined && (
            <div className="mt-4">
              <p className="text-gray-700 mb-1 font-medium">Progress: {progress}%</p>
              <div className="w-full bg-gray-200 rounded-full h-4 shadow-inner">
                <div
                  className="h-4 bg-emerald-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default JoinChallenge;
