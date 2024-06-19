import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const ModelsGrid = ({ models }) => {
  return (
    <div className="models-grid">
      {models.map((model) => (
        <div key={model._id} className="model-card">
          <Link to={`/models/${model._id}`}>
            <img
              src={model.images.featured || "default-image-url.jpg"}
              alt={model.title}
            />
            <h3>{model.title}</h3>
          </Link>
        </div>
      ))}
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
    })
  ).isRequired,
};

export default ModelsGrid;
