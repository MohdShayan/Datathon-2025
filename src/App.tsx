import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Locations from './components/Locations';
import Settings from './components/Settings';
import LandingPage from './components/LandingPage';
import { useUser } from '@clerk/clerk-react';



function PrivateRoute({ children, requiredRole }: { children: React.ReactNode, requiredRole?: 'admin' | 'analyst' }) {
  const { user } = useUser();
  const userRole = user?.publicMetadata.role as string;

  if (!requiredRole || userRole === requiredRole) {
    return <>{children}</>;
  }
  return <Navigate to="/" replace />;
}

function App() {
  return (

      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <SignedOut>
              <LandingPage />
            </SignedOut>
          } />
          
          <Route path="/" element={
            <SignedIn>
              <Layout />
            </SignedIn>
          }>
            <Route index element={<Dashboard />} />
            <Route path="analytics" element={
              <PrivateRoute requiredRole="analyst">
                <Analytics />
              </PrivateRoute>
            } />
            <Route path="locations" element={<Locations />} />
            <Route path="settings" element={
              <PrivateRoute requiredRole="admin">
                <Settings />
              </PrivateRoute>
            } />
          </Route>
        </Routes>
      </BrowserRouter>
 
  );
}

export default App;