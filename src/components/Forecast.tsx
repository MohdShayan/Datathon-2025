
// import React, { useState } from "react";
// import axios from "axios";
// import { Line } from "react-chartjs-2";
// import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// const Forecast = () => {
//   const [forecast, setForecast] = useState({ dates: [], forecast: [] });
//   const [days, setDays] = useState(30); // Default forecast days

//   const fetchForecast = () => {
//     axios.get(`http://127.0.0.1:5000/forecast?days=${days}`)
//       .then(response => {
//         setForecast(response.data);
//       })
//       .catch(error => {
//         console.error("Error fetching forecast:", error);
//       });
//   };

//   const chartData = {
//     labels: forecast.dates,
//     datasets: [
//       {
//         label: "Predicted Sales",
//         data: forecast.forecast,
//         borderColor: "rgba(75, 192, 192, 1)",
//         backgroundColor: "rgba(75, 192, 192, 0.2)",
//         tension: 0.3,
//       },
//     ],
//   };

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: { position: "top" },
//       title: { display: true, text: `Sales Forecast (Next ${days} Days)` },
//     },
//   };

//   return (
//     <div>
//       <h2>Sales Forecast</h2>
//       <div>
//         <label>Enter Forecast Days: </label>
//         <input 
//           type="number" 
//           value={days} 
//           onChange={(e) => setDays(e.target.value)} 
//           min="1" 
//           max="365"
//         />
//         <button onClick={fetchForecast}>Get Forecast</button>
//       </div>
//       <div style={{ width: "80%", margin: "auto" }}>
//         <Line data={chartData} options={chartOptions} />
//       </div>
//     </div>
//   );
// };

// export default Forecast;

import React, { useState } from "react";
import axios from "axios";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


interface ForecastData {
  dates: string[];
  forecast: number[];
}

const Forecast: React.FC = () => {
  const [forecast, setForecast] = useState<ForecastData>({ dates: [], forecast: [] });
  const [days, setDays] = useState<number>(30); // Default forecast days
  const [file, setFile] = useState<File | null>(null);
  const [uploadMessage, setUploadMessage] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] ?? null);
  };

  const uploadFile = async () => {
    if (!file) {
      alert("Please select a file first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData);
      setUploadMessage(response.data.message);
    } catch (error) {
      console.error("Error uploading file:", error);
      setUploadMessage("File upload failed!");
    }
  };

  const fetchForecast = async () => {
    try {
      const response = await axios.get<ForecastData>(`http://127.0.0.1:5000/forecast?days=${days}`);
      setForecast(response.data);
    } catch (error) {
      console.error("Error fetching forecast:", error);
    }
  };

  const chartData = {
    labels: forecast.dates,
    datasets: [
      {
        label: "Predicted Sales",
        data: forecast.forecast,
        borderColor: "rgba(79, 70, 229, 1)", 
        backgroundColor: "rgba(79, 70, 229, 0.2)", 
        tension: 0.3,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" as const },
      title: { display: true, text: `Sales Forecast (Next ${days} Days)` },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Date",
        },
      },
      y: {
        title: {
          display: true,
          text: "Sales",
        },
      },
    },
  };
  
  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Sales Forecast</h2>

      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Upload Dataset</h3>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            className="border border-gray-300 rounded-md p-2 flex-1"
          />
          <button
            onClick={uploadFile}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Upload
          </button>
        </div>
        {uploadMessage && <p className="mt-4 text-sm text-gray-600">{uploadMessage}</p>}
      </div>

      
      <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Generate Forecast</h3>
        <div className="flex items-center gap-4">
          <label className="text-gray-700">Enter Forecast Days:</label>
          <input
            type="number"
            value={days}
            onChange={(e) => setDays(parseInt(e.target.value, 10)|| 0)}
            min="1"
            max="365"
            className="border border-gray-300 rounded-md p-2 w-24"
          />
          <button
            onClick={fetchForecast}
            className="bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
          >
            Get Forecast
          </button>
        </div>
      </div>

      
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Forecast Chart</h3>
        <div className="w-full h-96">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default Forecast;
