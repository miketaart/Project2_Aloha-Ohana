const express = require("express");
const app = express();
const Guide = require("../../models/Guide");
const User = require("../../models/User");

const createError = require('http-errors')

app.get("/", (req,res)=> {
    //if (req.session.user.guideProfile) res.redirect("/guide/switch-role")
    //else res.render("/guide/create-profile");
    res.render("guide/create-profile.hbs");
})



app.post("/", (req,res, next)=> {
    Guide.create({
        about: req.body.about,
        favorite_city: req.body.favorite_city,
        languages: req.body.languages,
        
    })
    .then((guide)=> {
        //console.log("USER OBJECT>>>>>>", req.session)
        return User.findByIdAndUpdate(req.session.user._id, {
            guideProfile: guide.id
        })
    })
    .then(() => {
        res.redirect("/guide/switch-role");
    })
    .catch(err => console.log(err))
})

module.exports = app;