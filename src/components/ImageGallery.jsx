import PropTypes from "prop-types";

const ImageGallery = ({ images, title }) => {
  return (
    <div className="image-gallery">
      <img src={images.featured} alt={title} className="main-image" />
      <div className="thumbnail-images">
        {images.additional.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${title} ${index}`}
            className="thumbnail-image"
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
