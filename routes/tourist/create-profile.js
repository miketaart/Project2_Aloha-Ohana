const express = require("express");
const app = express();
const Tourist = require("../../models/Tourist");
const User = require("../../models/User");

const createError = require('http-errors')

app.get("/", (req,res)=> {
    //******if tourist profile already exists then error. else render tourist/create-profile.hbs
    res.render("tourist/create-profile.hbs");
})

app.post("/", (req,res, next)=> {
    Tourist.create({
        //about: req.body.about,
        your_country: req.body.your_country,
        your_city: req.body.your_city,
        favorite_city: req.body.favorite_city,
        languages: req.body.languages,
        birthday: req.body.birthday

    })
    .then((tourist)=> {
        //console.log("USER OBJECT>>>>>>", req.session)
        return User.findByIdAndUpdate(req.session.user._id, {
            touristProfile: tourist.id
        })
    })
    .then((user) => {
        res.redirect("/");
    })
    .catch(err => console.log(err))
})




module.exports = app;