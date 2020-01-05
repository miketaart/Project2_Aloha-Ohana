const express = require("express");
const app = express();
const Tour = require("./models/Tour");
const createError = require('http-errors')

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

mongoose.connect("mongodb://localhost:27017/Aloha-Ohana", options ,(err, connectionInfo)=> {
    if(err) console.log("ERROR", err);
    else console.log("connected to db");
})

function protect(req, res, next) {
  if(req.session.currentUser) next();
  else {
      req.session.redirectUrl = req.originalUrl; // save the route the user was trying to go to in the session
      res.redirect("/auth/login") // after the successfull login we're redirecting to this route. Checkout the Post login route
  };
}
app.use((req, res, next)=> {
  if(req.session.currentUser) res.locals.user = req.session.currentUser;
  next();
})

app.use(express.static('uploads'));
app.use(express.static('public'));

app.use("/", require("./routes/tours.js"));
app.use("/", require("./routes/authorization.js"));
app.use("/user", protect, require("./routes/user.js"));
app.use("/", require("./routes/home"));
app.use("/", require("./routes/about"));
app.use("/", require("./routes/createTour.js"));
app.use("/", require("./routes/tour.js"));
app.use("/", require("./routes/editTour.js"));
app.use("/", require("./routes/deleteTour.js"));

// remember the page the user came from
// pass user state/session info to all hbs files

app.use((err, req, res, next)=> {
  console.log("ERROR", err)
  res.render("error", err)
})

app.listen(3000,()=> {
  console.log("Webserver listening");
})