import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const About = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          About EcoTrack
        </h1>
        <p className="mt-4 text-base-content max-w-2xl mx-auto transition-colors duration-500">
          EcoTrack is a community-driven platform empowering people to live
          sustainably through challenges, progress tracking, and shared eco
          knowledge.
        </p>
      </motion.div>

      {/* Mission Section */}
      <div className="grid md:grid-cols-2 gap-10 items-center">
        <motion.img
          src="https://i.ibb.co.com/5Ww1HL5w/18.webp"
          alt="Eco community"
          className="rounded-2xl shadow-lg w-full dark:shadow-gray-800 transition-shadow duration-500"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-semibold mb-4 text-green-700">
            Our Mission
          </h2>
          <p className="text-base-content leading-relaxed transition-colors duration-500">
            We believe small actions create big impact. EcoTrack helps users
            reduce carbon footprint, save resources, and build sustainable
            habits through measurable, community-supported challenges.
          </p>
        </motion.div>
      </div>

      {/* Values */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-20 grid md:grid-cols-3 gap-6"
      >
        {[
          {
            title: "Community First",
            text: "Together we grow greener habits through shared goals.",
          },
          {
            title: "Measurable Impact",
            text: "Track real-world environmental benefits with data.",
          },
          {
            title: "Sustainable Living",
            text: "Promote long-term eco-friendly lifestyles.",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="p-6 bg-base-100 dark:bg-base-200 rounded-xl shadow hover:shadow-lg dark:shadow-gray-800 transition-all duration-500"
          >
            <h3 className="text-xl font-semibold text-green-600 mb-2">
              {item.title}
            </h3>
            <p className="text-base-content transition-colors duration-500">
              {item.text}
            </p>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default About;
