import React, { useState } from "react";
import { NumberTicker } from "./ui/number-ticker";
import { useNavigate } from "react-router-dom";
import axios from "axios";
interface ProfitScoreProps {
  initialScore?: number;
}

const ProfitScoreComponent: React.FC<ProfitScoreProps> = ({
  initialScore = 85,
}) => {
  const navigate = useNavigate();
  // Sample score (you can replace it with actual dynamic logic)
  const [score, setScore] = useState<number>(initialScore); // Score can be any value between 0 and 100

  const getScoreLabel = (score: number): string => {
    if (score >= 10) {
      return "Market Customer";
    } else if (score < 10) {
      return "Market Customer";
    } else {
      return "LOW CHANCE of Profit";
    }
  };

  //get request to get the form data
  const [error, setError] = useState<string | null>(null);
  const modelData=
    {'Apparel': 23.97, 'Beauty': 19.62, 'Electronics': 17.380000000000003, 'Groceries': 20.16, 'Home & Kitchen': 18.87}
  
  const getFormData = async () => {
    try {
      const response = await axios.get("http://localhost:3000/form1");
      const data = response.data;
      setScore(data.score);
      setError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error fetching form data:", error);
      setError("Failed to fetch data. Please try again later.");
    }
  };
  
  // Display error message in the component
  {error && <p style={{ color: "red" }}>{error}</p>}


  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="bg-white/90 hover:bg-white motion-preset-expand rounded-lg shadow-lg w-80 px-12 text-center relative flex flex-col justify-center items-center gap-2">
        <em>
          <h2 className="text-md font-semibold  py-4">
            Check Your Profit score On selected Category and size of your
            business
          </h2>
        </em>
        <div className=" flex flex-col justify-center items-center">

        <h2 className="text-2xl font-extrabold text-gray-800">
          Profit Score
        </h2>
        <div className="flex justify-center items-baseline">
          <div className="text-5xl font-bold text-blue-700">
                      <NumberTicker
      value={score}
      decimalPlaces={2}
      className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-black dark:text-white"
    />
          </div>
          <div className="text-xl ml-2 text-gray-800">%</div>
        </div>
        </div>
        <div
          className={`text-lg font-semibold pb-14 ${
            score >= 10
              ? "text-green-600"
              : score < 10
              ? "text-yellow-500"
              : "text-red-600"
          }`}
        >
          {getScoreLabel(score)}
        </div>
        <div
          className="goto text-xs absolute bottom-3 left-0 right-0 cursor-pointer"
          onClick={() => navigate("/locationbased")}
        >
          Check for your preferred location ⟶
        </div>
      </div>
    </div>
  );
};

export default ProfitScoreComponent;
