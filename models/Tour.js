const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

Tour = mongoose.model("tours", new Schema({
    title: { type: String, required: true, unique: true},
    duration: {type: Number, min: 0},
    guideProfile: {type: ObjectId, ref: "Guide"},
    image: { type: String},
    city: { type: String, enum: ['Amsterdam', 'Barcelona', 'Berlin', 'Lisbon', 'Madrid', 'Mexico City', 'Miami', 'Paris', 'São Paulo'] },
    description: { type: String, required: true},
    price: {type: Number, min: 0}
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}));

module.exports = Tour;