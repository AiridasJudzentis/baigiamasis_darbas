import { useState, useEffect } from "react";
import axios from "axios";

const useModelData = (id) => {
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        console.log(`Fetching model with ID: ${id}`);
        const response = await axios.get(`http://localhost:3000/models/${id}`);
        console.log("Model data:", response.data);
        setModel(response.data);
      } catch (error) {
        console.error("Error fetching model:", error);
        setError(error);
      }
    };

    fetchModel();
  }, [id]);

  return { model, error };
};

export default useModelData;
