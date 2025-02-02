import React, { useState } from 'react';
import { BarChart3, Users, MapPin, TrendingUp, Download, Filter } from 'lucide-react';
import { mockSalesData, mockPredictions } from '../data/mockData';
import { useUser } from '@clerk/clerk-react';

const Dashboard: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>('week');
  const { user } = useUser();
  const userRole = user?.publicMetadata.role as string;

  const handleExport = () => {
    // Implement export functionality
    console.log('Exporting data...');
  };

  const handleFilterChange = (category: string) => {
    setSelectedCategory(category);
    // Implement filter logic
  };

  const handleTimeRangeChange = (range: string) => {
    setSelectedTimeRange(range);
    // Implement time range filter logic
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 bg-black">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white">Welcome {user?.firstName}!</h1>
              <p className="text-sm text-gray-200">Here's what's happening with your stores today.</p>
            </div>
            {/* <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-400" />
                <select 
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedCategory}
                  onChange={(e) => handleFilterChange(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Clothing">Clothing</option>
                  <option value="Home Goods">Home Goods</option>
                </select>
                <select
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  value={selectedTimeRange}
                  onChange={(e) => handleTimeRangeChange(e.target.value)}
                >
                  <option value="day">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              {(userRole === 'admin' || userRole === 'analyst') && (
                <button
                  onClick={handleExport}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Export Report
                </button>
              )}
            </div> */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <KPICard 
            title="Total Sales"
            value="$184,000"
            icon={<BarChart3 className="h-6 w-6 text-indigo-600" />}
            trend="+12.5%"
            isLoading={false}
          />
          <KPICard 
            title="Foot Traffic"
            value="2,950"
            icon={<Users className="h-6 w-6 text-green-600" />}
            trend="+5.2%"
            isLoading={false}
          />
          <KPICard 
            title="Store Locations"
            value="3"
            icon={<MapPin className="h-6 w-6 text-blue-600" />}
            trend="Active"
            isLoading={false}
          />
          <KPICard 
            title="Forecast Accuracy"
            value="85%"
            icon={<TrendingUp className="h-6 w-6 text-purple-600" />}
            trend="+2.1%"
            isLoading={false}
          />
        </div>

        {/* Predictions Table */}
        <div className="bg-white/90 shadow rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Sales Predictions</h2>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => {/* Implement refresh */}}
                className="text-gray-400 hover:text-gray-500"
              >
                <TrendingUp className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Forecast</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Confidence</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockPredictions.map((prediction, index) => (
                  <tr key={index} className="hover:bg-gray-50 cursor-pointer transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{prediction.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${prediction.forecast.toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{(prediction.confidence * 100).toFixed(1)}%</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        prediction.trend === 'up' ? 'bg-green-100 text-green-800' :
                        prediction.trend === 'down' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {prediction.trend}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

interface KPICardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  trend: string;
  isLoading: boolean;
}

const KPICard: React.FC<KPICardProps> = ({ title, value, icon, trend, isLoading }) => (
  <div className="bg-white/90 hover:bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
    <div className="p-5">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="ml-5 w-0 flex-1">
          <dl>
            <dt className="text-sm font-medium text-gray-500 truncate">{title}</dt>
            <dd className="flex items-baseline">
              {isLoading ? (
                <div className="h-6 w-24 bg-gray-200 animate-pulse rounded"></div>
              ) : (
                <>
                  <div className="text-2xl font-semibold text-gray-900">{value}</div>
                  <div className="ml-2 flex items-baseline text-sm font-semibold text-green-600">
                    {trend}
                  </div>
                </>
              )}
            </dd>
          </dl>
        </div>
      </div>
    </div>
  </div>
);

export default Dashboard;