const mongoose = require("mongoose")

Guide = mongoose.model("guides", {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required: true},
    username: {type: String, required: true},
    password: {
        type: String, 
        required: [true, "Password is required"],
    },
    email: {
        type: String, 
        required  : [true, "Correct email is required"],
        validate: /[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}/
    },
    profile_pic: String 
})

module.exports = Guide