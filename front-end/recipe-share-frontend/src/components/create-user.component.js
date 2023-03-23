import React, { Component } from "react";
import axios from 'axios';

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.OnChangeUserName = this.OnChangeUserName.bind(this);
    this.OnChangePassword = this.OnChangePassword.bind(this);
    this.OnChangeConfirm = this.OnChangeConfirm.bind(this);
    this.OnChangeEmail = this.OnChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',
      password: '',
      confirmPW: '',
      email: ''
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

    OnChangeConfirm(e) {
      this.setState({
        confirmPW: e.target.value
      });
    }

    OnChangeEmail(e) {
      this.setState({
        email: e.target.value
      });
    }

    onSubmit(e) {
      e.preventDefault();

      if (this.state.password !== this.state.confirmPW) {
        alert("Passwords must match");
        return true;
      }

      const user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }

      console.log(user);

      axios.post('http://localhost:5000/users/new-user', user)
        .then(res => console.log(res.data));

      this.setState({
        username: '',
        password: '',
        confirmPW: '',
        email: ''
      });
      //window.location = '/';
    }

  render() {
    return (
      <div>
        <h3>Create New User</h3>
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
            <label>Confirm Password:</label>
            <input type="password" required value={this.state.confirmPW} onChange={this.OnChangeConfirm} />
          </div>

          <div>
            <label>Email:</label>
            <input type="email" required value={this.state.email} onChange={this.OnChangeEmail} />
          </div>

          <div>
            <input type="submit" value="Create User" />
          </div>

        </form>
      </div>
    )
  }
}