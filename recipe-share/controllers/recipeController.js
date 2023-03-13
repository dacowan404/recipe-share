const recipe = require("../models/recipe");
const Recipe = require("../models/recipe");
const user = require("../models/user");
const User = require("../models/user");

// need an index/home page showing top recipes. idk where to put it

exports.recipe_list = (req, res, next) => {
  // need to limit number of responses in the future
  Recipe.find({})
  .sort({likes: -1})
  .exec(function (err, list_recipes) {
    if (err) {
      return next(err);
    }
    res.render("recipe_list", {title: "Most Popular Recipes", recipe_list: list_recipes});
  });
}

exports.my_recipe_list = (req, res, next) => {
  Recipe.find({creator: req.params.id})
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
      recipes
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
      });
    });
};

exports.recipe_create_get = (req, res, next) => {
  res.render("recipe_form");
};

// Handle recipe create on POST.
exports.recipe_create_post = (req, res) => {
  res.send(`NI: recipe create post, user: ${req.params}`);
}

// Display Recipe delete form on GET.
exports.recipe_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Recipe delete GET");
};

// Handle Recipe delete on POST.
exports.recipe_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Recipe delete POST");
};

// Display Recipe update form on GET.
exports.recipe_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: Recipe update GET");
};

// Handle Recipe update on POST.
exports.recipe_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: Recipe update POST");
};