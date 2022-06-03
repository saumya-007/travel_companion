const cityModel = require("../model/city-model");

module.exports.addCity = function (req, res) {
    let cityName = req.body.cityName;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    let cityObj = new cityModel({
        cityName: cityName,
        latitude: latitude,
        longitude: longitude,
    })

    cityObj.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add city",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "City added",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.getAllCity = function (req, res) {
    cityModel.find(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to list all cities",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "Cities Retrived",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.deleteCity = function (req, res) {
    let cityId = req.params.cityId;
    cityModel.deleteOne({ _id: cityId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete city",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "city deleted",
                status: 200,
                data: success,
            })
        }
    })
}

module.exports.updateCity = function (req, res) {
    let cityId = req.body.cityId;
    let cityName = req.body.cityName;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    cityModel.updateMany({ _id: cityId }, { cityName: cityName, latitude: latitude, longitude: longitude }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update (city table)",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "Values updated (city table)",
                status: 200,
                data: success,
            })
        }
    })
}