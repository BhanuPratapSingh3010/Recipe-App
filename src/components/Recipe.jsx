import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../App.css';

const Recipe = () => {
  const { id } = useParams(); // Grab the recipe ID from the URL
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        let res = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`);
        let data = await res.json();
        setRecipe(data.meals[0]); // Set the recipe data
      } catch (error) {
        console.error("Error fetching recipe details:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  return (
    <div className='recipePage'>
      {recipe ? (
        <div className='recipeContainer'>
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipeImage" />
          <div className='recipeDetails'>
            <h2>{recipe.strMeal}</h2>
            <h3>Instructions:</h3>
            <p>{recipe.strInstructions}</p>
          </div>
        </div>
      ) : (
        <p>Loading recipe...</p>
      )}
    </div>
  );
};

export default Recipe;
