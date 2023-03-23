import React, { Component, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

//function withParams(Component) {
//  return props => <Component {...props} params={useParams()} />
//}

function useGetID() {
  const { id } = useParams();
  return id;
}

/*
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

class ViewRecipe extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      ingredients: [],
      steps: [],
      description: '',
      notes: '',
      creator: ''
    }
    console.log(this.props);
  }

  componentDidMount() {
    const id = window.location.href.split('/')[4]
    //console.log(id2);
    //const id = '640f436275030bb85107eaf0';
    axios.get(`http://localhost:5000/recipe/${id}`)
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
  render() {
    return (
      <div> Look at this cool recipe:
        <div> {this.state.name}</div>
      </div>
    )
  }
}


export default ViewRecipe;