const express = require("express");
const app = express();
const hbs = require('hbs');
const Tour = require("./models/Tour");
const Guide = require("./models/Guide");
const user = require("./models/User");
const Tourist = require("./models/Tourist");
const createError = require('http-errors');
const refreshSession = require("./middleware/refreshSession");
require("dotenv").config();

hbs.registerPartials(__dirname + '/views/partials');
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.locals.title = "Aloha 'Ohana"
var session = require('express-session')
var sessionOptions = {
    secret: 'keyboard cat', // don't change it for now. This decides how your sid is going to be created
    cookie: {}
  }
  
app.use(session(sessionOptions));

app.set('views', './views');
app.set('view engine', 'hbs');

const mongoose = require("mongoose");

let options = { 
                useNewUrlParser: true,  
                useUnifiedTopology: true 
            };

mongoose.connect(process.env.MONGODB_URI, options ,(err, connectionInfo)=> {
    if(err) console.log("ERROR", err);

}).then((x) => {
  console.log(`Connected to database: ${x.connections[1].name}`)
})

function protectUser(req, res, next) {
  if(req.session.user || req.session.guide) next();
  else {
      req.session.redirectUrl = req.originalUrl; // save the route the user was trying to go to in the session
      res.redirect("/authorization/login") // after the successfull login we're redirecting to this route. Checkout the Post login route. //AUTH
  };
}

function protectTourist(req,res,next) {
  if(req.session.user.touristProfile) next();
  else res.redirect("/tourist/create-profile");
}

function protectGuide(req,res,next) {
  if(req.session.user.guideProfile) next();
  else res.redirect("/guide/create-profile");
}



// by default if there is no role then automatically your role becomes "tourist".
app.use((req, res, next)=> { 
  //console.log("SESSION>>>>>",req.session)
  if(req.session.user) res.locals.user = req.session.user;
  if(!req.session.role){
    req.session.role = {
      tourist: true,
      guide: false
    }
    
  }
  res.locals.role = req.session.role;
  next();
})
app.use(refreshSession);

app.use(express.static('uploads'));
app.use(express.static('public'));
// general routes
app.use("/", require("./routes/home"));
app.use("/", require("./routes/about"));
app.use("/authorization", require("./routes/authorization"));
app.use("/user", protectUser, require("./routes/user/index"));
app.use("/tours", require("./routes/search"));

// tourist routes
app.use("/tourist/tours", protectUser, require("./routes/tourist/tours"));
app.use("/tourist/create-profile", protectUser, require("./routes/tourist/create-profile"));
app.use("/tourist/switch-role", protectTourist, require("./routes/tourist/switch-role"));

// guide routes
app.use("/guide/tours", protectUser, require("./routes/guide/tours")); //protect
app.use("/guide/create-profile", protectUser, require("./routes/guide/create-profile")); // todo
app.use("/guide/switch-role", protectGuide, require("./routes/guide/switch-role"));

// remember the page the user came from
// pass user state/session info to all hbs files
app.use((err, req, res, next)=> {
  console.log("ERROR", err)
  //res.render("error", err)
  res.render("home", {createerror: "something went wrong :("})
})

app.listen(process.env.PORT,()=> {
  console.log("Webserver listening");
})