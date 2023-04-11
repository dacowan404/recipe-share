import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import RecipeCard from './recipe-card-component';
import { UserContext } from '../App';

function RecipeList() {
  const { BACKEND_ADDRESS } = useContext(UserContext);
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    axios.get(BACKEND_ADDRESS + '/explore')
    .then(response => {setRecipes(response.data)})
    .catch((err) => {console.log(err);})
  }, [])

  return (
    <div className='recipeList'>
      <div id='exploreTitle'>Explore New Recipes</div>
      <ul className='recipeCardContainer'>
        {recipes.map((recipe) => {
          return <RecipeCard recipe={recipe} key={recipe._id} />
        })
        }
      </ul>
    </div>
  )
}

export default RecipeList;