const express = require("express");
const app = express();
const Tour = require("../../models/Tour");

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


module.exports = app