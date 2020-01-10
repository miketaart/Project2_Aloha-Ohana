const express = require("express");
const app = express();

app.get("/", (req,res)=> {
    res.render("home.hbs");
})

app.get("/coming-soon", (req,res) =>{
    res.render("comingsoon.hbs");
})

module.exports = app;