import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Sample data
const categoryData = [
  { name: 'Electronics', value: 10054 },
  { name: 'Beauty', value: 10002 },
  { name: 'Groceries', value: 9994 },
  { name: 'Apparel', value: 9983 },
  { name: 'Home & Kitchen', value: 9967 },
];

// Colors for the pie chart segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'];

const salesData = [
  { month: 'Jan', sales: 4000, traffic: 2400 },
  { month: 'Feb', sales: 3000, traffic: 1398 },
  { month: 'Mar', sales: 2000, traffic: 9800 },
  { month: 'Apr', sales: 2780, traffic: 3908 },
  { month: 'May', sales: 1890, traffic: 4800 },
  { month: 'Jun', sales: 2390, traffic: 3800 },
];

const Analytics: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-100 mb-8 motion-preset-expand">Analytics</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Sales Trend */}
        <div className="bg-black p-6 rounded-lg shadow border ">
          <h2 className="text-xl font-bold mb-4">Sales Trend</h2>
          <div className="h-80  motion-blur-in motion-delay-70000">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={salesData} >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="traffic" stroke="#82ca9d" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
    <div className="bg-black p-6 rounded-lg shadow border">
      <h2 className="text-xl font-bold mb-4">Category Distribution</h2>
      <div className="h-80 motion-blur-in motion-delay-70000">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={80 }
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>

        {/* Monthly Performance */}
        <div className="bg-black p-6 rounded-lg shadow lg:col-span-2 border">
          <h2 className="text-lg font-semibold mb-4">Monthly Performance</h2>
          <div className="h-80 motion-blur-in motion-delay-70000">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="traffic" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;