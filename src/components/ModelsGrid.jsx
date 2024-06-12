import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ModelsGrid = ({ selectedCategory }) => {
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/models");
        setModels(response.data);
      } catch (error) {
        console.error("Error fetching models:", error);
        setError(error);
      }
    };

    fetchModels();
  }, []);

  const filteredModels =
    selectedCategory === "All"
      ? models
      : models.filter((model) => model.categories.includes(selectedCategory));

  if (error) {
    return <div>Error fetching models: {error.message}</div>;
  }

  return (
    <section>
      <div className="models-grid">
        {filteredModels.map((model) => (
          <div key={model._id} className="model-card">
            <Link to={`/models/${model._id}`}>
              <img src={model.images.featured} alt={model.title} />
              <h3>{model.title}</h3>
              <p>${model.price.toFixed(2)}</p>
            </Link>
            <p>Categories: {model.categories.join(", ")}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

ModelsGrid.propTypes = {
  selectedCategory: PropTypes.string.isRequired,
};

export default ModelsGrid;
