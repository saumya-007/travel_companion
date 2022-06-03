const roleModel = require("../model/role-model");

module.exports.addRole = function (req, res) {

    let role = new roleModel({
        roleName: req.body.roleName,
    })
    role.save(function (err, success) {
        if (err) {
            res.json({ msg: "Failed to add role", status: -1, data: req.body })
        } else {
            res.json({ msg: "role added", status: 200, data: success })
        }
    }) // basically insert
    // console.log(req.body.roleName);
    // res.json({
    //     msg: "role added",
    //     status: 200,
    //     data: req.body,
    // })

}

module.exports.getAllRole = function (req, res) {
    roleModel.find(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to get all roles",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "Roles Retrived",
                status: 200,
                data: success
            })
        }
    })
}

module.exports.deleteRole = function (req, res) {
    let roleId = req.params.roleId;
    roleModel.deleteOne({ '_id': roleId }, function (err, data) {
        if (err) {
            res.json({
                msg: "Failed to delete role",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "Data Removed",
                status: 200,
                data: data
            })
        }
    })
}

module.exports.updateRole = function (req, res) {
    let roleId = req.body.roleId;
    let roleName = req.body.roleName;

    roleModel.updateOne({ _id: roleId }, { roleName: roleName }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update role",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "Changes Updated",
                status: 200,
                data: success,
            })
        }
    })
}