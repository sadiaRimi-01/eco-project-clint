import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { Leaf, Users, Activity } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../provider/AuthProvider";

const LiveStats = () => {
  const [stats, setStats] = useState({ activeChallenges: 0, totalParticipants: 0 });
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await fetch("https://ecotrack-virid.vercel.app/stats");
        const data = await res.json();
        setStats(data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleAddChallenge = () => {
    if (user) {
      navigate("/challenges/add");
    } else {
     
      navigate("/auth/login", { state: { from: "/challenges/add" } });
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading statistics...</p>;

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
  };

  return (
    <motion.div
      className="bg-gradient-to-b from-green-50 to-emerald-100 py-16 px-6 rounded-2xl shadow-lg"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
    >
      <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto items-stretch">
       
        <motion.div
          className="row-span-2 flex items-center justify-center"
          variants={fadeUp}
          transition={{ delay: 0.1 }}
        >
          <div className="card bg-white/90 border border-emerald-200 w-full h-full shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <Leaf className="text-emerald-600 w-16 h-16 mb-4" />
              <h2 className="card-title text-3xl font-bold text-emerald-800">
                Community Live Stats 🌱
              </h2>
              <p className="text-gray-600 mt-2 text-lg mb-4">
                Real-time sustainability progress powered by you!
              </p>

             
              <button
                onClick={handleAddChallenge}
                className="btn bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition mt-2"
              >
                Add New Challenge
              </button>
            </div>
          </div>
        </motion.div>

       
        <motion.div
          className="flex items-center justify-center"
          variants={fadeUp}
          transition={{ delay: 0.2 }}
        >
          <div className="card bg-gradient-to-r from-emerald-400 to-green-500 w-full h-full text-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <Activity className="w-12 h-12 mb-3" />
              <h2 className="card-title text-xl font-semibold">Active Challenges</h2>
              <p className="text-4xl font-bold mt-2">{stats.activeChallenges}</p>
            </div>
          </div>
        </motion.div>

        
        <motion.div
          className="flex items-center justify-center"
          variants={fadeUp}
          transition={{ delay: 0.3 }}
        >
          <div className="card bg-gradient-to-r from-green-300 to-emerald-400 w-full h-full text-white shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
            <div className="card-body items-center text-center">
              <Users className="w-12 h-12 mb-3" />
              <h2 className="card-title text-xl font-semibold">Active Participants</h2>
              <p className="text-4xl font-bold mt-2">{stats.totalParticipants}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LiveStats;
