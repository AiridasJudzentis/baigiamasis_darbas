import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const SingleModelPage = () => {
  const { id } = useParams();
  const [model, setModel] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModel = async () => {
      try {
        console.log(`Fetching model with ID: ${id}`);
        const response = await axios.get(`http://localhost:3000/models/${id}`);
        console.log("Model data:", response.data);
        setModel(response.data);
      } catch (error) {
        console.error("Error fetching model:", error);
        setError(error);
      }
    };

    fetchModel();
  }, [id]);

  if (error) {
    return <div>Error fetching model: {error.message}</div>;
  }

  if (!model) {
    return <div>Loading...</div>;
  }

  const calculateJoinDate = (date) => {
    const joinDate = new Date(date);
    const now = new Date();
    const diffTime = Math.abs(now - joinDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays < 30) {
      return `Joined ${diffDays} days ago`;
    } else if (diffDays < 365) {
      return `Joined ${Math.floor(diffDays / 30)} months ago`;
    } else {
      return `Joined ${Math.floor(diffDays / 365)} years ago`;
    }
  };

  return (
    <div className="single-model-page">
      <h1>{model.title}</h1>
      <div className="image-gallery">
        <img
          src={model.images.featured}
          alt={model.title}
          className="main-image"
        />
        <div className="thumbnail-images">
          {model.images.additional.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`${model.title} ${index}`}
              className="thumbnail-image"
            />
          ))}
        </div>
      </div>
      <div className="model-info">
        <div className="price-info">
          <h2>${model.price.toFixed(2)}</h2>
          <p>{model.license}</p>
          <button>Add to cart</button>
        </div>
        <div className="user-info">
          <h3>{model.author.username}</h3>
          <p>Posted {model.author.uploaded_models.length} models</p>
          <p>{calculateJoinDate(model.author.date_joined)}</p>
          <button>Hire</button>
        </div>
      </div>
      <div className="model-details">
        <h3>Description</h3>
        <p>{model.description}</p>
        <h3>Technical Info</h3>
        <p>Triangles: {model.technical_info.triangles}</p>
        <p>Vertices: {model.technical_info.vertices}</p>
        <h3>File Formats</h3>
        <p>{model.file_formats.join(", ")}</p>
        <h3>Categories</h3>
        <p>{model.categories.join(", ")}</p>
      </div>
    </div>
  );
};

export default SingleModelPage;
