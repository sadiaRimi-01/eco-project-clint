import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';

const AddChallenge = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const newChallenge = {
      title: form.title.value,
      description: form.description.value,
      category: form.category.value,
      impactMetric: form.impactMetric.value,
      imageUrl: form.imageUrl.value,
      participants: 0,
      startDate: new Date(form.startDate.value).toISOString(),
      endDate: new Date(form.endDate.value).toISOString(),
      createdBy: user.uid,
      createdAt: new Date().toISOString()
    };

    axios.post('http://localhost:3000/challenges', newChallenge)
      .then(() => {
        toast.success('Challenge created successfully! 🌿');
        navigate('/challenges');
      })
      .catch((err) => toast.error(err.response?.data?.message || 'Failed to create challenge'))
      .finally(() => setLoading(false));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-emerald-100 to-green-200 p-6"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-3xl border border-green-200"
      >
        <h1 className="text-2xl md:text-3xl font-bold text-green-700 mb-6 text-center">Add New Challenge 🌱</h1>

        <label className="text-sm text-gray-700 font-medium">Title</label>
        <input type="text" name="title" required className="input input-bordered w-full mb-3 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg" />

        <label className="text-sm text-gray-700 font-medium">Description</label>
        <textarea name="description" required className="textarea textarea-bordered w-full mb-3 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg"></textarea>

        <label className="text-sm text-gray-700 font-medium">Category</label>
        <input type="text" name="category" required className="input input-bordered w-full mb-3 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg" />

        <label className="text-sm text-gray-700 font-medium">Impact Metric</label>
        <input type="text" name="impactMetric" required className="input input-bordered w-full mb-3 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg" />

        <label className="text-sm text-gray-700 font-medium">Image URL</label>
        <input type="text" name="imageUrl" required className="input input-bordered w-full mb-3 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg" />

        <label className="text-sm text-gray-700 font-medium">Start Date</label>
        <input type="date" name="startDate" required className="input input-bordered w-full mb-3 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg" />

        <label className="text-sm text-gray-700 font-medium">End Date</label>
        <input type="date" name="endDate" required className="input input-bordered w-full mb-6 border-green-200 focus:border-green-500 focus:ring-green-100 rounded-lg" />

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-emerald-500 hover:bg-emerald-600 text-white"
        >
          {loading ? 'Creating...' : 'Create Challenge'}
        </button>
      </form>
    </motion.div>
  );
};

export default AddChallenge;
