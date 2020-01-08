const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

Guide = mongoose.model("guides", {
    
    hostedTours: [{type: ObjectId, ref: "Tour"}]
})

module.exports = Guide