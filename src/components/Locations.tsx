import React from 'react';
import { mockLocations } from '../data/mockData';
import { MapPin, Users, TrendingUp } from 'lucide-react';

const Locations: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Store Locations</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockLocations.map((location) => (
          <div key={location.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="h-48 bg-gray-200 relative">
              <img
                src={`https://api.mapbox.com/styles/v1/mapbox/light-v10/static/pin-l+4A5568(${location.lng},${location.lat})/${location.lng},${location.lat},13,0/600x300@2x?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJja2V5czEyM2VleGFtcGxlIn0.ZXhhbXBsZV9leGFtcGxlX2V4YW1wbGU`}
                alt={`Map of ${location.name}`}
                className="w-full h-full object-cover"
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
                  <span>Performance: Above Average</span>
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