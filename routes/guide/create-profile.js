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

    })
    .then((guide)=> {
        return User.findByIdAndUpdate(req.session.user._id, {
            touristProfile: guide.id
        })
    })
    .catch((err)=> {

    })
})


module.exports = app;