import React, { useState } from "react";
import PropTypes from "prop-types";

const ImageGallery = ({ images, title }) => {
  const [mainImage, setMainImage] = useState(images.featured);

  return (
    <div className="image-gallery">
      <img src={mainImage} alt={title} className="main-image" />
      <div className="thumbnail-images">
        {images.additional.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} thumbnail ${index}`}
            className="thumbnail-image"
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>
    </div>
  );
};

ImageGallery.propTypes = {
  images: PropTypes.shape({
    featured: PropTypes.string.isRequired,
    additional: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
  title: PropTypes.string.isRequired,
};

export default ImageGallery;
