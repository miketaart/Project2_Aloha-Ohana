const express = require("express");
const app = express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require("../../models/User");

app.get("/profile", (req,res)=> {
    res.render("user/profile.hbs");
})

app.post("/profile", upload.single('profile_picture'), (req,res)=> {
    User.findByIdAndUpdate(req.session.user._id,{
        profile_picture: req.file.filename
    })
    .then((user)=> {
        req.session.user.profile_picture = req.file.filename; // update the session data so that we can base views on it (like profile.hbs or in the navbar)
        res.redirect("/user/profile")
    })
    .catch((err)=> {
        res.send("err", err)
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/profile/edit", (req,res)=> {
    res.render("user/edit-profile.hbs");
})
//POST method 
app.post("/profile/edit", (req, res) => {
    let userId = req.session.user._id
    let editUser = {
        phone: req.body.phone,
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthday: req.body.birthday
    }

    User.findByIdAndUpdate(userId, editUser, {new:true})
    .then((newUser) => {
        res.redirect("/user/profile")
    })
    .catch(err => console.log(err))
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;