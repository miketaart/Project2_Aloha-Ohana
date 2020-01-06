const express = require("express");
const app = express();
const Tour = require("../models/Tour");

app.get("/tour", (req,res)=> {
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

module.exports = app