const mongoose = require("mongoose");

let messageSchema = new mongoose.Schema({
    conversationId: {
        type: String
    },
    sender: {
        type: String
    },
    text: {
        type: String
    }
}, { timestamps: true }
);

let roleModel = mongoose.model("message", messageSchema);

module.exports = roleModel;