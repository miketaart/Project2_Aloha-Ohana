const express = require("express");
const app = express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require("../../models/User");

app.get("/upload-profile-pic", (req,res)=> {
    res.render("user/profile-picture.hbs");
})

app.post("/upload-profile-pic", upload.single('profile-picture'), (req,res)=> {
    User.findByIdAndUpdate(req.session.currentUser._id,{
        profile_pic: req.file.filename
    })
    .then((user)=> {
        req.session.currentUser.profile_pic = req.file.filename; // update the session data so that we can base views on it (like profile.hbs or in the navbar)
        res.redirect("/user/upload-profile-pic")
    })
    .catch((err)=> {
        res.send("err", err)
    })
})

module.exports = app;