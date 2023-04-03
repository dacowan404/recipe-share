const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require("../models/user");
const passport = require('passport');
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  new LocalStrategy((username, password, done) => {
    User.findOne({ username: username }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, {message: "Incorrect Username" });
      }
      if (user.password !== password) {
        return done(null, false, {message: "Incorrect Password"});
      }
      return done(null, user);
    });
  })
);

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
    res.status(403).json({mess: 'invalid access token'});
  }
}

// need to create token and login after creating user
router.route('/new-user').post((req, res) => {
  const newUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  });

  newUser.save()
    .then(() => {
      passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
          console.log('54');
          return res.status(401).json({
            message: 'Something is not right',
            user : user.username
          });
        }
      req.login(user, {session: false}, (err) => {
        if (err) {
          console.log('62');
          res.send(err);
        }
        console.log(user);
        const userInfo = { 
          username: user.username,
          email: user.email,
          id: user._id
        }
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign({userInfo}, 'secretKey', {expiresIn: "1h"});
                  res.status(200).json({userName:user.username, userID: user._id, token});
                });
            })(req, res);
    })
    .catch(err => res.status(400).json('Error routes/users.js ' + err));
})

router.get("/auth/checkLogin", verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      console.log(err);
      res.status(403).json({mess:58})
    } else {
      res.status(200).json({
        userName: authData.userInfo.username,
        userID: authData.userInfo.id
      })
    }
  })
});

router.get("/auth/login/failed", (req,res) => {
  res.status(401).json({
      success:false,
      message: "failed login",
  });
 });

router.get("/auth/logout", (req, res, next) => {
  res.status(200).json({
    logout: true
  });
  // idk how to delete token but could add user/token to list after loggout and compare 
});

//login route
router.post('/auth/login', function (req, res, next) {
  passport.authenticate('local', {session: false}, (err, user, info) => {
    if (err || !user) {
      console.log('186');
      return res.status(401).json({
        message: 'Something is not right',
        user : user.username
      });
    }
  req.login(user, {session: false}, (err) => {
    if (err) {
      console.log('197');
      res.send(err);
    }
    const userInfo = { 
      username: user.username,
      email: user.email,
      id: user._id
    }
    // generate a signed json web token with the contents of user object and return it in the response
    const token = jwt.sign({userInfo}, 'secretKey', {expiresIn: "1h"});
              res.status(200).json({userName:user.username, userID: user._id, token});
            });
        })(req, res);
  });

  module.exports = router;
