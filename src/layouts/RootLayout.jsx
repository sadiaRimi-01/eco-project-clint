import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../componenets/Header/Header';
import Footer from '../componenets/Footer/Footer';


const RootLayout = () => {
  return (
    <div>
      <Header></Header>
    <main className='max-w-screen-xl mx-auto w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 lg:py-8 flex-1'>
         <Outlet />
    </main>

      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
