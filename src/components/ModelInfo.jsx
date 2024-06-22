import PropTypes from "prop-types";

const ModelInfo = ({ price, license }) => {
  return (
    <div className="price-info">
      <h2>${price.toFixed(2)}</h2>
      <p>{license}</p>
      <button className="cartbtn">Add to cart</button>
    </div>
  );
};

ModelInfo.propTypes = {
  price: PropTypes.number.isRequired,
  license: PropTypes.string.isRequired,
};

export default ModelInfo;
