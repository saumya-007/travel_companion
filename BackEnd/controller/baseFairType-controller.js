let baseFairTypeModel = require("../model/baseFairType-model");

module.exports.addbaseFairTypes = function (req, res) {

    let pricePerKm = req.body.pricePerKm;
    let minFair = req.body.minFair;
    let fixedPriceFor3Km = req.body.fixedPriceFor3Km;

    let baseFairTypes = new baseFairTypeModel({
        pricePerKm: pricePerKm,
        minFair: minFair,
        fixedPriceFor3Km: fixedPriceFor3Km,
    })

    baseFairTypes.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add base fair Type",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "base fair Type added",
                status: 200,
                data: success
            })
        }

    })
}

module.exports.getAllbaseFairTypes = function (req, res) {
    baseFairTypeModel.find(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to list base fair Type",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "base fair Type retrived",
                status: 200,
                data: success
            })
        }
    })
}

module.exports.deletebaseFairTypes = function (req, res) {
    let baseFairTypeId = req.params.baseFairTypeId;
    baseFairTypeModel.deleteOne({ _id: baseFairTypeId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to delete base fair Type",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "base fair type deleted",
                status: 200,
                data: success
            })
        }
    })
}


module.exports.updatebaseFairTypes = function (req, res) {

    let baseFairTypeId = req.body.baseFairTypeId;
    let pricePerKm = req.body.pricePerKm;
    let minFair = req.body.minFair;
    let fixedPriceFor3Km = req.body.fixedPriceFor3Km;

    baseFairTypeModel.updateMany({ _id: baseFairTypeId }, { pricePerKm: pricePerKm, minFair: minFair, fixedPriceFor3Km: fixedPriceFor3Km }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to update base fair type",
                status: -1,
                data: err
            })
        } else {
            res.json({
                msg: "base fair type updated",
                status: 200,
                data: success
            })
        }
    })
}