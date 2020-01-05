const express = require("express");
const app = express();
const User = require("../models/User");
const bcrypt = require('bcrypt');
const createError = require('http-errors')

app.get("/signup", (req,res)=> {
    res.render("authorization/signup.hbs");
})

app.post("/signup", (req,res, next)=> {

    bcrypt.hash(req.body.password, 10, function(err, hash) {
        if(err) return next(createError(500, "Hashing failed. Trying to hack us?"));
        // Store hash in your password DB.
        User.findOne({username: req.body.username})
        .then((user)=> {
            if(user) {
                let error = new Error();
                error.message = "Username already exists";
                error.type = "Availability Error";
                throw error;
            }
            return User.create({
                username: req.body.username,
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                email: req.body.email,
                password: hash
            })
        })
        .then((user)=> {
            res.redirect("/login");
        })
        .catch((error)=> {
            if(error.type === "Availability Error") next(createError(400, error));
            else if(error.name === "ValidationError") next(createError(400, error.message));
            else next(createError(500, "Woow, our database crashed. Please come back later."))
        })
    }); 
})

app.get("/login", (req,res)=> {
    res.render("authorization/login.hbs");
})

app.post("/login", (req,res)=> {
    User.findOne({username: req.body.username})
        .then((user)=> {
            if(!user) res.status(403).render("error");
            else { 
                bcrypt.compare(req.body.password, user.password, function(err, correct) {
                    if(err) return res.render("error");
                    else if(correct) {
                        req.session.currentUser = user;
                        if(req.session.redirectUrl) {
                            res.redirect(req.session.redirectUrl) // redirect to the url the user was trying to go to (checkout the protect middleware in app.js)
                        } else {
                            res.redirect("/"); // default redirect url (if the user is going to login directly)
                        }
                    } else {
                        res.status(403).render("error", err);        
                    }
                });                
            }
        })
})

app.get("/logout", (req,res)=> {
    req.session.destroy(); // delete all data attached to the session
    res.redirect("/")
})

app.get("/username-availability/:username", (req,res)=> {
    User.findOne({username: req.params.username})
        .then((user)=> {
            if(user) res.json({available: false});
            else res.json({available: true});
        })
        .catch((error)=> {
            res.json(createError(500, "A server error has occurred."));
        })
})

module.exports = app;