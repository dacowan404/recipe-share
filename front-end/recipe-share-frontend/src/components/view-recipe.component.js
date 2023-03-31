import React, { Component, useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../App';

/*
import { useParams } from 'react-router-dom';
function ViewRecipe() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState({
    name: 'default',
    ingredients: [],
    steps: [],
    description: '',
    notes: '',
    creator: '',
    count: 0
  });

  axios.get(`http://localhost:5000/recipe/${id}`)
    .then(response => {
      setRecipe({
        name: response.data.name,
        ingredients: response.data.ingredients,
        steps: response.data.steps,
        description: response.data.description,
        notes: response.data.notes,
        creator: response.data.creator,
        count: recipe.count + 1
      })
    })
    .catch((err) => {console.log(err)}) 

  return (
    <div> This one? {id} 
      <div>{recipe.name}</div>
      <div>{recipe.count}</div>
    </div>
  );
}
/*
  setTimeout(setRecipe({
      count: recipe.count+1
    }), "10000");

  return (
    <div> This one? {id} 
      <div>{recipe.name}</div>
      <div>{recipe.count}</div>
    </div>
    
  );
} */

/*class ViewRecipe extends Component {
  //static contextType = UserContext;
  constructor(props) {
    super(props);

    this.state = {
      id:  window.location.href.split('/')[4],
      name: '',
      ingredients: [],
      steps: [],
      description: '',
      notes: '',
      creator: ''
    }

    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    //console.log(this.props);
  }
    componentDidMount() {
    //const id = window.location.href.split('/')[4]
    //console.log(id2);
    //const id = '640f436275030bb85107eaf0';
    axios.get(`http://localhost:5000/recipe/${this.state.id}`)
      .then(response => {
        this.setState({
          name: response.data.name,
          ingredients: response.data.ingredients,
          steps: response.data.steps,
          description: response.data.description,
          notes: response.data.notes,
          creator: response.data.creator
        })
      })
      .catch((err) => {console.log(err)})
  }
  */
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
      //const id = window.location.href.split('/')[4]
      //console.log(id2);
      //const id = '640f436275030bb85107eaf0';
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
      console.log(userID);
    
  }, [])

  const handleDelete = () => {
    console.log("delete the recipe");
    //const id = window.location.href.split('/')[4];
    axios.delete(`http://localhost:5000/recipe/${id}`, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          console.log("cool");
          window.location.href = '/myRecipes';
        }
      })
  }

  const handleEdit = () => {
    window.location.href = `/edit/${id}`;
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