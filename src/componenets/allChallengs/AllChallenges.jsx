import React, { use, useState, useEffect } from "react";
import ChallengeCard from "../challenge/ChallengeCard";
import { motion } from "framer-motion";

const AllChallenges = ({ allChallengesPromise }) => {
  const allChallenges = use(allChallengesPromise);

  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
 const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(1);
 
  const categories = ["All", ...new Set(allChallenges.map((ch) => ch.category))];

  
  const filteredChallenges = allChallenges.filter((challenge) => {
    const matchesSearch = challenge.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || challenge.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

 
  useEffect(() => {
    if (searchTerm === "") {
      setSelectedCategory("All");
    }
  }, [searchTerm]);
   // ✅ PAGINATION LOGIC (NEW)
  const totalPages = Math.ceil(filteredChallenges.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedChallenges = filteredChallenges.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  return (
    <div className="min-h-screen  py-10 px-6">
      <div className="max-w-7xl mx-auto">
       
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-2xl md:text-4xl font-extrabold text-emerald-700 mb-8 text-center"
        >
          🌍 Explore All Eco Challenges
        </motion.h1>

       
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

       
        {filteredChallenges.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            No challenges found 😔
          </p>
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
            {/* {filteredChallenges.map((challenge) => (
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
          </motion.div> */}
           {paginatedChallenges.map((challenge) => (
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
          {/* ✅ PAGINATION UI (EXACT DESIGN YOU GAVE) */}
            <div className="flex justify-center mt-12">
              <div className="join grid grid-cols-2">
                <button
                  className="join-item btn btn-outline"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  Previous page
                </button>

                <button
                  className="join-item btn btn-outline"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next
                </button>
              </div>
            </div>
      </div>
    </div>
  );
};

export default AllChallenges;
