const express = require('express');
const router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const Recipe = require('../models/recipe');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render("index", { title: "Express", user: req.user });
});

//router.get('/explore', recipe_controller.recipe_list);
router.route('/explore').get((req, res) => {
  Recipe.find({})
  .sort({likes: -1})
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error routes/index.js ' + err))
});

// recipe routes
router.get('/myrecipes', recipe_controller.my_recipe_list);

// liked recipes 

// create new recipe
router.get('/createRecipe', recipe_controller.recipe_create_get);
//router.post('/createRecipe', recipe_controller.recipe_create_post);
router.route('/createRecipe').post((req, res) => {
  const newRecipe = new Recipe({   
    name: req.body.name,
    ingredients: req.body.ingredients,
    steps: req.body.steps,
    description: req.body.description,
    notes: req.body.notes,
    creator: req.body.creator,
    editedDate: req.body.editedDate
  })

  newRecipe.save().then(()=> res.json("Recipe added"))
    .catch(err => res.status(400).json('Error routes.index.js ' + err));
})

// delete recipe
router.get('/recipe/:id/delete', recipe_controller.recipe_delete_get);
router.post('/recipe/:id/delete', recipe_controller.recipe_delete_post);

// update recipe
router.get('/:id/:id2/update', recipe_controller.recipe_update_get)
router.post('/:id/:id2/update', recipe_controller.recipe_update_post)

// view a recipe
//router.get('/recipe/:id', recipe_controller.recipe_detail);
router.route('/recipe/:id').get((req, res) => {
  Recipe.findById(req.params.id)
    .exec((err, recipe) => {
      if (err) {
        return err;
      }
      if (recipe == null) {
        const err = new Error("Recipe not found");
        err.status = 404;
        return err;
      }
      console.log(recipe)
      res.json(recipe);
    });
});

module.exports = router;
