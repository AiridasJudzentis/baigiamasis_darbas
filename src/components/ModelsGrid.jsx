import { useState, useEffect } from "react";
import axios from "axios";

const ModelsGrid = () => {
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/models");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
      }
    };

    fetchModels();
  }, []);

  return (
    <section>
      <h2>Models</h2>
      <div className="models-grid">
        {models.map((model) => (
          <div key={model._id} className="model-card">
            <img src={model.images.featured} alt={model.title} />
            <h3>{model.title}</h3>
            <p>{model.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ModelsGrid;
