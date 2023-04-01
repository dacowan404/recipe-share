import React, { useContext, useState } from 'react';
import axios from 'axios';
import { UserContext } from '../App';

function Login() {
  const { setUserName, setUserID } = useContext(UserContext);
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

    axios.post('http://localhost:5000/users/auth/login', login)
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
      setLoginUsername('test1');
      setPassword('test');

      /*this.setState({
        username: 'test1',
        password: 'test'
      }, () => {
        this.onSubmit(e);
      }); */
    }

  return (
    <div>
      <h3>Login</h3>

      <form onSubmit={onSubmit}>
        <div>
          <label>User Name:</label>
          <input type="text" required value={loginUsername} onChange={OnChangeLoginUserName} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" required value={password} onChange={OnChangePassword} />
        </div>

        <div>
          <input type="submit" value="Login" />
        </div>
      </form>

      <h3>Quick Login</h3>
      <form onSubmit={onSubmitQuick}>
        <div>
          <input type="submit" value="Quick Login" />
        </div>
      </form>
    </div>
  )
}

export default Login;