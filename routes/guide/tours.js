const express = require("express");
const app = express();
const Tour = require("../../models/Tour");
const Guide = require("../../models/Guide")
const mongoose = require("mongoose")

app.get("/list", (req,res, next)=> {
    Tour.find({})
    .then((tours)=> {
        res.render("tours/tours.hbs", {tours:tours});
    })
    .catch((err)=> {
        console.log("Err", err);
        next(createError(500, 'Sorry, our database crashed. Please come back later.'))
    })
    // lala
})

app.get("/detail", (req,res)=> {
    let tourId = req.query.id //queries here also means queries in list.hbs
    Tour.findById(tourId)
        .populate("guideProfile")
        .then((tour)=> {
            res.render("tours/view-tour.hbs", { tour: tour });
        })
        .catch((err)=> {
            console.log(("error", err));
        })
})

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
        description: req.body.description,
        guideProfile: mongoose.Types.ObjectId(req.session.user.guideProfile)
    }

    Tour.create(newTour)
    .then(() => {
        res.redirect("/guide/tours/list")
    })
    .catch(err => console.log(err))
})




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
        res.redirect(`/tourist/tours/detail?id=${newTour.id}`)
    })
    .catch(err => console.log(err))
})

app.get("/delete/:id", (req,res)=> {
    let tourId = req.params.id
    Tour.findByIdAndDelete(tourId)
        .then(() => {
            res.redirect("/guide/tours/list")
        })
        .catch(err => console.log(err));
});



module.exports = app