import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import SkeletonLoader from '../componenets/SekeletonLoader';

const TipsEvents = () => {
  const [tips, setTips] = useState([]);
  const [events, setEvents] = useState([]);
  const [loadingTips, setLoadingTips] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    axios.get('https://ecotrack-virid.vercel.app/tips')
      .then(res => setTips(res.data))
      .finally(() => setLoadingTips(false));

    axios.get('https://ecotrack-virid.vercel.app/events')
      .then(res => setEvents(res.data))
      .finally(() => setLoadingEvents(false));
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-6">
      <div className="max-w-7xl mx-auto">

      
        <h2 className="text-3xl font-bold text-green-700 mb-6">🌿 Recent Tips</h2>
        {loadingTips ? (
          <SkeletonLoader count={5} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {tips.map((tip, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow-md border border-green-200"
                whileHover={{ scale: 1.05 }}
              >
                <h3 className="font-semibold text-green-800">{tip.title}</h3>
                <p className="text-gray-600 text-sm mt-1">By: {tip.authorName}</p>
                <p className="text-gray-500 text-sm mt-1">Upvotes: {tip.upvotes}</p>
                <p className="text-gray-400 text-xs mt-1">Created: {new Date(tip.createdAt).toLocaleDateString()}</p>
              </motion.div>
            ))}
          </div>
        )}

       
        <h2 className="text-3xl font-bold text-green-700 mb-6">📅 Upcoming Events</h2>
        {loadingEvents ? (
          <SkeletonLoader count={4} />
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6">
            {events.map((event, idx) => (
              <motion.div
                key={idx}
                className="bg-white p-5 rounded-2xl shadow-md border border-green-200"
                whileHover={{ scale: 1.03 }}
              >
                <h3 className="font-semibold text-green-800">{event.title}</h3>
                <p className="text-gray-600 text-sm">{event.location}</p>
                <p className="text-gray-500 text-sm mt-1">{new Date(event.date).toLocaleDateString()}</p>
                <p className="text-gray-400 text-sm mt-2">{event.shortDesc}</p>
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default TipsEvents;
