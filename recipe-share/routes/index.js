const express = require('express');
const router = express.Router();

const recipe_controller = require('../controllers/recipeController');
const Recipe = require('../models/recipe');

/* GET home page. */

router.get('/', (req, res, next) => {
  res.render("index", { title: "Express", user: req.user });
});

//router.get('/explore', recipe_controller.recipe_list);
router.route('/explore/').get((req, res) => {
  Recipe.find({})
  .sort({likes: -1})
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error routes/index.js ' + err))
});

// recipe routes
router.route('/myrecipes/:id').get((req, res) => {
  Recipe.find({creator: req.params.id})
  .sort({likes:-1})
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error routes/index.js ' + err))
});

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
//router.get('/recipe/:id/delete', recipe_controller.recipe_delete_get);
//router.post('/recipe/:id/delete', recipe_controller.recipe_delete_post);
router.route('/recipe/:id/delete').post((req, res, next) => {
  async function recipe(callback) {
    await Recipe.findById(req.params.id).exec(callback);
  }
  recipe(
    (err, results) => {
      if  (err) {
        return next(err);
      }
      if (results == null) {
        res.status(204).json('No results found');
      }
      if (results.creator == req.body.userID) {
        Recipe.findByIdAndRemove(req.params.id, (err) => {        
          if (err) {          
            return next(err);        
          }        
          res.status(200).json("successfully deleted");      
        })
      } else {
        res.status(403).json("Unable to delete recipe, incorrect user");
      }
    }
  )
})

// update recipe
router.route('/recipe/edit/:id').post((req, res, next) => {
  async function recipe(callback) {
    await Recipe.findById(req.params.id).exec(callback);
  }
  recipe((err, results) => {
    if (err) {
      return next(err);
    }
    if (results == null) {
      res.status(204).json('No results found');
    }
    if (true) { //check if user logged is user that created the recipe
    Recipe.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      description: req.body.description,
      notes: req.body.notes,
      editedDate: req.body.editedDate
    }, (err, results) => {
      if (err) {
        console.log(err);
        res.status(400).json('Request failed');
      } else {
        res.status(200).json('recipe updated');
      }
    });
    } else {
      console.log(res.data.creator, req.body.creatorID);
      res.status(403).json('incorrect user logged in');
    }
  })
})
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
      //console.log(recipe)
      res.json(recipe);
    });
});

module.exports = router;
