const User = require("../models/user");

// Display detail page for a specific User.
exports.user_detail = (req, res) => {
  res.send(`NOT IMPLEMENTED: User detail: ${req.params.id}`);
};

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

// Display User delete form on GET.
exports.user_delete_get = (req, res) => {
  res.send("NOT IMPLEMENTED: User delete GET");
};

// Handle User delete on POST.
exports.user_delete_post = (req, res) => {
  res.send("NOT IMPLEMENTED: User delete POST");
};

// Display User update form on GET.
exports.user_update_get = (req, res) => {
  res.send("NOT IMPLEMENTED: User update GET");
};

// Handle User update on POST.
exports.user_update_post = (req, res) => {
  res.send("NOT IMPLEMENTED: User update POST");
};
