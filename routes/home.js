const express = require("express");
const app = express();

app.get("/", (req,res)=> {
    res.render("home.hbs");
})

module.exports = app;