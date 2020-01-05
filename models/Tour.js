const mongoose = require("mongoose");

Tour = mongoose.model("tours", {
    title: { type: String, required: true, unique: true},
    duration: {type: Number, min: 0},
    guide_name: { type: String}, //how to get the name of logged on person here?
    image: { type: String},
    city: { type: String, enum: ['Amsterdam', 'Barcelona', 'Berlin', 'Lisbon', 'Madrid', 'Mexico City', 'Miami', 'Paris', 'São Paulo'] },
    description: { type: String, required: true}
});

module.exports = Tour;