const express = require("express");
const app = express();
Tour = require("../models/Tour");


app.get("/results", (req,res, next)=> {
    let city = req.query.search //queries here also means queries in searchbar.hbs???
    Tour.find({city})
    .then((tours)=> {
        res.render("search-results.hbs", {tours:tours});
    })
    .catch((err)=> {
        console.log("Err", err);
        next(createError(500, 'Sorry, our database crashed. Please come back later.'))
    })
    // lala
})

module.exports = app;