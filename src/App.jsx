// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import FreshVision from "./components/FreshVision";
import HowItWorks from "./components/HowItWorks";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/app" element={<FreshVision />} />
      </Routes>
    </Router>
  );
}

export default App;
