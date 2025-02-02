import React from 'react';
import { mockLocations } from '../data/mockData';
import { MapPin, Users, TrendingUp } from 'lucide-react';
import logo from "../../image.png"
const Locations: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-200 mb-8 motion-preset-expand">Store Locations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLocations.map((location) => (
          <div key={location.id} className="bg-white/80 rounded-lg shadow-md overflow-hidden motion-preset-slide-up-lg">
            <div className="h-48 bg-gray-200 relative">
              <img
                src={logo}
                alt={`Map of ${location.name}`}
                className="w-44 h-44 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
              />
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <MapPin className="h-5 w-5 text-indigo-600 mr-2" />
                <h2 className="text-xl font-semibold text-gray-900">{location.name}</h2>
              </div>
              <div className="space-y-3">
                <div className="flex items-center text-gray-600">
                  <Users className="h-5 w-5 mr-2" />
                  <span>Daily Traffic: {location.traffic}</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  <span className='font-bold'>Performance: Above Average</span>
                </div>
              </div>
              <button className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors">
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Locations;