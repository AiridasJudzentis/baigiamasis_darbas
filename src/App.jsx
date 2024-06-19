import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadModel from "./pages/UploadModel";
import SingleModelPage from "./pages/SingleModelPage";
import "./App.css";

const App = () => {
  console.log("Rendering App component");

  return (
    <React.StrictMode>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadModel />} />
          <Route path="/models/:id" element={<SingleModelPage />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
