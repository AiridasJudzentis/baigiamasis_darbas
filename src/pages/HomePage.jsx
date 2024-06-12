import { useState } from "react";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Filter from "../components/Filter";
import ModelsGrid from "../components/ModelsGrid";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";

const HomePage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <Header />
      <Navigation />
      <Tabs
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
      <Filter />
      <ModelsGrid selectedCategory={selectedCategory} />
      <Footer />
    </div>
  );
};

export default HomePage;
