import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes and Route
import Food from './components/Food';  // Adjust path if needed
import Recipe from './components/Recipe';  // Adjust path if needed

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Route that displays the search page */}
        <Route path="/" element={<Food />} />

        {/* Dynamic route for each recipe */}
        <Route path="/recipe/:id" element={<Recipe />} />
      </Routes>
    </Router>
  );
}

export default App;
