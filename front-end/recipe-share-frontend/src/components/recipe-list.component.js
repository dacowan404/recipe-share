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
    axios.get('http://localhost:5000/explore')
    .then(response => {this.setState({recipes: response.data})})
    .catch((err) => {console.log(err);})
  }
  
  render() {

    return (
      <div className='recipeList'>
        <div id='exploreTitle'>Explore New Recipes</div>
        <ul className='recipeCardContainer'>
          {this.state.recipes.map((recipe) => {
            return <RecipeCard recipe={recipe} key={recipe._id} />
          })
          }
        </ul>
      </div>
    )
  }
}