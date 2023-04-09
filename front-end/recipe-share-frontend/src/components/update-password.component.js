import React, { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../App";

function UpdatePassword() {
  const { BACKEND_ADDRESS } = useContext(UserContext)
  const [ currentPassword, setCurrentPassword ] = useState('');
  const [ newPassword, setNewPassword ] = useState('');
  const [ confirmNewPassword, setConfirmNewPassword ] = useState('');

  const OnChangeCurrentPassword = (e) => {
    setCurrentPassword(e.target.value);
  }

  const OnChangeNewPassword = (e) => {
    setNewPassword(e.target.value);
  }

  const OnChangeConfirm = (e) => {
    setConfirmNewPassword(e.target.value);
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (newPassword !== confirmNewPassword) {
      alert("New Passwords must match");
      return false;
    }

    const data = {
      currentPassword,
      newPassword
    }

    axios.post(BACKEND_ADDRESS +'/users/update', data)
      .then(() => {
        window.location.href = '/';
      });
  }

  return (
    <div className="center">
      <div className="userForm">
        <h3>Update Password</h3>
        <form onSubmit={onSubmit}>
          <fieldset>
            <div className='formField'>
              <label>Current Password:</label><br />
              <input type="password" required value={currentPassword} onChange={OnChangeCurrentPassword} />
            </div>

            <div className='formField'>
              <label>New Password:</label><br />
              <input type="password" required value={newPassword} onChange={OnChangeNewPassword} />
            </div>

            <div className='formField'>
              <label>Confirm New Password:</label><br />
              <input type="password" required value={confirmNewPassword} onChange={OnChangeConfirm} />
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

export default UpdatePassword