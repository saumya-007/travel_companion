let previousSearcheModel = require("../model/PreviousSearches-model")

module.exports.addSearch = async function (req, res) {
    let query = await previousSearcheModel.find({
        $and: [{
            userId: req.body.userId,

        }, {
            start: req.body.start,

        }, {
            end: req.body.end,
        }]
    }).exec()
    if (query.length === 0) {
        data = new previousSearcheModel({
            userId: req.body.userId,
            start: req.body.start,
            end: req.body.end,
        })
        data.save(function (err, success) {
            if (err) {
                res.json({
                    msg: "Failed to save previous search",
                    status: -1,
                    data: err,
                })
            } else {
                res.json({
                    msg: "previous search saved",
                    status: 200,
                    data: success,
                })
            }
        })
    } else {
        res.json({
            msg: "Duplicate",
            status: -1,
            data: null,
        })
    }
}
module.exports.getRequiredSearch = async function (req, res) {
    await previousSearcheModel.find({ userId: req.params.userId }, function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to retrive data",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "previous search found",
                status: 200,
                data: success,
            })
        }
    })
}
