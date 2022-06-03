const mongoose = require("mongoose");

let interCitySchema = new mongoose.Schema({
    interCityName: {
        type: String,
    },
    latitude: {
        type: mongoose.Schema.Types.Decimal128,
    },
    longitude: {
        type: mongoose.Schema.Types.Decimal128,
    },
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city"
    }
})

let interCityModel = mongoose.model("interCity", interCitySchema);

module.exports = interCityModel;