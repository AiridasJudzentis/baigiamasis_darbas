import { useParams } from "react-router-dom";
import Footer from "../components/Footer";
import ImageGallery from "../components/ImageGallery";
import ModelInfo from "../components/ModelInfo";
import UserInfo from "../components/UserInfo";
import ModelDetails from "../components/ModelDetails";
import useModelData from "../hooks/useModelData";

const SingleModelPage = () => {
  const { id } = useParams();
  const { model, error } = useModelData(id);

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
