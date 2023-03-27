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

    this.getUserRecipes = this.getUserRecipes.bind(this);

    this.state = {
      recipes: [],
      userID: this.props.userID
    };
  }

  getUserRecipes() {
    this.setState({allRecipes: false})
    axios.get(`http://localhost:5000/myrecipes/${this.props.userID}`)
    .then(response => {this.setState({recipes: response.data})})
    .catch((err) => {console.log(err);})
  }

  componentDidMount() {
    if (this.props.userID) {
      this.getUserRecipes();
    } else {
      window.location = '/'
    }
  }
  
  render() {
    return (
      <div>
        <div>My Recipes</div>
        <p>Recipe List</p>
        {this.props.userID ? <div>you logged in</div>: <div>you not logged in</div>}
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