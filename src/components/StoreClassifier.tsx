import { useState } from "react";
import axios from "axios";

const StoreClassifier = () => {
  const [inputs, setInputs] = useState({
    gender: "Male",
    age: "",
    income: "",
    total_bill: "",
    distance_to_store: "",
    average_monthly_sales: "",
  });
  const [prediction, setPrediction] = useState<string | null>(null);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handlePredict = async () => {
    try {
      const response = await axios.post("http://localhost:5000/predict", inputs);
      setPrediction(response.data.prediction[0]);
    } catch (error) {
      console.error("Error predicting:", error);
    }
  };

  return (
    <div className="p-8 bg-black text-white min-h-screen">
      <h2 className="text-2xl font-bold text-gray-100 mb-6 motion-preset-expand">
        Store Category Prediction
      </h2>

      {/* Input Form */}
      <div className="mb-8 p-6 border rounded-lg shadow-md text-black motion-preset-slide-up-md">
        <h3 className="text-lg font-semibold text-gray-300 mb-4">
          Enter Store Details
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Gender
            </label>
            <select
              name="gender"
              value={inputs.gender}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Age
            </label>
            <input
              type="number"
              name="age"
              value={inputs.age}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Income */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Income
            </label>
            <input
              type="number"
              name="income"
              value={inputs.income}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Total Bill */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Total Bill
            </label>
            <input
              type="number"
              name="total_bill"
              value={inputs.total_bill}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Distance to Store */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Distance to Store
            </label>
            <input
              type="number"
              name="distance_to_store"
              value={inputs.distance_to_store}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Average Monthly Sales */}
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Average Monthly Sales
            </label>
            <input
              type="number"
              name="average_monthly_sales"
              value={inputs.average_monthly_sales}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        </div>

        {/* Predict Button */}
        <div className="mt-6">
          <button
            onClick={handlePredict}
            className="bg-blue-700 text-white py-2 px-4 rounded-md hover:bg-blue-800 transition-colors"
          >
            Predict
          </button>
        </div>
      </div>

      {/* Prediction Result */}
      {prediction !== null && (
        <div className="p-6 bg-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Prediction Result
          </h3>
          <p className="text-gray-700">
            The predicted store category is:{" "}
            <span className="font-bold text-indigo-600">{prediction}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default StoreClassifier;