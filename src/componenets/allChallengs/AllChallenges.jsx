import React, { use, useState, useEffect } from "react";
import ChallengeCard from "../challenge/ChallengeCard";
import SkeletonLoader from "../SekeletonLoader";
import { motion } from "framer-motion";

const AllChallenges = ({ allChallengesPromise }) => {
  const allChallenges = use(allChallengesPromise);

  // 🌿 States for filtering
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 🌍 Get unique categories dynamically
  const categories = allChallenges ? ["All", ...new Set(allChallenges.map((ch) => ch.category))] : ["All"];

  // 🔍 Filter challenges
  const filteredChallenges = allChallenges
    ? allChallenges.filter((challenge) => {
        const matchesSearch = challenge.title.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = selectedCategory === "All" || challenge.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
    : [];

  // ✅ Fix: Reset category when search is cleared
  useEffect(() => {
    if (searchTerm === "") {
      setSelectedCategory("All");
    }
  }, [searchTerm]);

  // ✅ Set loading false when allChallenges data is ready
  useEffect(() => {
    if (allChallenges) setLoading(false);
  }, [allChallenges]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 py-10 px-6">
      <div className="max-w-7xl mx-auto">
        {/* 🌿 Header */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-extrabold text-emerald-700 mb-8 text-center"
        >
          🌍 Explore All Eco Challenges
        </motion.h1>

        {/* 🔍 Search & Filter Bar */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row justify-center items-center gap-4 bg-white p-5 rounded-2xl shadow-md border border-emerald-200 mb-10"
        >
          <input
            type="text"
            placeholder="🔎 Search challenges..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input input-bordered w-full md:w-1/2 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-300"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="select select-bordered w-full md:w-1/3 border-emerald-300 focus:border-emerald-500 focus:ring-emerald-300"
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </motion.div>

        {/* ♻️ Challenges Grid */}
        {loading ? (
          <SkeletonLoader count={6} />
        ) : filteredChallenges.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">No challenges found 😔</p>
        ) : (
          <motion.div
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 },
              },
            }}
          >
            {filteredChallenges.map((challenge) => (
              <motion.div
                key={challenge._id}
                variants={{
                  hidden: { opacity: 0, y: 60 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                <ChallengeCard challenge={challenge} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AllChallenges;
