import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App";

function DeleteRecipe() {
  const { BACKEND_ADDRESS } = useContext(UserContext);
  const id = window.location.href.split('/')[4];
  axios.delete(`${BACKEND_ADDRESS}/recipe/${id}`, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
  .then(res => {
    if (res.status === 200) {
      window.location.href = '/myRecipes';
    }
  })
}

export default DeleteRecipe;