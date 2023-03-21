const express = require('express');
const router = express.Router();

const recipe_controller = require('../controllers/recipeController');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render("index", { title: "Express", user: req.user });
});

router.get('/explore', recipe_controller.recipe_list);

// recipe routes
router.get('/myrecipes', recipe_controller.my_recipe_list);

// liked recipes 

// create new recipe
router.get('/createRecipe', recipe_controller.recipe_create_get);
router.post('/createRecipe', recipe_controller.recipe_create_post);

// delete recipe
router.get('/recipe/:id/delete', recipe_controller.recipe_delete_get);
router.post('/recipe/:id/delete', recipe_controller.recipe_delete_post);

// update recipe
router.get('/:id/:id2/update', recipe_controller.recipe_update_get)
router.post('/:id/:id2/update', recipe_controller.recipe_update_post)

// view a recipe
router.get('/recipe/:id', recipe_controller.recipe_detail);

module.exports = router;
