const mongoose = require("mongoose");

let conversationSchema = new mongoose.Schema({
    members: {
        type: Array
    },
    associatedTrip: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "trip",
    }
}, { timestamps: true }
);

let roleModel = mongoose.model("conversation", conversationSchema);

module.exports = roleModel;