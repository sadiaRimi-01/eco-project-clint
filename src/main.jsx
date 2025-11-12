import React from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import router from './routes/Routes.jsx';
import './index.css';
import AuthProvider from './provider/AuthProvider.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider> <RouterProvider router={router} /></AuthProvider>
   
  </React.StrictMode>,
);
