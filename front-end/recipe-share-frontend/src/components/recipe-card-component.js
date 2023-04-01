import React from "react";
import { Link }  from 'react-router-dom';

const RecipeCard = props => (
  <li>
    <Link to={`/recipe/${props.recipe._id}`}> {props.recipe.name} </Link>
  </li>
)

export default RecipeCard;