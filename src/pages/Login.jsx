import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Login = () => {
  const { loginUser, googleLogin } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    document.title = 'Login';
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password)
      .then(() => {
        toast.success('Login Successful! 🎉');
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success('Google Login Successful! 🌿');
        navigate(from, { replace: true });
      })
      .catch((err) => toast.error(err.message));
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
          <h1 className="text-5xl font-extrabold text-green-700">Welcome Back 👋</h1>
          <p className="py-6 text-gray-600 text-lg">
            Log in to continue your eco-friendly journey and track your challenges 🌍
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md border border-green-100"
        >
          <h2 className="text-2xl font-bold text-center text-green-600 mb-4">Login</h2>

          <label className="text-sm text-gray-700 font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            className="input input-bordered w-full mb-3 rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            required
          />

          <label className="text-sm text-gray-700 font-medium">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="input input-bordered w-full mb-2 rounded-lg border-green-200 focus:border-green-500 focus:ring focus:ring-green-100"
            required
          />

          <div className="text-right mb-4">
            <Link
              to={`/auth/forgot-password?email=${email}`}
              className="text-sm text-green-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <button type="submit" className="btn bg-green-600 hover:bg-green-700 text-white w-full">
            Login
          </button>

          <button
            onClick={handleGoogleLogin}
            type="button"
            className="btn mt-3 bg-white text-gray-700 border border-gray-300 hover:bg-green-50 w-full flex gap-2 items-center justify-center"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-5 h-5"
            />
            Login with Google
          </button>

          <p className="pt-4 text-center text-gray-600">
            Don't have an account?{' '}
            <Link to="/auth/register" className="text-green-700 font-semibold hover:underline">
              Register
            </Link>
          </p>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
