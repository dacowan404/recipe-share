import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from 'react';

import './App.css';
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import RecipeList from "./components/recipe-list.component";
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
        <Route path='/edit/:id' element={<EditRecipe/>} />
        <Route path='/create' element={<CreateRecipe/>} />
        <Route path='/user' element={<CreateUser/>} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
