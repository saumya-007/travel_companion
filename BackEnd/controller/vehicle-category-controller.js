let vehicleCategoryModel = require("../model/vehicle-category-model");

module.exports.addCategory = function (req, res) {
    let category = new vehicleCategoryModel({
        category: req.body.category
    })
    category.save(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to add category",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "category added",
                status: 200,
                data: success,
            })
        }
    })

}

module.exports.getCategory = function (req, res) {
    vehicleCategoryModel.find(function (err, success) {
        if (err) {
            res.json({
                msg: "Failed to get category",
                status: -1,
                data: err,
            })
        } else {
            res.json({
                msg: "category retrived",
                status: 200,
                data: success,
            })
        }
    })
}
