import Header from "../components/Header";
import Navigation from "../components/Navigation";
import Filter from "../components/Filter";
import ModelsGrid from "../components/ModelsGrid";
import Tabs from "../components/Tabs";
import Footer from "../components/Footer";

const HomePage = () => {
  return (
    <div>
      <Header />
      <Navigation />
      <Tabs />
      <Filter />
      <ModelsGrid />
      <Footer />
    </div>
  );
};

export default HomePage;
