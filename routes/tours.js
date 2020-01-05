const express = require("express");
const app = express();
const createError = require('http-errors')

app.get("/tours", (req,res, next)=> {
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

module.exports = app;