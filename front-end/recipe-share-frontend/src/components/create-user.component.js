import React, { useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from '../App';

function CreateUser() {
  const { BACKEND_ADDRESS, setUserName, setUserID } = useContext(UserContext)
  const [ newUserName, setNewUserName ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ confirmPassword, setConfirmPassword ] = useState('');
  const [ email, setEmail ] = useState('');

  const OnChangeNewUserName = (e) => {
    setNewUserName(e.target.value);
  }

  const OnChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const OnChangeConfirm = (e) => {
    setConfirmPassword(e.target.value);
  }

  const OnChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords must match");
      return false;
    }

    const user = {
      username: newUserName,
      password: password,
      email: email
    }

    axios.post(BACKEND_ADDRESS +'/users/new-user', user)
      .then(res => {
        setUserName(res.data.userName);
        setUserID(res.data.userID);
        localStorage.setItem('token', res.data.token);
      })
      .then(() => {
        window.location.href = '/';
      });
  }

  return (
    <div className="center">
      <div className="userForm">
        <h3>Create New User</h3>
        <form onSubmit={onSubmit}>
          <fieldset>
            <div className='formField'>
              <label>Username:</label><br />
              <input type="text" maxLength="40" required value={newUserName} onChange={OnChangeNewUserName} />
            </div>

            <div className='formField'>
              <label>Password:</label><br />
              <input type="password" required value={password} onChange={OnChangePassword} />
            </div>

            <div className='formField'>
              <label>Confirm Password:</label><br />
              <input type="password" required value={confirmPassword} onChange={OnChangeConfirm} />
            </div>

            <div className='formField'>
              <label>Email:</label><br />
              <input type="email" required value={email} onChange={OnChangeEmail} />
            </div>

            <div className="submit">
              <input type="submit" value="Create User" />
            </div>
          </fieldset>
        </form>

      </div>
    </div>
  )
}

export default CreateUser;