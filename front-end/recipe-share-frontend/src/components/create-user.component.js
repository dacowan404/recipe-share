import React, { useState, useContext } from "react";
import axios from 'axios';
import { UserContext } from '../App';

/*
export default class CreateUser extends Component {
  constructor(props) {
    super(props);

    this.OnChangeUserName = this.OnChangeUserName.bind(this);
    this.OnChangePassword = this.OnChangePassword.bind(this);
    this.OnChangeConfirm = this.OnChangeConfirm.bind(this);
    this.OnChangeEmail = this.OnChangeEmail.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    onSubmit(e) {
      e.preventDefault();

      if (this.state.password !== this.state.confirmPW) {
        alert("Passwords must match");
        return false;
      }

      const user = {
        username: this.state.username,
        password: this.state.password,
        email: this.state.email
      }

      axios.post('http://localhost:5000/users/new-user', user)
        .then(res => console.log(res.data));

      // replace this with making it log in when new user is created
      this.setState({
        username: '',
        password: '',
        confirmPW: '',
        email: ''
      });
    }

*/

function CreateUser() {
  const { setUserName, setUserID } = useContext(UserContext)
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

    axios.post('http://localhost:5000/users/new-user', user)
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
      <h3>Create New User</h3>
      <form onSubmit={onSubmit}>
        <div>
          <label>User Name:</label>
          <input type="text" required value={newUserName} onChange={OnChangeNewUserName} />
        </div>

        <div>
          <label>Password:</label>
          <input type="password" required value={password} onChange={OnChangePassword} />
        </div>

        <div>
          <label>Confirm Password:</label>
          <input type="password" required value={confirmPassword} onChange={OnChangeConfirm} />
        </div>

        <div>
          <label>Email:</label>
          <input type="email" required value={email} onChange={OnChangeEmail} />
        </div>

        <div>
          <input type="submit" value="Create User" />
        </div>

      </form>
    </div>
  )
}

export default CreateUser;