import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';

 function ViewRecipe() {
  const { userID } = useContext(UserContext);
  const [ id, ] = useState(window.location.href.split('/')[4])
  const [ name, setName] = useState('')
  const [ ingredients, setIngredients] = useState([])
  const [ steps, setSteps] = useState([])
  const [ description, setDescription] = useState('')
  const [ notes, setNotes] = useState('')
  const [ creator, setCreator ] = useState('')

  let key = 0;

  useEffect(() => {
    axios.get(`http://localhost:5000/recipe/${id}`)
      .then(response => {
        setName(response.data.name);
        setIngredients(response.data.ingredients)
        setSteps(response.data.steps);
        setDescription(response.data.description);
        setNotes(response.data.notes);
        setCreator(response.data.creator)
      })
      .catch((err) => {console.log(err)})   
  }, [id])

  return (
    <div className='recipeList'>
      <div id='exploreTitle'> {name}</div>
      <div className='creator'> Made by {creator} </div>
      <p className='description'>{description}</p>
      <div className='ingreTitle'>Ingredients:</div>
      <ul className='ingredients'>
        {ingredients.map((ingredient) => {
          key = key + 1;
          return (
            <li key={key}>{ingredient}</li>
          )}
        )}
      </ul>
      <div className='stepTitle'>Steps:</div>
      <ol className='steps'>
        {steps.map((step) => {
          key = key + 1;
          return (
            <li key={key}>{step}</li>
          )}
        )}
      </ol>
      <div className='notesTitle'>Additional Notes</div>
      <div className='notes'>{notes}</div>
      {userID === creator ? 
      <div>
        <br />
        <Link to={`/edit/${id}`} className='editRecipe'>Edit Recipe</Link>
        <Link to={`/delete/${id}`} className='deleteRecipe'>Delete Recipe</Link>
      </div> : 
      <div><br />not user</div>}

    </div>
  )
}

export default ViewRecipe;
