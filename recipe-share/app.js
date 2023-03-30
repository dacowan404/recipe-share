var createError = require('http-errors');
var express = require('express');
const jwt = require('jsonwebtoken');
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
const { user_detail } = require('./controllers/userController');
mongoose.set('strictQuery', false);
const mongoDB_URI = process.env.MONGO_URI;
main().catch(err =>  console.log(err));
async function main() {
  await mongoose.connect(mongoDB_URI);
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

//.use(session({ secret: "cats", resave: false, saveUninitialized: true, cookie: {maxAge:60*60*100} }));
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
passport.deserializeUser(async function(id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch(err) {
    done(err);
  };
});
/*
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
*/

app.use(passport.initialize());
//app.use(passport.session());
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

//const CLIENT_URL = "http://localhost:3000/";
//let userID = null;

/*
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

*/
app.get("/auth/login/failed", (req,res) => {
  res.status(401).json({
      success:false,
      message: "failed login",
  });
 });

app.get("/auth/logout", (req, res, next) => {
  res.status(200).json({
    logout: true
  });
  // idk how to delete token but could add user/token to list after loggout and compare 
});

app.get('/test2', (req, res) => {
  res.status(200).json({message: 'this works'});
})

app.post('/test2', (req, res) => {
  jwt.sign({user:'test1'}, 'secretKey', {expiresIn:'1h'}, (err, token) => {
    res.json({token}) //front-end save token in localStorage //send request with headers : Authorization : Bearer <token>
}) });

//protected route
app.get('/test', verifyToken, (req, res) => {
  jwt.verify(req.token, 'secretKey', (err, authData) => {
    if (err) {
      console.log(err);
      res.status(203).json({message: "157"});
    } else {
      res.status(200).json({
        message: 'cool',
        authData
      });
    }
  })

})
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

//login route
app.post('/auth/login', function (req, res, next) {

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
  const token = jwt.sign({userInfo}, 'secretKey', {expiresIn: 604800});
             res.status(200).json({userName:user.username, userID: user._id, token});
          });
      })(req, res);
  });



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