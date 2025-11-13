import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');
  const [loadingRegister, setLoadingRegister] = useState(false);
  const [loadingGoogle, setLoadingGoogle] = useState(false);

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    setPasswordError('');
    setLoadingRegister(true);

    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must include at least one uppercase letter.');
      setLoadingRegister(false);
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must include at least one lowercase letter.');
      setLoadingRegister(false);
      return;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      setPasswordError('Password must include at least one special character.');
      setLoadingRegister(false);
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      setLoadingRegister(false);
      return;
    }

    try {
      const firebaseUserCredential = await createUser(email, password);
      const firebaseUser = firebaseUserCredential.user;

      await updateUserProfile(name, photoURL);

      const newUser = {
        name,
        email: firebaseUser.email,
        image: photoURL,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      if (!res.ok) throw new Error('User created in Firebase but not saved to MongoDB');

      toast.success('Registration successful! 🎉');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Registration failed');
    } finally {
      setLoadingRegister(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoadingGoogle(true);
    try {
      const result = await googleLogin();
      const user = result.user;

      const googleUser = {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
        createdAt: new Date().toISOString(),
      };

      const res = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(googleUser),
      });

      if (!res.ok) throw new Error('Failed to save Google user');

      toast.success('Logged in with Google successfully! 🌿');
      navigate('/');
    } catch (err) {
      toast.error(err.message || 'Google login failed');
    } finally {
      setLoadingGoogle(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-green-100 to-green-200"
    >
      <div className="flex flex-col lg:flex-row-reverse items-center gap-10 w-full max-w-5xl px-6">
        <div className="lg:w-1/2 text-center lg:text-left">
          <h1 className="text-5xl font-extrabold text-green-700">Join EcoTrack 🌱</h1>
          <p className="py-6 text-gray-600 text-lg">
            Create your account and start making a difference for the planet 💚
          </p>
        </div>

        <form
          onSubmit={handleRegister}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-green-100"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Register</h2>

          <label className="text-sm text-gray-700 font-medium">Full Name</label>
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="input input-bordered w-full mb-3 rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            required
          />

          <label className="text-sm text-gray-700 font-medium">Photo URL</label>
          <input
            name="photoURL"
            type="text"
            placeholder="Your Photo URL"
            className="input input-bordered w-full mb-3 rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
          />

          <label className="text-sm text-gray-700 font-medium">Email</label>
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="input input-bordered w-full mb-3 rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            required
          />

          <label className="text-sm text-gray-700 font-medium">Password</label>
          <input
            name="password"
            type="password"
            placeholder="Your Password"
            className="input input-bordered w-full mb-2 rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            required
          />
          {passwordError && <p className="text-red-500 text-sm mb-2">{passwordError}</p>}

          <button
            type="submit"
            className="btn bg-green-600 hover:bg-green-700 text-white w-full"
            disabled={loadingRegister}
          >
            {loadingRegister ? 'Registering...' : 'Register'}
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn mt-3 bg-white text-gray-700 border border-gray-300 hover:bg-green-50 w-full flex gap-2 items-center justify-center"
            disabled={loadingGoogle}
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            {loadingGoogle ? 'Processing...' : 'Register with Google'}
          </button>

          <p className="pt-4 text-center text-gray-600">
            Already have an account?{' '}
            <Link to="/auth/login" className="text-green-700 font-semibold hover:underline">
              Login
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
