import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';

 function ViewRecipe() {
  const { userID } = useContext(UserContext);
  const [ id, setID] = useState(window.location.href.split('/')[4])
  const [ name, setName] = useState('')
  const [ ingredients, setIngredients] = useState([])
  const [ steps, setSteps] = useState([])
  const [ description, setDescription] = useState('')
  const [ notes, setNotes] = useState('')
  const [ creator, setCreator ] = useState('')

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
  }, [])

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/recipe/${id}`, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
      .then(res => {
        if (res.status === 200) {
          window.location.href = '/myRecipes';
        }
      })
  }

  return (
    <div>
      <div> {name}</div>
      <div> Made by {creator} </div>
      <div> {description}</div>
      <ul> Ingredients:
        {ingredients.map((ingredient) => (
          <li>{ingredient}</li>
        ))}
      </ul>
      <ul> Steps:
        {steps.map((step) => (
          <li>{step}</li>
        ))}
      </ul>
      <div>{notes}</div>
      {userID === creator ? <div><button onClick={handleDelete}>Delete Recipe</button>
      <Link to={`/edit/${id}`}>Edit Recipe</Link></div> : <div>not user</div>}

    </div>
  )
}

export default ViewRecipe;