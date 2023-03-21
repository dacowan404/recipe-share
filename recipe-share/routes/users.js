var express = require('express');
var router = express.Router();

const user_controller = require('../controllers/userController');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// user routes

// login
//router.get('/login', user_controller)
//router.post('/login' user_controller)

// create new user
router.get('/new-user', user_controller.user_create_get)
router.post('/new-user', user_controller.user_create_post)

// delete account - not going to implement at this time

// update password/email

module.exports = router;
