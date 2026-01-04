import { Link, NavLink, Outlet } from "react-router-dom";
import { LayoutDashboard, Activity, User } from "lucide-react";
import { ThemeContext } from "../componenets/ThemeContext";
import { useContext } from "react";

const DashboardLayout = () => {
     const { theme,toggleTheme } = useContext(ThemeContext);
      const isDark = theme === "ecotrackdark";
  return (
    <div className={`drawer lg:drawer-open min-h-screen transition-colors duration-300 ${theme === 'ecotrackdark' ? 'bg-base-100 text-base-content' : 'bg-base-100 text-base-content'}`}>
      <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />

      {/* CONTENT */}
      <div className={`drawer-content flex flex-col transition-colors duration-300 ${theme === 'ecotrackdark' ? 'bg-base-100' : 'bg-base-100'}`}>
        {/* Top Navbar */}
        <div className={`navbar flex justify-between sticky top-0 z-50 shadow-md transition-colors duration-300 ${theme === 'ecotrackdark' ? 'bg-base-200' : 'bg-base-200'}`}>
          <label htmlFor="dashboard-drawer" className="btn btn-ghost lg:hidden">
            ☰
          </label>
         
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
         {/* 🌗 THEME TOGGLE */}
          <label className="swap swap-rotate">
            <input
              type="checkbox"
               checked={isDark}
              onChange={toggleTheme}
              className="theme-controller"
              value="dark"
            />

            {/* Sun */}
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
     <Link to='/' className="btn text-base-content bg-gradient-to-r from-emerald-500 to-lime-500 hover:scale-105 transition-transform shadow-md rounded-full ">Back</Link>
        </div>
        

        {/* Page Content */}
        <div className="p-4 bg-base-100">
          <Outlet />
        </div>
      </div>

      {/* SIDEBAR */}
      <div className={`drawer-side transition-colors duration-300 ${theme === 'ecotrackdark' ? 'bg-base-200' : 'bg-base-200'}`}>
        <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>

        <aside className="w-64 bg-base-200 min-h-full">
          <div className="p-4 text-center font-bold text-green-600 text-xl">
            Dashboard
          </div>

          <ul className="menu px-4 gap-2">
            <li>
              <NavLink to="/dashboard" end className="gap-2">
                <LayoutDashboard size={18} />
                Overview
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/activities" className="gap-2">
                <Activity size={18} />
                My Activities
              </NavLink>
            </li>

            <li>
              <NavLink to="/dashboard/profile" className="gap-2">
                <User size={18} />
                Profile
              </NavLink>
            </li>
          </ul>
        </aside>
      </div>
    </div>
  );
};

export default DashboardLayout;

