const mongoose = require("mongoose");

let previousSearchesSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    start: {
        type: String,
    },
    end: {
        type: String,
    }
}
);

let roleModel = mongoose.model("previousSearches", previousSearchesSchema);

module.exports = roleModel;