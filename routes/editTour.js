const express = require("express");
const app = express();
const Tour = require("../models/Tour");



//GET method + PARAMS
app.get("/edit/:id", (req, res) => {
    let tourId = req.params.id
    Tour.findById(tourId)
        .then((tour) => {
            res.render("tours/editTour.hbs", { tour: tour })
        })
        .catch(err => console.log((err)))
})



//POST method 
app.post("/edit/:id", (req, res) => {
    let tourId = req.params.id
    let editTour = {
        title: req.body.title,
        duration: req.body.duration,
        guide_name: req.body.guide_name,
        image: req.body.image,
        city: req.body.city,
        description: req.body.description
    }

    Tour.findByIdAndUpdate(tourId, editTour, {new:true})
    .then((newTour) => {
        res.redirect(`/tour?id=${newTour.id}`)
    })
    .catch(err => console.log(err))
})

module.exports = app