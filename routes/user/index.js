const express = require("express");
const app = express();
const multer  = require('multer');
const upload = multer({ dest: 'uploads/' });
const User = require("../../models/User");

app.get("/profile", (req,res)=> {
    res.render("user/profile.hbs");
})

app.post("/profile", upload.single('profile-picture'), (req,res)=> {
    User.findByIdAndUpdate(req.session.currentUser._id,{
        profile_picture: req.file.filename
    })
    .then((user)=> {
        req.session.currentUser.profile_picture = req.file.filename; // update the session data so that we can base views on it (like profile.hbs or in the navbar)
        res.redirect("/user/profile")
    })
    .catch((err)=> {
        res.send("err", err)
    })
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//POST method 
app.post("/edit/:id", (req, res) => {
    let tourId = req.params.id
    let editTour = {
        title: req.body.title,
        duration: req.body.duration,
        guide_name: req.body.guide_name,
        image: req.body.image,
        city: req.body.city,
        description: req.body.description

        
    }

    Tour.findByIdAndUpdate(userId, editUser, {new:true})
    .then((newUser) => {
        res.redirect("/user/profile")
    })
    .catch(err => console.log(err))
})

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app;