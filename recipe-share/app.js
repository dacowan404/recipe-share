var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const cors = require('cors');

require('dotenv').config();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

const mongoose = require('mongoose');
const { mainModule, emitWarning } = require('process');
const User = require('./models/user');
const { doesNotMatch } = require('assert');
mongoose.set('strictQuery', false);
const mongoDB_URI = process.env.MONGO_URI;
main().catch(err =>  console.log(err));
async function main() {
  await mongoose.connect(mongoDB_URI);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(session({ secret: "cats", resave: false, saveUninitialized: true, cookie: {maxAge:60*60*100} }));
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

passport.serializeUser(function(user, done) {
  done(null, user.id);
});
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

app.use(logger('dev'));
app.use(cors({
  origin: "http://localhost:3000",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
  },
  {
    origin: "http://localhost:3000/login",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

const CLIENT_URL = "http://localhost:3000/";
let userID = null;

app.get("/auth/login/success", (req, res) => {
  if(userID) {
    User.findById(userID)
      .then((results) => {
        res.status(200).json({
          success:true,
          message: "successful",
          userID: userID,
          userName: results.username,
          cookies: req.cookies
        })
      })
  }
  else {
    res.status(202).json({
      success:false,
      message: "info from the backend",
      userID: null,
      user: null
    })
  }
});

app.get("/auth/login/failed", (req,res) => {
 res.status(401).json({
     success:false,
     message: "failure",
 });
});

app.get("/auth/logout", (req, res, next) => {
 req.logout(function (err) {
  if (err) {
    return next(err);
  }
  userID = null;
  res.status(200).json({
    logout: true
  })
 });
});

app.post("/auth/login", 
  passport.authenticate("local", {failureRedirect:"/auth/login/failed"}), 
  (req, res) => {
    userID = req.user._id;
    res.status(200).json({
      user: {
        userName: req.user.username,
        userID : req.user._id
      },
      //req.user,
      success: true,
    }) 
  }
);

app.get('/auth/login/callback',
  passport.authenticate("local", {successRedirect: CLIENT_URL, failureRedirect:"auth/login/failed"
  })
)


/*
app.get('/login', (req, res, next) => {
  res.render('login')});
app.post("/login",
  passport.authenticate("local", {successRedirect: "/",failureRedirect: "/"})
);
app.get('/logout', (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  })
})
*/

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;