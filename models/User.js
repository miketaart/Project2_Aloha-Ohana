const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

User = mongoose.model("users", {
    username: {type: String, required: true},
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    
    email: {
        type: String, 
        required: [true, "Correct email is required"],
        validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    },

    firstName: {type: String, required: false},
    lastName: {type: String, required: false},
    birthday: {type: Date, required: false},
    profile_pic: String,
    touristProfile: {type: ObjectId, ref: "Tourist"},
    guideProfile: {type: ObjectId, ref: "Guide"},
    hostedTours: [{type: ObjectId, ref: "Tour"}]
})

module.exports = User