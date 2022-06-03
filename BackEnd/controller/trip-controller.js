const { is } = require("express/lib/request");
// const ObjectId = require('mongodb').ObjectId;
let tripModel = require("../model/trip-model");
let cityModel = require("../model/city-model")
let vehicleModel = require("../model/vehicle-model")
let conversationModel = require("../model/conversation-model")

function getCityDetails(city) {
    let data = cityModel.find({ cityName: city }).exec()
    return data;
}

module.exports.addTrips = async function (req, res) {

    function getVehicle(vehicle, user) {
        let data = vehicleModel.find({ vehicleName: vehicle, user: user }).exec()
        return data;
    }
    let user = req.body.user;
    let vehicleName = await getVehicle(req.body.vehicle, req.body.user);
    let vehicle = vehicleName[0]._id
    let start = await getCityDetails(req.body.startLocation);
    let end = await getCityDetails(req.body.endLocation)
    let startLocationCity = start[0]._id;
    let endLocationCity = end[0]._id;
    let tripDate = req.body.tripDate;
    let tripTime = req.body.tripTime;

    let baseFairType = req.body.fairType;
    let customFairAmount = req.body.customFairAmount;

    let startLocationLat = start[0].latitude;
    let startLocationLong = start[0].longitude;
    let endLocationLat = end[0].latitude;
    let endLocationLong = end[0].longitude;

    // let startLocationInterCity = req.body.startLocationInterCity;
    // let endLocationInterCity = req.body.endLocationInterCity;
    // let isInterCity = req.body.isInterCity;
    // let isCancel = req.body.isCancel;
    //find vehicle id using vehicle and user

    // console.log(user, vehicle, startLocationCity, endLocationCity, tripDate, tripTime, baseFairType,
    //     customFairAmount, startLocationLat, startLocationLong, endLocationLat, endLocationLong)

    let tripModelObj = new tripModel({
        user: user,
        vehicle: vehicle,
        startLocationCity: startLocationCity,
        endLocationCity: endLocationCity,
        tripDate: tripDate,
        tripTime: tripTime,
        baseFairType: baseFairType,
        customFairAmount: customFairAmount,

        startLocationLat: startLocationLat,
        startLocationLong: startLocationLong,
        endLocationLat: endLocationLat,
        endLocationLong: endLocationLong,

        // isCustomFair: isCustomFair,
        // baseFairType: baseFairType,
        // startLocationInterCity: startLocationInterCity,
        // endLocationInterCity: endLocationInterCity,
        // isInterCity: isInterCity,
        // isCancel: isCancel,
    })

    tripModelObj.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add trip",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "trip added",
                status: 200,
                data: success
            })
        }
    })
}

module.exports.getRequestedTrips = function (req, res) {
    let user = req.params.user
    tripModel.find({ user: user }, 'user vehicle startLocationCity endLocationCity tripDate tripTime customFairAmount baseFairType')
        .populate("vehicle", "vehicleName").populate("startLocationCity")
        .populate("endLocationCity")
        .exec(function (err, success) {
            if (err) {
                res.json({
                    msg: "Failed to list trip",
                    status: -1,
                    data: err
                })
            } else {
                res.json({
                    msg: "trip retrived",
                    status: 200,
                    data: success
                })
            }
        })
}

module.exports.getTripsForPatron = async function (req, res) {
    var ObjectId = require('mongoose').Types.ObjectId;

    let startLocationCity = await getCityDetails(req.params.startLocation);
    let endLocationCity = await getCityDetails(req.params.endLocation);

    let start = new ObjectId(startLocationCity[0]._id.toString());
    let end = new ObjectId(endLocationCity[0]._id.toString())
    await tripModel.find({ startLocationCity: startLocationCity[0]._id, endLocationCity: endLocationCity[0]._id }, 'user vehicle startLocationCity endLocationCity tripDate tripTime customFairAmount baseFairType')
        .populate("vehicle", "vehicleName").populate("startLocationCity", "cityName")
        .populate("endLocationCity", "cityName").populate("user", "firstName")
        .exec(function (err, success) {
            if (err) {
                res.json({
                    msg: "Failed to list trip",
                    status: -1,
                    data: err
                })
            } else {
                res.json({
                    msg: "requested trips list retrived",
                    status: 200,
                    data: success
                })
            }
        })
}


module.exports.deleteTrips = function (req, res) {
    let tripId = req.params.tripId;
    tripModel.deleteOne({ _id: tripId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete trip",
                status: -1,
                data: err
            })
        } else {
            conversationModel.find({ associatedTrip: tripId }, function (err, success) {
                if (err) {
                    res.json({
                        msg: "trip deleted",
                        status: 200,
                        data: success
                    })
                }
                else {
                    conversationModel.deleteMany({ associatedTrip: tripId }).exec()
                    res.json({
                        msg: "trip deleted and conversation deleted",
                        status: 200,
                        data: success
                    })
                }
            })
        }
    })
}

module.exports.updateTrips = function (req, res) {
    let tripId = req.body.tripId;

    let user = req.body.user;
    let vehicle = req.body.vehicle;
    let startLocationLat = req.body.startLocationLat;
    let startLocationLong = req.body.startLocationLong;
    let endLocationLat = req.body.endLocationLat;
    let endLocationLong = req.body.endLocationLong;
    let isCustomFair = req.body.isCustomFair;
    let customFairAmount = req.body.customFairAmount;
    let baseFairType = req.body.baseFairType;
    let startLocationCity = req.body.startLocationCity;
    let endLocationCity = req.body.endLocationCity;
    let startLocationInterCity = req.body.startLocationInterCity;
    let endLocationInterCity = req.body.endLocationInterCity;
    let isInterCity = req.body.isInterCity;
    let isCancel = req.body.isCancel;

    tripModel.updateMany({ _id: tripId }, {
        user: user, vehicle: vehicle, startLocationLat: startLocationLat
        , startLocationLong: startLocationLong, endLocationLat: endLocationLat, endLocationLong: endLocationLong
        , isCustomFair: isCustomFair, customFairAmount: customFairAmount, baseFairType: baseFairType, startLocationCity
        , endLocationCity, startLocationInterCity: startLocationInterCity, endLocationInterCity, endLocationInterCity,
        isInterCity: isInterCity, isCancel: isCancel
    }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update trip",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "trip updated",
                status: 200,
                data: success
            })
        }
    })
}