const mongoose = require("mongoose");

//schema

let roleSchema = new mongoose.Schema({
    roleName: {
        type: String,
    }
});

//model

let roleModel = mongoose.model("role", roleSchema); //role is the tabel name and 2nd arg is the schema it has to follow
//role is singular here but in DB it will automatically create plural tables

//exoprts

module.exports = roleModel; //no need to specify name as this file will export only one thing