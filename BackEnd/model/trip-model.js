let mongoose = require("mongoose");

let tripSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
    },
    vehicle: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehicle",
    },
    startLocationCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
    },
    endLocationCity: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "city",
    },
    tripDate: {
        type: String
    },
    tripTime: {
        type: String
    },
    baseFairType: {
        type: String
        // type: mongoose.Schema.Types.ObjectId,
        // ref: "baseFairType",
    },
    customFairAmount: {
        type: Number,
    },
    startLocationLat: {
        type: mongoose.Types.Decimal128,
    },
    startLocationLong: {
        type: mongoose.Types.Decimal128,
    },
    endLocationLat: {
        type: mongoose.Types.Decimal128,
    },
    endLocationLong: {
        type: mongoose.Types.Decimal128,
    },
    // isCustomFair: {
    //     type: Boolean,
    // },
    // startLocationInterCity: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "interCity",
    // },
    // endLocationInterCity: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "interCity",
    // },
    // isInterCity: {
    //     type: Boolean,
    // },
    // isCancel: {
    //     type: Boolean,
    // },
})

let tripModel = mongoose.model("trip", tripSchema);

module.exports = tripModel;