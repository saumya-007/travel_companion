const mongoose = require("mongoose");

let vehicleSchema = new mongoose.Schema({
    vehicleName: {
        type: String,
    },
    vehicleCategory: {
        type: String,
    },
    vehicleCapacity: {
        type: String,
    },
    registrationNumber: {
        type: String,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    insuranceURL: {
        type: String,
    },
    isActive: {
        type: Boolean,
    }
})

let vehicleModel = mongoose.model("vehicle", vehicleSchema);

module.exports = vehicleModel;