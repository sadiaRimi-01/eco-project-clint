import React from "react";
import { motion } from "framer-motion";
import {
  Leaf,
  HeartHandshake,
  Recycle,
  Globe,
  UserCheck,
  TrendingUp,
  Share2,
} from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const StaticSections = () => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-emerald-100 py-16 px-6 text-center overflow-hidden rounded-2xl shadow-lg">
      
      <motion.div
        className="max-w-6xl mx-auto mb-20 "
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-emerald-800 mb-4">
          🌱 Why Go Green?
        </h2>
        <p className="text-gray-700 mb-10 text-lg">
          Small changes make a big difference. Going green isn’t just about saving the planet — 
          it’s about improving our lives and building a better tomorrow.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
         
          <motion.div
            variants={fadeUp}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <Leaf className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Protect Nature
            </h3>
            <p className="text-gray-600">
              Reduce pollution, conserve resources, and help restore our planet’s balance.
            </p>
          </motion.div>

          
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <HeartHandshake className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Improve Health
            </h3>
            <p className="text-gray-600">
              A cleaner environment means cleaner air, water, and food for all.
            </p>
          </motion.div>

          
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <Recycle className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Sustainable Living
            </h3>
            <p className="text-gray-600">
              Build habits that ensure a sustainable lifestyle for generations to come.
            </p>
          </motion.div>
        </div>
      </motion.div>

     
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <h2 className="text-2xl md:text-4xl font-bold text-emerald-800 mb-4">
          🌍 How It Works
        </h2>
        <p className="text-gray-700 mb-10 text-lg">
          Join the movement in just three simple steps — let’s make sustainability fun and easy!
        </p>

        <div className="grid md:grid-cols-3 gap-8">
         
          <motion.div
            variants={fadeUp}
            className="relative p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="absolute -top-4 left-6 bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              1
            </div>
            <UserCheck className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Join a Challenge
            </h3>
            <p className="text-gray-600">
              Pick an eco-challenge that matches your passion — from reducing waste to saving energy.
            </p>
          </motion.div>

        
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="relative p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="absolute -top-4 left-6 bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              2
            </div>
            <TrendingUp className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Track Progress
            </h3>
            <p className="text-gray-600">
              Measure your impact in real-time and stay motivated as you hit your green goals.
            </p>
          </motion.div>

         
          <motion.div
            variants={fadeUp}
            transition={{ delay: 0.4 }}
            className="relative p-8 bg-white rounded-2xl shadow-md hover:shadow-lg transition transform hover:-translate-y-1"
          >
            <div className="absolute -top-4 left-6 bg-emerald-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">
              3
            </div>
            <Share2 className="mx-auto text-emerald-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold text-emerald-700 mb-2">
              Share Tips
            </h3>
            <p className="text-gray-600">
              Inspire others by sharing your eco-friendly journey with the community.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default StaticSections;
