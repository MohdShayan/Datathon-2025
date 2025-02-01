import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { SignedIn, SignedOut, useUser } from '@clerk/clerk-react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Locations from './components/Locations';

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
        <Route path="/" element={isSignedIn ? <Navigate to="/dashboard" replace /> : <LandingPage />} />

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
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
