import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../App';

function Navbar() {
  const { userName } = useContext(UserContext);
  return (
    <nav className='navbar'>
      <Link to="/" id='title'>Recipe Share</Link>
      <div className='navContainer'>
        <Link to='/'>Home</Link>
        <Link to='/explore'>Explore</Link>

      { userName ? 
      <>
        <Link to='/create'>Create Recipe</Link>
        <Link to='/myRecipes'>My Recipes</Link>
        <Link to='/logout'>Logout</Link>
      </>
      : <>
        <div></div>
        <Link to='/user'>Create Account</Link>
        <Link to='/login'>Login</Link>
      </>
      }


      </div>
    </nav>
    )
  }

export default Navbar;

