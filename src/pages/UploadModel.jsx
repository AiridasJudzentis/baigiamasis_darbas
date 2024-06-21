import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setModelData((prevData) => ({ ...prevData, categories: value }));
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
    <div className="upload-form-container">
      <Header />
      {successMessage && <div className="success-banner">{successMessage}</div>}
      <h2>Upload Model</h2>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Name of model", name: "title", type: "text" },
          { label: "Price", name: "price", type: "number" },
          { label: "Description", name: "description", type: "textarea" },
          {
            label: "URL of featured image",
            name: "featuredImage",
            type: "text",
          },
          { label: "Triangles", name: "triangles", type: "number" },
          { label: "Vertices", name: "vertices", type: "number" },
        ].map((field) => (
          <div className="form-group" key={field.name}>
            <label htmlFor={field.name}>{field.label}:</label>
            {field.type === "textarea" ? (
              <textarea
                id={field.name}
                name={field.name}
                value={modelData[field.name]}
                onChange={handleInputChange}
                required
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={modelData[field.name]}
                onChange={handleInputChange}
                required
              />
            )}
          </div>
        ))}

        <div className="form-group">
          <label>URLs of other model images:</label>
          {modelData.otherImages.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleOtherImagesChange(index, e.target.value)}
              required
            />
          ))}
          <button type="button" onClick={addImageField}>
            Add another image
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="categories">Categories:</label>
          <select
            id="categories"
            multiple
            value={modelData.categories}
            onChange={handleCategoryChange}
          >
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
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
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

        <div className="form-group">
          <button type="submit">Upload Model</button>
        </div>
      </form>
    </div>
  );
};

export default UploadModel;
