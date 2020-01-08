const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

Guide = mongoose.model("guides", {
    about: {type: String, required: true},
    your_city: {type: String},
    languages: [{type: String}],
    your_country: {type: String},
    favorite_city: {type: String},
    birthday: {type: Date},
    hostedTours: [{type: ObjectId, ref: "Tour"}]
})

module.exports = Guide