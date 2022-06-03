const { isValidObjectId } = require("mongoose");
let tripPassengersModel = require("../model/tripPassengers-model");
let tripModel = require("../model/trip-model");
const cityModel = require("../model/city-model");

let ObjectId = require('mongoose').Types.ObjectId;

module.exports.addTripPassengers = function (req, res) {
    let trip = new ObjectId(req.body.trip);
    let user = new ObjectId(req.body.user);
    let isAccepted = req.body.isAccepted;

    let tripPassengersModelObj = new tripPassengersModel({
        trip: trip,
        user: user,
        isAccepted: isAccepted,
    })

    tripPassengersModelObj.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add trip passenger",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "trip passenger added",
                status: 200,
                data: success
            })
        }
    })
}

module.exports.getAllTripPassengers = async function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    let userId = req.params.userId;
    let response = []
    let tripsFound = await tripModel.find({ user: new ObjectId(userId) }).exec()
    for (i = 0; i < tripsFound.length; i++) {
        response.push({
            start: await cityModel.find({ _id: tripsFound[i].startLocationCity }, "cityName").exec(),
            end: await cityModel.find({ _id: tripsFound[i].endLocationCity }, "cityName").exec(),
            date: tripsFound[i].tripDate,
            time: tripsFound[i].tripTime,
            query: await tripPassengersModel.find({
                trip: tripsFound[i]._id
            }).populate(
                {
                    path: "trip",
                    populate: {
                        path: "startLocationCity",
                    },
                }
            ).populate(
                {
                    path: "trip",
                    populate: {
                        path: "endLocationCity",
                    },
                }
            ).populate("user", ["firstName", "phoneNumber", "gender", "profilephoto"]).exec(),
        })
    }
    res.json({
        msg: "trip passenger retrived",
        status: 200,
        data: response
    })
}

module.exports.getStatusTripPassengers = async function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;
    let tripId = req.params.tripId;
    let requestingUserId = req.params.userId;
    let response = await tripPassengersModel.find({ $and: [{ user: requestingUserId }, { trip: tripId }] }, "isAccepted");
    // if (response.length !== 0){

    // }
    res.json({
        msg: "Status retrived",
        status: 200,
        data: response,
    })
}


module.exports.deleteTripPassengers = function (req, res) {
    let tripPassengerId = req.params.tripPassengerId;
    tripPassengersModel.deleteOne({ _id: tripPassengerId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete trip passenger",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "trip passenger deleted",
                status: 200,
                data: success
            })
        }
    })
}

module.exports.updateTripPassengers = function (req, res) {
    let tripPassengerId = req.body.tripPassengerId;
    let isAccepted = req.body.isAccepted;
    console.log(tripPassengerId, isAccepted)
    tripPassengersModel.updateMany({ _id: tripPassengerId }, { isAccepted: isAccepted }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update trip passenger",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "trip passenger updated",
                status: 200,
                data: success
            })
        }
    })
}