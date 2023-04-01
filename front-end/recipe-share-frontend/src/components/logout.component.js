import React, { useContext} from "react";
import axios from "axios";
import { UserContext } from '../App';

function Logout() {
  const { userName, setUserName, setUserID } = useContext(UserContext);
  localStorage.removeItem('token')
  if (userName) {
  axios.get('http://localhost:5000/users/auth/logout')
  .then(res => {
    if (res.data.logout) {
      setUserName(null)
      setUserID(null)
    }
  })
  .then(()=> {
    window.location.href = '/';
  })
}}

export default Logout;