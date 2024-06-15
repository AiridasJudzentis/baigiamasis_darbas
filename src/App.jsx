import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import SingleModelPage from "./pages/SingleModelPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/models/:id" element={<SingleModelPage />} />
      </Routes>
    </Router>
  );
};

export default App;
