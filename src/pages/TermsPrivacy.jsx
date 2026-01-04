import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const TermsPrivacy = () => {
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
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-bold text-green-600">
          Terms & Privacy
        </h1>
        <p className="mt-4 text-base-content">
          Your trust matters. Learn how we protect your data and community.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Terms */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-base-100 p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Terms of Service
          </h2>
          <p className="text-base-content mb-3">
            By using EcoTrack, you agree to participate respectfully and share
            accurate information. Misuse or harmful activities may result in
            account suspension.
          </p>
          <p className="text-base-content">
            Content shared by users remains their responsibility. EcoTrack aims
            to maintain a safe and positive eco community.
          </p>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-base-100 p-6 rounded-xl shadow"
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-700">
            Privacy Policy
          </h2>
          <p className="text-base-content mb-3">
            We collect minimal personal data to provide authentication and
            activity tracking. Your information is never sold or misused.
          </p>
          <p className="text-base-content">
            Secure authentication and protected APIs ensure your data stays
            safe while you focus on living sustainably.
          </p>
        </motion.div>
      </div>

     
    </div>
  );
};

export default TermsPrivacy;
