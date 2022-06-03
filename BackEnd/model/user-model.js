const mongoose = require("mongoose");

//schema
let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    phoneNumber: {
        type: String,
    },
    password: {
        type: String,
    },
    //basically roleId as FK from role table
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
    },
    gender: {
        type: String,
    },
    profilephoto: {
        type: String,
    }
})

//exporting the model
let userModel = mongoose.model("user", userSchema);

module.exports = userModel;




