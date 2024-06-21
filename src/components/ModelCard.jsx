import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ModelCard = ({ model }) => {
  return (
    <div className="model-card">
      <Link to={`/models/${model._id}`}>
        <img
          src={model.images.featured || "default-image-url.jpg"}
          alt={model.title}
        />
      </Link>
      <div className="modelinfo">
        <h3>{model.title}</h3>
        <p>${model.price}</p>
      </div>
    </div>
  );
};

ModelCard.propTypes = {
  model: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    images: PropTypes.shape({
      featured: PropTypes.string,
    }).isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ModelCard;
