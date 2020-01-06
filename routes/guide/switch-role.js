const express = require("express");
const app = express();
const createError = require('http-errors')

app.get("/", (req,res)=> {
    req.session.role.tourist = false;
    req.session.role.guide = true;
    res.redirect("/");
})

module.exports = app;