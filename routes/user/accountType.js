const express = require("express");
const app = express();

app.get("/account-type", (req,res) => {
    res.render("user/account-type.hbs")
})

module.exports = app;