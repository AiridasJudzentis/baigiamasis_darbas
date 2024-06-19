import React from "react";
import PropTypes from "prop-types";

const ModelDetails = ({ description, technical_info, categories }) => {
  return (
    <div className="model-details">
      <h3>Description</h3>
      <p>{description}</p>
      <h3>Technical Info</h3>
      <p>Triangles: {technical_info.triangles}</p>
      <p>Vertices: {technical_info.vertices}</p>
      <h3>Categories</h3>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category}</li>
        ))}
      </ul>
    </div>
  );
};

ModelDetails.propTypes = {
  description: PropTypes.string.isRequired,
  technical_info: PropTypes.shape({
    triangles: PropTypes.number.isRequired,
    vertices: PropTypes.number.isRequired,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ModelDetails;
