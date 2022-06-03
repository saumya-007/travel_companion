const interCityModel = require("../model/intercity-model");

module.exports.addInterCity = function (req, res) {
    let interCityName = req.body.interCityName;
    let interCityLatitude = req.body.interCityLatitude;
    let interCityLongitude = req.body.interCityLongitude;
    let city = req.body.city;

    let interCity = new interCityModel({
        interCityName: interCityName,
        interCityLatitude: interCityLatitude,
        interCityLongitude: interCityLongitude,
        city: city,
    })

    interCity.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add inter city",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "inter city added",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.getAllInterCity = function (req, res) {
    interCityModel.find().populate("city").exec(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to list all inter cities",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "inter city retrived",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.deleteInterCity = function (req, res) {
    let interCityId = req.params.interCityId;
    interCityModel.deleteOne({ _id: interCityId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete inter city",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "inter city deleted",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.updateInterCity = function (req, res) {

    let interCityId = req.body.interCityId;
    let interCityName = req.body.interCityName;
    // let interCityLatitude = req.body.interCityLatitude;
    // let interCityLongitude = req.body.interCityLongitude;
    // let city = req.body.city;

    interCityModel.updateOne({ _id: interCityId }, { interCityName: interCityName }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update (inter city table)",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "Values updated (inter city table)",
                status: 200,
                data: success,
            })
        }
    })
}
