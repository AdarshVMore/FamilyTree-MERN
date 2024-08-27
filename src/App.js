import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login.tsx";
import FamilyTreeMain from "./pages/FamilyTree.tsx"; // Uncomment when this page is ready
import HomePage from "./pages/HomPage.jsx";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<LoginPage />} />
          {/* Route for the family tree page */}
          <Route path="/tree" element={<FamilyTreeMain />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
