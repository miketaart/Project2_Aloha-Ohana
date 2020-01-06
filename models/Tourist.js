const mongoose = require("mongoose")

Tourist = mongoose.model("guides", {
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthday: {type: Date, required: true},
    username: {type: String, required: true},
    password: {
        type: String, 
        required: [true, "Password is required"],
    }
})

module.exports = Guide