const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

Tourist = mongoose.model("tourists", new Schema({
        //purchased_tours: {type: ObjectId, ref: "Tour"},
        about: {type: String},
        your_city: {type: String},
        languages: [{type: String}],
        your_country: {type: String},
        favorite_city: {type: String},
        birthday: {type: Date},
        purchased_tours: [{type: ObjectId, ref: "tours"}]
        
    },
    {
        timestamps: {
            createdAt: "createdAt",
            updatedAt: "updatedAt"
        }
    }))

module.exports = Tourist

