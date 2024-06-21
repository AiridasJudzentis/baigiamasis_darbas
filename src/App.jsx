import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UploadModel from "./pages/UploadModel";
import SingleModelPage from "./pages/SingleModelPage";
import SignInForm from "./components/SignInForm";
import SignUpForm from "./components/SignUpForm";
import Header from "./components/Header";
import "./App.css";

const App = () => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <React.StrictMode>
      <Router>
        <Header user={user} logout={logout} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadModel user={user} />} />
          <Route path="/models/:id" element={<SingleModelPage />} />
          <Route path="/signin" element={<SignInForm login={login} />} />
          <Route path="/signup" element={<SignUpForm login={login} />} />
        </Routes>
      </Router>
    </React.StrictMode>
  );
};

export default App;
