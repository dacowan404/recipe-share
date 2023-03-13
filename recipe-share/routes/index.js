const express = require('express');
const router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const user_controller = require('../controllers/userController');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render("index", { title: "Express", user: req.user });
});

router.get('/explore', recipe_controller.recipe_list);

// recipe routes
router.get('/:id/myrecipes', recipe_controller.my_recipe_list);

// create new recipe
router.get('/create', recipe_controller.recipe_create_get);
router.post('/create', recipe_controller.recipe_create_post);

// delete recipe
router.get('/:id/:id2/delete', recipe_controller.recipe_delete_get);
router.post('/:id/:id2/delete', recipe_controller.recipe_delete_post);

// update recipe
router.get('/:id/:id2/update', recipe_controller.recipe_update_get)
router.post('/:id/:id2/update', recipe_controller.recipe_update_post)

// view a recipe
router.get('recipe/:id', recipe_controller.recipe_detail);

// user routes

// login
//router.get('/login', user_controller)
//router.post('/login' user_controller)

// create new user
router.get('/user/new-user', user_controller.user_create_get)
router.post('/user/new-user', user_controller.user_create_post)

// delete account

// update password/email


module.exports = router;
