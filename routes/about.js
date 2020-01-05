const express = require("express");
const app = express();

app.get("/about", (req,res)=> {
    res.render("about.hbs");
})

module.exports = app;