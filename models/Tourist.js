const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId;

Tourist = mongoose.model("tourists", {
        //purchased_tours: {type: ObjectId, ref: "Tour"},
        trigger: {type: Number},
        purchased_tours: [{type: ObjectId, ref: "tours"}]
        
    })

module.exports = Tourist

