var express = require('express');
var router = express.Router();
const userSchema = require("./users");
const localStrategy = require("passport-local");
const passport = require('passport');
passport.use(new localStrategy(userSchema.authenticate()));

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Login page. */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET Register page. */
router.get('/register', function(req, res, next) {
  res.render('register');
});

/* GET Login page. */
router.get('/dashboard',isLoggedIn, function(req, res, next) {
  res.render('dashboard');
});

/* Post Register page. */
router.post('/register', async function(req, res, next) {
  const newUser = new userSchema({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.phone,
    secret: req.body.secret
  });
  await userSchema.register(newUser, req.body.password)
  .then((registeredUser)=>{
    passport.authenticate("local")(req, res, function(){
      res.redirect("/dashboard");
    })
  })
});

// Code for Login
router.post("/login", passport.authenticate("local",{
  successRedirect: "/dashboard",
  failureRedirect: "/",
}), function(req,res){});

// Code for logout
router.get("/logout", function(req, res, next){
  req.logout(function (err){
    if(err) {return next(err)};
    res.redirect("/");
  })
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;
