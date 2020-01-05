const express = require("express");
const app = express();
const Tour = require("../models/Tour");



app.get("/tours/delete/:id", (req,res)=> {
    let tourId = req.params.id
    Tour.findByIdAndDelete(tourId)
        .then(() => {
            res.redirect("/tours")
        })
        .catch(err => console.log(err));
});



module.exports = app;