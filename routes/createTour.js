const express = require("express");
const app = express();
const Tour = require("../models/Tour");

app.get("/create", (req,res) => {
    res.render("tours/createTour.hbs")
})

app.post("/create", (req, res) => {
    let newTour = {
        title: req.body.title,
        duration: req.body.duration,
        guide_name: req.body.guide_name,
        image: req.body.image,
        city: req.body.city,
        description: req.body.description
    }

    Tour.create(newTour)
    .then(() => {
        res.redirect("/tours")
    })
    .catch(err => console.log(err))
})


module.exports = app