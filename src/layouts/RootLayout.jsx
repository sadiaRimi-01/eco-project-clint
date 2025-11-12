import React from 'react';
import { Outlet } from 'react-router-dom'; // ✅ এখানে 'react-router' না, 'react-router-dom' হবে
import Header from '../componenets/Header/Header';
import Footer from '../componenets/Footer/Footer';


const RootLayout = () => {
  return (
    <div>
      <Header></Header>
      <Outlet />
      <Footer></Footer>
    </div>
  );
};

export default RootLayout;
