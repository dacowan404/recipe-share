import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import './App.css';
import Navbar from "./components/navbar.component";
import Home from "./components/home.component";
import Explore from "./components/recipe-list.component";
import MyRecipes from "./components/myRecipes.component";
import CreateRecipe from "./components/create-recipe.component";
import ViewRecipe from "./components/view-recipe.component";
import EditRecipe from "./components/edit-recipe.component";
import DeleteRecipe from "./components/delete-recipe.component";
import CreateUser from "./components/create-user.component";
import Login from "./components/login.component";
import Logout from "./components/logout.component";
import UpdatePassword from "./components/update-password.component"

export const UserContext = React.createContext({
  BACKEND_ADDRESS: 'http://localhost:5000',
  userName: null,
  userID: null,
  setUserName: () => {},
  setUserID: () => {}
})

function App() {
  const { BACKEND_ADDRESS } = useContext(UserContext);
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  useEffect(() => {
    if (window.localStorage.getItem('token')) {
      axios.get(BACKEND_ADDRESS + '/users/auth/checkLogin', {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
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
    <UserContext.Provider value={{BACKEND_ADDRESS, userName, setUserName, userID, setUserID}}>
      <BrowserRouter>
        <div className="nav">
          <Navbar />
        </div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/myRecipes' element={<MyRecipes />} />
          <Route path='/create' element={<CreateRecipe />} />
          <Route path='/recipe/:id' element={<ViewRecipe />} />
          <Route path='/edit/:id' element={<EditRecipe />} />
          <Route path='/delete/:id' element={<DeleteRecipe />} />
          <Route path='/user' element={<CreateUser/>} />
          <Route path='/updatePassword' element={<UpdatePassword />} />
          <Route path='/login' element={<Login />} />
          <Route path='/logout' element={<Logout />} />
  </Routes> 
      </BrowserRouter>
    </UserContext.Provider>
  );
} 

export default App;