import React from "react";
import PropTypes from "prop-types";
import ModelCard from "./ModelCard";

const ModelsGrid = ({ models }) => {
  return (
    <div className="container">
      <div className="models-grid">
        {models.map((model) => (
          <ModelCard key={model._id} model={model} />
        ))}
      </div>
    </div>
  );
};

ModelsGrid.propTypes = {
  models: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      images: PropTypes.shape({
        featured: PropTypes.string,
      }).isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default ModelsGrid;
