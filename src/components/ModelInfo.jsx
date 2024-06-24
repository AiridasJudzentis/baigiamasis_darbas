import PropTypes from "prop-types";

const ModelInfo = ({
  price,
  license,
  user,
  modelAuthorFullName,
  handleDelete,
}) => {
  const isModelOwner = user && user.full_name === modelAuthorFullName;

  return (
    <div className="price-info">
      <h2>${price.toFixed(2)}</h2>
      <p>{license}</p>
      {isModelOwner ? (
        <button className="deletebtn" onClick={handleDelete}>
          Delete Model
        </button>
      ) : (
        <button className="cartbtn">Add to cart</button>
      )}
    </div>
  );
};

ModelInfo.propTypes = {
  price: PropTypes.number.isRequired,
  license: PropTypes.string.isRequired,
  user: PropTypes.object,
  modelAuthorFullName: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default ModelInfo;
