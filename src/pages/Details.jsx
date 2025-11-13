import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Calendar, Clock } from "lucide-react";
import PageSpinner from "../componenets/PageSpiner"; // Spinner component

const Details = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [challenge, setChallenge] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        const res = await fetch(`http://localhost:3000/challenges/${id}`);
        if (!res.ok) throw new Error("Failed to fetch challenge");
        const data = await res.json();
        setChallenge(data);
      } catch (err) {
        console.error("Failed to fetch challenge:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChallenge();
  }, [id]);

  if (loading) return <PageSpinner />;

  if (!challenge)
    return (
      <p className="text-center text-gray-600 mt-10">
        Challenge not found.
      </p>
    );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-6xl mx-auto py-16 px-6"
    >
      {/* Challenge Image */}
      <div className="relative rounded-2xl overflow-hidden shadow-lg mb-8">
        <img
          src={challenge.imageUrl}
          alt={challenge.title}
          className="w-full h-64 md:h-96 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
          <h1 className="text-3xl md:text-5xl font-bold text-white">
            {challenge.title}
          </h1>
        </div>
      </div>

      {/* Challenge Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="grid md:grid-cols-2 gap-8 mb-10"
      >
        {/* Left Info */}
        <div className="space-y-4">
          <p className="text-gray-700 text-lg">{challenge.description}</p>
          <p className="text-gray-800 font-semibold">
            Impact Metric:{" "}
            <span className="font-normal text-gray-600">
              {challenge.impactMetric}
            </span>
          </p>
          <p className="text-gray-800 font-semibold">
            Target:{" "}
            <span className="font-normal text-gray-600">{challenge.target}</span>
          </p>
          <p className="text-gray-800 font-semibold">
            Category:{" "}
            <span className="font-normal text-gray-600">{challenge.category}</span>
          </p>
        </div>

        {/* Right Stats Card */}
        <div className="bg-emerald-50 rounded-2xl p-6 shadow-md flex flex-col gap-4 justify-center">
          <div className="flex items-center gap-3 text-gray-800">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>
              Start Date:{" "}
              {new Date(challenge.startDate).toLocaleDateString()}
            </span>
          </div>
          <div className="flex items-center gap-3 text-gray-800">
            <Calendar className="w-5 h-5 text-green-600" />
            <span>End Date: {new Date(challenge.endDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-3 text-gray-800">
            <Clock className="w-5 h-5 text-green-600" />
            <span>Duration: {challenge.duration} days</span>
          </div>
          <div className="flex items-center gap-3 text-gray-800">
            <Users className="w-5 h-5 text-green-600" />
            <span>Participants: {challenge.participants}</span>
          </div>
        </div>
      </motion.div>

      {/* Join Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-center"
      >
        <button
          onClick={() => navigate(`/challenges/join/${challenge._id}`)}
          className="bg-gradient-to-r from-green-400 to-emerald-500 text-white px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform"
        >
          Join Challenge
        </button>
      </motion.div>
    </motion.div>
  );
};

export default Details;
