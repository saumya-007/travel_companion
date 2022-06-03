let mongoose = require("mongoose");

let baseFairTypeSchema = new mongoose.Schema({
    pricePerKm: {
        type: String,
    },
    minFair: {
        type: String,
    },
    fixedPriceFor3Km: {
        type: String,
    }

})

let baseFairTypeModel = mongoose.model("baseFairType", baseFairTypeSchema);

module.exports = baseFairTypeModel;