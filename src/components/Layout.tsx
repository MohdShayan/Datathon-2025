import React from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { LayoutDashboard, BarChart2, MapPin,Wrench, Settings as SettingsIcon, LogOut } from 'lucide-react';
import { useUser, useClerk } from '@clerk/clerk-react';
import logo from "../../image.png"
const Layout: React.FC = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const userRole = user?.publicMetadata.role as string;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <div className="flex h-screen bg-black text-white ">
      {/* Sidebar */}
      <div className="w-64 bg-black shadow-lg motion-preset-slide-right-lg">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-zinc-100 flex justify-center items-center gap-2"> <img src={logo} alt="" className='w-10 h-10' /> SupaRetail</h1>
        </div>
        <div className="py-4 pl-10 border-b">
          <div className="flex items-center">
            <img
              src={user?.imageUrl}
              alt={user?.fullName || 'User'}
              className="h-10 w-10 rounded-full"
            />
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200">{user?.fullName}</p>
              <p className="text-xs text-gray-200 capitalize">{userRole}</p>
            </div>
          </div>
        </div>
        <nav className="p-4">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `flex items-center px-4 py-2 rounded-lg mb-2 motion-preset-slide-right-md motion-duration-1000 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-100 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            <LayoutDashboard className="h-5 w-5 mr-3" />
            Dashboard
          </NavLink>
         
            <NavLink
              to="/dashboard/analytics"
              className={({ isActive }) =>
                `flex motion-preset-slide-right-md motion-duration-1000 items-center px-4 py-2 rounded-lg mb-2 ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-600'
                    : 'text-gray-100 hover:bg-gray-50 hover:text-gray-700'
                }`
              }
            >
              <BarChart2 className="h-5 w-5 mr-3" />
              Analytics
            </NavLink>
         
          <NavLink
            to="/dashboard/locations"
            className={({ isActive }) =>
              `flex motion-preset-slide-right-md motion-duration-1000 items-center px-4 py-2 rounded-lg mb-2 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-100 hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            <MapPin className="h-5 w-5 mr-3" />
            Locations
          </NavLink>

          <NavLink
            to="/dashboard/services"
            className={({ isActive }) =>
              `flex motion-preset-slide-right-md motion-duration-1000 items-center px-4 py-2 rounded-lg mb-2 ${
                isActive
                  ? 'bg-indigo-50 text-indigo-600'
                  : 'text-gray-100  hover:bg-gray-50 hover:text-gray-700'
              }`
            }
          >
            
            <Wrench className="h-5 w-5 mr-3"/>
            Services
          </NavLink>
          {userRole === 'admin' && (
            <NavLink
              to="/dashboard/settings"
              className={({ isActive }) =>
                `flex motion-preset-slide-right-md motion-duration-1000 items-center px-4 py-2 rounded-lg mb-2 ${
                  isActive
                    ? 'bg-indigo-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              <SettingsIcon className="h-5 w-5 mr-3" />
              Settings
            </NavLink>
          )}
        </nav>
        <div className="absolute bottom-0 w-64 p-4 border-t">
          <button
            onClick={handleSignOut}
            className="flex items-center px-4 py-2 text-gray-100 hover:bg-gray-50 hover:text-gray-800 rounded-lg w-full motion-preset-slide-up-md"
          >
            <LogOut className="h-5 w-5 mr-3" />
            Logout
          </button>
        </div>
      </div>

    
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;