import React, { Component } from "react";

export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.OnChangeUserName = this.OnChangeUserName.bind(this);

    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      username: '',

    }
  }

    OnChangeUserName(e) {
      this.setState({
        username: e.target.value
      });
    }

    onSubmit(e) {
      e.preventDefault();

      const user = {
        username: this.state.username,
      }

      console.log(user);
      this.setState({
        username: ''
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
            <input type="submit" value="Create User" />
          </div>

        </form>
      </div>
    )
  }
}