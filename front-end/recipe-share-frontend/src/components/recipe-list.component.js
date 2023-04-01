import React, { Component } from 'react';
import axios from 'axios';
import RecipeCard from './recipe-card-component';

export default class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.getAllRecipes = this.getAllRecipes.bind(this);

    this.state = {
      recipes: [],
    };
  }

  getAllRecipes() {
    this.setState({allRecipes: true})
    axios.get('http://localhost:5000/explore')
    .then(response => {this.setState({recipes: response.data})})
    .catch((err) => {console.log(err);})
  }

  componentDidMount() {
    this.getAllRecipes();
  }
  
  render() {
    return (
      <div>
        <div>Explore Recipes</div>
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