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
        toast.success('Login Successful!');
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        toast.success('Google Login Successful!');
        navigate(from, { replace: true });
      })
      .catch(err => toast.error(err.message));
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hero min-h-screen bg-base-200"
    >
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Access your account to enjoy games!</p>
        </div>

        <form onSubmit={handleSubmit} className="card bg-base-100 shadow-2xl w-full max-w-sm">
          <div className="card-body">
            <label>Email</label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />

            <label>Password</label>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />

            <div className="text-right">
              <Link to={`/auth/forgot-password?email=${email}`} className="link link-hover">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="btn btn-primary mt-2 w-full">
              Login
            </button>

            <button onClick={handleGoogleLogin} type="button" className="btn bg-white text-black border-[#e5e5e5]">
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
                  <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
                  <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
                  <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
                </g>
              </svg>
              Login with Google
            </button>

            <p className="pt-4 text-center">
              Don't have an account? <Link to="/auth/register" className="link-primary">Register</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Login;
