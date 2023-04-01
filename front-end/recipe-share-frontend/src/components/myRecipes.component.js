import React, { Component } from 'react';
import axios from 'axios';
import RecipeCard from './recipe-card-component';

export default class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes: [],
    };
  }

  componentDidMount() {
    axios.get('http://localhost:5000/myrecipes/', {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
    .then(response => {this.setState({recipes: response.data})})
    .catch((err) => {console.log(err);})
  }
  
  render() {
    return (
      <div>
        <div>My Recipes</div>
        <p>Recipe List</p>
        <ul>
          {this.state.recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe._id} />
          })
          }
        </ul>
      </div>
    )
  }
}