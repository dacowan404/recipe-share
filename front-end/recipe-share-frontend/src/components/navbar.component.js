import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Navbar extends Component {

  render() {
    return (
      <nav className='navbar'>
        <Link to="/">Recipe Share</Link>
        <div>
          <ul>
            <li>
              <Link to='/'>Recipes</Link>
            </li>
            <li>
              <Link to='/create'>Create</Link>
            </li>
            <li>
              <Link to='/user'>Create User</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}