import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../componenets/Header/Header';
import Footer from '../componenets/Footer/Footer';

const AuthLayout = () => {
    return (
        <div>
           <Header></Header>
            <div className='bg-base-200  mx w-full mx-auto '>
                <Outlet></Outlet>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default AuthLayout;