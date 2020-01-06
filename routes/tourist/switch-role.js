const express = require("express");
const app = express();
const createError = require('http-errors')

app.get("/", (req,res)=> {
    req.session.role.tourist = true;
    req.session.role.guide = false;
    
    res.redirect("/");
})

module.exports = app;