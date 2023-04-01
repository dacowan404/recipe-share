const User = require("../models/user");

// Display User create form on GET.
exports.user_create_get = (req, res) => {
  res.render("user_form");
};

// Handle User create on POST.
exports.user_create_post = (req, res) => {
  const user = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  }).save(err => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
};