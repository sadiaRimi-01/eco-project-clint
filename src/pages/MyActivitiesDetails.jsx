import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';
import SkeletonLoader from '../componenets/SekeletonLoader';
import { AuthContext } from '../provider/AuthProvider';
import { ArrowLeft } from 'lucide-react';

const MyActivitiesDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();
  const navigate = useNavigate();

  const [activity, setActivity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!user) return;

    const fetchActivity = async () => {
      try {
        const res = await axios.get(`https://ecotrack-virid.vercel.app/userChallenges/${user.uid}`);
        const act = res.data.find(c => c.challengeId === id);

        if (act) {
         
          const challengeRes = await axios.get(`https://ecotrack-virid.vercel.app/challenges/${id}`);
          setActivity({ ...act, challengeTitle: challengeRes.data.title, challengeDescription: challengeRes.data.description });
        } else {
          setActivity(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchActivity();
  }, [user, id]);

  const handleProgressChange = (e) => {
    const newProgress = parseInt(e.target.value);
    setActivity({ ...activity, progress: newProgress });
  };

  const handleUpdate = async () => {
    setUpdating(true);
    try {
      await axios.patch(`https://ecotrack-virid.vercel.app/userChallenges/${user.uid}/${id}`, { progress: activity.progress });
      toast.success('Progress updated! 🌱');
    } catch (err) {
      toast.error('Failed to update progress');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) return <SkeletonLoader count={1} />;
  if (!activity) return <p className="text-center mt-10 text-gray-600">Challenge not found 😔</p>;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-6"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-xl border border-green-200 relative overflow-hidden">
       
        
        <button
          onClick={() => navigate('/my-activities')}
          className="flex items-center gap-2 text-[12px] md:text-xl text-green-700 font-semibold mb-6 hover:text-emerald-800"
        >
          <ArrowLeft size={20} /> Back to My Activities
        </button>

        <h1 className="text-2xl md:text-4xl font-bold text-green-800 mb-4">{activity.challengeTitle}</h1>
        <p className="text-gray-700  text-[12px] md:text-[16px] mb-6">{activity.challengeDescription}</p>

        <div className="mb-6">
          <p className="text-gray-700 mb-2 font-medium">Progress: {activity.progress}%</p>
          <div className="relative h-6 w-full bg-gray-200 rounded-full overflow-hidden shadow-inner">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-400 to-green-500 text-white font-semibold flex items-center justify-center transition-all duration-500"
              style={{ width: `${activity.progress}%` }}
            >
              {activity.progress}%
            </div>
          </div>
        </div>

        <label className="text-sm text-gray-700 font-medium mb-2 block">Update Progress</label>
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
          className="btn w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 text-white font-bold"
        >
          {updating ? 'Updating...' : 'Update Progress'}
        </button>
      </div>
    </motion.div>
  );
};

export default MyActivitiesDetails;
