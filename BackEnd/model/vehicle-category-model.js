let mongoose = require("mongoose");

let vehicleCategorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
})

let vehicleCategoryModel = mongoose.model("vehicleCategory", vehicleCategorySchema);

module.exports = vehicleCategoryModel;