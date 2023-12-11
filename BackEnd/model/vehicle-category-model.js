let mongoose = require("mongoose");

let vehicleCategorySchema = new mongoose.Schema({
    category: {
        type: String,
    },
    categoryCapacity: {
        type: Array,
    },
})

let vehicleCategoryModel = mongoose.model("vehicleCategory", vehicleCategorySchema);

module.exports = vehicleCategoryModel;