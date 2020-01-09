const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

Guide = mongoose.model("guides", new Schema({
    about: {type: String, required: true},
    your_city: {type: String},
    languages: [{type: String}],
    your_country: {type: String},
    favorite_city: {type: String},
    birthday: {type: Date},
    hostedTours: [{type: ObjectId, ref: "Tour"}]
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}))

module.exports = Guide