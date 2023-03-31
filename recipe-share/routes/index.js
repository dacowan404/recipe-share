const express = require('express');
const jwt = require('jsonwebtoken');
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

function verifyToken(req, res, next) {
  //get auth header value
  const bearerHeader = req.headers['authorization'];
  // check if bearer if undefined
  if (typeof bearerHeader !== 'undefined') {
    // get bearer from header
    const bearer = bearerHeader.split(' ');
    const bearerToken = bearer[1];
    req.token = bearerToken;
    next();
  }
  else {
    // Forbidden
    res.status(403).json({mess: 'here'});
  }
}

// recipe routes
router.get('/myrecipes', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err,  authData) => {
    if (err) {
      console.log(err)
      res.status(403).json({message: '44'})
    } else {
      Recipe.find({creator: authData.userInfo.id})
      .sort({likes:-1})
      .then(recipes => res.status(200).json(recipes))
      .catch(err => res.status(400).json('Error 49' + err))
    }
  })
})
/*router.route('/myrecipes/').get((req, res) => {
  Recipe.find({creator: req.params.id})
  .sort({likes:-1})
  .then(recipes => res.json(recipes))
  .catch(err => res.status(400).json('Error routes/index.js ' + err))
}); */

// liked recipes 

// create new recipe
router.get('/createRecipe', recipe_controller.recipe_create_get);
//router.post('/createRecipe', recipe_controller.recipe_create_post);
router.post('/createRecipe', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      console.log(err)
      res.status(403).json({message: '44'})
    } else {
    const newRecipe = new Recipe({   
      name: req.body.name,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      description: req.body.description,
      notes: req.body.notes,
      creator: authData.userInfo.id,
      editedDate: req.body.editedDate
    })

  newRecipe.save().then((result)=> {
    res.status(200).json(result.id)
  })
    .catch(err => res.status(400).json('Error routes.index.js ' + err));
}});
})

// delete recipe
//router.get('/recipe/:id/delete', recipe_controller.recipe_delete_get);
//router.post('/recipe/:id/delete', recipe_controller.recipe_delete_post);
router.delete('/recipe/:id', verifyToken, (req, res, next) => {
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
      jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
          console.log(err);
          res.status(403).json({message: 106})
        } else if (results.creator == authData.userInfo.id){
          Recipe.findByIdAndRemove(req.params.id, (err) => {        
            if (err) {          
              return next(err);        
            }        
            res.status(200).json("successfully deleted");      
          })
        } else {
          res.status(403).json("Unable to delete recipe, incorrect user");
        }
      })
    }
  )
})

// update recipe
router.put('/recipe/:id', verifyToken, (req, res, next) => {
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
    jwt.verify(req.token, 'secretKey', (err, authData) => {
      if (err) {
        console.log(err);
        res.status(403).json({message: 137})
      } else if (results.creator == authData.userInfo.id) {
        Recipe.findByIdAndUpdate(req.params.id, {
          name: req.body.name,
          ingredients: req.body.ingredients,
          steps: req.body.steps,
          description: req.body.description,
          notes: req.body.notes,
          editedDate: req.body.editedDate
        }, (err, results) => {
          if (err)  {
            console.log(err);
            res.status(400).json({message: 149})
          } else {
            res.status(200).json(req.params.id)
          }
        })
      } else {
        console.log(res.data.creator, req.body.creatorID);
        res.status(403).json('incorrect user logged in');
      }
    })
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
