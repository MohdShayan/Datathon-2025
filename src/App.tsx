import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Locations from './components/Locations';
import Form1 from './components/Form1';
import Services from './components/Services';
import Forecast from './components/Forecast';

import LandingPage from './components/LandingPage';

// function PrivateRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'admin' | 'analyst' }) {
//   const { user } = useUser();
//   const userRole = user?.publicMetadata.role as string;

//   if (!requiredRole || userRole === requiredRole) {
//     return <>{children}</>;
//   }
//   return <Navigate to="/" replace />;
// }

function App() {
  const { isSignedIn, user } = useUser();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isSignedIn ? <Navigate to="/form1" replace /> : <LandingPage />} />

        <Route path="/form1" element={
          <SignedIn>
            <Form1 />
          </SignedIn>
        } />
        

        <Route path="/dashboard" element={
          <SignedIn>
            <Layout />
          </SignedIn>
        }>
          <Route index element={<Dashboard />} />
          <Route path="analytics" element={
           
              <Analytics />
            
          } />
          <Route path="locations" element={<Locations />} />  
          <Route path="services" element={<Services />} />  
          <Route path="sales-prediction" element={<Forecast />} />  
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
