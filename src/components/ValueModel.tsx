import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    if (score >= 80) {
      return "HIGH CHANCE of Profit";
    } else if (score >= 50) {
      return "MODERATE CHANCE of Profit";
    } else {
      return "LOW CHANCE of Profit";
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-blue-200">
      <div className="bg-white rounded-lg shadow-lg w-80 px-12 text-center relative flex flex-col justify-center items-center gap-2">
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
          <div className="text-5xl font-bold text-blue-700">{score}</div>
          <div className="text-xl ml-2 text-gray-800">/100</div>
        </div>
        </div>
        <div
          className={`text-lg font-semibold pb-14 ${
            score >= 80
              ? "text-green-600"
              : score >= 50
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
