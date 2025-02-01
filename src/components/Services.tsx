import React from "react";
import { useNavigate } from "react-router-dom";
import { BarChart, Gift, ShoppingCart } from "lucide-react";

const Services: React.FC = () => {
  const navigate = useNavigate();

  
  const services: { id: number; name: string; icon: JSX.Element; description: string; path: string }[] = [
    {
      id: 1,
      name: "Sales Prediction",
      icon: <BarChart className="h-5 w-5 text-indigo-600 mr-2" />,
      description: "Predict future sales trends and optimize inventory.",
      path: "/dashboard/sales-prediction",
    },
    {
      id: 2,
      name: "Personalised Offer",
      icon: <Gift className="h-5 w-5 text-indigo-600 mr-2" />,
      description: "Create tailored offers for your customers.",
      path: "/personalised-offer",
    },
    {
      id: 3,
      name: "Outlet Preference",
      icon: <ShoppingCart className="h-5 w-5 text-indigo-600 mr-2" />,
      description: "Analyze customer preferences across outlets.",
      path: "/outlet-preference",
    },
  ];


  const handleNavigate = (path: string) => {
    navigate(path);
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Our Services</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.map((service) => (
          <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                {service.icon}
                <h2 className="text-xl font-semibold text-gray-900">{service.name}</h2>
              </div>
              <p className="text-gray-600 mb-6">{service.description}</p>
              <button
                onClick={() => handleNavigate(service.path)}
                className="mt-6 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
              >
                View {service.name}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;
