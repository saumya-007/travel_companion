const vehicleModel = require("../model/vehicle-model");

module.exports.addVehicle = function (req, res) {
    let user = req.body.user;
    let vehicleName = req.body.vehicleName;
    let vehicleCategory = req.body.vehicleCategory;
    let vehicleCapacity = req.body.vehicleCapacity;
    let registrationNumber = req.body.registrationNumber;
    let insuranceURL = req.body.insuranceURL;
    let isActive = req.body.isActive;

    let vehicle = new vehicleModel({
        vehicleName: vehicleName,
        vehicleCategory: vehicleCategory,
        vehicleCapacity: vehicleCapacity,
        registrationNumber: registrationNumber,
        user: user,
        insuranceURL: insuranceURL,
        isActive: isActive,
    })

    vehicle.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add Vehicle",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "vehicle added",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.getAllVehicle = function (req, res) {
    vehicleModel.find().populate("user").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to list all vehicle",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "vehicles retrived",
                status: 200,
                data: success,
            })
        }
    })

}
// requested data
module.exports.getRequestedVehicle = function (req, res) {
    let userId = req.params.userId;
    vehicleModel.find({ user: userId }).exec(function (err, success) {
        // vehicleModel.aggregate([{
        //     $lookup: {
        //         from: "users",
        //         localField: "user",
        //         foreignField: "_id",
        //         pipeline: [{ $match: { "user": userId } }],
        //         as: "anything",
        //     }
        // }]).exec(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to list requested vehicle",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "requested vehicle retrived",
                status: 200,
                data: success,
            })
        }
    })

}

module.exports.deleteVehicle = function (req, res) {
    let vehicleId = req.params.vehicleId;
    vehicleModel.deleteOne({ _id: vehicleId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete vehhicle",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "vehicle deleted",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.updateVehicle = function (req, res) {
    let vehicleName = req.body.vehicleName;
    let vehicleId = req.body.vehicleId;
    let vehicleCategory = req.body.vehicleCategory;
    let vehicleCapacity = req.body.vehicleCapacity;
    let registrationNumber = req.body.registrationNumber;
    let insuranceURL = req.body.insuranceURL;


    vehicleModel.updateMany({ _id: vehicleId }, {
        vehicleCapacity: vehicleCapacity, vehicleCategory: vehicleCategory,
        registrationNumber: registrationNumber, insuranceURL: insuranceURL, vehicleName: vehicleName
    }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update (vehicle table)",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "Values updated (vehicle table)",
                status: 200,
                data: success,
            })
        }
    })
}