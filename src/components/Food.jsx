import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css'; 

const Food = () => {
  const [foodData, setFoodData] = useState([]);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Fetch some random meals on component load
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`); // Fetch initial chicken meals
        let data = await res.json();
        setFoodData(data.meals); // Set initial food data
      } catch (error) {
        console.error("Error fetching initial recipe data:", error);
      }
    };
    fetchInitialData();
  }, []);

  const handleInput = (event) => {
    setSearch(event.target.value); // Update search state with input value
  };

  const recipeData = async (event) => {
    event.preventDefault(); // Prevent form from reloading the page
    try {
      let res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`);
      let data = await res.json();
      setFoodData(data.meals); // Set food data from API response
    } catch (error) {
      console.error("Error fetching recipe data:", error);
    }
  };

  const handleViewRecipe = (recipe) => {
    // Use navigate to programmatically navigate to the recipe details page
    navigate(`/recipe/${recipe.idMeal}`);
  };

  return (
    <div className='mainDiv'>
      <h1>FoodFusion</h1>
      <form onSubmit={recipeData}>
        <input
          type="search"
          placeholder="Search food items here..."
          className="inputTag"
          onChange={handleInput}
        />
        <button className="searchButton" type="submit">Search</button>
      </form>
      <div className='innerDiv'>
        {foodData && foodData.map((item, index) => (
          <div key={index} className='foodDiv'>
            <img src={item.strMealThumb} alt={item.strMeal} />
            <h3>{item.strMeal}</h3>
            <button onClick={() => handleViewRecipe(item)} className="viewRecipeButton">
              View Recipe
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Food;
