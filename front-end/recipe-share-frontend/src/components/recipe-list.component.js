import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RecipeCard = props => (
  <li>
    <Link to={`/recipe/${props.recipe._id}`}> {props.recipe.name} </Link>
  </li>
)

export default class RecipeList extends Component {
  constructor(props) {
    super(props);

    this.state = {recipes: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/explore')
    .then(response => {this.setState({recipes: response.data})})
    .catch((err) => {console.log(err);})
  }
  render() {
    return (
      <div>
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