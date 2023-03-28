import React, { Component } from 'react';
import axios from 'axios';

export default class CreateRecipe extends Component {
  constructor(props) {
    super(props);

    this.OnChangeName = this.OnChangeName.bind(this);
    this.OnChangeDescription = this.OnChangeDescription.bind(this);
    this.OnChangeNotes = this.OnChangeNotes.bind(this);
    this.handleIngredientChange = this.handleIngredientChange.bind(this);
    this.handleAddIngredient = this.handleAddIngredient.bind(this);
    this.handleRemoveIngredient = this.handleRemoveIngredient.bind(this);
    this.handleStepChange = this.handleStepChange.bind(this);
    this.handleAddStep = this.handleAddStep.bind(this);
    this.handleRemoveStep = this.handleRemoveStep.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      creatorID : this.props.userID,
      name: "",
      ingredients: [''],
      steps: [''],
      description: "",
      notes: "",
      editedDate: new Date()
    }
  }

    OnChangeName(e) {
      this.setState({
        name: e.target.value
      });
    }

    OnChangeDescription(e) {
      this.setState({
        description: e.target.value
      });
    }

    OnChangeNotes(e) {
      this.setState({
        notes: e.target.value
      });
    }

    handleIngredientChange(index, value) {
      const newIngredients = this.state.ingredients; // create a copy of the existing ingredients array
      newIngredients[index] = value; // update the value at the specified index
      this.setState({
        ingredients: newIngredients,
      }); // set the state with the updated array
    };
  
    handleAddIngredient() {
      this.setState({
        ingredients: [...this.state.ingredients, '']
      }) // add an empty input to the end of the array
    };
  
    handleRemoveIngredient(index) {
      const newIngredients = this.state.ingredients; // create a copy of the existing ingredients array
      newIngredients.splice(index, 1); // remove the input at the specified index
      this.setState({
        ingredients: newIngredients
      }); // set the state with the updated array
    };

    handleStepChange(index, value) {
      const newSteps = this.state.steps; // create a copy of the existing step array
      newSteps[index] = value; // update the value at the specified index
      this.setState({
        steps: newSteps,
      }); // set the state with the updated array
    };
  
    handleAddStep() {
      this.setState({
        steps: [...this.state.steps, '']
      }) // add an empty input to the end of the array
    };
  
    handleRemoveStep(index) {
      const newSteps = this.state.steps; // create a copy of the existing step array
      newSteps.splice(index, 1); // remove the input at the specified index
      this.setState({
        steps: newSteps
      }); // set the state with the updated array
    };

    onSubmit(e) {
      e.preventDefault();

      const recipe = {
        name: this.state.name,
        ingredients: this.state.ingredients,
        steps: this.state.steps,
        description: this.state.description,
        notes: this.state.notes,
        creator: this.state.creatorID,
        editedDate: new Date()
      }

      axios.post('http://localhost:5000/createRecipe', recipe)
      .then(res => console.log(res.data)); // 1hour 25min

      console.log(recipe);
      //window.location = '/';
    }

  render() {
    return (
      <div>
        <h3>Create New Recipe</h3>
        <form onSubmit={this.onSubmit}>
          <div> User: {this.props.userID}</div>

          <div>
            <label>Recipe Name:</label>
            <input type="text" value={this.state.name} onChange={this.OnChangeName} />
          </div>

          {this.state.ingredients.map((ingredient, index) => (
            <div key={index}>
              <label htmlFor={`ingredient-${index}`}>Ingredient {index +1}</label>
              <input type="text" id={`ingredient-${index}`} value={ingredient} onChange={(event) => this.handleIngredientChange(index, event.target.value)}/>
              {this.state.ingredients.length > 1 && (
                <button type="button" onClick={() => this.handleRemoveIngredient(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={this.handleAddIngredient}>Add Ingredient</button>

          {this.state.steps.map((step, index) => (
            <div key={index}>
              <label htmlFor={`step-${index}`}>Step {index +1}</label>
              <input type="text" id={`step-${index}`} value={step} onChange={(event) => this.handleStepChange(index, event.target.value)}/>
              {this.state.steps.length > 1 && (
                <button type="button" onClick={() => this.handleRemoveStep(index)}>Remove</button>
              )}
            </div>
          ))}
          <button type="button" onClick={this.handleAddStep}>Add Step</button>

          <div>
            <label>Description (200 characters or less): </label>
            <input type="text" maxLength="200" value={this.state.description} onChange={this.OnChangeDescription} />
          </div>

          <div>
            <label>Notes: </label>
            <input type="text" value={this.state.notes} onChange={this.OnChangeNotes} />
          </div>
          <div>
            <input type="submit" value="Create New Recipe" />
          </div>

        </form>
      </div>
    )
  }
}