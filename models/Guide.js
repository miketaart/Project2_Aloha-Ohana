const mongoose = require("mongoose")

Guide = mongoose.model("guides", {
    hosted_tours: {type: String},
})

module.exports = Guide