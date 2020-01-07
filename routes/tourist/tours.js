const express = require("express");
const app = express();
const Tour = require("../../models/Tour");
const Tourist = require("../../models/Tourist");

app.get("/detail", (req,res)=> {
    let tourId = req.query.id //queries here also means queries in list.hbs
    Tour.findById(tourId)
        //.populate("guideProfile")
        .then((tour)=> {
            res.render("tours/view-tour.hbs", { tour: tour });
        })
        .catch((err)=> {
            console.log(("error", err));
        })
})

app.get("/list", (req,res, next)=> {
    Tour.find({})
    .then((tours)=> {
        res.render("tours/tours.hbs", {tours:tours});

    })
    .catch((err)=> {
        console.log("Err", err);
        next(createError(500, 'Sorry, our database crashed. Please come back later.'))
    })
})


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// find by document id and update and push item in array
/*users.findByIdAndUpdate(userID,
    {$push: {friends: friend}},
    {safe: true, upsert: true},
    function(err, doc) {
        if(err){
        console.log(err);
        }else{
        //do stuff
        }
    }
); */

/*
//POST method 
app.post("/detail", (req, res) => {
    let tourId = req.params.id
    let purchasedTour = {
        purchased_tours: req.body.purchased_tours
    }

    Tourist.findByIdAndUpdate(tourId, purchasedTour, {new:true})
    .then((newTour) => {
        res.redirect(`/tourist/tours/detail?id=${newTour.id}`)
    })
    .catch(err => console.log(err))
})
*/

app.get("/add", (req,res, next)=> {
    Tourist.find({})
    .then((tours)=> {
        res.render("tours/tours.hbs", {tours:tours});

    })
    .catch((err)=> {
        console.log("Err", err);
        next(createError(500, 'Sorry, our database crashed. Please come back later.'))
    })
})

app.post("/add", (req, res) => {
    let tourId = req.params.id;
    let touristId = req.Tourist._id;
    let newTourist = {
        trigger: req.body.trigger,
        purchased_tours: req.body.purchased_tours
    }

    Tourist.create(newTourist)
    .then(() => {
        res.redirect("/tourist/tours/list");
    })
    .catch(err => console.log(err))

    Tourist.findByIdAndUpdate(touristId).push(purchased_tours: Tour.id}})
    .then(() => {
        res.redirect("/tourist/tours/list")
    })
})


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

module.exports = app