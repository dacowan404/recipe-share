import React from "react";
import { Link }  from 'react-router-dom';

function RecipeCard(props) {
  let description = '';
  if (props.recipe.description.length > 100) {
    description = props.recipe.description.substring(0, 100) + "...";
  } else {
    description = props.recipe.description;
  }
  return (
  <Link to={`/recipe/${props.recipe._id}`} className="recipeCard">
    <div className="RCtitle">{props.recipe.name}</div>
    <div>{description}</div>
    <div></div>
    <div> Likes: {props.recipe.likes}</div>
  </Link>
)}

export default RecipeCard;