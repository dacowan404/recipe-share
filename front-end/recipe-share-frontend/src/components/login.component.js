import React, { Component } from "react";
import axios from 'axios';

export default class Login extends Component {
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

      axios.get('http://localhost:5000/login', login)
        .then(res => {
          console.log(res.data)
          setUserName(res.data.user.userName);
        });

      window.location = '/';
    }

    onSubmitQuick(e) {
      e.preventDefault();

      const login = {
        username: 'test1',
        password: 'test',
      }

      console.log(login);

      axios.post('http://localhost:5000/auth/login', login)
        .then(res => console.log(res.data));

      //window.location = '/';
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