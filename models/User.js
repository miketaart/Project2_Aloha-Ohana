const mongoose = require("mongoose")

User = mongoose.model("users", {
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

module.exports = User