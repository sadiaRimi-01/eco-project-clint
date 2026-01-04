import React, { useState } from "react";
import { motion } from "framer-motion";

const Newsletter = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert("🌱 Thank you for subscribing to EcoTrack!");
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden py-20 px-6 bg-gradient-to-br from-green-100 via-emerald-200 to-green-300 rounded-2xl shadow-lg ">
      {/* Decorative Blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-emerald-400/30 dark:bg-emerald-700/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-green-500/30 dark:bg-green-700/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-emerald-800 dark:text-emerald-300 mb-4">
            🌍 Stay Updated with EcoTrack
          </h2>

          <p className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">
            Subscribe to our newsletter and get the latest eco challenges,
            sustainability tips, and community events directly in your inbox.
            Let’s build a greener future together 🌱
          </p>

          <ul className="space-y-3 text-gray-700 dark:text-gray-300">
            <li>✅ Weekly eco-friendly tips</li>
            <li>✅ New challenges & rewards</li>
            <li>✅ Community impact stories</li>
          </ul>
        </motion.div>

        {/* Right Form */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-3xl shadow-xl p-8 border border-emerald-200 dark:border-emerald-700"
        >
          <h3 className="text-2xl font-bold text-center text-emerald-700 dark:text-emerald-300 mb-6">
            Join Our Green Newsletter 💌
          </h3>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              required
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-5 py-3 rounded-full border border-emerald-300 dark:border-emerald-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-400"
            />

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full py-3 rounded-full font-semibold text-white bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 transition"
            >
              Subscribe Now 🌱
            </motion.button>
          </form>

          <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Newsletter;
