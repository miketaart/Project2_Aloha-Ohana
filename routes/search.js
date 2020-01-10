const express = require("express");
const app = express();
Tour = require("../models/Tour");


app.get("/results", (req,res, next)=> {
    console.log(req.query.search)
    let city = req.query.search //queries here also means queries in searchbar.hbs???
    Tour.find({city})
    .then((tours)=> {
        res.render("search-results.hbs", {tours});
        console.log(tours)
    })
    .catch((err)=> {
        console.log("Err", err);
        next(createError(500, 'Sorry, our database crashed. Please come back later.'))
    })
})

module.exports = app;