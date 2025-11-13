import React, { use } from 'react';
import ChallengeCard from '../challenge/ChallengeCard';
import { Link } from 'react-router-dom';
import StaticSections from '../StaticSections/StaticSections';
import SkeletonLoader from '../SekeletonLoader';
import { motion } from 'framer-motion';
import TipsEvents from '../TipsEvent';

const ActiveChallenges = ({ activeChallengesPromise }) => {
  const activeChallenge = use(activeChallengesPromise);

  if (!activeChallenge || activeChallenge.length === 0) {
    return (
      <div className="max-w-full mx-auto mt-10">
        <h1 className="text-5xl text-center font-bold text-green-600 mb-8">
          Loading <span className="text-emerald-400">Challenges...</span>
        </h1>
        <SkeletonLoader count={6} />
      </div>
    );
  }

  return (
    <div className="max-w-full mx-auto py-10 px-4">
     
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-xl md:text-5xl font-bold">
          Active <span className="text-emerald-500">Challenges</span>
        </h1>
        <Link
          to="/challenges"
          className="btn text-white w-[100px] md:w-[145px] p-2 bg-gradient-to-r from-emerald-500 to-lime-500 hover:scale-105 transition-transform shadow-md rounded-full"
        >
          Show All
        </Link>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {activeChallenge.length === 0 ? (
          <SkeletonLoader count={6} />
        ) : (
          activeChallenge.map((challenge) => (
            <motion.div
              key={challenge._id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <ChallengeCard challenge={challenge} />
            </motion.div>
          ))
        )}
      </div>

      
      <div className="mt-12">
        <TipsEvents />
        <StaticSections />
      </div>
    </div>
  );
};

export default ActiveChallenges;
