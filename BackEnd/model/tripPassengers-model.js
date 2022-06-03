let mongoose = require("mongoose");

let tripPassengersSchema = new mongoose.Schema({
    trip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trip",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    isAccepted: {
        type: String,
    },
})

let tripPassengersModel = mongoose.model("tripPassenger", tripPassengersSchema);

module.exports = tripPassengersModel;