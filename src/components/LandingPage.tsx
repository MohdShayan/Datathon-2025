import React from 'react';
import { SignInButton } from '@clerk/clerk-react';
import { BarChart3, Users, MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import logo from "../../image.png"
const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-70 to-white">
      {/* Navigation */}
      <nav className="bg-neutral-900 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center motion-preset-blur-right-lg">
              <img src={logo} alt="" className='w-12 h-12' />
              <span className="ml-3 mb-2 text-2xl font-bold text-gray-100">SupaRetail</span>
            </div>
            <SignInButton mode="modal">
              <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-700 hover:bg-blue-800 motion-preset-blur-left-lg">
                Sign In
              </button>
            </SignInButton>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-24 bg-neutral-900">
        <div className="text-center">
          <h1 className="text-4xl tracking-tight font-extrabold text-gray-200 sm:text-5xl md:text-6xl ">
            <span className="block motion-preset-pop">Transform Your Retail Business</span>
            <span className="block motion-preset-pop motion-delay-300 text-blue-700">With Advanced Analytics</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl motion-preset-slide-right-sm">
            Make data-driven decisions with our comprehensive retail analytics platform. Monitor sales, predict trends, and optimize your store locations.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <SignInButton mode="modal">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-lg font-semibold rounded-md text-white bg-blue-700 hover:bg-blue-800 motion-preset-expand motion-duration-500">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </SignInButton>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-neutral-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3  motion-preset-slide-up-lg motion-delay-700">
            <Feature
            
              icon={<TrendingUp className="h-8 w-8 text-blue-700 " />}
              title="Sales Analytics"
              description="Track performance metrics and identify growth opportunities with real-time sales data."
            />
            <Feature
              icon={<Users className="h-8 w-8 text-blue-700" />}
              title="Customer Insights"
              description="Understand your customers better with detailed demographic and behavioral analysis."
            />
            <Feature
              icon={<MapPin className="h-8 w-8 text-blue-700" />}
              title="Location Intelligence"
              description="Optimize store locations and analyze foot traffic patterns for better performance."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-500">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-black">Start your free trial today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <SignInButton mode="modal">
              <button className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-70">
                Sign Up Now
              </button>
            </SignInButton>
          </div>
        </div>
      </div>
    </div>
  );
};

interface FeatureProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const Feature: React.FC<FeatureProps> = ({ icon, title, description }) => (
  <div className="p-6 border border-gray-100 rounded-lg hover:shadow-lg transition-shadow">
    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-full bg-blue-70">
      {icon}
    </div>
    <h3 className="text-lg font-semibold text-gray-200 mb-2">{title}</h3>
    <p className="text-gray-300">{description}</p>
  </div>
);

export default LandingPage;