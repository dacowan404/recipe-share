import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';

function Login() {
  const { BACKEND_ADDRESS, setUserName, setUserID } = useContext(UserContext);
  const [ loginUsername, setLoginUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const OnChangeLoginUserName = (e) => {
    setLoginUsername(e.target.value);
  }

  const OnChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const login = {
      username: loginUsername,
      password: password,
    }

    axios.post(BACKEND_ADDRESS +'/users/auth/login', login)
      .then(res => {
        setUserName(res.data.userName);
        setUserID(res.data.userID);
        localStorage.setItem('token', res.data.token);
      })
      .then(() => {
        window.location.href = '/';
      }); 
    }


    const onSubmitQuick = (e) => {
      e.preventDefault();

      const login = {
        username: 'test1',
        password: 'test',
      }
  
      axios.post(BACKEND_ADDRESS + '/users/auth/login', login)
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
    <div>
      <div className='center'>
        <div className='userForm'>
          <h3>Quick Login</h3>
          <div>Use quick login to test features of Recipe Share <br /> without needing to create an account<br /></div>
          <form onSubmit={onSubmitQuick}>
              <div>
                <input type="submit" value="Quick Login" />
              </div>
          </form>
        </div>

        <div className='userForm'>
          <h3>Login</h3>
          <div>Or if you already have an account login<br /></div>
          <form onSubmit={onSubmit}>
            <fieldset>
              <div className='formField'>
                <label>Username:</label><br />
                <input type="text" required value={loginUsername} onChange={OnChangeLoginUserName} />
              </div>

              <div className='formField'>
                <label>Password:</label><br />
                <input type="password" required value={password} onChange={OnChangePassword} />
              </div>

              <div className='submit'>
                <input type="submit" value="Login" />
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login;