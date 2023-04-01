import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

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

export default Navbar;
