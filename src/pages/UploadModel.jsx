import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";

const UploadModel = ({ user }) => {
  const [modelData, setModelData] = useState({
    title: "",
    price: "",
    description: "",
    featuredImage: "",
    otherImages: [""],
    triangles: "",
    vertices: "",
    categories: [],
    license: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/signin");
    }
  }, [user, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setModelData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCategoryChange = (e) => {
    const { value, checked } = e.target;
    setModelData((prevData) => ({
      ...prevData,
      categories: checked
        ? [...prevData.categories, value]
        : prevData.categories.filter((category) => category !== value),
    }));
  };

  const handleOtherImagesChange = (index, value) => {
    const updatedImages = [...modelData.otherImages];
    updatedImages[index] = value;
    setModelData((prevData) => ({ ...prevData, otherImages: updatedImages }));
  };

  const addImageField = () => {
    setModelData((prevData) => ({
      ...prevData,
      otherImages: [...prevData.otherImages, ""],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const model = {
      ...modelData,
      images: {
        featured: modelData.featuredImage,
        additional: modelData.otherImages,
      },
      technical_info: {
        vertices: modelData.vertices,
        triangles: modelData.triangles,
      },
      author: user._id,
    };
    try {
      await axios.post("http://localhost:3000/models", model);
      setSuccessMessage("Model uploaded successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        navigate("/");
      }, 1000);
    } catch (error) {
      console.error("Error uploading model:", error);
      alert("Error uploading model");
    }
  };

  return (
    <div id="root">
      <div className="upload-form-container">
        {successMessage && (
          <div className="success-banner">{successMessage}</div>
        )}
        <h2>Upload Model</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-columns">
            <div className="form-column">
              <div className="form-group">
                <label htmlFor="title">Name of model:</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={modelData.title}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price ($):</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={modelData.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea
                  id="description"
                  name="description"
                  value={modelData.description}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Categories:</label>
                <div className="checkbox-group">
                  {[
                    "Aircraft",
                    "Animals",
                    "Architectural",
                    "Exterior",
                    "Interior",
                    "Car",
                    "Character",
                    "Food",
                    "Furniture",
                    "Household",
                    "Industrial",
                    "Plant",
                    "Space",
                    "Vehicle",
                    "Watercraft",
                    "Military",
                  ].map((category) => (
                    <div key={category} className="checkbox-item">
                      <input
                        type="checkbox"
                        id={category}
                        value={category}
                        checked={modelData.categories.includes(category)}
                        onChange={handleCategoryChange}
                      />
                      <label htmlFor={category}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="form-column">
              <div className="form-group">
                <label htmlFor="featuredImage">URL of featured image:</label>
                <input
                  type="text"
                  id="featuredImage"
                  name="featuredImage"
                  value={modelData.featuredImage}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>URLs of other model images:</label>
                {modelData.otherImages.map((image, index) => (
                  <input
                    key={index}
                    type="text"
                    value={image}
                    onChange={(e) =>
                      handleOtherImagesChange(index, e.target.value)
                    }
                    required
                  />
                ))}
                <button type="button" onClick={addImageField}>
                  Add another image
                </button>
              </div>
              <div className="form-group">
                <label htmlFor="triangles">Triangles:</label>
                <input
                  type="number"
                  id="triangles"
                  name="triangles"
                  value={modelData.triangles}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="vertices">Vertices:</label>
                <input
                  type="number"
                  id="vertices"
                  name="vertices"
                  value={modelData.vertices}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="license">License:</label>
                <select
                  id="license"
                  name="license"
                  value={modelData.license}
                  onChange={handleInputChange}
                  required
                >
                  <option value="" disabled>
                    Select License
                  </option>
                  {[
                    "Games",
                    "Digital Media",
                    "News",
                    "Corporate use",
                    "Education",
                    "Product design",
                    "Physical creations",
                    "3D printing",
                  ].map((licenseOption) => (
                    <option key={licenseOption} value={licenseOption}>
                      {licenseOption}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="form-group">
            <button type="submit">Upload Model</button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default UploadModel;
