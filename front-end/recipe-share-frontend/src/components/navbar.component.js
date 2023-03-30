import axios from 'axios';
import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

/*export default class Navbar extends Component {
  static contextType = UserContext;
  constructor(props) {
    super(props)


    this.testThis = this.testThis.bind(this);
  }

  testThis = () => {
    axios.get('http://localhost:5000/test', {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
    .then(res => {console.log(res.data.authData.userInfo)})
  }

  render()} */
  
function Navbar() {
  const { userName } = useContext(UserContext);
    return (
      <nav className='navbar'>
        <Link to="/">Recipe Share</Link>
        <div>
          <ul>
          <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/explore'>Explore</Link>
            </li>

            {userName ? 
              <div> Hi {userName}
                <li>
                  <Link to='/create'>Create</Link>
                </li>
                <li>
                  <Link to='/myRecipes'>My Recipes</Link>
                </li>
                <li>
                <Link to='/logout'>Logout</Link>
                </li>
              </div> : 
              <div>
                <li>
                  <Link to='/user'>Create User</Link>
                </li>
                <li>
                  <Link to='/login'>Login</Link>
                </li>
              </div>
            }

            </ul>
        </div>
      </nav>
    )
  }

//<button onClick={this.testThis}>Click</button>
//this.props.userName ? <div>logged into {this.props.userName}</div> : <div>not logged in</div>}

export default Navbar;
