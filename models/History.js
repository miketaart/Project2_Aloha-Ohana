const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema

History = mongoose.model("guides", new Schema({
    tour: [{type: ObjectId, ref: "Tour"}]
},
{
    timestamps: {
        createdAt: "createdAt",
        updatedAt: "updatedAt"
    }
}))

module.exports = History



// reference to the tour
// coordinates
// picture
// reference to tourist
// message