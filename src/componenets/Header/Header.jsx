
import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../../provider/AuthProvider';


const Header = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="navbar bg-base-100 sticky top-0 z-50 shadow-sm px-4 py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost md:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex="-1"
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                     <NavLink to="/" className="link-primary">Home</NavLink>
                    <NavLink to="/challenges" className="link-primary">challenges</NavLink>
                    <NavLink to="/My Activities" className="link-primary">My Activities</NavLink>
                    </ul>
                </div>
                <Link to="/" className="text-xxl md:text-2xl lg:text-3xl font-bold ">
                    Game<span className="text-red-500">Hub</span>
                </Link>
            </div>
            <div className="navbar-center hidden md:flex">
                <ul className="menu menu-horizontal gap-2">
                   <NavLink to="/" className="link-primary">Home</NavLink>
                    <NavLink to="/challenges" className="link-primary">challenges</NavLink>
                    <NavLink to="/My Activities" className="link-primary">My Activities</NavLink>
                </ul>
            </div>
            <div className="navbar-end gap-2">
                {user ? (
                    <>
                        <Link to="/profile">
                            <img src={user.photoURL || 'https://i.ibb.co.com/6Rc7hdTr/profile.jpg'} className="w-8 md:w-10  rounded-full" />
                        </Link>
                        <button onClick={logout} className="btn btn-outline btn-error rounded-3xl w-[50px] h-[25px] text-[8px] lg:w-[60px] lg:h-[35px] lg:text-[12px]">Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/auth/login" className="btn btn-primary rounded-3xl w-[50px] h-[20px] text-[8px] lg:w-[60px] lg:h-[35px] lg:text-[12px]">Login</Link>
                        <Link to="/auth/register" className="btn btn-primary rounded-3xl w-[50px] h-[20px] text-[8px] lg:w-[60px] lg:h-[35px] lg:text-[12px]">Register</Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;



 