import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white text-green-600 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
       
        <Link to="/" className="flex items-center gap-2">
          <img
            src="https://i.ibb.co.com/3m5DnzsD/ecologo.png"
            alt="EcoTrack Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-xl md:text-2xl font-bold tracking-wide">
            Eco<span className="text-green-300">Track</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="hover:text-green-400 transition">Home</Link>
          <Link to="/challenges" className="hover:text-green-400 transition">Challenges</Link>
          {user && <Link to="/my-activities" className="hover:text-green-400 transition">My Activities</Link>}
        </nav>

        {/* Desktop User/Login Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative group">
              <button className="flex items-center gap-2">
                <img
                  src={user.photoURL || 'https://i.ibb.co.com/6Rc7hdTr/profile.jpg'}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border border-white"
                />
                <span className="font-medium">{user.displayName || "User"}</span>
              </button>

              <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-gray-800 rounded-md shadow-lg w-44">
                <Link to="/profile" className="block px-4 py-2 hover:bg-green-100">Profile</Link>
                <Link to="/my-activities" className="block px-4 py-2 hover:bg-green-100">My Activities</Link>
                <button
                  onClick={logout}
                  className="w-full text-left px-4 py-2 text-red-600 hover:bg-green-100"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/auth/login"
                className="btn bg-white text-green-700 hover:bg-green-100 rounded-full px-4 py-1 text-sm font-semibold"
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                className="btn bg-green-800 text-white hover:bg-green-700 rounded-full px-4 py-1 text-sm font-semibold"
              >
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-green-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-green-700 px-4 py-3 space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-1 text-white">Home</Link>
          <Link to="/challenges" onClick={() => setMenuOpen(false)} className="block py-1 text-white">Challenges</Link>
          {user && <Link to="/my-activities" onClick={() => setMenuOpen(false)} className="block py-1 text-white">My Activities</Link>}

          <div className="border-t border-green-500 my-2"></div>

          {user ? (
            <>
              <div className="flex items-center gap-2 py-2">
                <img
                  src={user.photoURL || 'https://i.ibb.co.com/6Rc7hdTr/profile.jpg'}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border border-white"
                />
                <span>{user.displayName || "User"}</span>
              </div>
              <Link to="/profile" className="block py-1 hover:text-green-200" onClick={() => setMenuOpen(false)}>Profile</Link>
              <button
                onClick={() => {
                  logout();
                  setMenuOpen(false);
                }}
                className="text-red-200 block w-full text-left py-1"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/auth/login" className="block py-1 text-white hover:text-green-200" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/auth/register" className="block py-1 text-white hover:text-green-200" onClick={() => setMenuOpen(false)}>Register</Link>
            </>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
