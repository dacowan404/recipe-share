import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useContext, useState } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Explore from "./components/recipe-list.component";
import MyRecipes from "./components/myRecipes.component";
import ViewRecipe from "./components/view-recipe.component";
import EditRecipe from "./components/edit-recipe.component";
import CreateRecipe from "./components/create-recipe.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
//import { UserContext } from "./userContext";

export const UserContext = React.createContext({
  userName: null,
  userID: null,
  setUserName: () => {},
  setUserID: () => {}
})

function App() {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      axios.get('http://localhost:5000/users/auth/checkLogin', {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
        .then(response => {
          if (response.status === 200) {
          setUserName(response.data.userName);
          setUserID(response.data.userID);
          }
          else {
            setUserName(null);
            setUserID(null);
          }
        })
      }
  },[userName, userID]);
  
  return (
    <UserContext.Provider value={{userName, setUserName, userID, setUserID}}>
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/myRecipes' element={<MyRecipes />} />
          <Route path='/recipe/:id' element={<ViewRecipe />} />
          <Route path='/edit/:id' element={<EditRecipe />} />
          <Route path='/create' element={<CreateRecipe />} />
          <Route path='/user' element={<CreateUser/>} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
  </Routes> 
      </BrowserRouter>
    </UserContext.Provider>
  );
} 

export default App;