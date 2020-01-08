const express = require("express");
const app = express();
const Tourist = require("../../models/Tourist");
const User = require("../../models/User");

const createError = require('http-errors')

app.get("/", (req,res)=> {
    res.render("tourist/create-profile.hbs");
})

app.post("/", (req,res, next)=> {
    Tourist.create({

    })
    .then((tourist)=> {
        return User.findByIdAndUpdate(req.session.user._id, {
            touristProfile: tourist.id
        })
    })
    .catch((err)=> {

    })
})


module.exports = app;