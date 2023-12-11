const vehicleCategoryModel = require('../model/vehicle-category-model');

module.exports.checkDefaultVehicleCategories = async () => {
    const defaultVehicleCategories = await vehicleCategoryModel.find().exec();
    if (!defaultVehicleCategories.length) {
        await vehicleCategoryModel.insertMany([{
            category: 'four wheeler (mini)',
            categoryCapacity: [1,2,3],
        },{
            category: 'four wheeler (mega)',
            categoryCapacity: [1,2,3,4,5,6],
        },{
            category: 'four wheeler (standard)',
            categoryCapacity: [1,2,3,4],
        },{
            category: 'two wheeler',
            categoryCapacity: [1,2],
        }]);
    }
}