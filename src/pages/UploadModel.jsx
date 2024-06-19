import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import FormField from "../components/FormField";
import useFetchUsers from "../hooks/useFetchUsers";

const UploadModel = () => {
  const categories = [
    "All",
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
  ];

  const licenses = [
    "Games",
    "Digital Media",
    "News",
    "Corporate use",
    "Education",
    "Product design",
    "Physical creations",
    "3D printing",
  ];

  const [modelData, setModelData] = useState({
    title: "",
    price: "",
    description: "",
    featuredImage: "",
    otherImages: [""],
    triangles: "",
    vertices: "",
    categories: [],
    authorId: "",
    license: "",
  });
  const { users, error: userFetchError } = useFetchUsers();
  const [successMessage, setSuccessMessage] = useState("");

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
      title: modelData.title,
      price: modelData.price,
      description: modelData.description,
      images: {
        featured: modelData.featuredImage,
        additional: modelData.otherImages,
      },
      technical_info: {
        triangles: modelData.triangles,
        vertices: modelData.vertices,
      },
      categories: modelData.categories,
      author: modelData.authorId,
      license: modelData.license,
    };

    console.log("Model data being sent:", model);

    try {
      await axios.post("http://localhost:3000/models", model);
      setSuccessMessage("Model uploaded successfully!");
      setTimeout(() => {
        setSuccessMessage("");
        window.location.href = "/";
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
          <FormField
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={modelData[field.name]}
            onChange={handleInputChange}
          />
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
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <FormField
          label="Author"
          name="authorId"
          type="select"
          value={modelData.authorId}
          onChange={handleInputChange}
          options={users.map((user) => ({
            value: user._id,
            label: user.username,
          }))}
        />

        <FormField
          label="License"
          name="license"
          type="select"
          value={modelData.license}
          onChange={handleInputChange}
          options={licenses.map((licenseOption) => ({
            value: licenseOption,
            label: licenseOption,
          }))}
        />

        <div className="form-group">
          <button type="submit">Upload Model</button>
        </div>
      </form>
      {userFetchError && <p>Error fetching users: {userFetchError.message}</p>}
    </div>
  );
};

export default UploadModel;
