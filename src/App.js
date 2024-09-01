import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import LoginPage from "./pages/Login.tsx";
import FamilyTreeMain from "./pages/FamilyTree.tsx"; // Uncomment when this page is ready
import HomePage from "./pages/HomPage.jsx";

function App() {
  const [token, setToken] = useState("");
  console.log(token);

  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route path="/" element={<HomePage />} />
          <Route
            path="/auth"
            element={<LoginPage token={token} setToken={setToken} />}
          />
          {/* Route for the family tree page */}
          <Route path="/tree" element={<FamilyTreeMain token={token} />} />
          {/* Add more routes as needed */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
