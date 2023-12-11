const bcrypt = require("bcrypt");
const { json } = require("express/lib/response");
const { Mongoose } = require("mongoose");
const multer = require("multer");
const path = require("path")
const roleModel = require("../model/role-model");
const userModel = require("../model/user-model");
var ObjectId = require('mongodb').ObjectId;
const jwt = require("jsonwebtoken");

//login
module.exports.login = async function (req, res) {
    let param_email = req.body.email;
    let param_password = req.body.password;
    let role = req.body.role;
    let isCorrect = false;
    let compare = false;
    let userId = "";

    let role_id = await roleModel.findOne({ roleName: role })
    let roleId = new ObjectId(role_id);
    let data = await userModel.find({ $and: [{ role: roleId }, { email: param_email }] }).exec()
    if (data.length !== 0) {
        compare = bcrypt.compareSync(param_password, data[0].password);
        userId = data[0]._id;
        userdetails = await userModel.find({ _id: userId }).exec()
        roledetails = await roleModel.find({ _id: roleId }).exec()
        if (compare) {
            isCorrect = true;
        }
        if (isCorrect == false) {
            res.json({
                msg: "invalid credentials",
                status: -1,
                data: res.body,
            })
        } else {
            //usning JTW for security purposes.
            const token = jwt.sign({
                email: param_email,
                role: roleId,
                user: userId,
                name: userdetails[0].firstName,
                profilephoto: userdetails[0].profilephoto,
                roleName: roledetails[0].roleName,
            }, 'secret132')
            res.json({
                msg: "Login Successful",
                status: 200,
                data: token,
            })
        }
    } else {
        res.json({
            msg: "invalid credentials",
            status: -1,
            data: res.body,
        })
    }

}


module.exports.addUser = async function (req, res) {
    let firstName = req.body.name;
    let email = req.body.email;
    let phoneNumber = req.body.phoneNumber;
    let password = req.body.password;
    let role = req.body.role;
    let gender = req.body.gender;

    password = bcrypt.hashSync(password, 10);
    // Need to figure out why is it not getting role
    let roleId = await roleModel.findOne({ roleName: 'captain' }).clone()
    await userModel.find({ email: email, role: roleId._id }, function (err, success) {
        if (err) {
            res.json({
                msg: "User already Exist",
                status: -1,
                data: err,
            })
        }
        else {
            let user = new userModel({
                firstName: firstName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                role: roleId._id,
                gender: gender,
                profilephoto: req.file.originalname
            })

            user.save(function (err, success) {
                if (err) {
                    res.json({
                        msg: "Failed to add user",
                        status: -1,
                        data: err,
                    })
                } else {
                    res.json({
                        msg: "user added",
                        status: 200,
                        data: success,
                    })
                }
            })
        }
    }).clone()
}

module.exports.getRequestedUser = function (req, res) {
    let userId = req.params.userId;
    userModel.findOne({ _id: userId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to find requested user",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "users found",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.getAllUser = function (req, res) {
    userModel.find().populate("role").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to list all users",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "users retrived",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.deleteUser = function (req, res) {
    let userId = req.params.userId;
    userModel.deleteOne({ _id: userId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete users",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "users deleted",
                status: 200,
                data: success,
            })
        }
    })
}
module.exports.updateProfile = function (req, res) {
    let profilephoto = req.file.originalname;
    let userId = req.body.userId;

    userModel.updateMany({ _id: userId }, { profilephoto: profilephoto }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update profile photo",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "profile photo",
                status: 200,
                data: success,
            })
        }
    })

}

module.exports.updateUser = function (req, res) {

    if (req.body.password) {
        let password = req.body.password;
        let userId = req.body.userId;
        password = bcrypt.hashSync(password, 10);

        userModel.updateOne({ _id: userId }, { password: password }, function (err, success) {
            if (err) {
                res.json({
                    msg: "Failed to update users",
                    status: -1,
                    data: err,
                })
            } else {
                res.json({
                    msg: "users password updated",
                    status: 200,
                    data: success,
                })
            }
        })

    } else {
        let userId = req.body.userId;
        let firstName = req.body.name;
        let email = req.body.email;
        let phoneNumber = req.body.phoneNumber;
        let gender = req.body.gender;

        userModel.updateMany({ _id: userId }, { firstName: firstName, email: email, gender: gender, phoneNumber: phoneNumber }, function (err, success) {
            if (err) {
                res.json({
                    msg: "Failed to update users",
                    status: -1,
                    data: err,
                })
            } else {
                res.json({
                    msg: "users updated",
                    status: 200,
                    data: success,
                })
            }
        })
    }
}
