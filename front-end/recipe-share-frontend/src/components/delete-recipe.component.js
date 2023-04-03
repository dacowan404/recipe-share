import axios from "axios";

function DeleteRecipe() {
  const id = window.location.href.split('/')[4];
  axios.delete(`http://localhost:5000/recipe/${id}`, {headers: {'Authorization': `Bearer ${window.localStorage.getItem('token')}`}})
  .then(res => {
    if (res.status === 200) {
      window.location.href = '/myRecipes';
    }
  })
}

export default DeleteRecipe;