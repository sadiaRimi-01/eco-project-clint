import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';

const Register = () => {
  const { createUser, updateUserProfile, googleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    document.title = 'Register';
  }, []);

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photoURL = form.photoURL.value;
    const email = form.email.value;
    const password = form.password.value;

    setPasswordError('');

    // ✅ Password validation
    if (!/[A-Z]/.test(password)) {
      setPasswordError('Password must include at least one uppercase letter.');
      return;
    }
    if (!/[a-z]/.test(password)) {
      setPasswordError('Password must include at least one lowercase letter.');
      return;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    // ✅ Firebase user creation
    createUser(email, password)
      .then((firebaseUserCredential) => {
        const firebaseUser = firebaseUserCredential.user;
        console.log("Firebase user created:", firebaseUser);

        // ✅ Update profile
        updateUserProfile(name, photoURL)
          .then(() => {
            const newUser = {
              name: name,
              email: firebaseUser.email,
              image: photoURL,
              createdAt: new Date().toISOString(),
            };

            console.log('Sending user to MongoDB:', newUser);

            // ✅ Save user in MongoDB
            fetch('http://localhost:3000/users', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newUser),
            })
              .then(res => res.json())
              .then(data => {
                console.log('Response from backend:', data);
                toast.success('Registration successful! 🎉', { autoClose: 2000 });
                navigate('/');
              })
              .catch(err => {
                console.error('Failed to save user:', err);
                toast.error('User created in Firebase but not saved to MongoDB', { autoClose: 2000 });
              });
          })
          .catch(err => {
            console.error('Profile update error:', err);
            toast.error(`Error updating profile: ${err.message}`, { autoClose: 2000 });
          });
      })
      .catch(err => {
        console.error('Firebase registration error:', err);
        toast.error(`Error: ${err.message}`, { autoClose: 2000 });
      });
  };

  // ✅ Google Login Handler
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        const googleUser = {
          name: user.displayName,
          email: user.email,
          image: user.photoURL,
          createdAt: new Date().toISOString(),
        };

        // ✅ Save Google user to MongoDB
        fetch('http://localhost:3000/users', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(googleUser),
        })
          .then(res => res.json())
          .then(data => {
            console.log('Google user saved to MongoDB:', data);
            toast.success('Logged in with Google successfully! 🎮', { autoClose: 2000 });
            navigate('/');
          })
          .catch(err => {
            console.error('Failed to save Google user:', err);
          });
      })
      .catch(err => {
        toast.error(`Error: ${err.message}`, { autoClose: 2000 });
      });
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
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">Create an account to start your eco journey! 🌿</p>
        </div>

        <form onSubmit={handleRegister} className="card bg-base-100 shadow-2xl w-full max-w-sm">
          <div className="card-body">
            <label>Name</label>
            <input name="name" type="text" placeholder="Your Name" className="input input-bordered" required />

            <label>Photo URL</label>
            <input name="photoURL" type="text" placeholder="Photo URL" className="input input-bordered" />

            <label>Email</label>
            <input name="email" type="email" placeholder="Email" className="input input-bordered" required />

            <label>Password</label>
            <input name="password" type="password" placeholder="Password" className="input input-bordered" required />

            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}

            <button type="submit" className="btn btn-primary mt-3 w-full">Register</button>

            <button onClick={handleGoogleLogin} type="button" className="btn bg-white text-black border-[#e5e5e5] mt-2">
              <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
              Register with Google
            </button>

            <p className="pt-4 text-center">
              Already have an account?{' '}
              <Link to="/auth/login" className="link-primary">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default Register;
