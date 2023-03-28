const recipe = require("../models/recipe");
const Recipe = require("../models/recipe");
const user = require("../models/user");
const User = require("../models/user");
const { param } = require("../routes");

const { body, validationResult } = require("express-validator");

// need an index/home page showing top recipes. idk where to put it

exports.recipe_list = (req, res, next) => {
  // need to limit number of responses in the future
  Recipe.find({})
  .sort({likes: -1})
  .exec(function (err, list_recipes) {
    if (err) {
      return next(err);
    }
    res.render("recipe_list", {title: "Most Popular Recipes", recipe_list: list_recipes, user:req.user});
  });
}

exports.my_recipe_list = (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  } 
  Recipe.find({creator: req.user.id})
  .exec((err, recipes) => {
    if (err) {
      return next(err);
    }
    if (recipes == null) {
      const err = new Error("No recipes for user");
      err.status = 404;
      return next(err);
    }
    res.render("recipe_list", {
      recipe_list: recipes,
      user: req.user
    })
  })
}

exports.recipe_detail = (req, res, next) => {
  Recipe.findById(req.params.id)
    .exec((err, recipe) => {
      if (err) {
        return next(err);
      }
      if (recipe == null) {
        // No results.
        const err = new Error("Recipe not found");
        err.status = 404;
        return next(err);
      }
      // Successful, so render.
      res.render("recipe_detail", {
        recipe,
        user: req.user,
      });
    });
};

exports.recipe_create_get = (req, res, next) => {
  if (req.user === undefined) {
    res.redirect("/login");
  } else {
    res.render("recipe_form", {user: req.user});
  }
};

// Handle recipe create on POST.
exports.recipe_create_post = [
  // Validate and sanitize fields.
  body("name", "Name must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("description")
    .trim()
    .escape(),
  body("ingredients", "Ingredients must not be empty")
    .trim()
    //.isLength({ min: 1 })
    .escape(),
  body("steps", "Steps must not be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("notes").trim().escape(),
  (req, res, next) => {
    const errors = validationResult(req);

    console.log(req.body.ingredients);
    const recipe = new Recipe({
      name: req.body.name,
      ingredients: req.body.ingredients,
      steps: req.body.steps,
      description: req.body.description,
      notes: req.body.notes,
      creator: req.user.id
    });

    recipe.save((err) => {
      if (err) {
        return next(err);
      }
      res.redirect(recipe.url);
    })
  }
]
// Display Recipe delete form on GET.
exports.recipe_delete_get = (req, res, next) => {
  async function recipe(callback) {
    await Recipe.findById(req.params.id).exec(callback); 
  }
  recipe(
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results == null) {
        res.redirect('/') // recipe not found
      }
      res.render("recipe_delete", {
       recipe: results, 
        user: req.user
      });
  });
};

// Handle Recipe delete on POST.
exports.recipe_delete_post = (req, res, next) => {
  async function recipe(callback) {
    await Recipe.findById(req.params.id).exec(callback); 
  }
  recipe(
    (err, results) => {
      if (err) {
        return next(err);
      }
      if (results == null) {
        res.redirect("/myRecipes");
      }
      Recipe.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect("/myRecipes");
      })
  });
};

// Display Recipe update form on GET.
exports.recipe_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Recipe update GET");
};

// Handle Recipe update on POST.
exports.recipe_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Recipe update POST");
};