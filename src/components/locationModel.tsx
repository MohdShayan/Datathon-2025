import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NumberTicker } from './ui/number-ticker';
import axios from 'axios';

interface Location {
  name: string;
  score: number;
}

const ProfitScoreByLocationComponent: React.FC = () => {
  // Location options (you can replace it with dynamic data)
  const locations: Location[] = [
    { name: 'New York', score: 90 },
    { name: 'San Francisco', score: 80 },
    { name: 'Los Angeles', score: 70 },
    { name: 'Chicago', score: 60 },
    { name: 'Miami', score: 50 },
  ];

  const [selectedLocation, setSelectedLocation] = useState<Location>(locations[0]); // Default to first location
  const navigate = useNavigate();

  const getScoreLabel = (score: number): string => {
    if (score >= 10) {
      return 'Customer of city come here';
    } else if (score < 10) {
      return 'Customer of city come here';
    } else {
      return 'LOW CHANCE of Profit';
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white/90 hover:bg-white motion-preset-expand rounded-lg shadow-lg p-8 w-80 text-center relative">
        <em>
          <h2 className="text-md font-semibold pb-4">
            Check Your Profit score on your preferred location
          </h2>
        </em>
        <div className="flex justify-center items-center mb-4 flex-col">
          <h2 className="text-2xl font-extrabold text-gray-800">Profit Score</h2>
          <div className="flex justify-center items-baseline">
            <div className="text-3xl font-bold text-blue-700">
            <NumberTicker

      value={selectedLocation.score}
      decimalPlaces={2}
      className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
    />
            </div>
            <div className="text-xl ml-2 text-gray-800">%</div>
          </div>
        </div>
        <div
          className={`text-xl font-semibold mt-4 ${
            selectedLocation.score >= 10
              ? 'text-green-600'
              : selectedLocation.score < 10
              ? 'text-yellow-500'
              : 'text-red-600'
          }`}
        >
          {getScoreLabel(selectedLocation.score)}
        </div>

        {/* Conditionally render "View Other Locations" button */}
        {selectedLocation.score < 10 && (
          <button
            className="mt-4 px-2 py-2 bg-blue-500 hover:bg-blue-600 transition-all text-white rounded-md text-lg focus:outline-none font-bold"
            onClick={() => {
              // Navigate to a page where users can view other locations
              navigate('/otherlocations');
            }}
          >
            Explore Other Locations
          </button>
        )}

        <div
          className="goto text-xs absolute bottom-2 left-0 right-0 cursor-pointer"
          onClick={() => navigate('/dashboard')}
        >
          proceed for dashboard ⟶
        </div>
      </div>
    </div>
  );
};

export default ProfitScoreByLocationComponent;