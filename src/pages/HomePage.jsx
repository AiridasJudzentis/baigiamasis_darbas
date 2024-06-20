import { useState, useEffect } from "react";
import axios from "axios";
import ModelsGrid from "../components/ModelsGrid";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [models, setModels] = useState([]);
  const [filteredModels, setFilteredModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await axios.get("http://localhost:3000/models");
        setModels(response.data);
        setFilteredModels(response.data);
      } catch (error) {
        setError(error);
      }
    };

    fetchModels();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredModels(models);
    } else {
      setFilteredModels(
        models.filter((model) => model.categories.includes(category))
      );
    }
  };

  if (error) {
    return <div>Error fetching models: {error.message}</div>;
  }

  return (
    <div>
      <Tabs
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <ModelsGrid models={filteredModels} />
      <Footer />
    </div>
  );
};

export default HomePage;
