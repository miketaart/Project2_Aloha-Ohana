const express = require("express");
const app = express();
const Guide = require("../../models/Guide");
const User = require("../../models/User");

const createError = require('http-errors')

app.get("/", (req,res)=> {
    res.render("guide/create-profile.hbs");
})

app.post("/", (req,res, next)=> {
    Guide.create({
        about: req.body.about,
        your_country: req.body.your_country,
        your_city: req.body.your_city,
        favorite_city: req.body.favorite_city,
        languages: req.body.languages,
        birthday: req.body.birthday

    })
    .then((guide)=> {
        //console.log("USER OBJECT>>>>>>", req.session)
        return User.findByIdAndUpdate(req.session.user._id, {
            guideProfile: guide.id
        })
    })
    .then(() => {
        res.redirect("/");
    })
    .catch(err => console.log(err))
})

module.exports = app;