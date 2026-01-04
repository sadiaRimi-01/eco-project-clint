import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { AuthContext } from '../../provider/AuthProvider';
import { ThemeContext } from '../ThemeContext';

const Header = () => {
  const { user, logout } = useContext(AuthContext);
   const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false); 
  const [hovering, setHovering] = useState(false);

  const toggleDropdown = () => setUserMenuOpen(!userMenuOpen);

 const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "ecotrackdark";
  return (
    <header className="bg-base-100 text-green-600 sticky top-0 z-50 shadow-md">
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

       
        <nav className="hidden md:flex text-[10px] lg:text-[16px] space-x-2 lg:space-x-6">
          <Link to="/" className="hover:text-green-400 transition">Home</Link>
          <Link to="/challenges" className="hover:text-green-400 transition">Challenges</Link>
          {user && <Link to="/my-activities" className="hover:text-green-400 transition">My Activities</Link>}
          {user && (
  <Link to="/dashboard" className="hover:text-green-400 transition">
    Dashboard
  </Link>
)}

          <Link to="/about">About Us</Link>
          <Link to="/terms">Terms And Privacy</Link>
        </nav>
        

       
        <div className="hidden md:flex items-center gap-3 relative">
          {/* 🌗 THEME TOGGLE */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
               checked={isDark}
              onChange={toggleTheme}
              className="theme-controller"
              value="dark"
            />

           <svg
    className="swap-off h-10 w-10 fill-current"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24">
    <path
      d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
  </svg>

            {/* Moon */}
            <svg
              className="swap-on h-8 w-8 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24">
              <path d="M21.64 13A8.1 8.1 0 1 1 11 2.36a8.1 8.1 0 0 0 10.64 10.64Z" />
            </svg>
          </label>

          {user ? (
            <div
              className="relative"
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
            >
              <button
                className="flex items-center gap-2"
                onClick={toggleDropdown} 
              >
                <img
                  src={user.photoURL || 'https://i.ibb.co.com/6Rc7hdTr/profile.jpg'}
                  alt="User Avatar"
                  className="w-9 h-9 rounded-full border border-white"
                />
                <span className="font-medium">{user.displayName || "User"}</span>
              </button>

              {(hovering || userMenuOpen) && (
                <div
                  className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-44 z-50"
                >
                  <Link to="/profile" className="block px-4 py-2 hover:bg-green-100">Profile</Link>
                  <Link to="/my-activities" className="block px-4 py-2 hover:bg-green-100">My Activities</Link>
                  <button
                    onClick={() => {
                      logout();
                      setUserMenuOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-green-100"
                  >
                    Logout
                  </button>
                </div>
              )}
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

       
        <button
          className="md:hidden text-green-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      
      {menuOpen && (
        <div className="md:hidden bg-green-700 px-4 py-3 space-y-2">
          <Link to="/" onClick={() => setMenuOpen(false)} className="block py-1 text-white">Home</Link>
          <Link to="/challenges" onClick={() => setMenuOpen(false)} className="block py-1 text-white">Challenges</Link>
          {user && <Link to="/my-activities" onClick={() => setMenuOpen(false)} className="block py-1 text-white">My Activities</Link>
          }
          <Link to="/about" onClick={() => setMenuOpen(false)} className="block py-1 text-white">About Us</Link>
          <Link to="/terms" onClick={() => setMenuOpen(false)} className="block py-1 text-white">Terms And Privacy</Link>

          <div className="border-t border-green-500 my-2"></div>

          {user ? (
            <>
              <div className="flex items-center gap-2 py-2">
                <img
                  src={user.photoURL || 'https://i.ibb.co.com/6Rc7hdTr/profile.jpg'}
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full border  border-white"
                />
                <span className="text-white">{user.displayName || "User"}</span>
              </div>
              <Link to="/profile" className="block py-1 text-white hover:text-green-200" onClick={() => setMenuOpen(false)}>Profile</Link>
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
