import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import React from 'react';
import axios from 'axios';

import './App.css';
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import RecipeList from "./components/recipe-list.component";
import ViewRecipe from "./components/view-recipe.component";
import EditRecipe from "./components/edit-recipe.component";
import CreateRecipe from "./components/create-recipe.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <br />
      <Routes>
        <Route path='/' exact element={<Home />} />
        <Route path='/explore' exact element={<RecipeList/>} />
        <Route path='/recipe/:id' element={<ViewRecipe />} />
        <Route path='/edit/:id' element={<EditRecipe/>} />
        <Route path='/create' element={<CreateRecipe/>} />
        <Route path='/user' element={<CreateUser/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

/*async function ViewRecipe() {
  let state = {
    name: '',
    ingredients: [],
    steps: [],
    description: '',
    notes: '',
    creator: ''
  }

  const { id } = useParams();
  let recipe = await axios.get(`http://localhost:5000/recipe/${id}`)
      .then(response => {
        return {
          name: response.data.name,
          ingredients: response.data.ingredients,
          steps: response.data.steps,
          description: response.data.description,
          notes: response.data.notes,
          creator: response.data.creator
        }
      })
      .catch((err) => {console.log(err)})
  return (
    <div>Is this it? {id}
      <div>{recipe.name}</div>
    </div>
  )
}
*/

export default App;
