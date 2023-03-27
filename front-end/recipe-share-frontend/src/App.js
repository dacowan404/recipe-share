import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {Component, useEffect, useState } from 'react';
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
//import Login from "./components/login.component";


function App() {
  const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);
  //const user = {userName, userID};
  //const userID = '640f436275030bb85107eae6';

  /*useEffect(() => {
    const getUser = ()=> {
      fetch("http://localhost:5000/auth/login", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      })
        .then((response) => {
          if (response.status === 200) return response.json();
          throw new Error("authentication has failed!");
        })
        .then((resObject) => {
          console.log(`line 38 resObject = ${resObject}`);
          setUserName(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getUser(); 

    /*
    axios.get('http://localhost:5000/auth/login/success')
      .then(response => {
        console.log(response);
        setUser(response.data.user);
      })
      .then((err) => {console.log(err)}) */


  //},[]);

  class Login extends Component {
    constructor(props) {
      super(props);
  
      this.OnChangeUserName = this.OnChangeUserName.bind(this);
      this.OnChangePassword = this.OnChangePassword.bind(this);
      this.onSubmit = this.onSubmit.bind(this);
      this.onSubmitQuick = this.onSubmitQuick.bind(this);
  
      this.state = {
        username: '',
        password: '',
      }
    }
  
      OnChangeUserName(e) {
        this.setState({
          username: e.target.value
        });
      }
  
      OnChangePassword(e) {
        this.setState({
          password: e.target.value
        });
      }
  
      onSubmit(e) {
        e.preventDefault();
  
        const login = {
          username: this.state.username,
          password: this.state.password,
        }
  
        console.log(login);
  
        axios.post('http://localhost:5000/auth/login', login)
          .then(res => {
            console.log(res.data)
            setUserName(res.data.user.userName);
            setUserID(res.data.user.userID);
            window.location = '/';
          });
      }
  
      onSubmitQuick(e) {
        e.preventDefault();
  
        const login = {
          username: 'test1',
          password: 'test',
        }
  
        axios.post('http://localhost:5000/auth/login', login)
          .then(res => {
            console.log(res.data);
            setUserName(res.data.user.userName);
            setUserID(res.data.user.userID);
            if (res.data.user.userName) {
              return res.data.user.userName;
            }
          }).then(result => {
            if (result === userName) {
              console.log(result);
              //window.location = '/';
            }
          });
          
      }
  //           {userName ? window.location = '/': <div> No one logged in </div>}
    render() {
      return (
        <div>

          <h3>Login</h3>
          <form onSubmit={this.onSubmit}>
            <div>
              <label>User Name:</label>
              <input type="text" required value={this.state.username} onChange={this.OnChangeUserName} />
            </div>
  
            <div>
              <label>Password:</label>
              <input type="password" required value={this.state.password} onChange={this.OnChangePassword} />
            </div>
  
            <div>
              <input type="submit" value="Login" />
            </div>
  
          </form>
  
          <h3>Quick Login</h3>
          <form onSubmit={this.onSubmitQuick}>
            <div>
              <input type="submit" value="Quick Login" />
            </div>
  
          </form>
        </div>
      )
    }
  }

  function Logout() {
    if (userID) {
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      console.log(res.data);
      if (res.data.logout) {
        setUserID(null);
        setUserName(null);
      }
    })
    .then(window.location = '/');

  }}
  
  return (
    <BrowserRouter>
      <Navbar userName={userName}/>
      <br />
      <Routes>
        <Route path='/' exact element={<Home userName={userName} />} />
        <Route path='/explore' element={<Explore />} />
        <Route path='/myRecipes' element={<MyRecipes userID={userID} />} />
        <Route path='/recipe/:id' element={<ViewRecipe userID={userID}/>} />
        <Route path='/edit/:id' element={<EditRecipe userID={userID}/>} />
        <Route path='/create' element={<CreateRecipe userID={userID}/>} />
        <Route path='/user' element={<CreateUser/>} />
        <Route path='/login' element={<Login userName={userName}/>} />
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
} 

export default App;

//*/

/*
class App extends Component {
  constructor(props) {
    super(props);

    this.state = { user: undefined};
  }

  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path='/' exact element={<Home user={this.state.user} />} />
          <Route path='/explore' exact element={<RecipeList/>} />
          <Route path='/recipe/:id' element={<ViewRecipe />} />
          <Route path='/edit/:id' element={<EditRecipe/>} />
          <Route path='/create' element={<CreateRecipe/>} />
          <Route path='/user' element={<CreateUser/>} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    )
  }
}
*/

/*
async function ViewRecipe() {
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