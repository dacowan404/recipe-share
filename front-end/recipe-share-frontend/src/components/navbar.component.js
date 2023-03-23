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
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/explore'>Explore</Link>
            </li>
            <li>
              <Link to='/create'>Create</Link>
            </li>
            <li>
              <Link to='/user'>Create User</Link>
            </li>
            <li>
              <Link to='/login'>Login</Link>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}