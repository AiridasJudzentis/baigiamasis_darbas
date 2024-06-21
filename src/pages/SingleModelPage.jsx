import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
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
        const response = await axios.get(`http://localhost:3000/models/${id}`);
        setModel(response.data);
      } catch (error) {
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
      <h1>{model.title}</h1>
      <ImageGallery images={model.images} title={model.title} />
      <div className="model-info">
        <ModelInfo price={model.price} license={model.license} />
        {model.author ? (
          <UserInfo author={model.author} />
        ) : (
          <div>Loading author information...</div>
        )}
      </div>
      {model.technical_info ? (
        <ModelDetails
          description={model.description}
          technical_info={model.technical_info}
          categories={model.categories}
        />
      ) : (
        <div>Loading model details...</div>
      )}
      <Footer />
    </div>
  );
};

export default SingleModelPage;
