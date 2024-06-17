import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ModelInfo from "../components/ModelInfo";
import UserInfo from "../components/UserInfo";
import ModelDetails from "../components/ModelDetails";

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

  return (
    <div className="single-model-page">
      <Header />
      <Navigation />
      <h1>{model.title}</h1>
      <ImageGallery images={model.images} title={model.title} />
      <div className="model-info">
        <ModelInfo price={model.price} license={model.license} />
        <UserInfo author={model.author} />
      </div>
      <ModelDetails
        description={model.description}
        technical_info={model.technical_info}
        file_formats={model.file_formats}
        categories={model.categories}
      />
      <Footer />
    </div>
  );
};

export default SingleModelPage;
