let mongoose = require("mongoose");

let citySchema = new mongoose.Schema({
    cityName: {
        type: String,
    },
    latitude: {
        type: mongoose.Schema.Types.Decimal128,
    },
    longitude: {
        type: mongoose.Schema.Types.Decimal128,
    }
})

let cityModel = mongoose.model("city", citySchema);

module.exports = cityModel;