const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

Tourist = mongoose.model("tourists", {
        //purchased_tours: {type: ObjectId, ref: "Tour"},
        about: {type: String},
        your_city: {type: String},
        languages: [{type: String}],
        your_country: {type: String},
        favorite_city: {type: String},
        birthday: {type: Date},
        firstName: {type: String, required: false},
        lastName: {type: String, required: false},
        purchased_tours: [{type: ObjectId, ref: "tours"}]
        
    })

module.exports = Tourist

