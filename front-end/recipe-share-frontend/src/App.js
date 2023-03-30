import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, {Component, useContext, useState } from 'react';
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
//import { UserContext } from "./userContext";

export const UserContext = React.createContext({
  userName: null,
  userID: null,
  setUserName: () => {},
  setUserID: () => {}
})

function App() {
  const [userName, setUserName] = useState(null);
  //const [userName, setUserName] = useState(null);
  const [userID, setUserID] = useState(null);

  /*useEffect(() => {
    /*
    const getUser = ()=> {
      fetch("http://localhost:5000/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "Access-Control-Allow-Credentials": true,
        }
      })
        .then((response) => {
          if (response.status === 200) {
            console.log(`line 36 resObject = ${response.data}`);
            setUserName(response.data.userName);
            setUserID(response.data.userID);
          } else {
            console.log('no one logged in');
            setUserName(null);
            setUserID(null)
          }

          
        })

        /*
        .then((resObject) => {
          console.log(`line 38 resObject = ${resObject}`);
          setUserName(resObject.user);
        })
        .catch((err) => {
          console.log(err);
        }); 
    };
    getUser();  

    axios.get('http://localhost:5000/auth/login/success')
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


  },[]); */

  class Login extends Component {
    static contextType = UserContext;
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
  
        const { setUserName, setUserID } = this.context;

        const login = {
          username: this.state.username,
          password: this.state.password,
        }
    
        axios.post('http://localhost:5000/auth/login', login)
        .then(res => {
          console.log(res.data);
          setUserName(res.data.userName);
          setUserID(res.data.userID);
          localStorage.setItem('token', res.data.token);
        }); 
        }
  
        onSubmitQuick(e) {
          e.preventDefault();

          const { setUserName, setUserID } = this.context;

          const login = {
            username: 'test1',
            password: 'test',
          }
    
          axios.post('http://localhost:5000/auth/login', login)
            .then(res => {
              console.log(res.data);
              setUserName(res.data.userName);
              setUserID(res.data.userID);
              localStorage.setItem('token', res.data.token);
            })
            
        }
      onSubmitQuick2(e) {
        e.preventDefault();
  
        const login = {
          username: 'test1',
          password: 'test',
        }
  
        axios.post('http://localhost:5000/test2', login)
          .then(res => {
            console.log(res);
            axios.get('http://localhost:5000/test',
            {headers: {'Authorization': `Bearer ${res.data.token}`}})
          .then(res => {console.log(res)})
          })
        /*axios.post('http://localhost:5000/auth/login', login)
          .then(res => {
            console.log(res.data);
            setUserName(res.data.user.userName);
            setUserID(res.data.user.userID);
            if (res.data.useruserName) {
              return res.data.user.userName;
            }
          }).then(() => {
              window.location.href = '/';
          }); */
          
      }

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
    const { setUserName, setUserID } = useContext(UserContext);
    localStorage.removeItem('token')
    if (userName) {
    axios.get('http://localhost:5000/auth/logout')
    .then(res => {
      if (res.data.logout) {
        setUserName(null)
        setUserID(null)
      }
    })
    //.then(window.location = '/');

  }}
  
  return (
    <UserContext.Provider value={{userName, setUserName, userID, setUserID}}>
      <BrowserRouter>
        <Navbar />
        <br />
        <Routes>
          <Route path='/' element={<Home userName={userName} />} />
          <Route path='/explore' element={<Explore />} />
          <Route path='/myRecipes' element={<MyRecipes />} />
          <Route path='/recipe/:id' element={<ViewRecipe />} />
          <Route path='/edit/:id' element={<EditRecipe />} />
          <Route path='/create' element={<CreateRecipe />} />
          <Route path='/user' element={<CreateUser/>} />
          <Route path='/login' element={<Login userName={userName}/>} />
          <Route path='/logout' element={<Logout />} />
  </Routes> 
      </BrowserRouter>
    </UserContext.Provider>
  );
} 

export default App;