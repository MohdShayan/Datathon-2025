import React, { useEffect, useState } from "react";
import { supabase } from "../supabaseClient"; // Import Supabase client

const TestingSupa = () => {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch data
  const fetchData = async () => {
    const { data, error } = await supabase.from("your_table_name").select("*");
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      setData(data);
    }
  };

  // Function to add a new entry
  const addData = async () => {
    if (!name) return;
    setLoading(true);
    
    const { data, error } = await supabase.from("your_table_name").insert([{ name }]);

    setLoading(false);
    if (error) {
      console.error("Error inserting data:", error);
    } else {
      setName(""); // Reset input
      fetchData(); // Refresh data
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h2>Supabase Data</h2>
      
      {/* Input field to add data */}
      <input 
        type="text" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        placeholder="Enter name" 
      />
      <button onClick={addData} disabled={loading}>
        {loading ? "Adding..." : "Add Data"}
      </button>

      {/* Display data */}
      <ul>
        {data.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TestingSupa;
